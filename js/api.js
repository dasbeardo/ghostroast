// OpenAI API integration
import { state, PROXY_URL } from './state.js';

// Helper to make API calls (handles both direct and proxy modes)
async function callOpenAI(body, retries = 2) {
  const endpoint = PROXY_URL || 'https://api.openai.com/v1/chat/completions';
  const headers = PROXY_URL
    ? { 'Content-Type': 'application/json', 'X-Access-Password': state.accessPassword }
    : { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.apiKey}` };

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      return await res.json();
    } catch (err) {
      console.warn(`API attempt ${attempt + 1} failed:`, err.message);
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1))); // Backoff
      } else {
        throw err;
      }
    }
  }
}

// Safe JSON parse with fallback
function safeParseJSON(text) {
  try {
    // Strip markdown code fences if present
    const cleaned = text.replace(/```json|```/g, '').trim();
    return { success: true, data: JSON.parse(cleaned) };
  } catch (err) {
    console.error('JSON parse failed:', err.message);
    console.log('Raw text was:', text);
    return { success: false, error: err.message, raw: text };
  }
}

// Build dynamic scoring rules based on target
function buildScoringRules(target, judges) {
  const targetType = target?.type || 'ghost';

  // Base rules that always apply
  let rules = `CRITICAL SCORING RULES:
1. NON-SEQUITURS GET PUNISHED: If a joke makes no logical sense or the punchline doesn't land, CALL IT OUT and score low.
2. USE YOUR FULL RANGE: A score of 5-6 is mediocre. Reserve 7+ for jokes that actually made you react. Give 3 or below for bad jokes.
3. BE HONEST: If you would groan or cringe, say so. If you would laugh, show it.
`;

  // Target-specific scoring rules
  switch (targetType) {
    case 'ghost':
      rules += `4. GHOST CONNECTION MATTERS: This roast targets the GHOST. Judge how well it connects to their specific traits, bio, or cause of death. Generic jokes that could apply to anyone score lower.`;
      break;

    case 'self':
      rules += `4. SELF-DEPRECATION: This roast is the comedian making fun of THEMSELVES. Ghost connection is NOT required. Judge the self-deprecation on its wit and delivery. Max score around 7-8 unless exceptionally clever - going after yourself is safe but limited.`;
      break;

    case 'judge':
      const targetJudge = judges.find(j => j.name === target.name);
      rules += `4. JUDGE TARGETING: This roast targets ${target.name.toUpperCase()} directly! Ghost connection is NOT required. `;
      if (targetJudge?.whenTargeted) {
        rules += `${target.name} is ${targetJudge.whenTargeted.disposition} when targeted. `;
        rules += targetJudge.whenTargeted.reactionHint;
        if (targetJudge.whenTargeted.bonusIfLands) {
          rules += ` Potential bonus: +${targetJudge.whenTargeted.bonusIfLands} if it lands.`;
        }
        if (targetJudge.whenTargeted.penaltyIfFlops) {
          rules += ` Potential penalty: ${targetJudge.whenTargeted.penaltyIfFlops} if it flops.`;
        }
      }
      rules += ` The targeted judge should react PERSONALLY. Other judges react to the drama.`;
      break;

    case 'opponent':
      rules += `4. OPPONENT TARGETING: This roast is trash-talk aimed at THE OTHER ROASTER, not the ghost. Ghost connection is NOT required. Judge based on wit and audacity. This is bold but risky - cap around 8 unless brilliant.`;
      break;

    case 'mort':
      rules += `4. HOST TARGETING: This roast goes after MORT THE HOST! Ghost connection is NOT required. Mort is a professional who secretly loves attention. Judge the audacity and cleverness. React to the boldness of going after the host.`;
      break;

    case 'destiny':
      rules += `4. DESTINY TARGETING: This roast targets DESTINY THE MYSTIC who picked the judges! Ghost connection is NOT required. This is dangerous territory. React with amusement or concern about supernatural retaliation. She may prophesy their failures.`;
      break;
  }

  return rules;
}

// Build targeting context note (brief, for user prompt)
function buildTargetNote(target, judges) {
  if (!target || target.type === 'ghost') {
    return 'Target: The Ghost (standard roast)';
  }

  switch (target.type) {
    case 'self':
      return '🎯 Target: SELF (self-deprecating humor)';
    case 'judge':
      return `🎯 Target: ${target.name.toUpperCase()} (the judge!)`;
    case 'opponent':
      return '🎯 Target: THE OPPONENT (trash talk)';
    case 'mort':
      return '🎯 Target: MORT THE HOST (bold move!)';
    case 'destiny':
      return '🎯 Target: DESTINY THE MYSTIC (dangerous!)';
    default:
      return '';
  }
}

// V3 Panel Judging: Single call for all 3 judges + banter
export async function getJudgePanelResponse(judges, ghostContext, roasterName, roasterEmoji, roast, isSecondRoast, firstRoastContext, target = null) {

  const targetType = target?.type || 'ghost';
  const isGhostTarget = targetType === 'ghost';

  console.group('🎭 API CALL: Judge Panel Response');
  console.log('Judges:', judges.map(j => j.name));
  console.log('Target Type:', targetType);
  console.log('Ghost Context:', isGhostTarget ? ghostContext : '(not sent - not targeting ghost)');
  console.log('Roaster:', roasterName, roasterEmoji);
  console.log('Roast:', roast);
  console.log('Is Second Roast:', isSecondRoast);
  if (firstRoastContext) console.log('First Roast Context:', firstRoastContext);

  // Build judge personality blocks with targeting info
  const judgeBlocks = judges.map((judge, i) => {
    let block = `=== JUDGE ${i + 1}: ${judge.name.toUpperCase()} ${judge.emoji} ===
You ARE ${judge.name}. ${judge.personality}
Score range: ${judge.scoreRange[0]}-${judge.scoreRange[1]}`;

    // Add targeting disposition if this judge is targeted
    if (target?.type === 'judge' && target.name === judge.name && judge.whenTargeted) {
      block += `\n\n🎯 YOU ARE BEING TARGETED BY THIS ROAST! React personally! Disposition: ${judge.whenTargeted.disposition}. ${judge.whenTargeted.reactionHint}`;
    }

    return block;
  }).join('\n\n');

  // Build first roast context if this is the second roast
  let comparisonNote = '';
  if (isSecondRoast && firstRoastContext) {
    comparisonNote = `

═══ FIRST ROAST (for comparison) ═══
${firstRoastContext.roasterEmoji} ${firstRoastContext.roasterName} said: "${firstRoastContext.roast}"
Your scores were: ${firstRoastContext.scores.map((s, i) => `${judges[i].name}: ${s}/10`).join(', ')}
${firstRoastContext.target ? `(Targeted: ${firstRoastContext.target.type === 'ghost' ? 'Ghost' : firstRoastContext.target.name || firstRoastContext.target.type})` : ''}

NOW COMPARE: Is this second roast better, worse, or about the same? Your scores should REFLECT the comparison. If the second roast is clearly weaker, score it lower. If it's clearly better, score it higher. Don't be afraid to show the gap.`;
  }

  // Build dynamic scoring rules based on target
  const scoringRules = buildScoringRules(target, judges);

  // Build target note for user prompt
  const targetNote = buildTargetNote(target, judges);

  // System prompt with judge blocks and dynamic scoring rules
  const systemPrompt = `You are generating reactions from 3 celebrity judges at ROAST MORTEM, a comedy roast battle.

${scoringRules}

Each judge exists in their own reality. Embody them fully — not parody, not impression. You ARE them.

${judgeBlocks}`;

  // User prompt - only include ghost context if targeting ghost
  let userPrompt;
  if (isGhostTarget) {
    userPrompt = `Tonight's ghost is being roasted. The ghost's details ARE IMPORTANT — good roasts reference them specifically.

═══ GHOST CONTEXT ═══
${ghostContext}
═══════════════════${comparisonNote}

${targetNote}

═══ THE ROAST ═══
${roasterEmoji} ${roasterName} grabs the mic:

"${roast}"

---

React as each judge IN CHARACTER. Be specific about what worked or didn't. If the joke was nonsense, say so! If it brilliantly connected to the ghost, praise it!`;
  } else {
    // Non-ghost target - don't emphasize ghost connection
    userPrompt = `Tonight at ROAST MORTEM, we have an unusual situation...${comparisonNote}

${targetNote}

${targetType === 'self' ? 'The roaster is going after THEMSELVES with self-deprecating humor.' :
  targetType === 'judge' ? `The roaster is going after ${target.name} - one of YOU, the judges!` :
  targetType === 'opponent' ? 'The roaster is trash-talking their OPPONENT instead of the ghost.' :
  targetType === 'mort' ? 'The roaster is going after MORT THE HOST. Bold move!' :
  targetType === 'destiny' ? 'The roaster is targeting DESTINY THE MYSTIC. Risky business!' : ''}

(For context, there IS a ghost tonight: ${ghostContext} - but this joke isn't aimed at them.)

═══ THE ROAST ═══
${roasterEmoji} ${roasterName} grabs the mic:

"${roast}"

---

React as each judge IN CHARACTER. Judge this on its intended target, not ghost connection. Be specific about what worked or didn't!`;
  }

  userPrompt += `

Return valid JSON only:
{
  "judges": [
    {"name": "${judges[0].name}", "emoji": "${judges[0].emoji}", "score": N, "reaction": "3-5 sentences in character. Be specific about what worked/didn't."},
    {"name": "${judges[1].name}", "emoji": "${judges[1].emoji}", "score": N, "reaction": "3-5 sentences in character. Be specific about what worked/didn't."},
    {"name": "${judges[2].name}", "emoji": "${judges[2].emoji}", "score": N, "reaction": "3-5 sentences in character. Be specific about what worked/didn't."}
  ],
  "banter": [
    "Judge Name: 1-2 lines reacting to another judge's take or the overall vibe",
    "Another Judge: responds or adds something"
  ]
}`;

  const requestBody = {
    model: 'gpt-5.2',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    max_completion_tokens: 1000,
    temperature: 0.9
  };

  console.log('📤 Request Body:', requestBody);

  const data = await callOpenAI(requestBody);

  console.log('📥 Raw API Response:', data);

  if (data.error) {
    console.error('❌ API Error:', data.error);
    console.groupEnd();
    throw new Error(data.error.message);
  }

  const text = data.choices?.[0]?.message?.content || '';
  console.log('📝 Response Text:', text);

  const parseResult = safeParseJSON(text);

  if (!parseResult.success) {
    console.error('❌ JSON Parse Failed:', parseResult.error);
    console.groupEnd();
    // Return fallback response instead of crashing
    return {
      judges: judges.map((j, i) => ({
        name: j.name,
        emoji: j.emoji,
        score: Math.floor((j.scoreRange[0] + j.scoreRange[1]) / 2),
        reaction: "Technical difficulties... *adjusts earpiece* Let's just say it was... something."
      })),
      banter: ["Someone: The teleprompter broke again."]
    };
  }

  console.log('✅ Parsed Response:', parseResult.data);
  console.groupEnd();

  return parseResult.data;
}

// Generate AI opponent's roast
export async function generateAIRoast(template, wordPools, ghost, opponentName) {
  console.group('🤖 AI ROAST GENERATION');
  console.log('Template:', template);
  console.log('Ghost:', ghost?.name);

  const ghostContext = ghost
    ? `${ghost.name} ${ghost.emoji} - ${ghost.bio?.join(' ') || 'A mysterious deceased person.'}`
    : 'A generic ghost';

  const poolDescriptions = Object.entries(wordPools || {})
    .slice(0, 5)
    .map(([name, pool]) => {
      const words = Array.isArray(pool) ? pool : pool.base || [];
      return `${name}: ${words.slice(0, 8).join(', ')}...`;
    })
    .join('\n');

  const systemPrompt = `You are ${opponentName}, an AI comedian competing in a roast battle. Generate a completed roast using the given template.`;

  const userPrompt = `Complete this roast template by filling in the blanks with funny words/phrases.

GHOST BEING ROASTED:
${ghostContext}

TEMPLATE: ${template?.template || "You're like [BLANK] — [BLANK]"}

WORD POOLS (for inspiration, but you can use your own words):
${poolDescriptions}

Return ONLY valid JSON:
{
  "filledSlots": ["word1", "word2"],
  "roast": "The complete roast with blanks filled in"
}`;

  const requestBody = {
    model: 'gpt-5.2',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    max_completion_tokens: 200,
    temperature: 1.0
  };

  const data = await callOpenAI(requestBody);

  if (data.error) {
    console.error('❌ AI Roast Error:', data.error);
    console.groupEnd();
    throw new Error(data.error.message);
  }

  const text = data.choices?.[0]?.message?.content || '';
  const parseResult = safeParseJSON(text);

  if (!parseResult.success) {
    console.error('❌ AI Roast Parse Failed');
    console.groupEnd();
    // Fallback
    return {
      filledSlots: ['something boring', 'predictable'],
      roast: `"You're like something boring — predictably disappointing."`
    };
  }

  console.log('✅ AI Roast:', parseResult.data);
  console.groupEnd();

  return parseResult.data;
}

// Generate AI opponent's target choice
export async function generateAITarget(judges, ghost, destinyUsed = false) {
  // Weighted random: 70% ghost, 15% random judge, 10% opponent, 5% self
  const roll = Math.random();

  if (roll < 0.70) {
    return { type: 'ghost' };
  } else if (roll < 0.85) {
    // Pick a random judge
    const judge = judges[Math.floor(Math.random() * judges.length)];
    return { type: 'judge', name: judge.name, emoji: judge.emoji };
  } else if (roll < 0.95) {
    return { type: 'opponent' };
  } else {
    return { type: 'self' };
  }
}
