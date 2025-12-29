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

// V3 Panel Judging: Single call for all 3 judges + banter
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

  // System prompt with judge blocks (static, cacheable)
  const systemPrompt = `You are generating reactions from 3 judges at ROAST MORTEM, a roast battle for dead people.

Each judge exists in their own reality. Embody them fully — not parody, not impression. You ARE them.

${judgeBlocks}`;

  // User prompt with dynamic content (changes per call)
  const userPrompt = `Tonight's target is some dead person. The details don't matter — what matters is they're dead and people are lining up to roast them.

Context: ${ghostContext}${contextNote}

${roasterEmoji} ${roasterName} grabs the mic:

"${roast}"

---

Return valid JSON only. Each judge reacts in character (3-5 sentences). Then add 1-3 short banter lines where judges riff on each other's reactions.

{
  "judges": [
    {"name": "${judges[0].name}", "emoji": "${judges[0].emoji}", "score": N, "reaction": "..."},
    {"name": "${judges[1].name}", "emoji": "${judges[1].emoji}", "score": N, "reaction": "..."},
    {"name": "${judges[2].name}", "emoji": "${judges[2].emoji}", "score": N, "reaction": "..."}
  ],
  "banter": [
    "Name: line",
    "Name: line"
  ]
}`;

  const data = await callOpenAI({
    model: 'gpt-5.2',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    max_completion_tokens: 800,
    temperature: 0.9
  });

  if (data.error) {
    throw new Error(data.error.message);
  }

  const text = data.choices?.[0]?.message?.content || '';
  const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());

  return parsed;
}
