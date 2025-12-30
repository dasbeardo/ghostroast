# Roast Mortem - Project Doc

**Version**: 0.4.2

## What This Is
A comedy game where players compete against an AI opponent to craft roasts of "ghosts" (deceased people with humorous bios). Player and AI each get a DIFFERENT random template and draft words to complete their roast. Three randomly selected AI judges score the final jokes.

## Current State
**Working prototype** - Playable at `http://localhost:3000` (run `python3 -m http.server 3000`)

## Tech Stack
- **Frontend**: Vanilla JS, no framework, no build step
- **Styling**: Plain CSS
- **API**: OpenAI GPT-5.2 (user provides their own API key)
- **Server**: None needed for local dev (just static file serving)
- **Git**: Repo in `ghostroast/` subfolder (connected to GitHub Desktop)

---

## File Structure
```
roastaghost/
├── index.html          # Entry point
├── style.css           # All styles
├── js/
│   ├── main.js         # Entry point, imports and initializes
│   ├── state.js        # Game state object + VERSION constant
│   ├── render.js       # All render functions
│   ├── game.js         # Game logic (startGame, startRound, selectWord, etc)
│   ├── api.js          # OpenAI API calls (GPT-5.2)
│   └── utils.js        # shuffle, $, typeText, delay
├── data/
│   ├── index.js        # Re-exports all data
│   ├── ghosts.js       # 132 ghost characters (with theme tags)
│   ├── judges.js       # 29 judges with personalities + forbidden behaviors
│   ├── templates.js    # 16 roast templates (2 slots each)
│   ├── wordPools.js    # Themed word pools (500+ words)
│   ├── opponents.js    # 10 AI opponents
│   └── host.js         # Mort Holloway host character + dialogue templates
├── ghostroast/         # Git repo (sync files here before committing)
├── worker/             # Cloudflare Worker for API proxy (optional sharing feature)
│   ├── worker.js       # The Worker code
│   ├── wrangler.toml   # Deployment config
│   └── DEPLOY.md       # Step-by-step deployment instructions
├── server.js           # Express server (NOT USED - for future deployment)
├── package.json        # Node deps (NOT USED locally)
├── .gitignore
├── CLAUDE.md           # This file
└── docs/
    ├── roast-a-ghost-spec.md      # Original conversion spec
    └── claude_artifact_version.txt # Original React prototype
```

---

## Architecture Decisions

### Separate Templates
- Player and AI get DIFFERENT random templates each round
- AI picks all its words immediately (random from pools)
- Player sees AI's template structure during drafting
- More RNG/luck-based, opens up roguelike unlock possibilities

### Themed Word Pools (NEW)
- Word pools have `base` entries (always available) and `themed` entries
- Each ghost has theme tags (e.g., `["crypto"]`, `["boomer", "mlm"]`)
- Themed words appear 3x more often when matching ghost is active
- Creates ghost-relevant roast options without guaranteeing them
- Themes: `crypto`, `influencer`, `boomer`, `mlm`, `corporate`, `fitness`, `bro`, `wealth`

### API Key Handling (Two Modes)
**Direct Mode** (default):
- User inputs their own OpenAI API key on first launch
- Key stored in localStorage (`roastmortem_apikey`)
- Never hardcoded, never sent anywhere except OpenAI

**Proxy Mode** (for sharing with friends):
- Set `PROXY_URL` in `js/state.js` to your Cloudflare Worker URL
- User enters a password instead of API key
- Worker validates password and proxies requests to OpenAI
- Your real API key stays secret on Cloudflare
- See `worker/DEPLOY.md` for setup instructions

### Judge System (v0.2.0 - One-at-a-Time Flow)
- Roasts are presented and judged ONE AT A TIME
- Who goes first ALTERNATES each round (playerGoesFirst toggles)
- Each judge gives 2 reactions per round (one per roast)
- 6 API calls per round total (3 judges × 2 roasts)
- On second roast, judges have context of their first reaction (but scores are LOCKED)
- Judges within each roast phase see prior judges' reactions
- Judge order shuffled each round
- Judges evaluate COMPLETE jokes holistically with 25-50 word reactions
- Results screen shows both reactions per judge side-by-side

### Host System
- Mort Holloway hosts the show with typewriter dialogue
- Dialogue templates for every moment (openings, intros, reactions, closings)
- Adds personality and pacing between game phases
- **Player-aware dialogue (v0.3.0)**: Host references player stats, win streaks, opponent history

### Player Profile & Stats System (v0.3.0)
- Player enters their stage name on first play
- Stats persisted in localStorage (`roastmortem_stats`)
- Tracks:
  - Total wins/losses and round wins/losses
  - Win/loss record vs each opponent
  - Average score from each judge
  - Ghosts roasted (unique)
  - Highest single round score
  - Win streaks (current and longest)
  - Last 10 match history
- Host references stats in opening dialogue:
  - New player intros
  - Hot streak callouts (3+ wins)
  - Underdog encouragement
  - Rematch rivalries

---

## Game Flow
```
API KEY SCREEN
  User enters OpenAI API key (stored in localStorage)
  ↓
PLAYER NAME SCREEN (v0.3.0)
  Enter stage name (persisted with stats)
  ↓
MENU → START GAME (or VIEW STATS)
  ↓
Pick random opponent (from 10)
Pick 3 random judges (from 12)
Set scores to 0-0, round to 1
  ↓
MATCH OPENING (HOST)
  Mort welcomes player BY NAME with stat-aware intro
  Shows matchup: [PlayerName] vs Opponent
  Shows judges panel
  ↓
ROUND LOOP (best of 3):
  ↓
  Pick random ghost (no repeats)
  Pick SEPARATE templates for player and AI
  AI picks all its words immediately
  ↓
  GHOST INTRO (HOST)
  Mort introduces ghost (typewriter) → ghost reveals
  Mort reacts to bio → "Start Roasting" button
  ↓
  DRAFTING PHASE
  Player sees their template + AI's template structure
  Player clicks blanks, picks words from WEIGHTED pools
  (Ghost-themed words appear more often)
  ↓
  === ONE-AT-A-TIME JUDGING (v0.2.0) ===
  ↓
  FIRST ROAST PRESENTATION
  Host introduces first roaster (alternates each round)
  First roast types out dramatically
  ↓
  FIRST ROAST JUDGING
  Host transitions → Each judge scores (25-50 word reactions)
  Scores locked immediately
  ↓
  SECOND ROAST PRESENTATION
  Host introduces second roaster
  Second roast types out dramatically
  ↓
  SECOND ROAST JUDGING
  Host transitions → Each judge scores with context of first
  (They remember what they said about first roast, can compare)
  ↓
  RESULTS SCREEN
  Shows both roasts with total scores
  Each judge shows BOTH reactions side-by-side
  Mort announces round winner
  ↓
  If someone has 2 wins → MATCH END (host closing)
  Else → Next round (toggle who goes first)
```

---

## Data Inventory

### Ghosts (132)
Fictional deceased people with:
- Name, emoji, cause of death
- 3 bio lines (humorous facts about them)
- **Theme tags** (e.g., `["crypto"]`, `["boomer", "corporate"]`)

### Judges (29)
Each judge has: personality, scoreRange, catchphrases, actions, and **forbidden behaviors** (to prevent character bleed). See `data/judges.js` for the full list.

### Templates (16)
2-slot templates with tighter punchline structure:
- "You're the human equivalent of [X] — [Y]"
- "I'd call you [X], but even that has [Y]"
- "You [X] like someone who [Y]"
- "[X] called — they want [Y] back"
- "You peaked [X] — and honestly, [Y]"
- etc.

### Word Pools (500+ words across 30+ categories)
Structure: `{ base: [...], themed: { crypto: [...], boomer: [...], ... } }`

**Pool categories**:
- pathetic_things, it_shows
- mild_insults, at_least
- verbs, tragic_backstories
- energy_types, specifically
- what_you_think, what_you_are
- bad_things, good_by_comparison
- has_a_point, just_what
- who_called, what_they_want
- best_sarcastic, worst_real
- peaked_when, peaked_commentary
- specific_energies, energy_consequences
- abstract_concepts, be_you_how
- things_that_fail, bad_outcomes
- disappointed_people, disappointed_actions
- types_of_failure, failure_elaboration
- they_say, youre_proof

### Opponents (10)
AI opponent names/emojis (cosmetic only, same random word selection for all).

### Host: Mortimer "Mort" Holloway 🎩
The eternal host of Roast Mortem. Key traits:
- Former 1970s Vegas MC who died in 1987 ("a gentleman's exit")
- Smooth baritone, draws out words: "Goooood evening"
- Death puns constantly, winks at no one, holds martini that's never empty/full
- References "the network" (afterlife corporate structure)
- Dialogue templates in `data/host.js` for every moment

---

## Known Issues / TODO

### Needs Work
- [ ] Mobile responsiveness could be better
- [ ] No sound effects or animations beyond basic transitions
- [ ] Could add more ghost themes (nerd, spiritual, etc.)

### Completed Recently
- [x] **Cloudflare Worker proxy (v0.4.2)** - Share game with friends using password, hides API key
- [x] **GPT prompt optimization (v0.4.2)** - Comedy Priority Ladder, forbidden behaviors, scoring calibration
- [x] **Expanded to 132 ghosts** - Massive content expansion
- [x] **Expanded to 29 judges** - Many new judge personalities
- [x] **Save data export/import (v0.4.1)** - Backup and restore player progress
- [x] **Rebrand to Roast Mortem (v0.4.0)** - New name, updated localStorage keys, all branding
- [x] **Player profile system** - Name input screen, stats displayed on menu/end screens
- [x] **Comprehensive stats tracking** - Wins, losses, streaks, judge averages, opponent records
- [x] **Stats display screen** - Accessible from menu, shows all player stats
- [x] **Player-aware host dialogue** - Mort references stats, rematches, hot streaks
- [x] **Player name throughout UI** - Shows player name instead of "YOU" everywhere
- [x] Templates rewritten for better joke structure (2 slots, punchier)
- [x] Word pools massively expanded (500+ words)
- [x] Ghost-themed word weighting system
- [x] Judge prompts improved for holistic joke evaluation
- [x] Removed confusing bonus scoring system
- [x] Upgraded to GPT-5.2
- [x] Added version number display
- [x] Git repo setup

### Future Ideas
- Roguelike progression (unlock templates, ghosts, judges)
- Template rarities/power levels
- Multiplayer (real-time PvP)
- More ghosts / ghost packs (themed collections)
- Sound effects / crowd reactions
- Daily ghost mode
- Tournament mode

---

## Design Discussion: GPT-Powered AI Comedians (v0.5.0?)

### The Problem
Random word selection for AI opponents rarely creates comedy. Judges are now excellent, which highlights how weak the jokes tend to be. Comedy requires surprise, specificity, and setup/punchline connection—random assembly doesn't provide this.

### Why Cards Against Humanity Works
1. **Pre-written punchlines** - White cards are *already funny* ("A windmill full of corpses")
2. **High floor, variable ceiling** - Almost any combination works because cards are crafted
3. **Low cognitive load** - Players recognize what's funny, they don't construct it
4. **Absurdity > Insults** - Humor from bizarre juxtaposition, not just being mean

### Proposed Solution: GPT-Generated AI Jokes
Replace random word selection with GPT-generated jokes for AI opponents. Each opponent becomes a distinct comedian character with:
- **Personality/voice** - How they talk, their comedic style
- **Strengths** - What they're good at (clean hits, shock value, wordplay)
- **Weaknesses** - What they struggle with (slow setups, dated refs, tries too hard)
- **Voice examples** - Sample jokes to establish their style

This creates real rivalries, adds personality, and ensures AI jokes are actually funny.

### Opponent Archetypes (Candidates)

| Archetype | Style | Strength | Weakness |
|-----------|-------|----------|----------|
| The Hack | Safe observational humor | Consistent 5-6s | Never hits 9-10s |
| The Edgelord | Shock value, boundary-pushing | Can hit 10s | Sometimes bombs to 2-3 |
| The Cerebral | Clever wordplay, references | Intellectual judges love them | "Too smart" for some |
| The Crowd-Worker | References judges, meta-jokes | Builds rapport | Sometimes sycophantic |
| The One-Liner Machine | Rapid, punchy | High floor | No depth |
| The Storyteller | Long setups, big payoffs | Huge when it lands | Often "ran out of time" |
| The Art Comic | Weird, avant-garde | Specific judges adore them | Alienates mainstream |

### Character Concepts Developed

**Grandma Savage** 👵
- Sweet old lady who looks like she bakes cookies, delivers DEVASTATING burns
- Catskills comedy background, buried three husbands
- Starts sweet, ends brutal: "You seem nice, dear. My third husband seemed nice too. They never found the body."

**Sir David Attenburned** 🎬
- Nature documentary narrator describing ghosts like pathetic wildlife
- Hushed, reverent tones about deeply embarrassing behavior
- "And here we observe the North American LinkedIn Male, frantically 'disrupting' his way toward extinction. Remarkable."

**Other Ideas** (not yet developed):
- **HR Helen** - Roasts through corporate policy language and write-ups
- **Yelp Reviewer** - Reviews the ghost's life like a 2-star restaurant
- **The Medium** - Channels the ghost, who roasts themselves
- **LinkedIn Larry** - Toxic positivity thought leader ("Your death inspired me to be grateful")

### API Prompt Structure
Each comedian call includes:
- Full character definition (persona, style, strengths, weaknesses, voice examples)
- Ghost context (name, death, bio lines, themes)
- Judge panel (so they can "read the room")
- Game state (round, score, who goes first)
- Opponent's joke (if going second—can react, contrast, or pivot)

### Open Questions
1. **Player experience** - Keep word-slot gameplay for player? (Asymmetric: player assembles, AI generates)
2. **Format changes** - Pure ghost roasting vs roast battle (roasting each other)?
3. **Kill Tony element** - Mix of roast rounds and "just be funny about X" rounds?
4. **Callbacks** - Should AI comedians reference prior rounds/jokes?
5. **API cost** - One extra GPT call per round (worth it for quality)

### Implementation Notes
- Expand `data/opponents.js` with full character definitions
- New function in `api.js`: `generateComedianJoke(opponent, ghost, judges, context)`
- AI joke generated during drafting phase (while player picks words)
- Consider: AI goes first sometimes, player sees what they're up against

---

## Module Structure

```
js/main.js          → imports render.js, game.js → calls render()
js/render.js        → imports state.js, utils.js, game.js (bindEvents), data/host
js/game.js          → imports state.js, utils.js, api.js, data/*
                    → has buildWeightedPool() for themed word selection
js/api.js           → imports state.js, PROXY_URL; callOpenAI() helper handles both modes
js/state.js         → game state, VERSION, PROXY_URL config, API key + player stats (localStorage)
js/utils.js         → standalone (shuffle, $, typeText, delay)
data/index.js       → re-exports all data files
```

Note: Circular dependency between render.js and game.js is solved by injecting render function via `setRenderFunction()` in main.js.

---

## Git Workflow

The actual git repo is in `ghostroast/` subfolder. To commit changes:

```bash
# From roastaghost/ directory:
rsync -av --exclude='.git' --exclude='ghostroast' --exclude='.DS_Store' . ghostroast/
cd ghostroast
git add -A
git commit -m "Your message"
# Push via GitHub Desktop or: git push
```

---

## How to Resume Work

1. Read this doc for context
2. Run `python3 -m http.server 3000` in project directory
3. Open `http://localhost:3000`
4. Enter OpenAI API key when prompted
5. Key files:
   - `js/game.js` - Game logic and flow (includes weighted pool selection)
   - `js/render.js` - UI rendering
   - `js/api.js` - Judge prompts and GPT-5.2 calls
   - `data/*.js` - All content (ghosts with themes, templates, word pools)
   - `style.css` - Styling

---

## Design Principles

1. **Keep it simple** - No framework, no build step, easy to hack on
2. **Modular data** - Word pools are reusable, templates reference pools
3. **Distinct judges** - Each has unique voice, never bleed into each other
4. **Show-like presentation** - Host adds personality, typewriter adds drama
5. **Fun first** - Prioritize funny combinations over technical elegance
6. **RNG creates moments** - Different templates = unexpected matchups
7. **Ghost-relevant options** - Themed words make roasts feel specific without forcing it
