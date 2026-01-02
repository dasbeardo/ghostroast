/**
 * Roast Mortem - Drafting Screen
 */

import { el, $, $$, clearElement } from '../dom.js';
import { Portrait } from '../components/Portrait.js';

/**
 * Render the drafting screen
 * @param {Object} options
 * @param {Object} options.ghost - Ghost being roasted
 * @param {Object} options.template - Template with slots
 * @param {Object} options.wordPools - Available word pools
 * @param {number} options.rerolls - Rerolls remaining
 * @param {number} options.playerScore - Match score
 * @param {number} options.opponentScore - Match score
 * @param {number} options.round - Current round
 * @param {Function} options.onComplete - Callback with filled template
 * @returns {HTMLElement}
 */
export function DraftingScreen({
  ghost,
  template,
  wordPools,
  rerolls = 1,
  playerScore = 0,
  opponentScore = 0,
  round = 1,
  onComplete,
  onMenu
}) {
  // State
  let filledSlots = [];
  let activeSlot = 0;
  let currentWords = [];
  let rerollsLeft = rerolls;
  let pickerOpen = false;

  // Parse template - find blanks
  const templateParts = parseTemplate(template?.template || "You're like [BLANK] — [BLANK]");
  const totalSlots = templateParts.filter(p => p.isBlank).length;
  filledSlots = new Array(totalSlots).fill(null);

  const screen = el('div', { class: 'screen screen-drafting' }, [
    // Header
    el('header', { class: 'drafting__header' }, [
      el('div', { class: 'ghost-intro__score' }, [
        el('div', {}, [`${playerScore} - ${opponentScore}`]),
        el('div', { class: 'ghost-intro__round' }, [`Round ${round}`]),
      ]),
      el('div', {}),
      el('button', { class: 'btn-icon', onClick: onMenu }, ['☰']),
    ]),

    // Ghost reference
    el('div', { class: 'drafting__ghost-ref ghost-pill' }, [
      Portrait({ emoji: ghost?.emoji || '👻', size: 'sm', type: 'ghost', bobbing: true }),
      el('div', { class: 'ghost-pill__info' }, [
        el('span', { class: 'ghost-pill__label' }, ['ROASTING']),
        el('span', { class: 'ghost-pill__name' }, [ghost?.name || 'Ghost']),
      ]),
    ]),

    // Content
    el('div', { class: 'drafting__content' }, [
      el('div', { class: 'drafting__template-header' }, [
        el('h2', { class: 'drafting__title' }, ['Your Roast']),
        el('div', { class: 'drafting__reroll' }, [
          el('span', {}, ['🎲']),
          el('span', {}, [`${rerollsLeft} Reroll${rerollsLeft !== 1 ? 's' : ''}`]),
        ]),
      ]),

      // Template
      el('div', { class: 'drafting__template' }, [
        el('div', { class: 'drafting__template-text', id: 'template-display' }),
      ]),

      // Slot indicators
      el('div', { class: 'drafting__slots', id: 'slot-indicators' }),
    ]),

    // Actions
    el('div', { class: 'drafting__actions' }, [
      el('button', {
        class: 'btn btn--primary btn--full',
        id: 'lock-in-btn',
        disabled: true,
        onClick: () => {
          if (filledSlots.every(s => s !== null) && onComplete) {
            const roast = buildRoast();
            onComplete(roast, filledSlots);
          }
        }
      }, ['Lock In Roast']),
    ]),

    // Word picker (hidden initially)
    el('div', { class: 'overlay', id: 'picker-overlay', style: 'display: none' }),
    el('div', { class: 'bottom-sheet word-picker', id: 'word-picker', style: 'display: none' }, [
      el('div', { class: 'bottom-sheet__handle' }),
      el('div', { class: 'bottom-sheet__header' }, [
        el('h3', { class: 'bottom-sheet__title' }, ['Pick a Word']),
        el('button', {
          class: 'bottom-sheet__action',
          id: 'shuffle-btn',
          onClick: shuffleWords
        }, [
          el('span', {}, ['🎲']),
          el('span', {}, ['Shuffle']),
        ]),
      ]),
      el('div', { class: 'drafting__word-grid', id: 'word-grid' }),
      el('button', {
        class: 'btn btn--ghost btn--full',
        onClick: closePicker
      }, ['Cancel']),
    ]),
  ]);

  const templateDisplay = $('#template-display', screen);
  const slotIndicators = $('#slot-indicators', screen);
  const lockInBtn = $('#lock-in-btn', screen);
  const pickerOverlay = $('#picker-overlay', screen);
  const picker = $('#word-picker', screen);
  const wordGrid = $('#word-grid', screen);
  const shuffleBtn = $('#shuffle-btn', screen);
  const rerollDisplay = $('.drafting__reroll', screen);

  // Parse template into parts
  function parseTemplate(text) {
    const parts = [];
    const regex = /\[([^\]]+)\]/g;
    let lastIndex = 0;
    let match;
    let blankIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ text: text.slice(lastIndex, match.index), isBlank: false });
      }
      parts.push({ text: match[1], isBlank: true, pool: match[1], index: blankIndex++ });
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push({ text: text.slice(lastIndex), isBlank: false });
    }
    return parts;
  }

  // Render template with blanks
  function renderTemplate() {
    clearElement(templateDisplay);
    templateDisplay.appendChild(document.createTextNode('"'));

    templateParts.forEach(part => {
      if (part.isBlank) {
        const filled = filledSlots[part.index];
        const isActive = part.index === activeSlot && !filledSlots.every(s => s !== null);
        const blank = el('span', {
          class: `drafting__blank ${isActive ? 'drafting__blank--active' : ''} ${filled ? 'drafting__blank--filled' : ''}`,
          data: { slot: part.index.toString() },
          onClick: () => openPicker(part.index, part.pool)
        }, [filled || 'tap to pick']);
        templateDisplay.appendChild(blank);
      } else {
        templateDisplay.appendChild(document.createTextNode(part.text));
      }
    });

    templateDisplay.appendChild(document.createTextNode('"'));
  }

  // Render slot indicators
  function renderSlots() {
    clearElement(slotIndicators);
    for (let i = 0; i < totalSlots; i++) {
      const dot = el('div', {
        class: `drafting__slot ${i === activeSlot ? 'drafting__slot--active' : ''} ${filledSlots[i] ? 'drafting__slot--filled' : ''}`
      });
      slotIndicators.appendChild(dot);
    }
  }

  // Open word picker
  function openPicker(slotIndex, poolName) {
    activeSlot = slotIndex;
    pickerOpen = true;
    loadWords(poolName);
    renderWordGrid();
    pickerOverlay.style.display = 'flex';
    picker.style.display = 'block';
    renderTemplate();
    renderSlots();
  }

  // Close word picker
  function closePicker() {
    pickerOpen = false;
    pickerOverlay.style.display = 'none';
    picker.style.display = 'none';
  }

  // Load words for pool with ghost-themed weighting
  function loadWords(poolName) {
    const pool = wordPools?.[poolName] || wordPools?.['pathetic_nouns'] || { base: ['something', 'nothing', 'everything'] };

    // Handle old format (simple array) for backwards compatibility
    if (Array.isArray(pool)) {
      currentWords = shuffle([...pool]).slice(0, 12);
      return;
    }

    // Build weighted pool - themed words appear 3x for higher selection chance
    let words = [...(pool.base || [])];
    const ghostThemes = ghost?.themes || [];

    if (pool.themed && ghostThemes.length > 0) {
      for (const theme of ghostThemes) {
        const themedWords = pool.themed[theme] || [];
        // Add themed words 3 times for higher selection probability
        words.push(...themedWords, ...themedWords, ...themedWords);
      }
    }

    // Shuffle and take unique words for display
    const shuffled = shuffle(words);
    const uniqueWords = [...new Set(shuffled)];
    currentWords = uniqueWords.slice(0, 12);
  }

  // Shuffle and reload words
  function shuffleWords() {
    if (rerollsLeft <= 0) return;
    rerollsLeft--;
    updateRerollDisplay();
    const poolName = templateParts.find(p => p.isBlank && p.index === activeSlot)?.pool;
    loadWords(poolName);
    renderWordGrid();
  }

  // Update reroll display
  function updateRerollDisplay() {
    const rerollText = rerollDisplay.querySelector('span:last-child');
    rerollText.textContent = `${rerollsLeft} Reroll${rerollsLeft !== 1 ? 's' : ''}`;
    if (rerollsLeft <= 0) {
      shuffleBtn.disabled = true;
      shuffleBtn.style.opacity = '0.5';
    }
  }

  // Render word grid
  function renderWordGrid() {
    clearElement(wordGrid);
    currentWords.forEach(word => {
      const chip = el('button', {
        class: 'chip',
        onClick: () => selectWord(word)
      }, [word]);
      wordGrid.appendChild(chip);
    });
  }

  // Select a word
  function selectWord(word) {
    filledSlots[activeSlot] = word;
    closePicker();

    // Move to next empty slot
    const nextEmpty = filledSlots.findIndex((s, i) => i > activeSlot && s === null);
    if (nextEmpty >= 0) {
      activeSlot = nextEmpty;
    } else {
      const firstEmpty = filledSlots.findIndex(s => s === null);
      if (firstEmpty >= 0) {
        activeSlot = firstEmpty;
      }
    }

    renderTemplate();
    renderSlots();
    lockInBtn.disabled = !filledSlots.every(s => s !== null);
  }

  // Build final roast
  function buildRoast() {
    let roast = '"';
    let slotIndex = 0;
    templateParts.forEach(part => {
      if (part.isBlank) {
        roast += filledSlots[slotIndex++];
      } else {
        roast += part.text;
      }
    });
    roast += '"';
    return roast;
  }

  // Shuffle helper
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Initial render
  renderTemplate();
  renderSlots();

  return screen;
}

export default DraftingScreen;
