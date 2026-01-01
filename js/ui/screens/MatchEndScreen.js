/**
 * Roast Mortem - Match End Screen
 */

import { el, $ } from '../dom.js';
import { Portrait } from '../components/Portrait.js';

/**
 * Render the match end screen
 * @param {Object} options
 * @param {Object} options.player - Player data
 * @param {Object} options.opponent - Opponent data
 * @param {number} options.playerScore - Player's match wins
 * @param {number} options.opponentScore - Opponent's match wins
 * @param {number} options.playerTotalPoints - Total points across all rounds
 * @param {number} options.opponentTotalPoints - Total points across all rounds
 * @param {Function} options.onPlayAgain - Callback
 * @param {Function} options.onMenu - Callback
 * @param {Function} options.onStats - Callback
 * @returns {HTMLElement}
 */
export function MatchEndScreen({
  player,
  opponent,
  playerScore,
  opponentScore,
  playerTotalPoints = 0,
  opponentTotalPoints = 0,
  onPlayAgain,
  onMenu,
  onStats
}) {
  const playerWon = playerScore > opponentScore;
  const winnerName = playerWon ? (player?.name || 'YOU') : (opponent?.name || 'AI');

  // Mort's closing
  const mortClosings = playerWon
    ? [
        `"And that's a wrap, folks. ${player?.name || 'Our champion'} takes it!"`,
        `"Victory! The network will be pleased... for now."`,
        `"Well done. You've earned your place among the departed."`,
      ]
    : [
        `"And that's a wrap. Better luck next time, ${player?.name || 'friend'}."`,
        `"The machine wins today. Cold comfort for the living."`,
        `"Don't feel bad. Losing builds character. Or so I'm told."`,
      ];

  const mortText = mortClosings[Math.floor(Math.random() * mortClosings.length)];

  const screen = el('div', { class: 'screen screen-match-end' }, [
    // Winner announcement
    el('div', { class: 'match-end__winner' }, [
      el('div', { class: 'match-end__winner-label' }, ['WINNER']),
      el('div', { class: 'match-end__winner-name' }, [winnerName]),
    ]),

    // Final score with portraits
    el('div', { class: 'match-end__score' }, [
      el('div', { class: `match-end__score-item ${playerWon ? 'match-end__score-item--winner' : 'match-end__score-item--loser'}` }, [
        Portrait({
          emoji: player?.emoji || '👤',
          size: 'lg',
          type: 'player',
          winner: playerWon
        }),
        el('div', { class: 'match-end__score-name' }, [player?.name || 'YOU']),
        el('div', { class: 'match-end__score-value' }, [playerScore.toString()]),
      ]),
      el('div', { class: `match-end__score-item ${!playerWon ? 'match-end__score-item--winner' : 'match-end__score-item--loser'}` }, [
        Portrait({
          emoji: opponent?.emoji || '🤖',
          size: 'lg',
          type: 'opponent',
          winner: !playerWon
        }),
        el('div', { class: 'match-end__score-name' }, [opponent?.name || 'AI']),
        el('div', { class: 'match-end__score-value' }, [opponentScore.toString()]),
      ]),
    ]),

    // Stats summary
    el('div', { class: 'match-end__stats' }, [
      el('div', { class: 'match-end__stats-title' }, ['MATCH STATS']),
      el('div', { class: 'match-end__stats-grid' }, [
        el('div', { class: 'match-end__stat' }, [
          el('span', { class: 'match-end__stat-label' }, ['Total Points']),
          el('span', { class: 'match-end__stat-value' }, [`${playerTotalPoints} - ${opponentTotalPoints}`]),
        ]),
        el('div', { class: 'match-end__stat' }, [
          el('span', { class: 'match-end__stat-label' }, ['Rounds']),
          el('span', { class: 'match-end__stat-value' }, [`${playerScore + opponentScore}`]),
        ]),
      ]),
    ]),

    // Mort closing
    el('div', { class: 'match-end__mort' }, [
      Portrait({ emoji: '🎩', size: 'lg', type: 'host' }),
      el('div', { class: 'match-end__mort-text' }, [mortText]),
    ]),

    // Actions
    el('div', { class: 'match-end__actions' }, [
      el('button', { class: 'btn btn--primary btn--full', onClick: onPlayAgain }, ['Play Again']),
      el('button', { class: 'btn btn--secondary btn--full', onClick: onStats }, ['View Stats']),
      el('button', { class: 'btn btn--ghost btn--full', onClick: onMenu }, ['Main Menu']),
    ]),
  ]);

  return screen;
}

export default MatchEndScreen;
