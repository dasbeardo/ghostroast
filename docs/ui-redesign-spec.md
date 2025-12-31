# Roast Mortem - UI Redesign Specification

## Overview

Transform from "web app" feel to "premium game" experience.

### Core Principles
- **Persistent playfield** - never leave the stage
- **Fixed viewport** - no page scrolling, content flows within the stage
- **Modals for focus** - overlays direct user attention
- **Mobile-first** - primary target is mobile, scales up for desktop
- **Character portraits** - replace all emoji with square profile images

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
  - Player stand-in set (TBD)

### Image Specs
- Format: TBD (PNG, WebP?)
- Sizes: TBD (need to determine display sizes first)
- Aspect ratio: 1:1 (square)

---

## Screens To Design

- [x] Screen 1: API Key Entry
- [x] Screen 2: Main Menu
- [ ] Screen 3: Judge Selection
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
