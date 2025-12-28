// OpenAI API integration
import { state } from './state.js';

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

  const systemPrompt = `You are ${judge.name} ${judge.emoji}, a judge on "THE GHOST ROAST" — a comedy roast battle where two contestants craft insults about a deceased person.

YOUR PERSONALITY AND VOICE:
${judge.personality}

YOUR SCORE RANGE: ${judge.scoreRange[0]}-${judge.scoreRange[1]} (STAY WITHIN THIS RANGE)

HOW TO JUDGE - Consider the COMPLETE joke:
1. IS IT FUNNY? Does the full sentence land as a joke? Would it get laughs?
2. DOES IT ROAST THE GHOST? Does it actually insult THIS specific ghost given their bio?
3. FLOW & TIMING - Does it read well? Is there a satisfying punchline or payoff?
4. CLEVERNESS - Any wordplay, unexpected twists, or smart connections to the ghost's life/death?

CRITICAL:
- Judge the OVERALL joke, not individual word choices
- A joke can have good words but still not land — and vice versa
- Stay COMPLETELY in character with your speech patterns
- Your reaction should be 15-25 words, punchy and entertaining
- React to whichever roast impressed (or disappointed) you more${interJudgeInstruction}`;

  const userPrompt = `${ghostContext}${priorContext}

---

Read both roasts. Which one is FUNNIER as a complete joke? Which one actually LANDS?

Give your judgment in character. React to the jokes, not just the words.

Return ONLY this JSON (no markdown, no code blocks):
{"name":"${judge.name}","playerScore":N,"aiScore":N,"reaction":"your in-character reaction here"}`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${state.apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 300
    })
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  const text = data.choices?.[0]?.message?.content || '';
  const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());

  return parsed;
}
