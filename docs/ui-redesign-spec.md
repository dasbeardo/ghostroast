# Roast Mortem - UI Redesign Specification

## Overview

Transform from "web app" feel to "premium game" experience.

### Core Principles
- **Persistent playfield** - never leave the stage
- **Fixed viewport** - no page scrolling, content flows within the stage
- **Modals for focus** - overlays direct user attention
- **Mobile-first** - primary target is mobile, scales up for desktop
- **Character portraits** - replace all emoji with square profile images
- **Static art** - all character images are static; dynamism comes from animation and writing

### Animation Constraints

All art assets are static images. Visual dynamism achieved through:

**CSS Animation Toolkit:**
- Transforms (scale, rotate, translate)
- Fades and opacity transitions
- Slides (elements entering from off-screen)
- Shake/wobble for emphasis
- Glow/pulse effects (CSS filters, box-shadow)
- Timing delays between elements

**The Heavy Lifting:**
- Typewriter text effect for dialogue
- Pacing and beats between lines
- Strong writing for comedy and drama

---

## Persistent UI Shell (In-Game)

Once a game starts, these elements remain visible at all times:

| Element | Position | Description |
|---------|----------|-------------|
| Score Display | Top | Round score (e.g., "1-0"), current round number |
| Player vs Opponent | Header | Names and portrait images |
| Host (Mort) | Left side or bottom corner | Always visible with portrait |
| Menu Button | Top corner | Opens in-game menu overlay |

---

## Screen Breakdown

### Screen 1: API Key Entry

**Purpose:** First-time setup, mood-setting introduction to the game's aesthetic.

**Elements:**
- Game logo/title (establishes spooky comedy vibe)
- Subtle background texture/color (sets palette)
- Prompt text: "Enter your OpenAI API key to begin"
- Styled input field
- Submit button
- Info icon/link: "What's this?"

**Notes:**
- No Mort yet - he appears after entry
- Keep functional but atmospheric
- URL hash sharing still supported (#API_KEY)

---

### Screen 2: Main Menu

**Purpose:** Central hub for all game options.

**Elements:**
| Element | Description |
|---------|-------------|
| Game Logo | Top, prominent |
| Mort | Visible with portrait, short welcome quip |
| Player Display | Name + stand-in avatar image |
| New Game | Primary action button |
| Continue Game | Disabled/hidden if no save exists |
| Stats | Opens stats screen/modal |
| Import/Export | Opens save data management |
| Settings | Opens settings modal |
| Version | Footer, subtle |
| Credits | Footer link, subtle |

---

### Settings Modal

**Accessed from:** Main Menu, In-Game Menu

**Elements:**
- Sound On/Off toggle
- Change Player Name
- Clear Save Data (with confirmation prompt)
- Close button

---

### Credits Modal

**Elements:**
- Game title and version
- Creator credits
- Acknowledgments
- Legal/disclaimer text
- Close button

---

### Screen 3: Judge Selection

**Purpose:** Player selects 3 judges for the match. First screen after clicking "New Game".

**Flow:**
1. Opponent is assigned randomly (shown in header)
2. Player browses/filters judges
3. Player selects 3 judges (or uses "Surprise Me")
4. Proceed to match

**Layout - Top to Bottom:**

| Element | Description |
|---------|-------------|
| Header | "Choose Your Judges" + opponent already shown |
| Filter Bar | Tag buttons (wrestling, politics, actors, tv, villains, sports, chaos) + "All" |
| View Toggle | Small icon to switch between Carousel and List view |
| Browse Area | Carousel (default) or List view of filtered judges |
| Selection Slots | 3 slots at bottom showing current picks |
| Action Buttons | "Surprise Me" + "Start Match" (enabled when 3 selected) |

**Carousel View (Default):**
- Shows 2-3 judges per "page" on mobile (like a hand of cards)
- Swipe horizontally to see next page
- Scales to 3-4 per page on larger screens
- Each judge card shows: portrait, name, tag icon
- Tap card to select/deselect

**List View (Alternative):**
- Compact scrollable rows
- Each row: small portrait + name + tag icon
- Fast scanning for players who know who they want
- Tap row to select/deselect

**Selection Slots:**
- 3 slots fixed at bottom
- Empty slots show placeholder outline
- Filled slots show judge portrait + name
- Tap filled slot to remove that judge

**"Let Destiny Decide" - Tarot Reading:**

Introduces **Destiny**, the mystic fortune teller character. Mort has an Amazing Jonathan-style dynamic with her - dismissive, exasperated, but stuck with her.

**The Scene:**
1. Player clicks "Let Destiny Decide" button
2. Mort sighs: "Fine... I'll get her."
3. Destiny's portrait fades in with mystical glow effect
4. 3 tarot cards appear face-down on a mystical surface
5. Destiny does dramatic buildup (typewriter dialogue)
6. Mort undercuts: "The card, Destiny. Flip the card."
7. Cards flip one-by-one (CSS rotateY transform)
8. Each card reveals judge portrait in tarot-style frame
9. Destiny gives cryptic one-liner per judge
10. Mort translates/undercuts each reveal
11. After all 3: Destiny vanishes, Mort brushes off glitter

**Sample Dialogue:**
- Destiny: "The spirits reveal... a force of CHAOS..."
- Mort: "It's Gordon Ramsay. Just say Gordon Ramsay."
- Destiny: "The fates have spoken. Your path is sealed."
- Mort: "Great. Thanks. Don't you have somewhere to haunt?"

**Animation (static art):**
- Destiny portrait: fade in with glow/pulse
- Cards: slide in, then CSS flip on reveal
- Judge portraits: scale up on reveal
- Destiny exit: fade out with particle/sparkle effect (CSS)

**Running Gags:**
- Destiny leaves mystical residue/glitter Mort complains about
- Mort questions if she's actually psychic
- Predictions that may or may not come true later

**Notes:**
- Judge intro lines: 3-5 prewritten signature lines per judge
- Comedy comes from dialogue timing, not animation
- Destiny may appear elsewhere for dramatic moments (TBD)
- "Let Destiny Decide" pulls from currently filtered pool (or all if no filter)

**General Notes:**
- Filter persists while browsing
- Judges already selected are visually marked in browse view

---

## Save System

### Checkpoint Approach (Fuller)

Save state at two points:
1. **Between rounds** - after results screen, before next ghost
2. **After drafting** - before judging begins

### Saved State Includes:
- Current opponent
- Selected judges (3)
- Round number
- Match score (player wins / AI wins)
- Which ghosts have been used this match
- Whose turn to go first
- If mid-round:
  - Current ghost
  - Player template + filled words
  - AI template + filled words

### Behavior:
- "Continue Game" appears on main menu only if save exists
- Resuming mid-round starts at judging phase
- Resuming between rounds starts at ghost intro

---

## Responsive Design

### Approach
- **Mobile-first** design
- Breakpoints TBD
- Desktop scales up, potentially uses horizontal space for side-by-side elements

---

## Character Images

### Plan
- Replace all emoji with square profile images
- Static images for each character:
  - Ghosts (132)
  - Judges (36)
  - Opponents (10)
  - Host (Mort)
  - Destiny (mystic fortune teller)
  - Player stand-in set (TBD)

### Image Specs
- Format: TBD (PNG, WebP?)
- Sizes: TBD (need to determine display sizes first)
- Aspect ratio: 1:1 (square)

---

## Screens To Design

- [x] Screen 1: API Key Entry
- [x] Screen 2: Main Menu
- [x] Screen 3: Judge Selection
- [ ] Screen 4: Match Opening
- [ ] Screen 5: Ghost Intro
- [ ] Screen 6: Drafting Phase
- [ ] Screen 7: Roast Presentation
- [ ] Screen 8: Judging Phase
- [ ] Screen 9: Results Screen
- [ ] Screen 10: Match End
- [ ] In-Game Menu Overlay
- [ ] Stats Screen
- [ ] Import/Export Screen

---

## Transitions

TBD - Define animations between screens/phases

---

## Color Palette

TBD - Define primary, secondary, accent colors

---

## Typography

TBD - Define font choices for headings, body, special elements
