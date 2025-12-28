# The Ghost Roast - Project Doc

## What This Is
A comedy game where players compete against an AI opponent to craft roasts of "ghosts" (deceased people with humorous bios). Player and AI each get a DIFFERENT random template and draft words to complete their roast. Three randomly selected AI judges score the final jokes.

## Current State
**Working prototype** - Playable at `http://localhost:3000` (run `python3 -m http.server 3000`)

## Tech Stack
- **Frontend**: Vanilla JS, no framework, no build step
- **Styling**: Plain CSS
- **API**: OpenAI GPT-4o (user provides their own API key)
- **Server**: None needed for local dev (just static file serving)

---

## File Structure
```
roastaghost/
├── index.html          # Entry point
├── style.css           # All styles
├── js/
│   ├── main.js         # Entry point, imports and initializes
│   ├── state.js        # Game state object
│   ├── render.js       # All render functions
│   ├── game.js         # Game logic (startGame, startRound, selectWord, etc)
│   ├── api.js          # OpenAI API calls
│   └── utils.js        # shuffle, $, typeText, delay
├── data/
│   ├── index.js        # Re-exports all data
│   ├── ghosts.js       # 27 ghost characters
│   ├── judges.js       # 12 judges with personalities
│   ├── templates.js    # 12 roast templates
│   ├── wordPools.js    # 18 word categories (~300+ words)
│   ├── opponents.js    # 10 AI opponents
│   └── host.js         # Mort Holloway host character + dialogue templates
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

### API Key Handling
- User inputs their own OpenAI API key on first launch
- Key stored in localStorage (`roastaghost_apikey`)
- Never hardcoded, never sent anywhere except OpenAI

### Judge System
- 3 separate API calls per round (one per judge)
- Sequential - each judge sees prior judges' reactions
- Judge order shuffled each round
- Judges only see final jokes, not template structure

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
  Player clicks blanks, picks words from pools
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

### Templates (12)
Mad-libs style roast structures referencing word pools.

### Word Pools (18 categories)
- features, verbs_behavior
- adjectives_broken, adjectives_personality
- sad_places, sad_objects, tech_failures
- failure_outcomes, trait_contradictions, trait_intensifiers
- conclusions, energy_types, contexts
- peak_timing, peak_commentary
- abstract_concepts, concept_actions
- positive_traits, fluke_sources, fluke_outcomes
- long_comparisons, persistence_descriptions

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
- [ ] Templates could be funnier - word combinations don't always land
- [ ] Typewriter timing could use polish
- [ ] No sound effects or animations beyond basic transitions
- [ ] Mobile responsiveness could be better

### Future Ideas
- Roguelike progression (unlock templates, ghosts, judges)
- Template rarities/power levels
- Multiplayer (real-time PvP)
- More ghosts / ghost packs (themed collections)
- Sound effects / crowd reactions
- Daily ghost mode
- Tournament mode

---

## Module Structure

```
js/main.js          → imports render.js, game.js → calls render()
js/render.js        → imports state.js, utils.js, game.js (bindEvents), data/host
js/game.js          → imports state.js, utils.js, api.js, data/*
js/api.js           → imports state.js (for API key)
js/state.js         → standalone (game state object, includes API key from localStorage)
js/utils.js         → standalone (shuffle, $, typeText, delay)
data/index.js       → re-exports all data files
```

Note: Circular dependency between render.js and game.js is solved by injecting render function via `setRenderFunction()` in main.js.

---

## How to Resume Work

1. Read this doc for context
2. Run `python3 -m http.server 3000` in project directory
3. Open `http://localhost:3000`
4. Enter OpenAI API key when prompted
5. Key files:
   - `js/game.js` - Game logic and flow
   - `js/render.js` - UI rendering
   - `data/*.js` - All content (ghosts, judges, templates, words, host)
   - `style.css` - Styling

---

## Design Principles

1. **Keep it simple** - No framework, no build step, easy to hack on
2. **Modular data** - Word pools are reusable, templates reference pools
3. **Distinct judges** - Each has unique voice, never bleed into each other
4. **Show-like presentation** - Host adds personality, typewriter adds drama
5. **Fun first** - Prioritize funny combinations over technical elegance
6. **RNG creates moments** - Different templates = unexpected matchups
