/**
 * Roast Mortem - Judge Select Screen
 */

import { el, $, $$, clearElement } from '../dom.js';
import { Portrait } from '../components/Portrait.js';
import { JUDGES } from '../../../data/judges.js';

const JUDGE_TAGS = ['all', 'wrestling', 'politics', 'actors', 'tv', 'villains', 'sports', 'chaos'];

/**
 * Render the judge selection screen
 * @param {Object} options
 * @param {Object} options.opponent - Opponent data
 * @param {Function} options.onConfirm - Callback with selected judges
 * @param {Function} options.onDestiny - Callback for random selection
 * @returns {HTMLElement}
 */
export function JudgeSelectScreen({ opponent, onConfirm, onDestiny }) {
  let selectedJudges = [];
  let activeFilter = 'all';

  const screen = el('div', { class: 'screen screen-judge-select' }, [
    // Header
    el('div', { class: 'judge-select__header' }, [
      el('h2', { class: 'judge-select__title' }, ['Choose Your Judges']),
      el('div', { class: 'judge-select__opponent' }, [
        `vs ${opponent?.name || 'AI Opponent'}`
      ]),
    ]),

    // Filters
    el('div', { class: 'judge-select__filters' }),

    // Judge grid
    el('div', { class: 'judge-select__grid' }),

    // Selection slots
    el('div', { class: 'judge-select__slots' }, [
      el('div', { class: 'judge-select__slot', data: { slot: '0' } }, ['?']),
      el('div', { class: 'judge-select__slot', data: { slot: '1' } }, ['?']),
      el('div', { class: 'judge-select__slot', data: { slot: '2' } }, ['?']),
    ]),

    // Actions
    el('div', { class: 'judge-select__actions' }, [
      el('button', {
        class: 'btn btn--secondary',
        onClick: () => {
          if (onDestiny) onDestiny();
        }
      }, ['Let Destiny Decide']),
      el('button', {
        class: 'btn btn--primary',
        disabled: true,
        onClick: () => {
          if (selectedJudges.length === 3 && onConfirm) {
            onConfirm(selectedJudges);
          }
        }
      }, ['Start Match']),
    ]),
  ]);

  const filtersContainer = $('.judge-select__filters', screen);
  const gridContainer = $('.judge-select__grid', screen);
  const slots = $$('.judge-select__slot', screen);
  const confirmBtn = $('.btn--primary', screen);

  // Render filters
  function renderFilters() {
    clearElement(filtersContainer);
    JUDGE_TAGS.forEach(tag => {
      const btn = el('button', {
        class: `judge-select__filter ${tag === activeFilter ? 'judge-select__filter--active' : ''}`,
        onClick: () => {
          activeFilter = tag;
          renderFilters();
          renderGrid();
        }
      }, [tag === 'all' ? 'All' : tag.charAt(0).toUpperCase() + tag.slice(1)]);
      filtersContainer.appendChild(btn);
    });
  }

  // Render judge grid
  function renderGrid() {
    clearElement(gridContainer);
    const filteredJudges = activeFilter === 'all'
      ? JUDGES
      : JUDGES.filter(j => j.tags && j.tags.includes(activeFilter));

    filteredJudges.forEach(judge => {
      const isSelected = selectedJudges.some(j => j.id === judge.id);
      const isDisabled = selectedJudges.length >= 3 && !isSelected;

      const card = el('div', {
        class: `judge-select__judge ${isSelected ? 'judge-select__judge--selected' : ''} ${isDisabled ? 'judge-select__judge--disabled' : ''}`,
        data: { judgeId: judge.id },
        onClick: () => toggleJudge(judge)
      }, [
        Portrait({
          emoji: judge.emoji,
          size: 'md',
          selected: isSelected,
          tappable: !isDisabled
        }),
        el('span', { class: 'judge-select__judge-name' }, [judge.name])
      ]);
      gridContainer.appendChild(card);
    });
  }

  // Toggle judge selection
  function toggleJudge(judge) {
    const idx = selectedJudges.findIndex(j => j.id === judge.id);
    if (idx >= 0) {
      selectedJudges.splice(idx, 1);
    } else if (selectedJudges.length < 3) {
      selectedJudges.push(judge);
    }
    updateSlots();
    renderGrid();
    confirmBtn.disabled = selectedJudges.length !== 3;
  }

  // Update selection slots
  function updateSlots() {
    slots.forEach((slot, i) => {
      clearElement(slot);
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

  // Set selected judges programmatically (for Destiny)
  screen.setSelectedJudges = (judgeList) => {
    selectedJudges = [...judgeList];
    updateSlots();
    renderGrid();
    confirmBtn.disabled = selectedJudges.length !== 3;
  };

  screen.getSelectedJudges = () => selectedJudges;

  renderFilters();
  renderGrid();

  return screen;
}

export default JudgeSelectScreen;
