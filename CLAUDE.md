# The Ghost Roast - Project Doc

**Version**: 0.1.0

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
│   ├── ghosts.js       # 27 ghost characters (with theme tags)
│   ├── judges.js       # 12 judges with personalities
│   ├── templates.js    # 16 roast templates (2 slots each)
│   ├── wordPools.js    # Themed word pools (500+ words)
│   ├── opponents.js    # 10 AI opponents
│   └── host.js         # Mort Holloway host character + dialogue templates
├── ghostroast/         # Git repo (sync files here before committing)
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

### API Key Handling
- User inputs their own OpenAI API key on first launch
- Key stored in localStorage (`roastaghost_apikey`)
- Never hardcoded, never sent anywhere except OpenAI

### Judge System
- 3 separate API calls per round (one per judge)
- Sequential - each judge sees prior judges' reactions
- Judge order shuffled each round
- Judges evaluate COMPLETE jokes holistically (not individual words)
- Simplified scoring (no bonus system)

### Host System
- Mort Holloway hosts the show with typewriter dialogue
- Dialogue templates for every moment (openings, intros, reactions, closings)
- Adds personality and pacing between game phases

---

## Game Flow
```
API KEY SCREEN
  User enters OpenAI API key (stored in localStorage)
  ↓
MENU → START GAME
  ↓
Pick random opponent (from 10)
Pick 3 random judges (from 12)
Set scores to 0-0, round to 1
  ↓
MATCH OPENING (HOST)
  Mort welcomes audience (typewriter effect)
  Shows matchup: You vs Opponent
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
  PRESENTATION PHASE
  Player's joke types out dramatically
  AI's joke types out dramatically
  ↓
  JUDGING PHASE (streaming)
  Mort intro → Judge 1 types → Judge 2 types → Judge 3 types
  ↓
  RESULTS SCREEN
  Mort announces winner
  ↓
  If someone has 2 wins → MATCH END (host closing)
  Else → Next round
```

---

## Data Inventory

### Ghosts (27)
Fictional deceased people with:
- Name, emoji, cause of death
- 3 bio lines (humorous facts about them)
- **Theme tags** (e.g., `["crypto"]`, `["boomer", "corporate"]`)

### Judges (12)
- Professor Burns 🎓 (pompous academic, 4-8)
- Street Cred Steve 🔥 (hype man, 3-9)
- Yo Mama Martha 👵 (roast veteran, 3-8)
- The Nihilist 🖤 (nothing matters, 1-5)
- Hype Beast ⚡ (loses mind over everything, 7-10)
- Soli the Turtle Farmer 🐢 (obscure JRPG nerd, 3-6)
- Auntie Petty ⛪ (church lady passive-aggression, 4-8)
- The Algorithm 📊 (speaks in metrics, 3-8)
- Bro Council Representative 🍻 (fire or not fire, 4-8)
- Everyone's Mom 👩‍👦 (confused but supportive, 3-7)
- Legal Counsel ⚖️ (worried about liability, 3-7)
- Sleep-Deprived Intern 😴 (wildcard chaos, 2-9)

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
The eternal host of The Ghost Roast. Key traits:
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
- Cloudflare deployment

---

## Module Structure

```
js/main.js          → imports render.js, game.js → calls render()
js/render.js        → imports state.js, utils.js, game.js (bindEvents), data/host
js/game.js          → imports state.js, utils.js, api.js, data/*
                    → has buildWeightedPool() for themed word selection
js/api.js           → imports state.js (for API key), uses GPT-5.2
js/state.js         → standalone (game state object, VERSION, API key from localStorage)
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
