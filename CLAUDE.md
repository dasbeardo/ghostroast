# Roast Mortem - Project Doc

**Version**: 0.6.5

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
│       ├── ad-break.css    # NEW - Ad break styling
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
│   ├── api.js              # OpenAI API calls (V3 Panel Judging) + debug logging
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
│           ├── AdBreakScreen.js    # NEW - Ad break component
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
│   └── ads.js              # 12 fake sponsor ads for ad breaks
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

### API Call Timing (IMPLEMENTED)
- API call fires **immediately on "Lock In Roast"** button
- Promise passed through AdBreakScreen → PresentationScreen
- Ad break masks loading time
- Second reactions fetch starts as soon as first reactions arrive

### Tap-to-Advance Flow (New UI)
- Judge reactions require user tap to advance (not auto-advance)
- "Tap to continue" hint appears when user can proceed
- Gives players time to read and enjoy reactions
- Banter displays after all judge reactions

### Judge Selection (IMPLEMENTED)
**Current Design:**
1. **Category grid first** - 2-column grid of category cards (Wrestling, Politics, Actors, etc.)
2. **Tap category** → See grid of judges in that category
3. **Back button** → Return to category grid
4. **"LET DESTINY DECIDE?"** button - Carnival mystic styling, triggers Destiny reveal
5. **Selection slots** - 3 slots at bottom showing current picks, tappable to remove

### Destiny Character
**Current implementation:** Basic reveal sequence with Destiny appearing, typing cryptic message, and revealing 3 random judges one by one.

**Full theatrical sequence (TODO):** See `docs/ui-redesign-spec.md` lines 176-232 for Mort/Destiny dialogue exchange (Amazing Jonathan-style dynamic).

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

## Ad Break System (IMPLEMENTED)

### Purpose
Fill API wait time with fake sponsor ads. Adds comedy, world-building, and masks loading.

### Layout
```
┌─────────────────────────────────┐
│  📺 A WORD FROM OUR SPONSORS   │  ← Header (stays)
├─────────────────────────────────┤
│    [  16:9 AD IMAGE/GRAPHIC  ] │  ← ~30% height, emoji placeholder
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
- User swipes/taps arrows to advance between ads
- Once an ad has played, shows full text on revisit
- "BACK TO THE SHOW" button appears when API ready
- Image can be hidden until trigger word types out (comedic timing via `revealAt`)

### Current Ads (12)
- Eternal Rest Mattresses
- Ecto-Glow Skincare
- Spirit Airlines
- Mort's Mortuary & Martini Bar
- The Afterlife Network
- Haunt-A-Home Realty
- GhostWriter Pro
- Limbo Fitness
- Séance & Sensibility Dating
- Possession Insurance
- The Void Café
- Casket & Barrel

---

## Debugging

### Console Logging (ENABLED)
Debug logging is currently enabled in dev. Open browser DevTools (F12) → Console to see:

**📝 DRAFTING SCREEN INIT**
- Ghost name, emoji, themes
- Template object and slots
- Available word pools

**📌 Slot Parsing**
- Shows bracket text vs actual pool name lookup
- Verifies correct pool is being used

**🎯 OPENING PICKER / 🎰 LOADING WORDS**
- Pool requested, whether it exists
- Base words count, themed words added
- Final 12 words selected

**🎭 API CALL**
- Full request body (system prompt, user prompt)
- Judges, ghost context, roast text
- Raw API response and parsed JSON

### Saving Console Output
- Right-click Console → "Save as..." to export as `.log` file
- Or: Right-click → "Select all" → Copy → Paste

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
- Each slot has `pool` (word pool name) and `label` (display hint)

### Word Pools (500+ words)
Categorized with base + themed entries

### Opponents (10)
AI opponent names/emojis (cosmetic only)

### Host: Mort Holloway 🎩
Eternal host with typewriter dialogue templates

### Destiny 🔮
Mystic fortune teller character for random judge selection

### Ads (12)
Fake sponsor ads for ad breaks during API loading

---

## New UI Features (v0.6.5)

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

## Known Issues / TODO

### High Priority - Bugs
- [ ] **Mobile ad break text not showing** - Works on desktop, not mobile. Needs investigation.
- [ ] **Player stats on main menu** - Stats don't display on menu (Stats screen works fine)
- [ ] **Ghost cause of death** - Many showing "UNKNOWN CAUSES" instead of actual cause
- [ ] **Bottom content cutoff** - Some browsers cut off content at bottom of screen

### Medium Priority - UX Improvements
- [ ] **Tap-to-complete typewriter** - Allow tapping once to instantly reveal full text + score, then tap again to advance. Currently must wait for full typewriter.
- [ ] **Ghost info box too small** - Text is cramped, needs larger display area
- [ ] **Word pool limiting** - Show fewer options (e.g., 6-8 instead of 12) for more strategic choices and variety in repeat games

### Lower Priority - Enhancements
- [ ] **Desktop ad break arrows** - Clickable nav arrows needed (hint text mentions them but they need better visibility)
- [ ] **Judge reaction quality** - Judges don't acknowledge when jokes make no sense. Need prompt improvements to call out bad jokes and score accordingly.
- [ ] **Judge variety** - Reactions feel samey between rounds/runs. Consider: more distinct personalities, acknowledgment of previous rounds, varying reaction lengths.
- [ ] **Full Destiny theatrical sequence** - Implement Mort/Destiny dialogue exchange per spec

### Future / Nice-to-Have
- [ ] Mobile responsiveness improvements
- [ ] Sound effects / animations
- [ ] More ghost themes
- [ ] Directed roasts / judge targeting
- [ ] Roguelike progression (unlock templates, ghosts, judges)

### Completed Recently
- [x] **Ad Break System** - 12 fake sponsor ads with typewriter effect, image reveal triggers
- [x] **Judge Selection Redesign** - Category grid with back navigation, Destiny button
- [x] **API prefetching** - Fire API on Lock In, pass promise through ad break
- [x] **Word pool slot fix** - Parser now correctly looks up pools from template.slots
- [x] **Debug logging** - Console output for API calls, word pools, templates
- [x] **Tap-to-advance flow** - User controls pacing of judge reactions
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

**Expanded Targeting:**
- Tag joke with target: ghost / opponent / specific judge / host / Destiny
- Different reactions based on who's being targeted
- Host and Destiny could have their own defensive/reactive dialogue

### Dynamic Judge Traits & RNG Behaviors
Add traits, topics, and relationships to judges that vary per round/match.

**Mechanics:**
- Each judge has pool of possible traits (moods, hot topics, grudges)
- RNG selects 1-2 traits per judge at match start
- Traits sent to API: "Tonight, Gordon is extra irritable about undercooked jokes"
- Creates variety even with same judge panel

**Examples:**
- "Kanye is feeling particularly humble tonight" (rare trait)
- "The Iron Sheik has beef with anyone who mentions Hulk Hogan"
- "Judge Judy is tired and has NO patience"

### Seasonal Events & Date-Aware Content
Fetch real date/time to unlock special content.

**Mechanics:**
- Check date on load
- Unlock seasonal ads (Halloween, Christmas, etc.)
- Special ghosts for holidays
- Anniversary events
- Time-of-day easter eggs (late night mode?)

**Examples:**
- Halloween: Spooky sponsor ads, themed ghosts
- Friday the 13th: Jason-themed content
- New Year's: "Afterlife Resolution" ads
- 3 AM: "The Witching Hour" special mode?

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

### Lore Section / About Page
In-menu section with character profiles and world-building.

**Format: 90s Internet Fanzine Style**
- Treat like a fan-made site for "The Network"
- Q&A interviews with characters
- "Did You Know?" facts about the afterlife
- Grainy photos, weird fonts, under construction gifs
- Guest book (fake comments from "fans")

**Why Fanzine?**
- The Network is too cheap to pay for real marketing
- In-universe explanation: fans made these sites themselves
- Fits the Angelfire/Geocities aesthetic perfectly
- Could be a web ring of "fan sites"

**Potential Pages:**
- "Mort Holloway: The Man Behind the Mic" (interview)
- "DESTINY'S REALM" (her mystic fan page, all purple and stars)
- "Judge Appreciation Corner" (profiles, fan theories)
- "The Ghost Database" (lore about deceased contestants)
- "Network Schedule" (fake TV listings)

### Other Future Ideas
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
