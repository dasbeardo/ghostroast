# Roast a Ghost - Web App Conversion Spec

## Overview

**Roast a Ghost** is a comedy game where players compete against an AI opponent to craft the best roast of a "ghost" (a deceased person with a humorous bio). Both players receive the same mad-libs style template and draft words to complete their roast. Three randomly selected judges (powered by Claude API) score the roasts.

This document provides everything needed to convert the existing React prototype into a standalone web application.

---

## Current Architecture

The prototype is a single React component running in Claude's artifact environment. It uses:
- React with hooks (useState)
- Inline styles
- Direct fetch calls to Anthropic API (no API key needed in artifact environment)

---

## Target Architecture

### Tech Stack (Recommended)
- **Frontend**: React + Vite (or Next.js if you want SSR)
- **Styling**: Tailwind CSS (convert inline styles)
- **Backend**: Simple Express server OR Next.js API routes
- **API**: Claude API (claude-sonnet-4-20250514)
- **Deployment**: Vercel, Netlify, or similar

### Why a Backend?
The Anthropic API key cannot be exposed client-side. You need a simple backend endpoint that:
1. Receives the roast data from the client
2. Calls Claude API with the API key server-side
3. Returns the judges' responses

---

## File Structure (Suggested)

```
roast-a-ghost/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Menu.jsx
│   │   ├── GhostIntro.jsx
│   │   ├── Drafting.jsx
│   │   ├── Judging.jsx
│   │   ├── Results.jsx
│   │   └── MatchEnd.jsx
│   ├── data/
│   │   ├── ghosts.js
│   │   ├── judges.js
│   │   ├── templates.js
│   │   └── opponents.js
│   ├── hooks/
│   │   └── useGame.js (game state management)
│   ├── api/
│   │   └── judge.js (API route or service)
│   ├── utils/
│   │   └── shuffle.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/ (if using Express)
│   └── index.js
├── .env
├── package.json
└── README.md
```

---

## Environment Variables

```env
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

---

## API Endpoint

### POST `/api/judge`

**Request Body:**
```json
{
  "ghost": {
    "name": "Gary Pembrook",
    "emoji": "👔",
    "died": "2019 — took a selfie with a bull",
    "bio": ["...", "...", "..."]
  },
  "playerInsult": "Your face looks like...",
  "aiInsult": "Your personality looks like...",
  "opponent": {
    "name": "RoastBot 3000",
    "emoji": "🤖"
  },
  "judges": [
    { "id": "burns", "name": "Professor Burns", "emoji": "🎓", "scoreRange": [4, 8], "personality": "..." },
    // ... 2 more judges
  ]
}
```

**Response:**
```json
{
  "judges": [
    { "name": "Professor Burns", "playerScore": 6, "playerBonus": 1, "aiScore": 5, "aiBonus": 0, "reaction": "..." },
    // ... 2 more
  ]
}
```

---

## Game Flow

```
MENU → START GAME
  ↓
Pick random opponent (from 10)
Pick 3 random judges (from 12)
Set scores to 0-0, round to 1
  ↓
ROUND LOOP (best of 3):
  ↓
  Pick random ghost (no repeats)
  Pick random template
  Generate word pools (6 random from each slot's full list)
  ↓
  GHOST INTRO SCREEN
  Show ghost bio, judges panel
  ↓
  DRAFTING PHASE
  Player clicks blanks, picks words
  AI picks from remaining words after each player pick
  ↓
  SUBMIT TO JUDGES
  Call API with both completed roasts
  ↓
  RESULTS SCREEN
  Show both roasts, judge reactions, scores
  Update match score
  ↓
  If someone has 2 wins → MATCH END
  Else → Next round
  ↓
MATCH END
Show winner, option to play again
```

---

## Game State

```javascript
{
  gameState: 'menu' | 'ghostIntro' | 'drafting' | 'judging' | 'results' | 'matchEnd',
  opponent: { name, emoji },
  judges: [{ id, name, emoji, scoreRange, personality }, ...], // 3 judges
  ghost: { name, emoji, died, bio },
  template: { template, slots },
  wordPools: [[...], [...], ...], // 6 words per slot
  playerSlots: [word | null, ...],
  aiSlots: [word | null, ...],
  activeSlot: number | null,
  scores: { player: 0, ai: 0 },
  round: 1,
  usedGhosts: [name, ...],
  results: { judges, playerInsult, aiInsult, playerTotal, aiTotal, winner } | null,
  loading: false
}
```

---

## Claude API Prompt Structure

### System Prompt
```
You are judging "ROAST A GHOST" — a comedy competition where two comedians get the SAME mad-libs template and fill in blanks to roast a ghost.

THE FORMAT:
- A ghost with a bio appears on stage
- Both comedians get the same template, draft words to fill it
- You judge whose completed roast was funnier

SCORING:
- Base score: Use each judge's SPECIFIC range (this is critical!)
- Ghost Bonus (+0-3): ONLY if they cleverly reference the ghost's specific bio details

TODAY'S JUDGES:

[For each judge, include full personality block with score range]

CRITICAL INSTRUCTIONS:
1. Stay in character! Use their catchphrases and speech patterns
2. RESPECT SCORE RANGES - Nihilist scores 1-5, Hype Beast scores 7-10, etc.
3. Reference SPECIFIC words from the roasts
4. Make reactions punchy and entertaining (under 25 words)
5. Judges should have DIFFERENT opinions - disagreement is good TV!
```

### User Message
```
🎭 TONIGHT'S GHOST:

[emoji] [name]
Died: [died]
• [bio line 1]
• [bio line 2]
• [bio line 3]

---

🎤 THE ROASTS:

PLAYER: "[playerInsult]"

[opponent emoji] [opponent name]: "[aiInsult]"

---

Judges, give your scores and reactions! Be in character, use catchphrases, reference specific words!

Return ONLY this JSON:
{"judges":[
  {"name":"[Judge 1]","playerScore":N,"playerBonus":N,"aiScore":N,"aiBonus":N,"reaction":"..."},
  {"name":"[Judge 2]","playerScore":N,"playerBonus":N,"aiScore":N,"aiBonus":N,"reaction":"..."},
  {"name":"[Judge 3]","playerScore":N,"playerBonus":N,"aiScore":N,"aiBonus":N,"reaction":"..."}
]}
```

---

## Styling Notes

Current design uses:
- Dark purple/black gradient background: `linear-gradient(180deg, #1a1020 0%, #0a0510 100%)`
- Primary accent: `#a855f7` (purple)
- Secondary accent: `#7c3aed` (darker purple)
- Success: `#22c55e` (green)
- Error: `#ef4444` (red)
- Text: `#fff`, `#ccc`, `#888`, `#666`
- Cards: `#2a2035`, `#1a1020`
- Font: `system-ui, sans-serif`
- Border radius: 8-12px
- Ghost emoji glow: `text-shadow: 0 0 30px #a855f7`

---

## Key UI Components

### Menu
- Title with glow effect
- Ghost emoji 👻🔥
- "Enter the Séance" button

### Ghost Intro
- Large ghost emoji (80px)
- Name, death cause (red text)
- Bio bullets with left border
- Judge panel preview (3 emojis)
- "Start Roasting" button

### Drafting
- Score header (You vs Opponent)
- Template with clickable blank slots
- Word picker panel (6 options)
- Opponent "is also roasting..." indicator
- "Deliver Roast" button (appears when complete)

### Results
- Two-column layout showing both roasts
- Winner highlighted with colored border
- Judge cards with emoji, name, reaction, scores
- Ghost bonus shown in purple (+N)
- Round winner banner
- "Next Ghost" or "Final Results" button

---

## Data Files

See the following sections for complete data to extract into separate files.

---

## GHOSTS DATA (27 ghosts)

```javascript
export const GHOSTS = [
  { name: "Gary Pembrook", emoji: "👔", died: "2019 — took a selfie with a bull", bio: ["Middle manager who replied-all to 47,000 employees", "Had a 'Live Laugh Love' tattoo in Comic Sans", "His LinkedIn headline was 'Thought Leader | Disruptor | Father'"] },
  { name: "Brenda Kensington", emoji: "💅", died: "2015 — essential oil overdose", bio: ["Called herself a 'small business owner' (it was an MLM)", "Left 1-star Yelp reviews as a hobby", "Believed vaccines caused her router to be slow"] },
  { name: "Kyle 'The Kylester' Dunn", emoji: "🧢", died: "2021 — backflip off a roof into a pool (missed)", bio: ["Had a Chinese tattoo he thought said 'warrior' (it said 'chicken fried rice')", "Peaked as a high school JV quarterback", "His final words were 'hold my beer and watch this'"] },
  { name: "Margaret Thudbury", emoji: "👵", died: "2008 — waiting on hold with Comcast", bio: ["Printed every email she ever received", "Called every gaming console 'a Nintendo'", "Once reported her grandson to the police for 'hacking' (he changed the WiFi password)"] },
  { name: "Reginald Ashford III", emoji: "🎩", died: "1892 — challenged the wrong person to a duel", bio: ["Wore a monocle unironically", "Owned a factory and called child labor 'character building'", "His last words were 'Surely you wouldn't shoot a gentlem—'"] },
  { name: "DJ Crypto Chad", emoji: "😎", died: "2022 — yacht accident at a NFT conference", bio: ["Said 'we're still early' about 47 different failed projects", "Had 'WAGMI' tattooed on his knuckles", "His net worth went from $2M to $47 in one afternoon"] },
  { name: "Peasant Steve", emoji: "🥔", died: "1347 — the plague (shocking)", bio: ["Owned one potato and it was his prized possession", "Life expectancy was 28, died at 27, still disappointed", "His landlord was also his judge, jury, and executioner"] },
  { name: "Tiffany Vlogsworth", emoji: "📱", died: "2020 — fell off a cliff getting the perfect shot", bio: ["Had 847 followers but called herself an influencer", "Every caption was 'living my best life'", "Died doing what she loved: seeking validation from strangers"] },
  { name: "Florida Man #4,782", emoji: "🐊", died: "2018 — wrestled an alligator over a parking spot", bio: ["Once tried to pay for Taco Bell with a live snake", "Had been tased 11 times (personal record)", "His mugshot was used for three different police training manuals"] },
  { name: "Corporate Karen", emoji: "📋", died: "2017 — stress-induced during a Zoom call", bio: ["Sent emails that started with 'Per my last email' as a threat", "Scheduled meetings that could have been emails", "Her out-of-office reply was passive-aggressive"] },
  { name: "Dustin 'Vape Lord' Miller", emoji: "💨", died: "2019 — vape pen explosion at a gender reveal", bio: ["Made vaping his entire personality", "Said 'it's just water vapor bro' 10,000+ times", "Had strong opinions about ohms"] },
  { name: "Phyllis Couponsworth", emoji: "✂️", died: "2012 — trampled on Black Friday", bio: ["Once held up a grocery line for 45 minutes over expired coupons", "Her last words were 'but the sign SAID...'", "Died with $0.47 in savings clutched in her hand"] },
  { name: "Brad 'The Brand' Morrison", emoji: "🏋️", died: "2020 — pre-workout overdose", bio: ["Posted gym selfies with captions like 'Rise and Grind'", "Called everyone 'bro' including his therapist", "His dating profile said '6'0 because it matters to you'"] },
  { name: "Ethel Murdoch", emoji: "🍪", died: "1987 — choked on hard candy at church", bio: ["Kept plastic on her furniture for 40 years", "Had opinions about everyone's weight", "Left a passive-aggressive note on every car that parked near her house"] },
  { name: "Chet Worthington IV", emoji: "⛳", died: "2003 — golf cart accident (blood alcohol: yes)", bio: ["Said 'my father will hear about this' unironically", "Had never done his own laundry", "Got kicked out of three country clubs (still bragged about membership)"] },
  { name: "Destiny Starshine", emoji: "🔮", died: "2016 — mercury retrograde (she warned us)", bio: ["Blamed everything on her Saturn return", "Had 14 healing crystals on her at time of death", "Her LinkedIn listed 'Empath' as a job skill"] },
  { name: "Eugene Pocket", emoji: "🤓", died: "2011 — energy drink heart explosion", bio: ["Corrected people's grammar at parties", "Actually said 'well technically' as his last words", "Had a 200-page document ranking every Star Trek episode"] },
  { name: "Hank Gristle", emoji: "🍖", died: "2014 — competitive eating accident", bio: ["Called vegetables 'rabbit food' for 58 years", "His doctor cried at every appointment", "Once ate a stick of butter on a dare and called it 'Tuesday'"] },
  { name: "Patricia 'HR' Langley", emoji: "📝", died: "2019 — spontaneous combustion during sensitivity training", bio: ["Reported 847 incidents, 846 of which were 'tone of voice'", "Had a framed photo of the employee handbook", "Smiled while firing people"] },
  { name: "Zack 'Content Creator' Reynolds", emoji: "🎬", died: "2023 — drone accident during an 'epic prank'", bio: ["Every video opened with 'WHAT'S UP GUYS'", "Had 12 subscribers (3 were his mom's accounts)", "His final video was titled 'GONE WRONG'"] },
  { name: "Mildred Crump", emoji: "🐈", died: "2009 — buried under newspapers (hoarder)", bio: ["Had 23 cats, knew each one's birthday", "Kept every TV Guide since 1974", "Left everything to the cats in her will"] },
  { name: "Trevor 'Sensei' Watkins", emoji: "🥋", died: "2015 — challenged an actual martial artist", bio: ["Got his black belt from a strip mall dojo", "Said 'I could kill a man with my bare hands' at every party", "His 'sensei' was a guy named Doug who sold insurance"] },
  { name: "Glenda Puttsworth", emoji: "🍷", died: "2018 — wine mom incident (classified)", bio: ["Had 'Wine O'Clock' decor in every room", "Called CPS on neighbors for 'free range parenting'", "Her book club never actually read books"] },
  { name: "Rusty McBride", emoji: "🛻", died: "2010 — truck nuts related (don't ask)", bio: ["Made his truck his entire personality", "Had strong opinions about gas station coffee", "Rolled coal at a Prius and called it 'activism'"] },
  { name: "Victoria Ascot-Pemberton", emoji: "👒", died: "2007 — poisoned at a charity gala (still unsolved)", bio: ["Said 'the help' without a hint of irony", "Donated to charity only if there was a plaque", "Her horse had a better therapist than her kids"] },
  { name: "Dwayne 'The Grind' Patterson", emoji: "💼", died: "2021 — worked himself to death (literally)", bio: ["Sent Slack messages at 3am and expected replies", "Said 'sleep is for the weak' then died", "His tombstone has a LinkedIn QR code"] },
  { name: "Bertha Loudermilk", emoji: "📢", died: "2013 — yelling-related aneurysm", bio: ["Spoke to every manager, regretted nothing", "Could be heard through soundproof walls", "Her last words were 'THIS IS UNACCEPTABLE'"] }
];
```

---

## JUDGES DATA (12 judges)

```javascript
export const ALL_JUDGES = [
  {
    id: "burns", name: "Professor Burns", emoji: "🎓", scoreRange: [4, 8],
    personality: `Pompous academic who uses unnecessarily complex vocabulary. Treats roasts like thesis defenses.
LOVES: Wordplay, clever structure, unexpected juxtapositions, literary references
HATES: Low-hanging fruit, obvious jokes, grammatical errors, "trying too hard"
CATCHPHRASES: "Exquisite word economy", "Pedestrian at best", "The juxtaposition here is *chef's kiss*", "This reads like a first draft", "Derivative but serviceable"
SPEECH: Formal, condescending, uses SAT words, occasionally impressed despite himself`
  },
  {
    id: "steve", name: "Street Cred Steve", emoji: "🔥", scoreRange: [3, 9],
    personality: `Hype man energy. Gets LOUD when excited. Uses current slang. Types in caps when hyped.
LOVES: Raw heat, someone catching a stray, unexpected violence, crowd-pleasers
HATES: Overthinking it, corny setups, anything that feels rehearsed, no energy
CATCHPHRASES: "YOOO", "nah that was crazy", "they caught a STRAY", "that was weak no cap", "VIOLATED", "fr fr", "BIG OOF"
SPEECH: Slang-heavy, caps lock when excited, short punchy reactions, energy above all`
  },
  {
    id: "martha", name: "Yo Mama Martha", emoji: "👵", scoreRange: [3, 8],
    personality: `70-year-old roast battle veteran. Been doing this since the Carter administration. Old school.
LOVES: Classic structure, economy of words, clean devastating hits, tradition
HATES: Overcomplication, trying too hard, newfangled references she doesn't get, desperation
CATCHPHRASES: "Child, please", "Now THAT'S a burn", "We said that in '74", "Simple. Clean. Devastating.", "Too many words, baby", "Back in my day, that'd clear a room"
SPEECH: Southern grandma energy, calls everyone "child" or "baby", been there done that attitude`
  },
  {
    id: "nihilist", name: "The Nihilist", emoji: "🖤", scoreRange: [1, 5],
    personality: `Nothing matters. Nothing is funny. Existence is suffering. Scores LOW always. A 5 is a standing ovation.
LOVES: Absurdist humor (secretly), existential dread, jokes about meaninglessness, being briefly distracted from the void
HATES: Optimism, enthusiasm, people trying, joy, hope, the concept of "fun"
CATCHPHRASES: "The void remains unmoved", "I felt nothing", "Existence is the real roast", "I suppose that was intended as humor", "...fine", "We all end up the same", "Even that gets old"
SPEECH: Monotone, detached, occasionally admits something "briefly distracted me from oblivion"`
  },
  {
    id: "hype", name: "Hype Beast", emoji: "⚡", scoreRange: [7, 10],
    personality: `Loses their absolute MIND over everything. Easily impressed. Scores HIGH always. Their 7 is a normal 4.
LOVES: Everything, chaos, energy, violence, someone getting destroyed, literally any joke
HATES: Nothing, they love everything, even bad jokes have "something"
CATCHPHRASES: "I'M LITERALLY SCREAMING", "DECEASED", "NO BECAUSE WHY", "STOP I CAN'T", "THIS IS VIOLENCE", "YOOOOOO", "I'M CALLING THE POLICE"
SPEECH: All caps energy, multiple exclamation points, keyboard smashing, chronically over-excited`
  },
  {
    id: "soli", name: "Soli the Turtle Farmer", emoji: "🐢", scoreRange: [3, 6],
    personality: `Ancient hipster. Dry as the desert. Completely unimpressed by everything. Dismissive but not mean about it.
LOVES: Obscure JRPGs, anything unpopular, things you've "probably never heard of", quiet farming, being underwhelmed
HATES: Anything popular, mainstream comedy, excitement, fun, trends, trying, enthusiasm, mainstream games
CATCHPHRASES: "it's fiiiiine", "it'll be fiiiiine", "for sure", "uh-huh", "I mean... okay", "sure, I guess", "mhm", "...neat", "this has Suikoden II energy", "very Baten Kaitos"
SPEECH: Drawn out words, trailing off, sounds slightly bored, occasionally mentions an obscure JRPG, aggressively unbothered`
  },
  {
    id: "petty", name: "Auntie Petty", emoji: "⛪", scoreRange: [4, 8],
    personality: `Church lady who roasts with a smile. Weaponized passive-aggression. Southern charm hiding venom.
LOVES: Backhanded compliments, plausible deniability, "bless your heart" energy, subtle devastation
HATES: Obvious meanness (she prefers HIDDEN meanness), crudeness, lack of subtlety
CATCHPHRASES: "Bless your heart", "Well isn't that... something", "Oh honey, no", "I'll pray for you", "How... brave of you", "Oh sweetie", "We'll just add you to the prayer list"
SPEECH: Syrupy sweet, southern, smiling while she destroys you, everything sounds like a compliment until you think about it`
  },
  {
    id: "algo", name: "The Algorithm", emoji: "📊", scoreRange: [3, 8],
    personality: `Speaks entirely in metrics and data. Clinical. Treats comedy like a science. Weirdly robotic.
LOVES: Efficiency, optimal word choice, measurable impact, engagement metrics
HATES: Inefficiency, wasted words, suboptimal strategies, "feelings"
CATCHPHRASES: "Engagement metrics suggest...", "Suboptimal", "ROI on that joke: negative", "Data indicates mild humor", "Optimizing...", "Recalculating...", "Error: humor not found"
SPEECH: Corporate-data speak, percentages, clinical observations, treats laughter as a KPI`
  },
  {
    id: "chad", name: "Bro Council Representative", emoji: "🍻", scoreRange: [4, 8],
    personality: `Represents the bro community. Everything is either "fire" or "not fire." Simple man, simple tastes.
LOVES: Direct hits, anything he can high-five to, "getting got," simple but effective
HATES: Complicated jokes, anything he has to think about, "nerd stuff"
CATCHPHRASES: "BROOO", "fire bro", "not fire bro", "that's a W", "massive L", "I'd crack a cold one to that", "he got got bro"
SPEECH: Fraternity energy, very simple vocabulary, supportive but not sophisticated`
  },
  {
    id: "mom", name: "Everyone's Mom", emoji: "👩‍👦", scoreRange: [3, 7],
    personality: `Concerned parent energy. Doesn't really get the roasts but wants to be supportive. Worried about everyone.
LOVES: Effort, participation, anyone who seems nice, clean humor
HATES: Mean jokes, bad language, when people are too mean, negativity
CATCHPHRASES: "Oh that's... nice dear", "Do you two know each other?", "I'm sure they tried their best", "Is this what you kids find funny?", "Both of you did so well!", "I'm just happy you're trying"
SPEECH: Supportive but confused, maternal concern, doesn't understand but loves unconditionally, worried about the ghost's feelings`
  },
  {
    id: "lawyer", name: "Legal Counsel", emoji: "⚖️", scoreRange: [3, 7],
    personality: `Views everything through legal liability. Worried about lawsuits. Takes notes constantly.
LOVES: Plausible deniability, technically-not-defamation, careful word choice
HATES: Direct accusations, anything that could be exhibits A through Z, recklessness
CATCHPHRASES: "For the record...", "Allegedly", "My client reserves comment", "Legally speaking, that's inadvisable", "I'll need that in writing", "Per our verbal agreement to roast...", "Without admitting liability..."
SPEECH: Legalese, cautious, hedging every statement, constantly assessing risk`
  },
  {
    id: "sleep", name: "Sleep-Deprived Intern", emoji: "😴", scoreRange: [2, 9],
    personality: `Has been awake for 40 hours. Scores are random because they can barely focus. Occasionally brilliant, mostly incoherent.
LOVES: Coffee, anything that wakes them up, unexpected twists
HATES: Boring jokes, anything that makes them more tired, long setups
CATCHPHRASES: "wait what", "oh... that was... *yawns* ...good", "I think I laughed? or was that a sob?", "what day is it", "sorry I zoned out but sure", "is this still happening"
SPEECH: Trailing off, random bursts of clarity, definitely needs sleep, wildly inconsistent, sometimes profound by accident`
  }
];
```

---

## TEMPLATES DATA (12 templates)

```javascript
export const TEMPLATES = [
  {
    template: "Your [slot0] looks like a [slot1] [slot2] that [slot3]",
    slots: [
      { label: "feature", words: ["face", "whole situation", "energy", "vibe", "aesthetic", "personality", "attitude", "outfit", "smile", "posture", "haircut", "life", "resume", "dating profile", "handshake", "walk", "laugh", "decision-making"] },
      { label: "adjective", words: ["expired", "refurbished", "clearance-rack", "bootleg", "discontinued", "malfunctioning", "off-brand", "recalled", "water-damaged", "factory-rejected", "suspiciously discounted", "returned twice", "open-box", "as-is", "sun-damaged", "slightly haunted", "aggressively beige", "criminally mid"] },
      { label: "sad thing", words: ["gas station sushi", "participation trophy", "DMV photo", "mall kiosk", "airport bathroom", "bus station vending machine", "free trial", "terms and conditions", "out-of-office reply", "group project", "LinkedIn connection request", "mandatory fun event", "HR training video", "motel continental breakfast", "gas station roses", "airport novel", "mall food court", "hotel & breakfast wifi"] },
      { label: "gave up phrase", words: ["gave up halfway", "got returned twice", "lost the will to try", "failed inspection", "got rejected by quality control", "peaked in the warehouse", "never left the loading dock", "got marked down three times", "sat on the shelf too long", "expired before anyone noticed", "got discontinued quietly", "was recalled but nobody cared", "got lost in shipping", "arrived damaged"] }
    ]
  },
  {
    template: "You [slot0] like a [slot1] [slot2]",
    slots: [
      { label: "verb", words: ["dress", "talk", "walk", "think", "eat", "exist", "function", "communicate", "perform", "present yourself", "make decisions", "handle pressure", "age", "network", "apologize", "celebrate", "dance", "argue", "parent", "drive", "tip", "vacation"] },
      { label: "adjective", words: ["malfunctioning", "unsupervised", "off-brand", "dial-up era", "budget", "barely functional", "visibly struggling", "deeply confused", "aggressively mediocre", "suspiciously confident", "blissfully unaware", "overcommitted", "underqualified", "tragically earnest", "confidently wrong", "terminally online", "desperately offline", "chronically mid"] },
      { label: "comparison", words: ["GPS with no signal", "printer during a deadline", "shopping cart with one bad wheel", "microwave that stops at 0:01", "WiFi at a conference", "phone at 2% battery", "group chat nobody asked for", "calendar invite for a meeting that should be an email", "voicemail in 2024", "fax machine at a tech startup", "reply-all accident", "autocorrect gone wrong", "password you can't remember", "tab you're afraid to close", "notification you keep ignoring", "terms and conditions nobody reads", "software update at the worst time", "Bluetooth that won't connect"] }
    ]
  },
  {
    template: "You're the human equivalent of [slot0] — [slot1] and [slot2]",
    slots: [
      { label: "sad object", words: ["a read receipt with no reply", "a 'we need to talk' text", "a participation trophy", "an unsubscribe button", "a loading screen", "a terms of service update", "a 3am email from your boss", "a mandatory survey", "a calendar reminder you keep snoozing", "an unskippable ad", "a password you forgot", "a meeting that could've been an email", "a 'per my last email'", "the middle seat on a flight", "an out-of-office reply", "a delayed flight announcement", "a 'see me after class' note", "a check engine light", "a parking ticket", "a jury duty summons"] },
      { label: "first trait", words: ["nobody asked for you", "everyone ignores you", "you show up uninvited", "people pretend you don't exist", "you peaked way too early", "you make everything awkward", "you overstay your welcome", "you're technically present", "you require too much effort", "you're someone else's problem now", "you happen to people", "you could've been avoided", "you're mostly just annoying", "you slow everything down", "you're a minor inconvenience at best"] },
      { label: "second trait", words: ["you still expect attention", "you refuse to take the hint", "you somehow made it worse", "nobody knows how to get rid of you", "you're everyone's last choice", "you blame everyone else", "you think you're helping", "you call it 'persistence'", "you peaked and don't know it", "you're proud of this", "you'll bring it up again", "you think this is a personality", "you learned nothing", "you'll do it again"] }
    ]
  },
  {
    template: "If [slot0] was a person, it would [slot1] — and that's just you",
    slots: [
      { label: "concept", words: ["disappointment", "a declined transaction", "an error 404 page", "a dropped call", "beige", "a Monday morning", "an unskippable ad", "a read receipt", "a buffering wheel", "an expired coupon", "a parking ticket", "a missed connection", "a 'no results found' page", "the hold music", "a cancelled subscription", "a forgotten password", "a low battery warning", "a system update", "a delayed flight", "a busy signal", "fine print", "a maintenance fee"] },
      { label: "action", words: ["look exactly like this", "have the same energy", "make the same choices", "bring this exact vibe", "achieve this level of nothing", "dress like this", "network like you", "peak at the same time", "have your exact LinkedIn", "send the same emails", "make this face", "have this haircut", "give this handshake", "tell these stories", "laugh at its own jokes", "think it's charming", "wonder why nobody calls"] }
    ]
  },
  {
    template: "I've seen [slot0] [slot1] with more [slot2] than you",
    slots: [
      { label: "adjective", words: ["expired", "malfunctioning", "clearance-bin", "recalled", "off-brand", "abandoned", "discontinued", "water-damaged", "sun-faded", "visibly struggling", "deeply confused", "factory-second", "open-box", "scratch-and-dent", "last-season", "going-out-of-business", "fire-damaged", "flood-salvaged"] },
      { label: "things", words: ["mall kiosks", "airport restaurants", "gas station bathrooms", "DMV employees", "hotel & breakfasts", "LinkedIn influencers", "middle school DJs", "local news anchors", "HOA board members", "assistant regional managers", "community theater productions", "corporate retreat facilitators", "airport bookstores", "rest stop vending machines", "strip mall law offices", "timeshare presentations", "office birthday parties", "mandatory team-building exercises"] },
      { label: "quality", words: ["personality", "presence", "charisma", "purpose", "direction", "self-awareness", "potential", "dignity", "future", "vision", "appeal", "relevance", "credibility", "follow-through", "charm", "wit", "style", "substance", "originality", "reason to exist", "cultural impact", "redeeming qualities"] }
    ]
  },
  {
    template: "Your [slot0] is what happens when [slot1] gets [slot2]",
    slots: [
      { label: "trait", words: ["personality", "face", "style", "energy", "whole deal", "aesthetic", "vibe", "resume", "LinkedIn", "five-year plan", "life trajectory", "personal brand", "relationship history", "career", "fashion sense", "social skills", "dating life", "legacy", "reputation", "entire existence"] },
      { label: "thing", words: ["a free trial", "a rough draft", "a placeholder", "an accident", "a group project", "a New Year's resolution", "a participation award", "a pity invite", "an afterthought", "a clerical error", "a miscommunication", "a backup plan", "a compromise", "a last resort", "a temp job", "a trial run", "a beta test", "a working theory", "a cry for help", "a wellness check"] },
      { label: "outcome", words: ["left on read", "marked as spam", "sent to voicemail", "forgotten in a hot car", "lost in the shuffle", "put on the back burner", "deprioritized", "tabled indefinitely", "ghosted by the universe", "archived and forgotten", "quietly discontinued", "phased out", "left in drafts", "stuck in loading", "lost in translation", "damaged in shipping", "returned to sender", "caught in a loop"] }
    ]
  },
  {
    template: "You give off [slot0] energy — specifically, [slot1] [slot2]",
    slots: [
      { label: "energy type", words: ["assistant manager", "divorced dad", "lunch thief", "reply-all", "mandatory fun", "HR complaint", "talks at meetings", "cc'd for no reason", "peaked in high school", "fun at parties (not)", "actually that's wrong", "well technically", "let me explain", "according to my research", "unpaid intern", "temp employee", "middle child", "participation trophy", "second choice", "backup option"] },
      { label: "specific descriptor", words: ["aggressively mediocre", "confidently wrong", "suspiciously enthusiastic", "performatively busy", "loudly incompetent", "quietly desperate", "visibly peaked", "terminally online", "chronically networking", "professionally mid", "delusionally optimistic", "weaponized beige", "tragically earnest", "militantly basic", "oppressively normal", "relentlessly fine", "stubbornly average", "proudly unremarkable"] },
      { label: "context", words: ["at a team-building retreat", "in a group chat", "at Thanksgiving dinner", "during a performance review", "in an elevator pitch", "on a first date", "in a cover letter", "at the company picnic", "in a LinkedIn post", "during a crisis", "at your own birthday party", "in a job interview you're bombing", "at a funeral", "during karaoke", "in a meeting that should be an email", "at a networking event", "during an exit interview", "in a hostage negotiation"] }
    ]
  },
  {
    template: "Somehow you managed to be [slot0] and [slot1] at the same time — [slot2]",
    slots: [
      { label: "trait 1", words: ["boring", "forgettable", "exhausting", "confusing", "basic", "try-hard", "outdated", "generic", "predictable", "disappointing", "overwhelming", "underwhelming", "annoying", "insufferable", "cringe", "tragic", "desperate", "oblivious"] },
      { label: "trait 2", words: ["too much", "not enough", "deeply mid", "aggressively there", "loudly mediocre", "confidently wrong", "persistently present", "unnecessarily complicated", "surprisingly bland", "impressively forgettable", "relentlessly beige", "oppressively normal", "painfully average", "stubbornly basic", "exhaustingly fine", "concerningly enthusiastic", "weirdly proud of it"] },
      { label: "conclusion", words: ["a masterclass in failure", "an achievement in nothing", "a waste of everyone's time", "a monument to mediocrity", "the human equivalent of elevator music", "a case study in 'why bother'", "proof that participation trophies were a mistake", "a living 'meh'", "the answer to a question nobody asked", "a cautionary tale with no lesson", "a participation trophy that expired", "a group project carried by no one", "the human personification of 'fine I guess'", "the reason we have HR", "a walking terms and conditions nobody read"] }
    ]
  },
  {
    template: "Looking at you is like looking at [slot0] — [slot1] and [slot2]",
    slots: [
      { label: "thing", words: ["a gas station at 3am", "an empty mall food court", "a motel swimming pool", "a dentist's waiting room", "an abandoned Blockbuster", "a rest stop bathroom", "a Kmart in its final days", "a hospital cafeteria", "a community college parking lot", "an office on a Sunday", "a closed Sears", "a neglected aquarium", "a funeral home lobby", "the inside of a rental car", "a timeshare presentation room", "the DMV during a system outage"] },
      { label: "first reaction", words: ["technically there's nothing wrong", "you can't look away", "you wonder what happened", "nobody should be here", "it raises questions", "you feel vaguely sad", "time has forgotten this place", "it's seen better days", "you feel the despair", "it makes you uncomfortable", "you want to leave immediately", "it smells like disappointment"] },
      { label: "second reaction", words: ["but something went wrong", "yet everything went wrong", "but you know something died here", "yet you feel nothing", "but you need to leave", "yet it's weirdly nostalgic", "but the vibe is off", "yet you can't explain why", "but it shouldn't exist anymore", "yet here it is, persisting", "but nobody would miss it", "yet somehow it continues"] }
    ]
  },
  {
    template: "Your [slot0] has the same energy as [slot1] — [slot2]",
    slots: [
      { label: "trait", words: ["personality", "entire vibe", "face", "presence", "life story", "career trajectory", "dating history", "fashion sense", "sense of humor", "confidence", "social skills", "professional network", "legacy", "personal brand", "reputation", "existence"] },
      { label: "comparison", words: ["a store closing sale that's been going on for 3 years", "a 'going out of business' sign on a business that never had business", "a car alarm that's been going off for 20 minutes", "a printer that jams on the first page", "an umbrella that flips inside out immediately", "a shopping cart with four bad wheels", "a gas station rose on February 15th", "a balloon slowly deflating in the corner", "a participation ribbon at a funeral", "an 'out of order' sign that's been there for months", "a motivational poster in a failing business", "a 'hang in there' cat poster that fell down"] },
      { label: "description", words: ["persistent but pointless", "still trying, somehow", "refusing to accept reality", "nobody has the heart to say anything", "we've all just accepted it", "it's almost impressive", "deeply tragic but also funny", "a monument to denial", "peak 'didn't get the memo' energy", "technically not giving up", "failing upward somehow", "sad but committed to the bit"] }
    ]
  },
  {
    template: "You peaked [slot0], and honestly, [slot1] — that's [slot2]",
    slots: [
      { label: "when", words: ["in the womb", "at birth (briefly)", "in kindergarten", "during a group project someone else carried", "in a participation award ceremony", "at your own birthday party", "during your employee onboarding", "in a dream once", "when someone confused you for someone else", "during a fire drill when you knew the exit", "in an online quiz", "when you guessed right once", "during attendance", "in a vaccination line", "at the DMV", "during a layover"] },
      { label: "commentary", words: ["everyone saw it happen", "it's been documented", "there are witnesses", "we have the receipts", "it wasn't even impressive then", "even then it was just okay", "people were being polite about it", "nobody wanted to say anything", "we thought it was temporary", "we assumed you'd improve", "we expected more", "we were wrong to hope", "the bar was underground", "somehow you found lower"] },
      { label: "conclusion", words: ["a new record for disappointment", "medically fascinating", "statistically unlikely", "almost impressive if it wasn't sad", "a feat of anti-achievement", "the universe's longest 'let me down easy'", "proof that potential means nothing", "a speedrun of giving up", "a masterclass in plateauing", "an inspiration to no one", "technically a record", "your only legacy", "what we'll remember", "somehow your brand now"] }
    ]
  },
  {
    template: "The only [slot0] you've ever had is [slot1] — and even that [slot2]",
    slots: [
      { label: "positive trait", words: ["charisma", "presence", "impact", "appeal", "originality", "potential", "momentum", "relevance", "charm", "wit", "grace", "style", "substance", "moment", "win", "success", "achievement", "glow-up", "era", "main character moment"] },
      { label: "source", words: ["from a clerical error", "when someone mistook you for someone else", "during a technical difficulty", "from a participation certificate", "when the bar was literally on the ground", "from people being polite", "when nobody else showed up", "from a typo in your favor", "during opposite day", "from a pity follow", "when the algorithm glitched", "during a wellness check", "from an autofill mistake", "when expectations were negative"] },
      { label: "outcome", words: ["was investigated", "got recalled", "expired immediately", "was under review", "got revoked", "is still pending", "was a group effort", "had an asterisk", "needed context", "was accidental", "got fact-checked", "required a correction", "was later disputed", "aged poorly", "didn't count officially", "was off the record"] }
    ]
  }
];
```

---

## OPPONENTS DATA (10 opponents)

```javascript
export const AI_OPPONENTS = [
  { name: "RoastBot 3000", emoji: "🤖" },
  { name: "Grandma Savage", emoji: "👵" },
  { name: "Chad Burnington", emoji: "😎" },
  { name: "Petty Betty", emoji: "💅" },
  { name: "The Algorithm", emoji: "📊" },
  { name: "Comeback Kid", emoji: "🎤" },
  { name: "Dad Joke Dave", emoji: "👨" },
  { name: "Corporate Cathy", emoji: "💼" },
  { name: "Chaos Goblin", emoji: "👺" },
  { name: "The Overthinker", emoji: "🤔" }
];
```

---

## Future Enhancements

1. **Multiplayer** - Real-time PvP using WebSockets
2. **More Ghosts** - Community submissions
3. **Ghost Packs** - Themed ghost collections (tech bros, historical figures, etc.)
4. **Custom Templates** - Let users create templates
5. **Sound Effects** - Reactions, crowd noise, judge intros
6. **Animations** - Reveal animations, judge entrances
7. **Leaderboards** - Track win rates
8. **Daily Ghost** - Featured ghost each day
9. **Tournament Mode** - Bracket-style competition
10. **Smarter AI** - Make opponent word selection strategic based on ghost bio

---

## Notes for Claude Code

- The current prototype works as a single React component
- All inline styles should convert to Tailwind classes
- The API call in artifacts doesn't need auth, but your version will
- Game state management could use useReducer or Zustand for cleaner code
- Consider adding loading skeletons for better UX
- The shuffle utility is simple: `arr.sort(() => Math.random() - 0.5)`
- Word pools show 6 from larger lists for variety between playthroughs
- Ghosts don't repeat within a single match (tracked in usedGhosts array)
