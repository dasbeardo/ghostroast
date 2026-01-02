/**
 * Roast Mortem - Menu Screen
 */

import { el, $ } from '../dom.js';
import { Portrait } from '../components/Portrait.js';
import { state, VERSION } from '../../state.js';

/**
 * Render the menu screen
 * @param {Object} options
 * @param {Function} options.onNewGame - Callback for new game
 * @param {Function} options.onContinue - Callback for continue
 * @param {Function} options.onStats - Callback for stats
 * @param {Function} options.onSettings - Callback for settings
 * @param {Function} options.onImportExport - Callback for import/export
 * @param {Function} options.onCredits - Callback for credits
 * @returns {HTMLElement}
 */
export function MenuScreen({ onNewGame, onContinue, onStats, onSettings, onImportExport, onCredits }) {
  const playerName = state.playerName || 'Stranger';
  const stats = state.stats || {};
  const wins = stats.matchWins || 0;
  const losses = stats.matchLosses || 0;
  const streak = stats.currentStreak || 0;
  const hasSave = !!state.savedGame;

  // Mort's welcome message
  const welcomeMessages = [
    `"Goooood evening, <em>${playerName}</em>... The spirits have been expecting you."`,
    `"Ah, <em>${playerName}</em>... Back from the grave, I see. The network is pleased."`,
    `"Welcome back, <em>${playerName}</em>... The afterlife's favorite punching bag."`,
    `"<em>${playerName}</em>... Still alive? We'll fix that. Metaphorically."`,
  ];
  const welcomeMsg = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

  const screen = el('div', { class: 'screen screen-menu' }, [
    // Logo
    el('div', { class: 'menu__logo' }, ['ROAST', el('br'), 'MORTEM']),
    el('div', { class: 'menu__tagline' }, ['A Comedy of Errors... And Death']),

    // Mort welcome
    el('div', { class: 'menu__welcome' }, [
      Portrait({ emoji: '🎩', size: 'lg', type: 'host' }),
      el('div', { class: 'menu__welcome-text' }),
    ]),

    // Player card
    el('div', { class: 'menu__player' }, [
      Portrait({ emoji: '👤', type: 'player' }),
      el('div', { class: 'menu__player-info' }, [
        el('div', { class: 'menu__player-name' }, [playerName]),
        el('div', { class: 'menu__player-stats' }, [
          `Record: `,
          el('strong', {}, [`${wins}-${losses}`]),
          streak > 0 ? ` • 🔥 ${streak} Win Streak` : ''
        ]),
      ]),
    ]),

    // Navigation
    el('nav', { class: 'menu__nav' }, [
      el('button', {
        class: 'btn btn--primary btn--full',
        onClick: onNewGame
      }, ['New Game']),

      hasSave ? el('button', {
        class: 'btn btn--secondary btn--full',
        onClick: onContinue
      }, ['Continue Game']) : null,

      el('button', {
        class: 'btn btn--ghost btn--full',
        onClick: onStats
      }, ['View Stats']),

      el('button', {
        class: 'btn btn--ghost btn--full',
        onClick: onSettings
      }, ['Settings']),
    ].filter(Boolean)),

    // Footer
    el('footer', { class: 'menu__footer' }, [
      el('button', { class: 'menu__footer-link', onClick: onImportExport }, ['Import/Export']),
      el('span', { class: 'menu__version' }, [`v${VERSION}`]),
      el('button', { class: 'menu__footer-link', onClick: onCredits }, ['Credits']),
    ]),
  ]);

  // Set welcome text with HTML
  const welcomeText = $('.menu__welcome-text', screen);
  welcomeText.innerHTML = welcomeMsg;

  return screen;
}

export default MenuScreen;
