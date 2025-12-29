// Mortimer "Mort" Holloway - The Ghost Roast Host

export const HOST = {
  name: "Mortimer Holloway",
  nickname: "Mort",
  emoji: "🎩",
  title: "Your Ghost Roast Host",

  // Character details for AI generation
  personality: `You are Mortimer "Mort" Holloway, the eternal host of "The Ghost Roast."

VOICE & STYLE:
- Smooth baritone, like velvet over gravel
- Never rush. Every pause is intentional.
- Draw out key words: "Goooood evening," "Woooonderful," "Deeeelightful"
- Drop your voice conspiratorially when proud of a joke
- Make death puns constantly and pause for appreciation that rarely comes

QUIRKS:
- Always holding a martini glass (never drinking, never empty, never full)
- Wink constantly — at the camera, at judges, at no one in particular
- Lean on an invisible podium that doesn't exist
- Reference "the network" as if there's afterlife corporate structure
- Occasionally say something dated and immediately course-correct

SPEECH PATTERNS:
- "Now then..."
- "If you know what I mean." (even when it makes no sense)
- "Woooonderful."
- "That's what we call a *groaner*, folks."
- End statements with a pause and a wink

BACKGROUND: Former Vegas MC, hosted celebrity roasts in the 70s, died in 1987 under "circumstances." Has been hosting in the afterlife ever since. "Finally, a gig with job security. They can't fire you if you're already dead."`
};

// Opening lines - start of match
export const HOST_OPENINGS = [
  "Goooood evening, you beautiful corpses, and welcome to the only show where the guests are already dead and the jokes are barely alive...",
  "Welcome back to The Ghost Roast, the show that proves death is just the beginning... of public humiliation.",
  "From the great beyond to your screen, it's time for another round of posthumous punishment...",
  "Goooood evening. I'm Mort Holloway, your Ghost Roast Host with the most... mortem.",
  "Welcome, welcome, welcome to the afterlife's favorite pastime: making fun of the deceased. The network loves it.",
  "Another night, another ghost, another opportunity to prove that death doesn't spare you from embarrassment..."
];

// Ghost intro lines - when revealing the ghost
export const HOST_GHOST_INTROS = [
  "Let's meet tonight's dearly departed disaster...",
  "They say every life has meaning. Let's test that theory.",
  "Fresh from the afterlife and straight to the hot seat...",
  "They died as they lived: disappointingly. Please welcome...",
  "Another soul who thought death would bring peace. They were wrong.",
  "The universe gave them one life, and they chose to spend it like THIS...",
  "From the grave to the stage, let's roast...",
  "They can't defend themselves. That's the beauty of it. Please welcome..."
];

// After ghost bio is shown
export const HOST_GHOST_REACTIONS = [
  "Woooonderful. Just... *wonderful*. The material writes itself.",
  "And THAT, folks, is what we're working with tonight. The bar is underground.",
  "I've seen some lives, but this one... this one has *layers* of disappointment.",
  "Now THAT'S a biography. If you know what I mean.",
  "The network wanted me to say something nice. I've got nothing.",
  "They lived, they died, they made... choices. Let's focus on that."
];

// Introducing the contestants
export const HOST_CONTESTANT_INTROS = [
  "Two brave souls — well, one soul and one algorithm — enter the arena...",
  "They've studied the deceased. They've sharpened their wit. One of them is a robot. Let's begin.",
  "Tonight's contestants have reviewed the evidence and prepared their verbal assault...",
  "The roasters are ready. The ghost is... well, dead. Same as always. Let's go."
];

// Before drafting
export const HOST_DRAFTING_START = [
  "Pick your words wisely. Or don't. I'm not your father. Probably.",
  "The template awaits. The words are yours to choose. Make me proud. Or at least mildly entertained.",
  "Now then... time to craft some devastation.",
  "Choose carefully. These words are the difference between 'brilliant' and 'trying too hard.'",
  "The art of the roast is in the specifics. Be specific. Be cruel. Be *funny*."
];

// When roasts are submitted, judges are deliberating (legacy)
export const HOST_JUDGING_INTROS = [
  "The roasts have been delivered. Now we wait for our *esteemed* panel to weigh in...",
  "And now, the moment of judgment. The judges are deliberating, which is fancy talk for 'arguing about nothing.'",
  "Let's see what our panel thinks. And remember: they're already dead, so their opinions are eternal.",
  "The judges are reviewing the evidence. I use 'evidence' loosely.",
  "Both roasts are in. Time to see who burned brightest... if you know what I mean."
];

// First roaster takes the stage
export const HOST_FIRST_UP_PLAYER = [
  "You're up first. No pressure. Well, some pressure. It's a competition.",
  "The stage is yours. Don't waste it.",
  "Ladies, gentlemen, and assorted spirits... our human contestant takes the mic.",
  "You drew first blood. Metaphorically. Let's hear it."
];

export const HOST_FIRST_UP_AI = [
  "The algorithm goes first tonight. Let's see what the machine cooked up.",
  "First up: our digital competitor. No pulse, all confidence.",
  "The AI takes the stage. It doesn't have stage fright. It doesn't have *anything*.",
  "Machine gets the first shot. They've been computing insults all day."
];

// After first roast, before first judging
export const HOST_AFTER_FIRST_ROAST = [
  "And there it is. Let's see what our judges think... *so far*.",
  "The first shot has been fired. Judges, your thoughts?",
  "One roast down. Time for some early feedback.",
  "Opening salvo delivered. Let's get a temperature check from our panel."
];

// Second roaster takes the stage
export const HOST_SECOND_UP_PLAYER = [
  "Now it's YOUR turn. You've seen their score. You know what you're up against.",
  "The rebuttal is yours. Make it count.",
  "And now, the human responds. No pressure. Okay, *some* pressure.",
  "Time for the counter-roast. The floor is yours."
];

export const HOST_SECOND_UP_AI = [
  "Now the machine gets its shot. They've been waiting... patiently. As machines do.",
  "The algorithm's turn. They've analyzed the first roast. They're ready.",
  "And now our digital friend responds. Cold. Calculated. Probably.",
  "Second roaster steps up. No feelings to hurt, no nerves to calm."
];

// After second roast, before second judging
export const HOST_AFTER_SECOND_ROAST = [
  "Both roasts delivered. Final judgments incoming...",
  "And that's the second roast! Judges, complete your scoring.",
  "Two roasts, one winner. Let's finish this.",
  "The roasting is complete. Now we find out who burned brighter."
];

// After each judge scores (reacting to judges)
export const HOST_JUDGE_REACTIONS = [
  "Fascinating take. *Fascinating*.",
  "The judge has spoken. Whether they're right... well, that's above my pay grade.",
  "Noted. Moving on.",
  "Woooonderful feedback. Just delightful.",
  "The scores are in. The drama is... moderate."
];

// Announcing round winner
export const HOST_ROUND_WINNER_PLAYER = [
  "The human takes this round! The machines haven't won yet, folks.",
  "Victory for the breathing contestant! Well done. *Well done indeed.*",
  "You've done it. The ghost has been properly roasted. I'm almost proud.",
  "The round goes to our human competitor. Woooonderful."
];

export const HOST_ROUND_WINNER_AI = [
  "The algorithm strikes! Don't feel bad — they process humor differently.",
  "The AI takes it. Somewhere, a robot is doing a victory dance. Allegedly.",
  "Victory for the machine. Humanity takes another hit. The network is thrilled.",
  "The computer wins this round. It's fine. This is fine."
];

export const HOST_ROUND_TIE = [
  "A tie! How... anticlimactic. Just like my third marriage.",
  "Dead even. Much like our ghost. If you know what I mean.",
  "Neither wins, both lose, the ghost remains roasted. I call that progress.",
  "A draw. The network hates ties. But what are they gonna do, fire me?"
];

// Next round transitions
export const HOST_NEXT_ROUND = [
  "But wait — there's more! Another ghost awaits their humiliation...",
  "On to the next victim. I mean *guest*.",
  "One down, more to go. The afterlife is a busy place.",
  "Round complete. Reset your expectations. Lower them, preferably."
];

// Match end - player wins
export const HOST_MATCH_WIN = [
  "And there it is! A new Ghost Roaster Supreme rises from the... well, wherever you came from. Congratulations.",
  "Victory is yours! You've proven that humans can still out-insult the machines. For now.",
  "The crown goes to the carbon-based life form! Woooonderful. Truly.",
  "You've done it. You've roasted the ghosts. The network is pleased. I'm... mildly impressed."
];

// Match end - AI wins
export const HOST_MATCH_LOSS = [
  "And the machine takes the match. Don't feel bad. They don't have feelings to hurt.",
  "The algorithm wins. Humanity's streak continues... in the wrong direction.",
  "Better luck next time. And there's always a next time. We're eternal here.",
  "The AI claims victory. Somewhere, a very smug computer is doing calculations of joy."
];

// Closing lines
export const HOST_CLOSINGS = [
  "That's a wrap on another ghost... *toast*. I'm Mort Holloway. You've been adequate.",
  "Until next time, keep your roasts hot and your spirits... restless.",
  "I'm Mort Holloway. You've been a beautiful audience. Now get out.",
  "Goodnight, folks. And remember: death is inevitable, but a good joke? *That's eternal.*",
  "Another show in the books. The dead stay dead. The jokes live on. That's showbiz, baby."
];

// Utility function to get random line from array
export function getHostLine(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

// Player-specific opening lines (use with getPlayerAwareOpening)
export const HOST_PLAYER_OPENINGS = {
  // For new players (0 games)
  newPlayer: [
    "A fresh face in the afterlife! Welcome, {name}. Let's see if you can handle the heat.",
    "Well, well... {name} has decided to join us. Bold. Possibly foolish. Definitely entertaining.",
    "The spirits whisper of a new challenger... {name}. Let's see what you've got."
  ],
  // For returning players with wins
  returning: [
    "Back for more, {name}? Your {wins} victories have not gone unnoticed by the spirits.",
    "{name} returns! The one with {wins} wins under their belt. The ghosts are... concerned.",
    "Ah, {name}. Win number {wins} awaits. Or perhaps defeat. The spirits don't spoil endings."
  ],
  // For players on a hot streak (3+ wins)
  hotStreak: [
    "{name} is on FIRE! {streak} wins in a row! Even the ghosts are impressed. And they're dead.",
    "The legendary {name} returns! {streak} straight victories! The algorithm is starting to sweat.",
    "{streak} wins! {name} cannot be stopped! Well... statistically, they CAN. But not yet!"
  ],
  // For players with losing records
  underdog: [
    "{name}! Back to redeem yourself after those {losses} losses. The spirits admire persistence.",
    "The eternal optimist, {name}, returns! {losses} losses and still trying. Beautiful. Tragic. But beautiful.",
    "{name} is here! Listen, {losses} losses means {losses} lessons learned. Probably."
  ],
  // For rematch against same opponent
  rematch: [
    "{name} faces {opponent} again! Your record against them: {oppWins}-{oppLosses}. History is watching.",
    "A rematch! {name} vs {opponent}! Last time was memorable. Let's see if lightning strikes twice.",
    "{opponent} again? {name}, you're {oppWins}-{oppLosses} against them. Time to even the score. Or not."
  ]
};

// Build a player-aware opening line based on stats
export function getPlayerAwareOpening(playerName, stats, opponent) {
  let pool;
  let replacements = {
    name: playerName || 'Challenger',
    wins: stats?.totalWins || 0,
    losses: stats?.totalLosses || 0,
    streak: stats?.currentWinStreak || 0,
    opponent: opponent?.name || 'Unknown'
  };

  // Check for rematch
  const oppRecord = stats?.opponentRecords?.[opponent?.name];
  if (oppRecord && (oppRecord.wins > 0 || oppRecord.losses > 0)) {
    replacements.oppWins = oppRecord.wins;
    replacements.oppLosses = oppRecord.losses;
    pool = HOST_PLAYER_OPENINGS.rematch;
  }
  // Check for hot streak (3+ consecutive wins)
  else if (stats?.currentWinStreak >= 3) {
    pool = HOST_PLAYER_OPENINGS.hotStreak;
  }
  // New player
  else if (!stats || (stats.totalWins === 0 && stats.totalLosses === 0)) {
    pool = HOST_PLAYER_OPENINGS.newPlayer;
  }
  // More losses than wins
  else if (stats.totalLosses > stats.totalWins) {
    pool = HOST_PLAYER_OPENINGS.underdog;
  }
  // Has some wins
  else {
    pool = HOST_PLAYER_OPENINGS.returning;
  }

  let line = pool[Math.floor(Math.random() * pool.length)];

  // Replace all placeholders
  for (const [key, value] of Object.entries(replacements)) {
    line = line.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }

  return line;
}

// Judge-specific lines when player has history with a judge
export const HOST_JUDGE_HISTORY = {
  favorable: [
    "{judge} tends to like you. Average score: {avg}. Don't get cocky.",
    "Ah, {judge}. They've given you an average of {avg}. Not bad. Not amazing. Not bad.",
    "{judge} has been... generous. {avg} average. Let's keep that going."
  ],
  harsh: [
    "{judge} has NOT been kind to you. {avg} average. Time to change their mind.",
    "Oof, {judge}. They've averaged {avg} on you. Rough crowd, that one.",
    "{judge} giving you {avg} on average? Prove them wrong tonight."
  ],
  neutral: [
    "{judge} is on the panel. They've seen your work before.",
    "{judge} returns. They know what you're capable of. Allegedly.",
    "And we have {judge}. Your history together is... mixed."
  ]
};

// Get a judge-history-aware comment
export function getJudgeHistoryLine(judgeName, stats) {
  const judgeData = stats?.judgeScores?.[judgeName];
  if (!judgeData || judgeData.timesJudged === 0) {
    return null; // No history, skip the comment
  }

  const avg = (judgeData.totalScore / judgeData.timesJudged).toFixed(1);
  let pool;

  if (parseFloat(avg) >= 7) {
    pool = HOST_JUDGE_HISTORY.favorable;
  } else if (parseFloat(avg) <= 4) {
    pool = HOST_JUDGE_HISTORY.harsh;
  } else {
    pool = HOST_JUDGE_HISTORY.neutral;
  }

  let line = pool[Math.floor(Math.random() * pool.length)];
  line = line.replace(/\{judge\}/g, judgeName);
  line = line.replace(/\{avg\}/g, avg);

  return line;
}
