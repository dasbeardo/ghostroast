/**
 * Roast Mortem - Judge Select Screen
 * Redesigned with category grid first, then judges in category.
 * "LET DESTINY DECIDE?" button for theatrical random selection.
 */

import { el, $, $$, clearElement } from '../dom.js';
import { Portrait } from '../components/Portrait.js';
import { TypeWriter, delay } from '../components/Dialogue.js';
import { JUDGES, JUDGE_TAGS } from '../../../data/judges.js';
import { shuffle } from '../../utils.js';

// Category card data with emojis and display names
const CATEGORIES = [
  { tag: 'wrestling', name: 'Wrestling', emoji: '🤼', color: '#8B0000' },
  { tag: 'politics', name: 'Politics', emoji: '🏛️', color: '#1a3a5c' },
  { tag: 'actors', name: 'Actors', emoji: '🎭', color: '#4a2a6a' },
  { tag: 'tv', name: 'TV Stars', emoji: '📺', color: '#2a4a3a' },
  { tag: 'villains', name: 'Villains', emoji: '😈', color: '#3a1a3a' },
  { tag: 'sports', name: 'Sports', emoji: '🏆', color: '#5a4a1a' },
  { tag: 'chaos', name: 'Chaos', emoji: '🌪️', color: '#4a1a1a' },
];

// Destiny character - mysterious fortune teller
const DESTINY = {
  name: 'Destiny',
  emoji: '🔮',
  title: 'The All-Seeing',
  lines: [
    "The spirits whisper... I see your judges clearly now...",
    "Fate has already decided. You just needed me to reveal it...",
    "The cosmic die is cast... Your panel assembles...",
    "I peer beyond the veil... These three shall judge your worth...",
    "The threads of fate intertwine... Your judges emerge from the mist..."
  ]
};

/**
 * Render the judge selection screen
 */
export function JudgeSelectScreen({ opponent, onConfirm, onDestiny }) {
  let selectedJudges = [];
  let currentView = 'categories'; // 'categories' or 'judges'
  let activeCategory = null;
  let destinyRevealing = false;

  const screen = el('div', { class: 'screen screen-judge-select' }, [
    // Header
    el('div', { class: 'judge-select__header' }, [
      el('h2', { class: 'judge-select__title' }, ['Choose Your Judges']),
      el('div', { class: 'judge-select__subtitle' }, [
        `You face ${opponent?.name || 'AI Opponent'} ${opponent?.emoji || '🤖'}`
      ]),
    ]),

    // Destiny button at top
    el('div', { class: 'judge-select__destiny-row' }, [
      el('button', {
        class: 'btn btn--destiny',
        id: 'destiny-btn',
        onClick: () => triggerDestiny()
      }, [
        el('span', { class: 'destiny-btn__icon' }, ['🔮']),
        el('span', { class: 'destiny-btn__text' }, ['LET DESTINY DECIDE?']),
        el('span', { class: 'destiny-btn__icon' }, ['🔮']),
      ]),
    ]),

    // Main content area - switches between categories and judges
    el('div', { class: 'judge-select__main', id: 'main-content' }),

    // Selection slots (always visible)
    el('div', { class: 'judge-select__slots-section' }, [
      el('div', { class: 'judge-select__slots-label' }, ['YOUR PANEL']),
      el('div', { class: 'judge-select__slots', id: 'slots' }, [
        el('div', { class: 'judge-select__slot', data: { slot: '0' } }, ['?']),
        el('div', { class: 'judge-select__slot', data: { slot: '1' } }, ['?']),
        el('div', { class: 'judge-select__slot', data: { slot: '2' } }, ['?']),
      ]),
    ]),

    // Actions
    el('div', { class: 'judge-select__actions', id: 'actions' }),
  ]);

  const mainContent = $('#main-content', screen);
  const slotsContainer = $('#slots', screen);
  const actionsContainer = $('#actions', screen);
  const destinyBtn = $('#destiny-btn', screen);

  // Render category grid
  function renderCategories() {
    currentView = 'categories';
    activeCategory = null;
    clearElement(mainContent);
    clearElement(actionsContainer);

    const gridEl = el('div', { class: 'judge-select__category-grid' });

    CATEGORIES.forEach(cat => {
      const judgeCount = JUDGES.filter(j => j.tags && j.tags.includes(cat.tag)).length;

      const card = el('div', {
        class: 'judge-select__category-card',
        style: `--category-color: ${cat.color}`,
        onClick: () => renderJudgesInCategory(cat)
      }, [
        el('div', { class: 'category-card__emoji' }, [cat.emoji]),
        el('div', { class: 'category-card__name' }, [cat.name]),
        el('div', { class: 'category-card__count' }, [`${judgeCount} judges`]),
      ]);
      gridEl.appendChild(card);
    });

    mainContent.appendChild(gridEl);

    // Actions - confirm button
    renderActions();
    updateSlots();
  }

  // Render judges in a specific category
  function renderJudgesInCategory(category) {
    currentView = 'judges';
    activeCategory = category;
    clearElement(mainContent);
    clearElement(actionsContainer);

    // Back button header
    const headerEl = el('div', { class: 'judge-select__category-header' }, [
      el('button', {
        class: 'judge-select__back-btn',
        onClick: () => renderCategories()
      }, ['← Back']),
      el('div', { class: 'judge-select__category-title' }, [
        el('span', { class: 'category-title__emoji' }, [category.emoji]),
        el('span', {}, [category.name]),
      ]),
    ]);
    mainContent.appendChild(headerEl);

    // Judge grid
    const gridEl = el('div', { class: 'judge-select__grid' });
    const filteredJudges = JUDGES.filter(j => j.tags && j.tags.includes(category.tag));

    filteredJudges.forEach(judge => {
      const isSelected = selectedJudges.some(j => j.id === judge.id);
      const isDisabled = selectedJudges.length >= 3 && !isSelected;

      const card = el('div', {
        class: `judge-select__judge ${isSelected ? 'judge-select__judge--selected' : ''} ${isDisabled ? 'judge-select__judge--disabled' : ''}`,
        onClick: () => !isDisabled && toggleJudge(judge)
      }, [
        Portrait({
          emoji: judge.emoji,
          size: 'md',
          selected: isSelected,
          tappable: !isDisabled
        }),
        el('span', { class: 'judge-select__judge-name' }, [judge.name])
      ]);
      gridEl.appendChild(card);
    });
    mainContent.appendChild(gridEl);

    // Actions
    renderActions();
    updateSlots();
  }

  // Render action buttons
  function renderActions() {
    clearElement(actionsContainer);
    actionsContainer.appendChild(el('button', {
      class: 'btn btn--primary btn--full',
      disabled: selectedJudges.length !== 3,
      onClick: () => {
        if (selectedJudges.length === 3 && onConfirm) {
          onConfirm(selectedJudges);
        }
      }
    }, ['Start Match']));
  }

  // Toggle judge selection
  function toggleJudge(judge) {
    const idx = selectedJudges.findIndex(j => j.id === judge.id);
    if (idx >= 0) {
      selectedJudges.splice(idx, 1);
    } else if (selectedJudges.length < 3) {
      selectedJudges.push(judge);
    }

    // Re-render current view
    if (currentView === 'judges' && activeCategory) {
      renderJudgesInCategory(activeCategory);
    } else {
      renderCategories();
    }
  }

  // Update selection slots
  function updateSlots() {
    const slots = $$('.judge-select__slot', screen);
    slots.forEach((slot, i) => {
      clearElement(slot);
      slot.classList.remove('judge-select__slot--reveal');
      if (selectedJudges[i]) {
        slot.classList.add('judge-select__slot--filled');
        slot.appendChild(Portrait({
          emoji: selectedJudges[i].emoji,
          size: 'md'
        }));
        // Make slot clickable to remove judge
        slot.onclick = () => {
          selectedJudges.splice(i, 1);
          if (currentView === 'judges' && activeCategory) {
            renderJudgesInCategory(activeCategory);
          } else {
            renderCategories();
          }
        };
      } else {
        slot.classList.remove('judge-select__slot--filled');
        slot.textContent = '?';
        slot.onclick = null;
      }
    });
  }

  // Trigger Destiny reveal sequence
  async function triggerDestiny() {
    if (destinyRevealing) return;
    destinyRevealing = true;

    // Disable destiny button during reveal
    destinyBtn.disabled = true;
    destinyBtn.classList.add('btn--destiny--revealing');

    // Clear selection
    selectedJudges = [];
    updateSlots();

    // Show destiny reveal screen
    clearElement(mainContent);

    const destinySection = el('div', { class: 'judge-select__destiny-reveal' }, [
      el('div', { class: 'destiny-reveal__portrait' }, [
        Portrait({
          emoji: DESTINY.emoji,
          size: 'xl',
          spotlight: true
        }),
      ]),
      el('div', { class: 'destiny-reveal__name' }, [DESTINY.name]),
      el('div', { class: 'destiny-reveal__title' }, [DESTINY.title]),
      el('div', { class: 'destiny-reveal__dialogue', id: 'destiny-dialogue' }),
    ]);
    mainContent.appendChild(destinySection);

    const dialogueEl = $('#destiny-dialogue', screen);

    // Pick random line and type it
    const line = DESTINY.lines[Math.floor(Math.random() * DESTINY.lines.length)];
    dialogueEl.textContent = '"';
    const typeWriter = new TypeWriter(dialogueEl, { speed: 25 });
    await typeWriter.type(line);
    dialogueEl.textContent = `"${line}"`;

    await delay(600);

    // Reveal judges one by one
    const shuffled = shuffle([...JUDGES]);
    const chosen = shuffled.slice(0, 3);
    const slots = $$('.judge-select__slot', screen);

    for (let i = 0; i < 3; i++) {
      await delay(500);
      selectedJudges.push(chosen[i]);

      // Animate the slot
      const slot = slots[i];
      slot.classList.add('judge-select__slot--reveal');
      clearElement(slot);
      slot.classList.add('judge-select__slot--filled');
      slot.appendChild(Portrait({
        emoji: chosen[i].emoji,
        size: 'md'
      }));
    }

    await delay(400);

    // Re-enable button and render actions
    destinyBtn.disabled = false;
    destinyBtn.classList.remove('btn--destiny--revealing');
    destinyRevealing = false;

    // Show confirm button
    renderActions();

    // Update slot click handlers
    updateSlots();
  }

  // External API for setting judges programmatically
  screen.setSelectedJudges = (judgeList) => {
    selectedJudges = [...judgeList];
    updateSlots();
    renderActions();
  };

  screen.getSelectedJudges = () => selectedJudges;

  // Initial render
  renderCategories();

  return screen;
}

export default JudgeSelectScreen;
