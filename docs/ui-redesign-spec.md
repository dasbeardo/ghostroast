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
- **Tap to skip** - tapping screen speeds up or skips current animation/dialogue

### Tap-to-Skip Behavior

**Global rule:** Tapping anywhere during animations:
- If text is typing → complete it instantly
- If waiting for next beat → advance to next beat
- If animation in progress → complete it instantly

Keeps pacing in player's control. Veterans can blast through, first-timers enjoy the show.

### Tap Portrait for Info

**Global interaction:** Tapping any character portrait opens an info overlay.

| Portrait | Info Displayed |
|----------|----------------|
| Player | Stats popup (wins, streaks, high scores) |
| Opponent | Bio + head-to-head history vs player |
| Judges | Personality blurb, scoring tendencies |
| Ghost | Full bio card (name, cause of death, 3 bio lines) |
| Mort | Easter egg - fun facts about the host |
| Destiny | Easter egg - cryptic fortune or backstory |

Small overlay/tooltip style. Tap elsewhere to dismiss.

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

**Beat-by-Beat Breakdown:**

*Beat 1 - Mort's Reluctance*
- [Feature modal: Mort's image + text box]
- Mort: "Oof... Fine... I'll go get her."
- [Mort's image fades away]

*Beat 2 - Mort Off-Screen*
- [Text box, no image]
- Mort: "DESTINY! ...Destiny, we need you out here!"
- [pause]
- Mort: "Yes, it's for a reading. No, I don't— just come out here."

*Beat 3 - Destiny Arrives*
- [Destiny's image fades in with glow, text box]
- Destiny: "The veil between worlds grows thin tonight..."
- [Mort's image fades back in, smaller/to the side]
- Mort: "It's a Tuesday."

*Beat 4 - The Cards Appear*
- [3 tarot cards slide in face-down, arranged below portraits]
- Destiny: "Three souls shall be revealed... three who will pass judgment..."
- Mort: "That's the idea, yes."

*Beats 5, 6, 7 - Card Reveals (one per judge)*
- Destiny builds dramatic tension
- Card flips (CSS rotateY), judge portrait revealed in tarot frame
- Destiny: cryptic one-liner about judge
- Mort: undercuts/translates
- Repeat x3

*Beat 8 - Destiny's Exit*
- Destiny: "The fates have spoken."
- [Destiny fades out with sparkle effect]
- Mort: [brushing off] "Every time with the glitter..."

**Animation (static art):**
- Mort/Destiny portraits: fade in/out transitions
- Cards: slide in, CSS rotateY flip on reveal
- Judge portraits: scale up on reveal within tarot frame
- Destiny exit: fade out with CSS particle/sparkle effect

**Running Gags:**
- Destiny leaves mystical residue/glitter Mort complains about
- Mort questions if she's actually psychic
- Predictions that may or may not come true later

**Notes:**
- Judge intro lines: 3-5 prewritten signature lines per judge (Destiny's cryptic version)
- Dialogue variety versions to be added later
- Comedy comes from dialogue timing, not animation
- Destiny may appear elsewhere for dramatic moments (TBD)
- "Let Destiny Decide" pulls from currently filtered pool (or all if no filter)

**General Notes:**
- Filter persists while browsing
- Judges already selected are visually marked in browse view

---

### Screen 4: Match Opening

**Purpose:** Transition into the match. Mort goes full host mode - introduces the show, himself, judges, and contestants.

**Context:** Judges are selected. Persistent UI shell now visible (but dimmed for modal focus).

**Beat-by-Beat Breakdown:**

*Beat 1 - Show Intro*
- [Modal focus on Mort, background dimmed]
- Mort: "Ladies, gentlemen, and spirits of all ages..."
- Mort: "Welcome to ROAST MORTEM!"

*Beat 2 - Host Intro*
- Mort: "I'm your host, Mortimer Holloway."
- Mort: "Let's meet tonight's contestants."

*Beat 3 - Contestant Intro*
- [Player portrait slides in from left, Opponent from right]
- Mort: "[Player Name]... versus... [Opponent Name]!"
- [Portraits settle into persistent header positions]

*Beat 4 - Judge Panel Intro*
- Mort: "And your judges tonight..."
- [Each judge fades in one-by-one with quick intro line]
- Judge 1: [Quick intro line/joke]
- Judge 2: [Quick intro line/joke]
- Judge 3: [Quick intro line/joke]

*Beat 5 - Stakes & Start*
- Mort: "Best of three. May the best roast win."
- [Button appears: "Start Round 1" OR auto-advance after brief pause]

**Animation:**
- Modal overlay dims persistent UI shell
- Contestant portraits slide in from sides
- Judge portraits fade in sequentially
- All uses CSS transitions/transforms

**Notes:**
- Each judge has 5-10 prewritten quick intro lines (rotates)
- If judges selected via Destiny, these intros are shorter (already introduced)
- Total runtime: ~10-15 seconds if tapping through
- Dialogue variety versions to be added later

---

### Screen 5: Ghost Intro

**Purpose:** Introduce the ghost to be roasted this round. Happens at the start of each round.

**Layout:**
- Mort: top-left, smaller (narrator position)
- Ghost: center-bottom-right, larger (spotlight position)
- Persistent UI shell visible behind

**Beat-by-Beat Breakdown:**

*Beat 1 - Mort Sets Up*
- [Mort in narrator position, top-left]
- Mort: "Our next dearly departed..."
- Mort: "[Ghost Name]. Cause of death: [Cause]."

*Beat 2 - Ghost Appears*
- [Ghost portrait fades in with floaty/wobbly animation]
- Ghost settles into position with subtle continuous bobbing (CSS keyframe)
- Position: center-bottom-right, larger than Mort

*Beat 3 - Bio Delivery*
- Mort reads bio lines one-by-one (typewriter, comedic timing)
- Mort: "[Bio line 1]"
- [beat]
- Mort: "[Bio line 2]"
- [beat]
- Mort: "[Bio line 3]"

*Beat 4 - Tale of the Tape*
- [Ghost bio card appears next to ghost portrait]
- All 3 bio lines displayed together for reference
- Card shows: Name, Cause of Death, Bio lines

*Beat 5 - Mort Reaction*
- Mort: [Reaction line - generic or ghost-tagged]
- Generic examples: "Well that's... something." / "They really lived, didn't they?"
- Tagged lines: specific jokes for certain ghosts

*Beat 6 - Ready State*
- [Persistent layout fully active]
- "Start Roasting" button appears
- All portraits now tappable for info
- Player can take their time or proceed immediately

**Animation:**
- Ghost fade-in with wobbly/floaty effect (translateY oscillation + slight rotate)
- Subtle continuous bobbing while ghost is on screen
- Bio card slides in or fades in
- All CSS-based

**Notes:**
- Ghost-tagged Mort reactions: lines flagged for specific ghosts
- Generic Mort reactions: work for any ghost (larger pool)
- System picks ghost-tagged line if available, else generic
- Ghost bio card remains accessible via tap throughout round

---

### Screen 6: Drafting Phase

**Purpose:** Player fills in their template by selecting words for each blank. Core gameplay.

**Layout:**
- Player's template: center/main focus, large and readable
- Ghost: small portrait in corner (tappable for full bio)
- Persistent UI shell visible
- Opponent's template/progress: NOT shown

**Flow:**

*Beat 1 - Template Appears*
- Player's template displayed with blanks highlighted
- First blank is auto-selected (pulsing or highlighted)
- Ghost shrinks to corner position
- Reroll counter visible (default: 1 available)

*Beat 2+ - Word Selection (per blank)*
- First blank highlighted → tap opens word picker modal
- Select word → modal closes, word fills blank
- Next blank auto-highlights (forced sequential order)
- Repeat until all blanks filled

*Completion State*
- All blanks filled → "Lock In Roast" button appears
- Player can tap filled blanks to change choice (reopens picker for that slot)
- "Lock In" → save checkpoint, proceed to presentation

**Word Picker Modal:**
- Bottom sheet style (slides up from bottom, mobile-friendly)
- Grid of word chips (tappable buttons)
- Scroll if more words than fit on screen
- Ghost-themed words appear more often (not visually distinct)
- "Shuffle" button to reroll word options
- Close/cancel button to back out without selecting

**Reroll/Shuffle Mechanic:**
- Limited rerolls per match (default: 1)
- Reroll counter visible during drafting
- Tapping "Shuffle" in modal uses a reroll, refreshes word options
- When rerolls exhausted, shuffle button disabled/hidden
- Reroll count could be a setting (0, 1, 2, unlimited)

**Animation:**
- Word picker slides up from bottom
- Selected word animates into blank (quick scale/pop)
- Blanks pulse when active
- All CSS-based

**Settings (Future):**
- Blank selection order: Sequential (default) vs Free choice
- Rerolls per match: 0, 1, 2, unlimited

**Notes:**
- AI picks all its words immediately (random from pools) before player drafts
- No timer currently (may add as option later)
- Save checkpoint triggers after "Lock In" pressed

---

### Screen 7 & 8: Roast Presentation & Judging

**Purpose:** Present both roasts and get judge reactions/scores. Combined flow since they're tightly linked.

**API Optimization:**
- API call fires immediately on "Lock In Roast" button
- Judge responses loading in background during roast presentations
- Minimizes perceived wait time before judging

**Visual Style:**
- 80s/90s video game aesthetic
- Chunky, bold speech bubbles
- Retro arcade feel

**Layout:**
- Screen dims (modal focus)
- Center: Speaker's portrait (larger) + retro speech bubble
- Persistent header: current roaster spotlighted/highlighted
- Ghost: small, corner position

---

**FIRST ROAST FLOW:**

*Beat 1 - Roaster Introduction*
- [Who goes first alternates each round]
- Mort: "First up... [Player/Opponent Name]!"
- Current roaster spotlighted in header

*Beat 2 - Roast Delivery*
- [Speaker portrait center stage, speech bubble appears]
- Roast text types out in chunky retro speech bubble
- Tap to complete typing instantly

*Beat 3 - Mort Transition*
- Mort: [Quick reaction - "Ooh!" / "Bold move." / "Interesting choice."]
- Mort: "Judges?"

*Beat 4 - Judge 1 Reacts*
- [Judge 1 portrait spotlights]
- Reaction types out in speech bubble
- Score pops in after reaction complete (e.g., "7/10")
- Tap to speed through

*Beat 5 - Judge 2 Reacts*
- [Judge 2 portrait spotlights]
- Same flow: reaction → score pops in

*Beat 6 - Judge 3 Reacts*
- [Judge 3 portrait spotlights]
- Same flow: reaction → score pops in
- First roast total now visible

---

**SECOND ROAST FLOW:**

*Beat 7 - Transition*
- Mort: "And now... [Player/Opponent Name]!"
- Second roaster spotlighted

*Beat 8 - Roast Delivery*
- Same flow as first roast
- Speech bubble with roast text

*Beat 9 - Mort Transition*
- Mort: [Reaction]
- Mort: "Judges?"

*Beats 10-12 - Judges React*
- Same one-by-one flow
- Each score pops after reaction
- Second roast total visible after Judge 3

---

**Animation:**
- Screen dim for modal focus
- Portrait spotlight (scale up slightly, glow effect)
- Retro speech bubble slides/pops in
- Text typewriter effect
- Score pop-in (scale bounce effect)
- All CSS-based

**Notes:**
- Who goes first alternates each round (tracked in state)
- Judges see context of first roast when judging second (API handles this)
- Same flow for both roasts - can revisit if feels repetitive in practice
- Tap-to-skip applies throughout
- Running score totals visible in UI

---

### Screen 9: Results Screen

**Purpose:** Show round results, declare round winner, allow drill-down into judge details.

**Layout:**
- Match score: prominent at top (e.g., "1-0" in best of 3)
- Mort: reaction/commentary area
- Round score cards: side-by-side (Player score | Opponent score)
- Continue button: fixed position (always same spot in UI)

**Elements:**

*Match Score*
- Best-of-3 progress displayed prominently
- Updates after winner announced

*Mort's Reaction*
- Announces round winner
- Mort: "[Winner] takes the round!" / "And [Player] pulls ahead!"
- Variety lines for different scenarios (close match, blowout, tie-breaker, etc.)

*Round Score Cards (Side-by-Side)*
- Player card: portrait + round score total
- Opponent card: portrait + round score total
- Winner highlighted/glowing
- **Tappable** - opens detail modal

*Score Card Detail Modal (on tap)*
- Expands selected card to modal focus
- Shows the roast text
- Swipeable cards for each judge:
  - Judge portrait
  - Judge reaction to this roast
  - Score given
- Final card: Judge banter (judges reacting to each other)
- Swipe through or use dots/arrows to navigate
- Tap outside or X to close

*Continue Button*
- Fixed position (bottom of screen, always same spot)
- "Next Round" (if match continues)
- "Final Results" (if match decided)

**Judge Banter:**
- After individual scores, judges have brief banter exchange
- API returns this as part of judging response
- Shows as final swipeable card in detail modal
- Adds personality, judges react to each other's takes

**Animation:**
- Score cards slide in from sides
- Winner card glows/pulses
- Detail modal expands from tapped card
- Swipe transitions between judge cards
- All CSS-based

**Notes:**
- Both score cards tappable for their respective details
- Judge banter generated each round (part of API call)
- Continue button always in same position for muscle memory
- Match score updates after Mort announces winner

---

### Screen 10: Match End

**Purpose:** Conclude the match, show final results, provide options to continue playing.

**Design Philosophy:**
- Low-key, scaled down - "the network" is cheap
- No elaborate victory fanfare
- Quick stats, simple send-off, move on

**Layout:**
- Final match score: prominent (e.g., "2-1")
- Winner announcement (simple, not flashy)
- Match stats summary
- Mort's closing
- Action buttons: fixed position at bottom

**Elements:**

*Winner Announcement*
- Simple text: "[Player/Opponent] WINS!"
- Winner portrait with subtle glow (nothing over-the-top)
- Loser portrait slightly dimmed

*Match Stats Summary*
- Total points across all rounds (Player vs Opponent)
- Rounds won/lost
- Maybe: closest round, biggest blowout
- Tappable for more detail (per-round breakdown)

*Mort's Closing*
- Quick send-off, nothing spectacular
- Mort: "And that's a wrap, folks."
- Variety lines for win/loss scenarios
- Maybe a quip about the opponent or match quality

*Action Buttons (fixed position)*
- "Play Again" - new match, same flow (new opponent, judge selection)
- "Main Menu" - return to menu
- "View Stats" - open full stats screen

**Animation:**
- Minimal - winner portrait subtle glow
- Stats fade/slide in
- All understated to match cheap network vibe

**Notes:**
- No elaborate victory celebration
- No MVP judge or complex awards
- Keep it quick - players who want depth can tap into stats
- Clears save data (match complete, no continue needed)

---

### In-Game Menu Overlay

**Purpose:** Pause menu accessible at any time during a match.

**Accessed via:** Menu button in persistent UI shell (always visible)

**Visual Style:**
- Overlay that dims the playfield
- Slides in from side or fades over center
- Simple, quick to access and dismiss

**Options:**
| Button | Action |
|--------|--------|
| Resume | Close menu, return to game |
| Settings | Opens Settings modal (same as main menu) |
| Forfeit Match | Confirmation prompt → counts as loss → main menu |
| Main Menu | If mid-match: "Save and Quit" prompt → saves checkpoint → main menu |

**Forfeit Confirmation:**
- "Are you sure? This will count as a loss."
- "Forfeit" / "Cancel" buttons
- No save - match ends as loss

**Save and Quit:**
- Only appears if mid-match
- Saves current checkpoint (per save system rules)
- Returns to main menu
- "Continue Game" will be available next time

**Animation:**
- Slide in from right or fade overlay
- Quick transitions
- Tap outside to close (same as Resume)

---

### Stats Screen

**Purpose:** Display comprehensive player statistics.

**Accessed from:** Main Menu, Match End screen, In-Game Menu (via Settings?)

**Layout:**
- Scrollable content (exception to fixed viewport - stats can be long)
- Organized sections
- Close/back button

**Stats Displayed:**

*Overall Record*
- Total matches: W-L
- Win percentage
- Current win streak
- Longest win streak

*Round Stats*
- Total rounds: W-L
- Average score per round
- Highest single round score

*Opponent Records*
- Head-to-head vs each opponent
- Displayed as list with W-L per opponent

*Judge Stats*
- Average score from each judge
- Maybe: favorite judge (highest avg), harshest judge (lowest avg)

*Ghost Stats*
- Total unique ghosts roasted
- Maybe: ghosts roasted count

*History*
- Last 10 matches (W/L, opponent, score)
- Tappable for details?

**Animation:**
- Minimal - fade in sections
- Smooth scroll

**Notes:**
- All stats persisted in localStorage
- Same stats system already exists - this is just the UI

---

### Import/Export Screen

**Purpose:** Backup and restore player save data.

**Accessed from:** Main Menu

**Layout:**
- Simple modal or full screen
- Two main sections: Export and Import

**Export Section:**
- "Export Save Data" button
- Generates JSON string of all localStorage data
- Copy to clipboard button
- Maybe: shows preview of data being exported

**Import Section:**
- Text area to paste JSON data
- "Import Save Data" button
- Validation before import
- Confirmation: "This will overwrite your current data. Continue?"
- Success/error feedback

**Data Included:**
- Player name
- API key (optional - security consideration)
- All stats
- Current save checkpoint (if exists)
- Settings preferences

**Animation:**
- Standard modal transitions
- Success/error state feedback (checkmark, shake, etc.)

**Notes:**
- Useful for moving between devices
- Backup before risky operations
- JSON format human-readable for debugging

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
- [x] Screen 4: Match Opening
- [x] Screen 5: Ghost Intro
- [x] Screen 6: Drafting Phase
- [x] Screen 7 & 8: Roast Presentation & Judging
- [x] Screen 9: Results Screen
- [x] Screen 10: Match End
- [x] In-Game Menu Overlay
- [x] Stats Screen
- [x] Import/Export Screen

---

## Transitions

TBD - Define animations between screens/phases

---

## Color Palette

TBD - Define primary, secondary, accent colors

---

## Typography

TBD - Define font choices for headings, body, special elements

---

## Future Ideas

### Directed Roasts / Judge Targeting

**Concept:** Player can optionally tag their roast as "directed at" a specific judge.

**Mechanics:**
- During drafting, optional "Dedicate this roast to..." selector
- Judges have relationship data:
  - Loves/hates certain other judges
  - Sensitive topics
  - Ego triggers
- API prompt includes context: "This roast referenced you" or "This roast mocked Tommy, who you adore"

**Dynamic Reactions:**
- Judge being roasted: defensive, flattered, or offended
- Allied judge: defends their friend, scores harshly
- Rival judge: loves seeing the other mocked, scores generously
- Banter gets personal: "Did they just come at ME?"

**Emergent Moments:**
- Roast about Tommy → Kanye defends him → Ramsay mocks Kanye
- Reference a judge's catchphrase → they love it or hate the mockery
- Play judges against each other strategically

**Implementation Notes:**
- Judge relationship tags in data (allies, rivals, sensitive topics)
- Conditional logic in API prompts
- Could affect scoring or just reactions
- Adds strategy layer without changing core gameplay

---

### Robot Judges / AI Taking Jobs in the Afterlife

**Concept:** The celebrity judges are actually robots/AI impersonating the real celebrities.

**Lore:**
- Even in the afterlife, AI is taking jobs
- "The network" is too cheap to hire real celebrity ghosts
- These are budget robot impersonators
- Explains any inconsistencies in judge behavior

**Potential Reveals:**
- Occasional glitches in judge dialogue
- Mort makes offhand comments about "the talent budget"
- Easter eggs where judges malfunction momentarily
- Maybe a secret ending where you discover the truth

**Tone:**
- Dark comedy commentary on AI
- Fits the "cheap network" aesthetic
- Self-aware meta humor about AI-generated content
