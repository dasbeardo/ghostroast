/**
 * Roast Mortem - Results Screen
 */

import { el, $ } from '../dom.js';
import { Portrait } from '../components/Portrait.js';

/**
 * Render the results screen
 * @param {Object} options
 * @param {Object} options.player - Player data
 * @param {Object} options.opponent - Opponent data
 * @param {number} options.playerTotal - Player's round score
 * @param {number} options.opponentTotal - Opponent's round score
 * @param {string} options.playerRoast - Player's roast text
 * @param {string} options.opponentRoast - Opponent's roast text
 * @param {string[]} options.playerReactions - Judge reactions for player
 * @param {string[]} options.opponentReactions - Judge reactions for opponent
 * @param {number[]} options.playerScores - Individual judge scores for player
 * @param {number[]} options.opponentScores - Individual judge scores for opponent
 * @param {Object[]} options.judges - Array of judges
 * @param {number} options.playerMatchScore - Match wins
 * @param {number} options.opponentMatchScore - Match wins
 * @param {Function} options.onContinue - Callback to continue
 * @returns {HTMLElement}
 */
export function ResultsScreen({
  player,
  opponent,
  playerTotal,
  opponentTotal,
  playerRoast,
  opponentRoast,
  playerReactions = [],
  opponentReactions = [],
  playerScores = [],
  opponentScores = [],
  judges = [],
  playerMatchScore = 0,
  opponentMatchScore = 0,
  onContinue
}) {
  const playerWon = playerTotal > opponentTotal;
  const isTie = playerTotal === opponentTotal;

  // Mort's reaction
  const mortReactions = playerWon
    ? [
        `"${player?.name || 'You'} takes the round! The spirits are pleased."`,
        `"A decisive victory for ${player?.name || 'our contestant'}!"`,
        `"The crowd goes wild! Well, as wild as ghosts can get."`,
      ]
    : isTie
    ? [
        `"A tie?! The network will NOT be happy about this."`,
        `"Dead heat! How appropriate."`,
      ]
    : [
        `"${opponent?.name || 'The AI'} takes this one. Ouch."`,
        `"Better luck next round... if there is one."`,
        `"The machine wins this time. Cold, calculating, effective."`,
      ];

  const mortText = mortReactions[Math.floor(Math.random() * mortReactions.length)];

  const screen = el('div', { class: 'screen screen-results' }, [
    // Match score
    el('div', { class: 'results__match-score' }, [
      el('div', { class: 'results__match-score-value' }, [`${playerMatchScore} - ${opponentMatchScore}`]),
      el('div', { class: 'results__match-score-label' }, ['MATCH SCORE']),
    ]),

    // Mort reaction
    el('div', { class: 'results__mort' }, [
      Portrait({ emoji: '🎩', size: 'lg', type: 'host' }),
      el('div', { class: 'results__mort-text' }, [mortText]),
    ]),

    // Score cards
    el('div', { class: 'results__scores' }, [
      // Player card
      el('div', {
        class: `results__score-card ${playerWon ? 'results__score-card--winner' : (!isTie ? 'results__score-card--loser' : '')}`,
        onClick: () => showDetail('player')
      }, [
        Portrait({
          emoji: player?.emoji || '👤',
          size: 'lg',
          type: 'player',
          winner: playerWon
        }),
        el('div', { class: 'results__score-name' }, [player?.name || 'YOU']),
        el('div', { class: 'results__score-value' }, [playerTotal.toString()]),
        el('div', { class: 'results__tap-hint' }, ['tap for details']),
      ]),

      // Opponent card
      el('div', {
        class: `results__score-card ${!playerWon && !isTie ? 'results__score-card--winner' : (playerWon ? 'results__score-card--loser' : '')}`,
        onClick: () => showDetail('opponent')
      }, [
        Portrait({
          emoji: opponent?.emoji || '🤖',
          size: 'lg',
          type: 'opponent',
          winner: !playerWon && !isTie
        }),
        el('div', { class: 'results__score-name' }, [opponent?.name || 'AI']),
        el('div', { class: 'results__score-value' }, [opponentTotal.toString()]),
        el('div', { class: 'results__tap-hint' }, ['tap for details']),
      ]),
    ]),

    // Continue button
    el('div', { class: 'results__actions' }, [
      el('button', {
        class: 'btn btn--primary btn--full',
        onClick: onContinue
      }, [playerMatchScore >= 2 || opponentMatchScore >= 2 ? 'See Final Results' : 'Next Round']),
    ]),

    // Detail modal (hidden) - modal is INSIDE overlay so flexbox centers it
    el('div', { class: 'overlay', id: 'detail-overlay', style: 'display: none' }, [
      el('div', { class: 'modal results__detail', id: 'detail-modal' }, [
        el('div', { class: 'modal__header' }, [
          el('h3', { class: 'modal__title', id: 'detail-title' }),
          el('button', { class: 'modal__close', onClick: hideDetail }, ['×']),
        ]),
        el('div', { class: 'results__detail-content' }, [
          el('div', { class: 'results__detail-roast', id: 'detail-roast' }),
          el('div', { class: 'results__detail-judges', id: 'detail-judges' }),
        ]),
      ]),
    ]),
  ]);

  const detailOverlay = $('#detail-overlay', screen);
  const detailModal = $('#detail-modal', screen);
  const detailTitle = $('#detail-title', screen);
  const detailRoast = $('#detail-roast', screen);
  const detailJudges = $('#detail-judges', screen);

  // Handle overlay click (but not modal click)
  detailOverlay.addEventListener('click', (e) => {
    if (e.target === detailOverlay) {
      hideDetail();
    }
  });

  function showDetail(who) {
    const isPlayer = who === 'player';
    const name = isPlayer ? (player?.name || 'YOU') : (opponent?.name || 'AI');
    const roast = isPlayer ? playerRoast : opponentRoast;
    const reactions = isPlayer ? playerReactions : opponentReactions;
    const scores = isPlayer ? playerScores : opponentScores;

    detailTitle.textContent = `${name}'s Roast`;
    detailRoast.textContent = roast;

    // Clear and rebuild judges
    while (detailJudges.firstChild) detailJudges.removeChild(detailJudges.firstChild);

    judges.forEach((judge, i) => {
      const judgeEl = el('div', { class: 'results__detail-judge' }, [
        Portrait({ emoji: judge.emoji, size: 'md' }),
        el('div', { class: 'results__detail-judge-info' }, [
          el('div', { class: 'results__detail-judge-name' }, [judge.name]),
          el('div', { class: 'results__detail-judge-reaction' }, [reactions[i] || 'No reaction']),
        ]),
        el('div', { class: 'results__detail-judge-score' }, [`${scores[i] || '?'}/10`]),
      ]);
      detailJudges.appendChild(judgeEl);
    });

    detailOverlay.style.display = 'flex';
  }

  function hideDetail() {
    detailOverlay.style.display = 'none';
  }

  return screen;
}

export default ResultsScreen;
