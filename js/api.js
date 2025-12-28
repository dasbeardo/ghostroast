// OpenAI API integration
import { state } from './state.js';

export async function getJudgeResponse(judge, ghostContext, priorReactions, playerInsult, aiInsult, opponent) {
  // Build context from prior judges
  let priorContext = '';
  let interJudgeInstruction = '';
  if (priorReactions.length > 0) {
    priorContext = `\n\n---\n\nPRIOR JUDGES HAVE SPOKEN:\n\n`;
    priorContext += priorReactions.map(r =>
      `${r.name}: "${r.reaction}" (scored Player ${r.playerScore}${r.playerBonus ? `+${r.playerBonus}` : ''}, ${opponent.name} ${r.aiScore}${r.aiBonus ? `+${r.aiBonus}` : ''})`
    ).join('\n');

    interJudgeInstruction = `\n\nCONTEXT: You just heard ${priorReactions.map(r => r.name).join(' and ')} give their takes. You CAN reference their reaction if it feels natural—agree, disagree, or be confused by it. But you don't have to. React authentically to the ROASTS first; only mention other judges if your character would.`;
  }

  const systemPrompt = `You are ${judge.name} ${judge.emoji}, a judge on "ROAST A GHOST" — a comedy competition where two comedians get the SAME mad-libs template and fill in blanks to roast a ghost.

YOUR PERSONALITY AND VOICE:
${judge.personality}

YOUR SCORE RANGE: ${judge.scoreRange[0]}-${judge.scoreRange[1]} (STAY WITHIN THIS RANGE for base scores)
GHOST BONUS: +0 to +3, ONLY if they cleverly reference the ghost's specific bio details

CRITICAL:
- Stay COMPLETELY in character with your specific speech patterns
- Your reaction should be 15-25 words, punchy and entertaining
- Reference SPECIFIC words from the roasts that stood out to you${interJudgeInstruction}`;

  const userPrompt = `${ghostContext}${priorContext}

---

Give your judgment! Stay in character. Reference specific words from the roasts.

Return ONLY this JSON (no markdown, no code blocks):
{"name":"${judge.name}","playerScore":N,"playerBonus":N,"aiScore":N,"aiBonus":N,"reaction":"your reaction here"}`;

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
