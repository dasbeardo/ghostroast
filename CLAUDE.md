# Roast Mortem - Project Doc

**Version**: 0.6.3

## What This Is
A comedy game where players compete against an AI opponent to craft roasts of "ghosts" (deceased people with humorous bios). Player and AI each get a DIFFERENT random template and draft words to complete their roast. Three AI judges (player-selected or random) score the final jokes.

## Current State
**Working prototype** - Two UI versions available:
- `index.html` - Original UI (legacy)
- `index-new.html` - **New modular UI** (recommended, actively developed)

Run with: `python3 -m http.server 3000` then open `http://localhost:3000/index-new.html`

## Tech Stack
- **Frontend**: Vanilla JS, no framework, no build step
- **Styling**: Plain CSS (new UI uses modular CSS architecture)
- **API**: OpenAI GPT-5.2 (user provides their own API key)
- **Server**: None needed for local dev (just static file serving)
- **Git**: Connected to GitHub

---

## File Structure
```
ghostroast/
├── index.html              # Legacy UI entry point
├── index-new.html          # NEW modular UI entry point (recommended)
├── style.css               # Legacy styles
├── css/                    # NEW modular CSS architecture
│   ├── styles.css          # Main CSS import file
│   ├── variables.css       # Design tokens (colors, spacing, fonts)
│   ├── base.css            # Reset and base styles
│   ├── animations.css      # Keyframe animations
│   ├── components/         # Reusable components
│   │   ├── buttons.css
│   │   ├── portraits.css
│   │   ├── bubbles.css
│   │   ├── cards.css
│   │   └── modals.css
│   └── screens/            # Screen-specific styles
│       ├── menu.css
│       ├── judge-select.css
│       ├── ghost-intro.css
│       ├── drafting.css
│       ├── presentation.css
│       ├── results.css
│       ├── match-opening.css
│       ├── match-end.css
│       └── stats.css
├── js/
│   ├── main.js             # Legacy entry point
│   ├── state.js            # Game state + VERSION + localStorage
│   ├── render.js           # Legacy render functions
│   ├── game.js             # Legacy game logic
│   ├── api.js              # OpenAI API calls (V3 Panel Judging)
│   ├── utils.js            # shuffle, $, typeText, delay
│   └── ui/                 # NEW modular UI system
│       ├── index.js        # UI initialization
│       ├── dom.js          # DOM utilities (el, $, $$, clearElement)
│       ├── GameController.js   # Main game controller class
│       ├── components/     # Reusable UI components
│       │   ├── index.js
│       │   ├── Portrait.js
│       │   └── Dialogue.js # TypeWriter effect
│       └── screens/        # Screen components
│           ├── index.js
│           ├── MenuScreen.js
│           ├── JudgeSelectScreen.js
│           ├── MatchOpeningScreen.js
│           ├── GhostIntroScreen.js
│           ├── DraftingScreen.js
│           ├── PresentationScreen.js
│           ├── ResultsScreen.js
│           ├── MatchEndScreen.js
│           └── StatsScreen.js
├── data/
│   ├── index.js            # Re-exports all data
│   ├── ghosts.js           # 132 ghost characters (with theme tags)
│   ├── judges.js           # 36 judges (with tags for filtering)
│   ├── templates.js        # 16 roast templates (2 slots each)
│   ├── wordPools.js        # Themed word pools (500+ words)
│   ├── opponents.js        # 10 AI opponents
│   └── host.js             # Mort Holloway host character
├── worker/                 # Cloudflare Worker for API proxy
│   ├── worker.js
│   ├── wrangler.toml
│   └── DEPLOY.md
├── docs/
│   └── ui-redesign-spec.md # New UI specification
├── mockups/                # HTML mockups for new UI
├── CLAUDE.md               # This file
└── .gitignore
```

---

## Architecture Decisions

### Two UI Systems
- **Legacy UI** (`index.html`): Single render.js file, all HTML as template strings
- **New Modular UI** (`index-new.html`): Component-based, GameController class, modular CSS
- Both share: `js/api.js`, `js/state.js`, `js/utils.js`, `data/*`

### V3 Panel Judging (Current)
- **2 API calls per round** (not 6)
- Each call returns all 3 judges' reactions + banter in single JSON response
- Second roast call includes first roast context for comparison
- Judges react in character with 3-5 sentences each

### API Prefetching Optimization
- First reactions fetch starts **immediately** when presentation screen loads
- Second reactions fetch starts **as soon as first reactions arrive**
- User reads content while API loads in background
- Loading screen only shows if API hasn't finished yet

### Tap-to-Advance Flow (New UI)
- Judge reactions require user tap to advance (not auto-advance)
- "Tap to continue" hint appears when user can proceed
- Gives players time to read and enjoy reactions
- Banter displays after all judge reactions

### Judge Selection with Destiny
- **Pick Judges mode**: Manual selection from grid, filter by tag
- **Ask Destiny mode**: Mystical character reveals random judges
- Destiny has animated portrait, typewriter dialogue, card reveal animation
- Mode toggle tabs at top of screen

### Themed Word Pools
- Word pools have `base` entries (always available) and `themed` entries
- Each ghost has theme tags (e.g., `["crypto"]`, `["boomer", "mlm"]`)
- Themed words appear 3x more often when matching ghost is active
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
- See `worker/DEPLOY.md` for setup instructions

---

## Game Flow (New UI)
```
API KEY SCREEN
  User enters OpenAI API key (stored in localStorage)
  ↓
PLAYER NAME SCREEN
  Enter stage name (persisted with stats)
  ↓
MENU
  New Game | View Stats | Settings
  Footer: Import/Export | Credits
  ↓
JUDGE SELECTION
  Pick Judges tab: Select 3 from grid, filter by category
  Ask Destiny tab: Tap Destiny for random reveal with animation
  ↓
MATCH OPENING
  Mort welcomes player with stat-aware intro
  Shows matchup and judges panel
  ↓
ROUND LOOP (best of 3):
  ↓
  GHOST INTRO
  Mort introduces ghost → ghost bio reveals
  ↓
  DRAFTING PHASE
  Player taps blanks, picks words from weighted pools
  Menu button (☰) opens pause menu
  ↓
  PRESENTATION (tap-to-advance)
  First roast types out → tap → judge reactions (tap after each)
  → banter → tap → second roast → tap → judge reactions → banter
  API prefetches in background during user reading time
  ↓
  RESULTS SCREEN
  Both roasts with scores, judge reactions side-by-side
  ↓
  If 2 wins → MATCH END | Else → Next round
```

---

## Data Inventory

### Ghosts (132)
Fictional deceased people with:
- Name, emoji, cause of death
- 3 bio lines (humorous facts)
- Theme tags for word pool weighting

### Judges (36)
Celebrity personas with method-acting prompts:
- id, name, emoji, scoreRange, tags, personality
- Tags: `wrestling`, `politics`, `actors`, `tv`, `villains`, `sports`, `chaos`

### Templates (16)
2-slot templates with punchline structure

### Word Pools (500+ words)
Categorized with base + themed entries

### Opponents (10)
AI opponent names/emojis (cosmetic only)

### Host: Mort Holloway 🎩
Eternal host with typewriter dialogue templates

---

## New UI Features (v0.6.3)

### In-Game Menu
- Pause menu accessible via ☰ button during drafting
- Options: Resume, View Stats, Quit to Menu

### Credits Modal
- Created & Designed by Corey Bricker
- Engineered by Corey Bricker with LLM assistance (Claude, ChatGPT, Gemini)
- AI Judges powered by OpenAI (with disclaimer)
- Special Thanks to The Network (Afterlife Division)

### Import/Export
- Export save data to clipboard
- Import save data from text
- Accessible from main menu footer

### Stats Screen
- Full stats display: wins, losses, streaks
- Opponent records, judge averages
- Ghosts roasted count
- Export/import functionality

---

## Module Structure (New UI)

```
js/ui/index.js          → initUI(), transitionScreen()
js/ui/dom.js            → el(), $(), $$(), clearElement()
js/ui/GameController.js → Main controller class
                        → showMenu(), startNewGame(), showPresentation(), etc.
                        → getJudgeReactions(), updateStats()
                        → showInGameMenu(), showCredits(), showImportExport()
js/ui/components/       → Portrait, TypeWriter, delay
js/ui/screens/          → All screen components (MenuScreen, etc.)

js/api.js               → getJudgePanelResponse() - V3 panel judging
js/state.js             → Game state, VERSION, localStorage helpers
```

---

## How to Resume Work

1. Read this doc for context
2. Run `python3 -m http.server 3000`
3. Open `http://localhost:3000/index-new.html` (new UI)
4. Enter OpenAI API key when prompted
5. Key files for new UI:
   - `js/ui/GameController.js` - Main game logic
   - `js/ui/screens/*.js` - Screen components
   - `css/screens/*.css` - Screen styles
   - `js/api.js` - Judge API calls
   - `data/*.js` - Content

---

## Known Issues / TODO

### Needs Work
- [ ] Mobile responsiveness improvements
- [ ] Sound effects / animations
- [ ] More ghost themes

### Completed Recently
- [x] **Tap-to-advance flow** - User controls pacing of judge reactions
- [x] **Destiny character** - Mystical random judge selection with animations
- [x] **API prefetching** - Eliminates loading waits by fetching ahead
- [x] **In-game menu** - Pause, view stats, quit during gameplay
- [x] **Credits modal** - Proper attribution with OpenAI disclaimer
- [x] **Import/Export modal** - Save data backup/restore from menu
- [x] **Modular UI architecture** - Component-based screens and CSS
- [x] **Stats screen** - Full stats display with export

### Future Ideas
- Roguelike progression (unlock templates, ghosts, judges)
- Multiplayer (real-time PvP)
- Sound effects / crowd reactions
- Daily ghost mode
- Tournament mode

---

## Design Principles

1. **Keep it simple** - No framework, no build step
2. **Modular architecture** - Components, screens, CSS modules
3. **User controls pacing** - Tap-to-advance, never auto-skip
4. **Distinct judges** - Each has unique voice via method-acting prompts
5. **Smart prefetching** - Hide API latency behind user reading time
6. **Fun first** - Prioritize funny combinations over technical elegance
