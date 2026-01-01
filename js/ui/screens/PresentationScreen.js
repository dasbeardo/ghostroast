/**
 * Roast Mortem - Presentation Screen
 */

import { el, $, clearElement } from '../dom.js';
import { Portrait } from '../components/Portrait.js';
import { TypeWriter, delay } from '../components/Dialogue.js';
import { onSkip, clearSkip } from '../index.js';

/**
 * Render the presentation screen
 * @param {Object} options
 * @param {Object} options.ghost - Ghost being roasted
 * @param {Object} options.player - Player data
 * @param {Object} options.opponent - Opponent data
 * @param {string} options.playerRoast - Player's roast text
 * @param {string} options.opponentRoast - Opponent's roast text
 * @param {Object[]} options.judges - Array of 3 judges
 * @param {boolean} options.playerGoesFirst - Who presents first
 * @param {number} options.round - Current round
 * @param {number} options.playerScore - Match score
 * @param {number} options.opponentScore - Match score
 * @param {Function} options.onComplete - Callback with results
 * @param {Function} options.getJudgeReactions - Async function to get judge reactions
 * @returns {HTMLElement}
 */
export function PresentationScreen({
  ghost,
  player,
  opponent,
  playerRoast,
  opponentRoast,
  judges,
  playerGoesFirst = true,
  round = 1,
  playerScore = 0,
  opponentScore = 0,
  onComplete,
  getJudgeReactions
}) {
  const screen = el('div', { class: 'screen screen-presentation' }, [
    // Header
    el('div', { class: 'presentation__header' }, [
      el('div', { class: 'presentation__status' }, [
        el('span', { class: 'presentation__round' }, [`Round ${round}`]),
        el('span', { class: 'presentation__score' }, [`${playerScore} - ${opponentScore}`]),
      ]),
    ]),

    // Stage
    el('div', { class: 'presentation__stage', id: 'stage' }),

    // Totals
    el('div', { class: 'presentation__totals', id: 'totals', style: 'opacity: 0' }, [
      el('div', { class: 'presentation__total presentation__total--player' }, [
        el('span', { class: 'presentation__total-label' }, [player?.name || 'YOU']),
        el('span', { class: 'presentation__total-value', id: 'player-total' }, ['—']),
      ]),
      el('div', { class: 'presentation__total presentation__total--opponent' }, [
        el('span', { class: 'presentation__total-label' }, [opponent?.name || 'AI']),
        el('span', { class: 'presentation__total-value', id: 'opponent-total' }, ['—']),
      ]),
    ]),

    // Footer
    el('div', { class: 'presentation__footer' }, [
      el('div', { class: 'tap-hint' }, ['Tap to continue']),
    ]),
  ]);

  const stage = $('#stage', screen);
  const totals = $('#totals', screen);
  const playerTotalEl = $('#player-total', screen);
  const opponentTotalEl = $('#opponent-total', screen);

  // Results storage
  const results = {
    playerScores: [],
    opponentScores: [],
    playerReactions: [],
    opponentReactions: [],
    playerTotal: 0,
    opponentTotal: 0
  };

  // Run the presentation
  async function runPresentation() {
    let skipped = false;
    onSkip(() => { skipped = true; });

    const firstRoaster = playerGoesFirst ? 'player' : 'opponent';
    const secondRoaster = playerGoesFirst ? 'opponent' : 'player';

    // Present first roast
    await presentRoast(
      firstRoaster === 'player' ? player : opponent,
      firstRoaster === 'player' ? playerRoast : opponentRoast,
      firstRoaster
    );

    // Judge first roast
    const firstReactions = await judgeRoast(
      firstRoaster === 'player' ? playerRoast : opponentRoast,
      firstRoaster,
      skipped
    );

    if (firstRoaster === 'player') {
      results.playerReactions = firstReactions.reactions;
      results.playerScores = firstReactions.scores;
      results.playerTotal = firstReactions.scores.reduce((a, b) => a + b, 0);
    } else {
      results.opponentReactions = firstReactions.reactions;
      results.opponentScores = firstReactions.scores;
      results.opponentTotal = firstReactions.scores.reduce((a, b) => a + b, 0);
    }

    // Show totals
    totals.style.opacity = '1';
    updateTotals();

    if (!skipped) await delay(800);

    // Present second roast
    await presentRoast(
      secondRoaster === 'player' ? player : opponent,
      secondRoaster === 'player' ? playerRoast : opponentRoast,
      secondRoaster
    );

    // Judge second roast
    const secondReactions = await judgeRoast(
      secondRoaster === 'player' ? playerRoast : opponentRoast,
      secondRoaster,
      skipped
    );

    if (secondRoaster === 'player') {
      results.playerReactions = secondReactions.reactions;
      results.playerScores = secondReactions.scores;
      results.playerTotal = secondReactions.scores.reduce((a, b) => a + b, 0);
    } else {
      results.opponentReactions = secondReactions.reactions;
      results.opponentScores = secondReactions.scores;
      results.opponentTotal = secondReactions.scores.reduce((a, b) => a + b, 0);
    }

    updateTotals();

    if (!skipped) await delay(1000);

    clearSkip();

    if (onComplete) {
      onComplete(results);
    }
  }

  // Present a roast
  async function presentRoast(roaster, roastText, who) {
    clearElement(stage);

    // Ghost target
    stage.appendChild(el('div', { class: 'presentation__target' }, [
      Portrait({ emoji: ghost?.emoji || '👻', size: 'sm', type: 'ghost', bobbing: true }),
      el('div', {}, [
        el('div', { class: 'presentation__target-label' }, ['ROASTING']),
        el('div', { class: 'presentation__target-name' }, [ghost?.name || 'Ghost']),
      ]),
    ]));

    // Roaster
    stage.appendChild(el('div', { class: 'presentation__roaster' }, [
      Portrait({
        emoji: roaster?.emoji || (who === 'player' ? '👤' : '🤖'),
        size: 'featured',
        spotlight: true
      }),
      el('span', { class: 'presentation__roaster-name' }, [roaster?.name || 'Roaster']),
    ]));

    // Roast bubble
    const bubble = el('div', { class: 'bubble bubble--roast' });
    stage.appendChild(bubble);

    const typeWriter = new TypeWriter(bubble, { speed: 20 });
    await typeWriter.type(roastText);

    await delay(500);
  }

  // Judge a roast
  async function judgeRoast(roastText, who, fastMode) {
    const reactions = [];
    const scores = [];

    // Get AI reactions if available
    let aiReactions = null;
    if (getJudgeReactions) {
      try {
        aiReactions = await getJudgeReactions(roastText, judges);
      } catch (e) {
        console.error('Failed to get judge reactions:', e);
      }
    }

    for (let i = 0; i < judges.length; i++) {
      const judge = judges[i];

      clearElement(stage);

      // Judge
      stage.appendChild(el('div', { class: 'presentation__judge' }, [
        Portrait({
          emoji: judge.emoji,
          size: 'lg',
          spotlight: true
        }),
        el('span', { class: 'presentation__judge-name' }, [judge.name]),
      ]));

      // Reaction bubble
      const bubble = el('div', { class: 'bubble bubble--judge' });
      stage.appendChild(bubble);

      // Get reaction text
      const reaction = aiReactions?.[i]?.reaction || generateFallbackReaction(judge);
      const score = aiReactions?.[i]?.score || Math.floor(Math.random() * 4) + 5;

      reactions.push(reaction);
      scores.push(score);

      // Type reaction
      if (!fastMode) {
        const typeWriter = new TypeWriter(bubble, { speed: 15 });
        await typeWriter.type(reaction);
      } else {
        bubble.textContent = reaction;
      }

      // Show score
      const scoreBadge = el('div', { class: 'score-badge score-badge--animate presentation__judge-score' }, [`${score}/10`]);
      stage.appendChild(scoreBadge);

      if (!fastMode) await delay(600);
    }

    return { reactions, scores };
  }

  // Update totals display
  function updateTotals() {
    playerTotalEl.textContent = results.playerTotal || '—';
    opponentTotalEl.textContent = results.opponentTotal || '—';
  }

  // Fallback reaction generator
  function generateFallbackReaction(judge) {
    const reactions = [
      "I've seen better. I've also seen worse.",
      "That was certainly... words.",
      "My expectations were low, and yet...",
      "Interesting choice. Very interesting.",
      "I'm not angry, I'm just disappointed.",
    ];
    return reactions[Math.floor(Math.random() * reactions.length)];
  }

  // Start presentation after mount
  setTimeout(runPresentation, 500);

  return screen;
}

export default PresentationScreen;
