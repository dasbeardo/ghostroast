/**
 * Roast Mortem - Stats Screen
 * Shows player stats and history.
 */

import { el, $, clearElement } from '../dom.js';
import { state, exportSaveData, importSaveData } from '../../state.js';

/**
 * Render the stats screen
 * @param {Object} options
 * @param {Function} options.onBack - Callback to go back
 * @returns {HTMLElement}
 */
export function StatsScreen({ onBack }) {
  const stats = state.stats || {};

  // Calculate derived stats
  const totalMatches = (stats.totalWins || 0) + (stats.totalLosses || 0);
  const winRate = totalMatches > 0
    ? Math.round((stats.totalWins / totalMatches) * 100)
    : 0;

  // Get top judges (sorted by average score)
  const judgeAverages = Object.entries(stats.judgeScores || {})
    .map(([name, data]) => ({
      name,
      average: data.timesJudged > 0 ? (data.totalScore / data.timesJudged).toFixed(1) : 0,
      times: data.timesJudged
    }))
    .sort((a, b) => b.average - a.average)
    .slice(0, 5);

  // Get opponent records
  const opponentList = Object.entries(stats.opponentRecords || {})
    .map(([name, record]) => ({
      name,
      wins: record.wins,
      losses: record.losses
    }))
    .sort((a, b) => (b.wins - b.losses) - (a.wins - a.losses));

  const screen = el('div', { class: 'screen screen-stats' }, [
    // Header
    el('header', { class: 'stats__header' }, [
      el('button', { class: 'btn-icon', onClick: onBack }, ['←']),
      el('h1', { class: 'stats__title' }, ['Your Stats']),
      el('div', {}),
    ]),

    // Content
    el('div', { class: 'stats__content' }, [
      // Player name
      el('div', { class: 'stats__player' }, [
        el('span', { class: 'stats__player-name' }, [stats.playerName || state.playerName || 'Player']),
      ]),

      // Main stats grid
      el('div', { class: 'stats__grid' }, [
        statCard('Wins', stats.totalWins || 0, 'green'),
        statCard('Losses', stats.totalLosses || 0, 'red'),
        statCard('Win Rate', `${winRate}%`, winRate >= 50 ? 'green' : 'amber'),
        statCard('Current Streak', stats.currentWinStreak || 0, 'teal'),
        statCard('Best Streak', stats.longestWinStreak || 0, 'amber'),
        statCard('High Score', stats.highestSingleScore || 0, 'green'),
      ]),

      // Rounds stats
      el('div', { class: 'stats__section' }, [
        el('h3', { class: 'stats__section-title' }, ['Rounds']),
        el('div', { class: 'stats__row' }, [
          el('span', {}, ['Won']),
          el('span', {}, [`${stats.totalRoundsWon || 0}`]),
        ]),
        el('div', { class: 'stats__row' }, [
          el('span', {}, ['Lost']),
          el('span', {}, [`${stats.totalRoundsLost || 0}`]),
        ]),
        el('div', { class: 'stats__row' }, [
          el('span', {}, ['Tied']),
          el('span', {}, [`${stats.totalRoundsTied || 0}`]),
        ]),
      ]),

      // Ghosts roasted
      el('div', { class: 'stats__section' }, [
        el('h3', { class: 'stats__section-title' }, ['Ghosts Roasted']),
        el('div', { class: 'stats__value-large' }, [`${(stats.ghostsRoasted || []).length}`]),
      ]),

      // Judge averages
      judgeAverages.length > 0 && el('div', { class: 'stats__section' }, [
        el('h3', { class: 'stats__section-title' }, ['Top Judges (by avg score)']),
        ...judgeAverages.map(j =>
          el('div', { class: 'stats__row' }, [
            el('span', {}, [j.name]),
            el('span', {}, [`${j.average}/10 (×${j.times})`]),
          ])
        ),
      ]),

      // Opponent records
      opponentList.length > 0 && el('div', { class: 'stats__section' }, [
        el('h3', { class: 'stats__section-title' }, ['Opponent Records']),
        ...opponentList.map(o =>
          el('div', { class: 'stats__row' }, [
            el('span', {}, [o.name]),
            el('span', { class: o.wins > o.losses ? 'text-green' : o.wins < o.losses ? 'text-red' : '' },
              [`${o.wins}W - ${o.losses}L`]),
          ])
        ),
      ]),

      // Match history
      (stats.matchHistory || []).length > 0 && el('div', { class: 'stats__section' }, [
        el('h3', { class: 'stats__section-title' }, ['Recent Matches']),
        ...stats.matchHistory.slice(0, 5).map(m =>
          el('div', { class: 'stats__row' }, [
            el('span', {}, [`vs ${m.opponent}`]),
            el('span', { class: m.won ? 'text-green' : 'text-red' },
              [`${m.won ? 'WIN' : 'LOSS'} ${m.playerScore}-${m.aiScore}`]),
          ])
        ),
      ]),

      // Export/Import section
      el('div', { class: 'stats__section stats__section--actions' }, [
        el('h3', { class: 'stats__section-title' }, ['Save Data']),
        el('div', { class: 'stats__buttons' }, [
          el('button', {
            class: 'btn btn--secondary',
            onClick: handleExport
          }, ['Export Save']),
          el('button', {
            class: 'btn btn--secondary',
            onClick: () => showImportModal()
          }, ['Import Save']),
        ]),
        el('div', { class: 'stats__message', id: 'save-message' }),
      ]),
    ]),

    // Import modal (hidden)
    el('div', { class: 'overlay', id: 'import-overlay', style: 'display: none', onClick: hideImportModal }),
    el('div', { class: 'modal', id: 'import-modal', style: 'display: none' }, [
      el('div', { class: 'modal__header' }, [
        el('h3', { class: 'modal__title' }, ['Import Save Data']),
        el('button', { class: 'modal__close', onClick: hideImportModal }, ['×']),
      ]),
      el('div', { class: 'modal__content' }, [
        el('textarea', {
          id: 'import-textarea',
          placeholder: 'Paste your save data here...',
          rows: 6
        }),
        el('div', { class: 'modal__actions' }, [
          el('button', { class: 'btn btn--secondary', onClick: hideImportModal }, ['Cancel']),
          el('button', { class: 'btn btn--primary', onClick: handleImport }, ['Import']),
        ]),
      ]),
    ]),
  ]);

  // Helper to create stat card
  function statCard(label, value, color = '') {
    return el('div', { class: 'stats__card' }, [
      el('div', { class: `stats__card-value ${color ? `text-${color}` : ''}` }, [String(value)]),
      el('div', { class: 'stats__card-label' }, [label]),
    ]);
  }

  // Export handler
  function handleExport() {
    const data = exportSaveData();
    navigator.clipboard.writeText(data).then(() => {
      showMessage('Save data copied to clipboard!', 'success');
    }).catch(() => {
      // Fallback: show in a prompt
      prompt('Copy this save data:', data);
    });
  }

  // Show import modal
  function showImportModal() {
    const overlay = $('#import-overlay', screen);
    const modal = $('#import-modal', screen);
    overlay.style.display = 'flex';
    modal.style.display = 'block';
  }

  // Hide import modal
  function hideImportModal() {
    const overlay = $('#import-overlay', screen);
    const modal = $('#import-modal', screen);
    overlay.style.display = 'none';
    modal.style.display = 'none';
    const textarea = $('#import-textarea', screen);
    if (textarea) textarea.value = '';
  }

  // Import handler
  function handleImport() {
    const textarea = $('#import-textarea', screen);
    if (textarea && textarea.value.trim()) {
      const result = importSaveData(textarea.value.trim());
      if (result.success) {
        showMessage(`Loaded save data for ${result.playerName}!`, 'success');
        hideImportModal();
        // Refresh the screen after a delay
        setTimeout(() => {
          if (onBack) onBack();
        }, 1500);
      } else {
        showMessage(result.error, 'error');
      }
    }
  }

  // Show message
  function showMessage(text, type) {
    const msgEl = $('#save-message', screen);
    if (msgEl) {
      msgEl.textContent = text;
      msgEl.className = `stats__message stats__message--${type}`;
      setTimeout(() => {
        msgEl.textContent = '';
        msgEl.className = 'stats__message';
      }, 3000);
    }
  }

  return screen;
}

export default StatsScreen;
