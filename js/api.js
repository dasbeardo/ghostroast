// OpenAI API integration
import { state, PROXY_URL } from './state.js';

// Helper to make API calls (handles both direct and proxy modes)
async function callOpenAI(body) {
  if (PROXY_URL) {
    // Proxy mode - use Cloudflare Worker
    const res = await fetch(PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Password': state.accessPassword
      },
      body: JSON.stringify(body)
    });
    return res.json();
  } else {
    // Direct mode - use OpenAI API directly
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.apiKey}`
      },
      body: JSON.stringify(body)
    });
    return res.json();
  }
}

// Judge a single roast (used in the new alternating flow)
export async function getJudgeSingleRoastResponse(judge, ghostContext, roasterName, roasterEmoji, roast, isSecondRoast, priorJudgeReactions, firstRoastContext) {
  // Build context from prior judges who already scored THIS roast
  let priorContext = '';
  let interJudgeInstruction = '';
  if (priorJudgeReactions.length > 0) {
    priorContext = `\n\n---\n\nPRIOR JUDGES ON THIS ROAST:\n\n`;
    priorContext += priorJudgeReactions.map(r =>
      `${r.name}: "${r.reaction}" (Score: ${r.score})`
    ).join('\n');

    interJudgeInstruction = `\n\nCONTEXT: ${priorJudgeReactions.map(r => r.name).join(' and ')} already reacted. You CAN reference their take if it feels natural—agree, disagree, or be confused by it. But react authentically to the ROAST first.`;
  }

  // If this is the second roast, include what they said about the first
  let firstRoastMemory = '';
  if (isSecondRoast && firstRoastContext) {
    firstRoastMemory = `\n\n---\n\nYOU ALREADY JUDGED THE FIRST ROAST:\n${firstRoastContext.roasterName}'s roast: "${firstRoastContext.roast}"\nYour reaction: "${firstRoastContext.yourReaction}" (Score: ${firstRoastContext.yourScore})\n\nNow you're hearing the SECOND roast. You can compare, contrast, or just react fresh. Your score for the first roast is LOCKED—no changing it. Judge this new roast on its own merits, but feel free to reference the first if it's natural.`;
  }

  // Build catchphrases, actions, and forbidden strings if available
  const catchphrasesStr = judge.catchphrases ? `\nYOUR SIGNATURE PHRASES (use naturally): ${judge.catchphrases.join(', ')}` : '';
  const actionsStr = judge.actions ? `\nYOUR PHYSICAL COMEDY (use sparingly for emphasis): ${judge.actions.join(', ')}` : '';
  const forbiddenStr = judge.forbidden ? `\nNEVER DO THESE (breaks character): ${judge.forbidden.join(', ')}` : '';

  const systemPrompt = `You are ${judge.name} ${judge.emoji}, a judge on "ROAST MORTEM" — a comedy roast battle where contestants craft insults about a deceased person.

YOUR PERSONALITY AND VOICE:
${judge.personality}
${catchphrasesStr}
${actionsStr}
${forbiddenStr}

VOICE ANCHOR: You are ONLY ${judge.name}. Never blend into a generic judge voice. Every word must sound like something ONLY your character would say.

YOUR SCORE RANGE: ${judge.scoreRange[0]}-${judge.scoreRange[1]} (STAY WITHIN THIS RANGE)

COMEDY PRIORITY LADDER (in order of importance):
1. SURPRISE - Did the punchline subvert expectations? Unexpected > predictable.
2. SPECIFICITY - Does it roast THIS ghost specifically, not just generic insults?
3. COMMITMENT - Does the joke commit to a bit, or hedge with "kinda" energy?
4. RHYTHM - Does it flow? Is there a clean setup → payoff structure?

HOW TO JUDGE THIS ROAST:
- Judge the OVERALL joke as a complete sentence, not individual words
- Ask yourself: Would this get laughs at an actual roast?
- Cleverness matters: wordplay, callbacks, unexpected twists

SCORING CALIBRATION:
- ${judge.scoreRange[0]}: Reserved for jokes that actively make things worse
- ${Math.floor((judge.scoreRange[0] + judge.scoreRange[1]) / 2)}: Competent but forgettable, no real laughs
- ${judge.scoreRange[1]}: Genuinely surprising AND funny, would get crowd reaction

REACTION STRUCTURE:
1. PHYSICAL BEAT: One action that shows your gut reaction (*slaps table*, *adjusts glasses*, etc.)
2. VERDICT LINE: Your in-character take on the joke (15-30 words max)

FORBIDDEN:
- Never use "solid effort," "not bad," "decent," or neutral praise
- No explanations of why something is funny—just react
- Don't hedge with "I mean..." or "To be fair..."
- Never break character or sound like a different judge${interJudgeInstruction}

Respond with ONLY valid JSON. No markdown, no code blocks, no extra text.`;

  const userPrompt = `${ghostContext}${firstRoastMemory}${priorContext}

---

${roasterEmoji} ${roasterName} steps up to the mic and delivers:

"${roast}"

React in character. One physical beat, then your verdict.

RESPOND WITH EXACTLY THIS FORMAT:
{"name":"${judge.name}","score":N,"reaction":"*action* Your reaction here"}

BEGIN JSON:`;

  const data = await callOpenAI({
    model: 'gpt-5.2',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    max_completion_tokens: 180
  });

  if (data.error) {
    throw new Error(data.error.message);
  }

  const text = data.choices?.[0]?.message?.content || '';
  const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());

  return parsed;
}

// EXPERIMENTAL V2: Method Acting + Option B approach
// - "You ARE [character]" framing
// - Ghost details presented as scene-setting, not a rubric
// - No ghost-specificity requirements
// - Higher temp (0.9) and more tokens (300) for creative freedom
export async function getJudgeSingleRoastResponseV2(judge, ghostContext, roasterName, roasterEmoji, roast, isSecondRoast, priorJudgeReactions, firstRoastContext) {

  // Build context for second roast / prior judges
  let situationContext = '';
  if (isSecondRoast && firstRoastContext) {
    situationContext += `\n\nYou already heard ${firstRoastContext.roasterName}'s roast: "${firstRoastContext.roast}" — you gave it a ${firstRoastContext.yourScore}. Now here comes the second one.`;
  }
  if (priorJudgeReactions.length > 0) {
    const others = priorJudgeReactions.map(r => `${r.name} gave it a ${r.score}`).join(', ');
    situationContext += `\n\n${others} already scored this one.`;
  }

  // Extract just the core personality (first paragraph) - skip the template examples
  const personalityCore = judge.personality.split('\n\n')[0];

  // Method acting system prompt - "You ARE the character"
  const systemPrompt = `You ARE ${judge.name} ${judge.emoji}. Not playing them. You ARE them.

You're at a roast battle called ROAST MORTEM. Dead people get roasted. It's a whole thing.

${personalityCore}

Score range: ${judge.scoreRange[0]}-${judge.scoreRange[1]}. That's your lane.

Did the joke land? Was it funny? That's all that matters. React like you're actually there watching someone try to be funny. Not like a judge giving notes — like YOU, hearing a joke.

Go off. Be yourself. The reaction IS the entertainment.`;

  // User prompt with Option B ghost framing - "details don't matter"
  const userPrompt = `Tonight's target is some dead person. The details don't matter — what matters is they're dead and people are lining up to roast them.

For context: ${ghostContext}
${situationContext}
---

${roasterEmoji} ${roasterName} grabs the mic:

"${roast}"

---

React as ${judge.name}. Did it land? Score it ${judge.scoreRange[0]}-${judge.scoreRange[1]}.

{"name":"${judge.name}","score":N,"reaction":"..."}`;

  const data = await callOpenAI({
    model: 'gpt-5.2',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    max_completion_tokens: 300,
    temperature: 0.9
  });

  if (data.error) {
    throw new Error(data.error.message);
  }

  const text = data.choices?.[0]?.message?.content || '';
  const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());

  return parsed;
}

// V3 Hybrid: Single call for all 3 judges + banter
// Combines method acting character blocks with efficient single-call architecture
export async function getJudgePanelResponse(judges, ghostContext, roasterName, roasterEmoji, roast, isSecondRoast, firstRoastContext) {

  // Build judge personality blocks (static, cacheable)
  const judgeBlocks = judges.map((judge, i) => {
    return `=== JUDGE ${i + 1}: ${judge.name.toUpperCase()} ${judge.emoji} ===
You ARE ${judge.name}. ${judge.personality}
Score range: ${judge.scoreRange[0]}-${judge.scoreRange[1]}`;
  }).join('\n\n');

  // Build first roast context if this is the second roast
  let contextNote = '';
  if (isSecondRoast && firstRoastContext) {
    contextNote = `\n\nYou already judged ${firstRoastContext.roasterName}'s roast: "${firstRoastContext.roast}"
Your scores were: ${firstRoastContext.scores.map((s, i) => `${judges[i].name}: ${s}`).join(', ')}
Now here comes the second roast. You can compare if it feels natural.`;
  }

  // System prompt with judge blocks (mostly static for caching)
  const systemPrompt = `You are generating reactions from 3 judges at ROAST MORTEM, a roast battle for dead people.

Each judge exists in their own reality. Embody them fully — not parody, not impression. You ARE them.

${judgeBlocks}

---

RULES:
- Each judge reacts in character (1-3 sentences, under 50 words each)
- Reactions should be entertaining — the reaction IS the show
- After all judges react, add 1-3 short banter lines where judges riff on each other
- Return valid JSON only. No markdown, no code blocks.`;

  // User prompt with dynamic content (changes per call)
  const userPrompt = `Tonight's target is some dead person. The details don't matter — what matters is they're dead and people are lining up to roast them.

Context: ${ghostContext}${contextNote}

${roasterEmoji} ${roasterName} grabs the mic:

"${roast}"

---

Return this exact JSON structure:
{
  "judges": [
    {"name": "${judges[0].name}", "emoji": "${judges[0].emoji}", "score": N, "reaction": "..."},
    {"name": "${judges[1].name}", "emoji": "${judges[1].emoji}", "score": N, "reaction": "..."},
    {"name": "${judges[2].name}", "emoji": "${judges[2].emoji}", "score": N, "reaction": "..."}
  ],
  "banter": [
    "JudgeName: line",
    "JudgeName: line"
  ]
}`;

  const data = await callOpenAI({
    model: 'gpt-5.2',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    max_completion_tokens: 600,
    temperature: 0.9
  });

  if (data.error) {
    throw new Error(data.error.message);
  }

  const text = data.choices?.[0]?.message?.content || '';
  const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());

  return parsed;
}

// Legacy function - judges both roasts at once (kept for reference)
export async function getJudgeResponse(judge, ghostContext, priorReactions, playerInsult, aiInsult, opponent) {
  // Build context from prior judges
  let priorContext = '';
  let interJudgeInstruction = '';
  if (priorReactions.length > 0) {
    priorContext = `\n\n---\n\nPRIOR JUDGES HAVE SPOKEN:\n\n`;
    priorContext += priorReactions.map(r =>
      `${r.name}: "${r.reaction}" (Player: ${r.playerScore}, ${opponent.name}: ${r.aiScore})`
    ).join('\n');

    interJudgeInstruction = `\n\nCONTEXT: You just heard ${priorReactions.map(r => r.name).join(' and ')} give their takes. You CAN reference their reaction if it feels natural—agree, disagree, or be confused by it. But you don't have to. React authentically to the ROASTS first; only mention other judges if your character would.`;
  }

  // Build catchphrases and actions strings if available
  const catchphrasesStr = judge.catchphrases ? `\nYOUR SIGNATURE PHRASES (use naturally): ${judge.catchphrases.join(', ')}` : '';
  const actionsStr = judge.actions ? `\nYOUR PHYSICAL COMEDY (use sparingly for emphasis): ${judge.actions.join(', ')}` : '';

  const systemPrompt = `You are ${judge.name} ${judge.emoji}, a judge on "THE GHOST ROAST" — a comedy roast battle where two contestants craft insults about a deceased person.

YOUR PERSONALITY AND VOICE:
${judge.personality}
${catchphrasesStr}
${actionsStr}

YOUR SCORE RANGE: ${judge.scoreRange[0]}-${judge.scoreRange[1]} (STAY WITHIN THIS RANGE)

HOW TO JUDGE - Consider the COMPLETE joke:
1. IS IT FUNNY? Does the full sentence land as a joke? Would it get laughs?
2. DOES IT ROAST THE GHOST? Does it actually insult THIS specific ghost given their bio?
3. FLOW & TIMING - Does it read well? Is there a satisfying punchline or payoff?
4. CLEVERNESS - Any wordplay, unexpected twists, or smart connections to the ghost's life/death?

CRITICAL:
- BE ENTERTAINING FIRST. Your reaction should make the audience laugh.
- Judge the OVERALL joke, not individual word choices
- A joke can have good words but still not land — and vice versa
- Stay COMPLETELY in character with your speech patterns
- Your reaction should be 15-30 words, punchy and entertaining
- You can use ONE action per reaction for physical comedy (e.g., *puffs cigar*)
- React to whichever roast impressed (or disappointed) you more${interJudgeInstruction}`;

  const userPrompt = `${ghostContext}${priorContext}

---

Read both roasts. Which one is FUNNIER as a complete joke? Which one actually LANDS?

Give your judgment in character. React to the jokes, not just the words.

Return ONLY this JSON (no markdown, no code blocks):
{"name":"${judge.name}","playerScore":N,"aiScore":N,"reaction":"your in-character reaction here"}`;

  const data = await callOpenAI({
    model: 'gpt-5.2',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    max_completion_tokens: 300
  });

  if (data.error) {
    throw new Error(data.error.message);
  }

  const text = data.choices?.[0]?.message?.content || '';
  const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());

  return parsed;
}
