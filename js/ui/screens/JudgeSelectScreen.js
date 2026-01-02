/**
 * Roast Mortem - Judge Select Screen
 * Players can pick 3 judges OR let Destiny decide.
 */

import { el, $, $$, clearElement } from '../dom.js';
import { Portrait } from '../components/Portrait.js';
import { TypeWriter, delay } from '../components/Dialogue.js';
import { JUDGES } from '../../../data/judges.js';
import { shuffle } from '../../utils.js';

const JUDGE_TAGS = ['all', 'wrestling', 'politics', 'actors', 'tv', 'villains', 'sports', 'chaos'];

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
  let activeFilter = 'all';
  let destinyMode = false;

  const screen = el('div', { class: 'screen screen-judge-select' }, [
    // Header
    el('div', { class: 'judge-select__header' }, [
      el('h2', { class: 'judge-select__title' }, ['Choose Your Judges']),
      el('div', { class: 'judge-select__subtitle' }, [
        `You face ${opponent?.name || 'AI Opponent'} ${opponent?.emoji || '🤖'}`
      ]),
    ]),

    // Main content area - switches between judge grid and destiny
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

  // Render the choose mode (pick judges yourself)
  function renderChooseMode() {
    destinyMode = false;
    clearElement(mainContent);
    clearElement(actionsContainer);

    // Toggle buttons
    mainContent.appendChild(el('div', { class: 'judge-select__mode-toggle' }, [
      el('button', {
        class: 'judge-select__mode-btn judge-select__mode-btn--active',
        onClick: () => renderChooseMode()
      }, ['Pick Judges']),
      el('button', {
        class: 'judge-select__mode-btn',
        onClick: () => renderDestinyMode()
      }, ['🔮 Ask Destiny']),
    ]));

    // Filters
    const filtersEl = el('div', { class: 'judge-select__filters' });
    JUDGE_TAGS.forEach(tag => {
      const btn = el('button', {
        class: `judge-select__filter ${tag === activeFilter ? 'judge-select__filter--active' : ''}`,
        onClick: () => {
          activeFilter = tag;
          renderChooseMode();
        }
      }, [tag === 'all' ? 'All' : tag.charAt(0).toUpperCase() + tag.slice(1)]);
      filtersEl.appendChild(btn);
    });
    mainContent.appendChild(filtersEl);

    // Judge grid
    const gridEl = el('div', { class: 'judge-select__grid' });
    const filteredJudges = activeFilter === 'all'
      ? JUDGES
      : JUDGES.filter(j => j.tags && j.tags.includes(activeFilter));

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
    actionsContainer.appendChild(el('button', {
      class: 'btn btn--primary btn--full',
      disabled: selectedJudges.length !== 3,
      onClick: () => {
        if (selectedJudges.length === 3 && onConfirm) {
          onConfirm(selectedJudges);
        }
      }
    }, ['Start Match']));

    updateSlots();
  }

  // Render destiny mode
  function renderDestinyMode() {
    destinyMode = true;
    clearElement(mainContent);
    clearElement(actionsContainer);

    // Toggle buttons
    mainContent.appendChild(el('div', { class: 'judge-select__mode-toggle' }, [
      el('button', {
        class: 'judge-select__mode-btn',
        onClick: () => renderChooseMode()
      }, ['Pick Judges']),
      el('button', {
        class: 'judge-select__mode-btn judge-select__mode-btn--active',
        onClick: () => renderDestinyMode()
      }, ['🔮 Ask Destiny']),
    ]));

    // Destiny character
    const destinySection = el('div', { class: 'judge-select__destiny' }, [
      el('div', { class: 'judge-select__destiny-portrait' }, [
        Portrait({
          emoji: DESTINY.emoji,
          size: 'xl',
          spotlight: true
        }),
      ]),
      el('div', { class: 'judge-select__destiny-name' }, [DESTINY.name]),
      el('div', { class: 'judge-select__destiny-title' }, [DESTINY.title]),
      el('div', { class: 'judge-select__destiny-dialogue', id: 'destiny-dialogue' }, [
        '"Tap me to reveal your fated panel..."'
      ]),
    ]);

    // Make destiny tappable
    destinySection.addEventListener('click', async () => {
      await revealDestiny();
    });

    mainContent.appendChild(destinySection);

    // Actions - only confirm if judges selected
    actionsContainer.appendChild(el('button', {
      class: 'btn btn--primary btn--full',
      disabled: selectedJudges.length !== 3,
      id: 'destiny-confirm-btn',
      onClick: () => {
        if (selectedJudges.length === 3 && onConfirm) {
          onConfirm(selectedJudges);
        }
      }
    }, ['Accept Your Fate']));

    updateSlots();
  }

  // Reveal destiny's choice
  async function revealDestiny() {
    const dialogueEl = $('#destiny-dialogue', screen);
    const confirmBtn = $('#destiny-confirm-btn', screen);

    if (!dialogueEl) return;

    // Clear previous selection
    selectedJudges = [];
    updateSlots();

    // Pick random line
    const line = DESTINY.lines[Math.floor(Math.random() * DESTINY.lines.length)];

    // Type the line
    dialogueEl.textContent = '"';
    const typeWriter = new TypeWriter(dialogueEl, { speed: 25 });
    await typeWriter.type(line);
    dialogueEl.textContent = `"${line}"`;

    await delay(500);

    // Reveal judges one by one
    const shuffled = shuffle([...JUDGES]);
    const chosen = shuffled.slice(0, 3);

    const slots = $$('.judge-select__slot', screen);

    for (let i = 0; i < 3; i++) {
      await delay(400);
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

    // Enable confirm button
    if (confirmBtn) {
      confirmBtn.disabled = false;
    }
  }

  // Toggle judge selection
  function toggleJudge(judge) {
    const idx = selectedJudges.findIndex(j => j.id === judge.id);
    if (idx >= 0) {
      selectedJudges.splice(idx, 1);
    } else if (selectedJudges.length < 3) {
      selectedJudges.push(judge);
    }
    renderChooseMode();
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
      } else {
        slot.classList.remove('judge-select__slot--filled');
        slot.textContent = '?';
      }
    });
  }

  // External API
  screen.setSelectedJudges = (judgeList) => {
    selectedJudges = [...judgeList];
    updateSlots();
    if (destinyMode) {
      const confirmBtn = $('#destiny-confirm-btn', screen);
      if (confirmBtn) confirmBtn.disabled = selectedJudges.length !== 3;
    } else {
      renderChooseMode();
    }
  };

  screen.getSelectedJudges = () => selectedJudges;

  // Initial render
  renderChooseMode();

  return screen;
}

export default JudgeSelectScreen;
