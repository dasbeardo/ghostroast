# Roast Mortem - Project Doc

**Version**: 0.6.4

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
│   ├── host.js             # Mort Holloway host character
│   └── ads.js              # (PLANNED) Fake sponsor ads for ad breaks
├── worker/                 # Cloudflare Worker for API proxy
│   ├── worker.js
│   ├── wrangler.toml
│   └── DEPLOY.md
├── docs/
│   └── ui-redesign-spec.md # Full UI specification (see for Destiny sequence details)
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

### API Call Timing
- API call should fire **immediately on "Lock In Roast"** button (before presentation screen)
- Pass promise to PresentationScreen for seamless handoff
- Second reactions fetch starts as soon as first reactions arrive
- Ad breaks fill wait time (see Ad Break System below)

### Tap-to-Advance Flow (New UI)
- Judge reactions require user tap to advance (not auto-advance)
- "Tap to continue" hint appears when user can proceed
- Gives players time to read and enjoy reactions
- Banter displays after all judge reactions

### Judge Selection (REDESIGN PLANNED)
**New Design:**
1. **Category grid first** - Show tags as tappable cards (Wrestling, Politics, Actors, etc.)
2. **Tap category** → See grid of judges in that category
3. **Back button** → Return to category grid
4. **"LET DESTINY DECIDE?"** button - Carnival mystic/fortune teller vibe, triggers Destiny sequence
5. **Selection slots** - 3 slots at bottom showing current picks

### Destiny Character (Full Theatrical Sequence)
See `docs/ui-redesign-spec.md` lines 176-232 for full beat-by-beat breakdown.

**Key beats:**
1. Mort reluctantly goes to get her
2. Mort calls off-screen ("DESTINY! ...we need you out here!")
3. Destiny arrives with glow, Mort undercuts ("The veil grows thin..." / "It's a Tuesday.")
4. Three tarot cards slide in face-down
5-7. Each card flips to reveal judge - Destiny gives cryptic line, Mort translates
8. Destiny exits with sparkle, Mort brushes off glitter

**Dynamic:** Amazing Jonathan-style relationship - Mort is dismissive/exasperated, Destiny is mystical/dramatic.

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

## Ad Break System (PLANNED)

### Purpose
Fill API wait time with fake sponsor ads. Adds comedy, world-building, and masks loading.

### Layout
```
┌─────────────────────────────────┐
│  📺 A WORD FROM OUR SPONSORS   │  ← Header (stays)
├─────────────────────────────────┤
│    [  16:9 AD IMAGE/GRAPHIC  ] │  ← ~30% height
├─────────────────────────────────┤
│  "Tired of being dead? Try     │  ← ~70% height
│   Afterlife Energy Drink™!     │   Typewriter text
│   Now with 50% more ectoplasm. │   (radio ad transcript style)
│   Side effects may include..." │
├─────────────────────────────────┤
│  ● ○ ○     [BACK TO THE SHOW]  │  ← Progress dots + skip button
└─────────────────────────────────┘
```

### Behavior
- Always show 3 ads per break
- Text types out (typewriter effect)
- User swipes/taps to advance between ads
- Once an ad has played, shows full text on revisit
- "Back to the Show" / "Skip Ads" appears when API ready
- Never forced back - user always controls advancement
- Image can be hidden until trigger word types out (comedic timing)

### Ad Data Structure
```js
{
  sponsor: "Eternal Rest Mattresses",
  tagline: "You're already dead. Might as well be comfortable.",
  text: "Are you tired of floating aimlessly through the void? ...",
  image: "eternal-rest.png",  // or emoji placeholder
  revealAt: "void"  // optional - image reveals when this word types
}
```

### Example Sponsors
- Eternal Rest Mattresses
- Ecto-Glow Skincare
- Spirit Airlines ("We were always for the dead, really.")
- Mort's Mortuary & Martini Bar
- The Network promos ("Stay tuned for 'Cooking With Corpses'!")
- Haunt-A-Home Realty

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
  Category grid → tap category → see judges
  "LET DESTINY DECIDE?" button for theatrical random reveal
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
  AD BREAK (while API loads)
  "A Word From Our Sponsors" - 3 fake ads
  Skip button appears when API ready
  ↓
  PRESENTATION (tap-to-advance)
  First roast types out → tap → judge reactions (tap after each)
  → banter → tap → second roast → tap → judge reactions → banter
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

### Destiny 🔮 (PLANNED)
Mystic fortune teller character for random judge selection

### Ads (PLANNED)
Fake sponsor ads for ad breaks during API loading

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
2. Read `docs/ui-redesign-spec.md` for full UI specification
3. Run `python3 -m http.server 3000`
4. Open `http://localhost:3000/index-new.html` (new UI)
5. Enter OpenAI API key when prompted
6. Key files for new UI:
   - `js/ui/GameController.js` - Main game logic
   - `js/ui/screens/*.js` - Screen components
   - `css/screens/*.css` - Screen styles
   - `js/api.js` - Judge API calls
   - `data/*.js` - Content

---

## Known Issues / TODO

### In Progress
- [ ] **Ad Break System** - Fake sponsor ads during API loading
- [ ] **Judge Selection Redesign** - Category grid → judges, with Destiny button
- [ ] **Destiny Theatrical Sequence** - Full Mort/Destiny dialogue from spec
- [ ] **API timing optimization** - Fire API call on "Lock In Roast" button

### Needs Work
- [ ] Mobile responsiveness improvements
- [ ] Sound effects / animations
- [ ] More ghost themes

### Completed Recently
- [x] **Tap-to-advance flow** - User controls pacing of judge reactions
- [x] **API prefetching** - Second roast fetches while user reads first reactions
- [x] **In-game menu** - Pause, view stats, quit during gameplay
- [x] **Credits modal** - Proper attribution with OpenAI disclaimer
- [x] **Import/Export modal** - Save data backup/restore from menu
- [x] **Modular UI architecture** - Component-based screens and CSS
- [x] **Stats screen** - Full stats display with export

---

## Future Ideas

### Directed Roasts / Judge Targeting
Player can optionally tag their roast as "directed at" a specific judge.

**Mechanics:**
- During drafting, optional "Dedicate this roast to..." selector
- Judges have relationship data (allies, rivals, sensitive topics)
- API prompt includes context: "This roast referenced you"
- Dynamic reactions: judge being roasted gets defensive/flattered
- Banter gets personal: "Did they just come at ME?"

**Emergent Moments:**
- Roast about Tommy → Kanye defends him → Ramsay mocks Kanye
- Reference a judge's catchphrase → they love it or hate the mockery
- Play judges against each other strategically

### Robot Judges / AI Taking Jobs in the Afterlife
The celebrity judges are actually robots/AI impersonating the real celebrities.

**Lore:**
- Even in the afterlife, AI is taking jobs
- "The network" is too cheap to hire real celebrity ghosts
- These are budget robot impersonators

**Potential Reveals:**
- Occasional glitches in judge dialogue
- Mort makes offhand comments about "the talent budget"
- Easter eggs where judges malfunction momentarily
- Maybe a secret ending where you discover the truth

**Tone:** Dark comedy commentary on AI, fits cheap network aesthetic, self-aware meta humor.

### Other Future Ideas
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
5. **Smart loading** - Hide API latency with ad breaks
6. **Cheap network vibe** - Authentically broadcast, authentically budget
7. **Fun first** - Prioritize funny combinations over technical elegance
