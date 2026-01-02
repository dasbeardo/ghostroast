/**
 * Roast Mortem - Presentation Screen
 * Shows roasts and judge reactions with tap-to-advance flow.
 */

import { el, $, clearElement } from '../dom.js';
import { Portrait } from '../components/Portrait.js';
import { TypeWriter, delay } from '../components/Dialogue.js';

/**
 * Render the presentation screen
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
  // Tap resolver for user-controlled advancement
  let tapResolver = null;
  let canTap = false;

  const screen = el('div', { class: 'screen screen-presentation' }, [
    // Header
    el('div', { class: 'presentation__header' }, [
      el('div', { class: 'presentation__status' }, [
        el('span', { class: 'presentation__round' }, [`Round ${round}`]),
        el('span', { class: 'presentation__score' }, [`${playerScore} - ${opponentScore}`]),
      ]),
    ]),

    // Stage - content area
    el('div', { class: 'presentation__stage', id: 'stage' }),

    // Totals bar
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

    // Tap hint footer
    el('div', { class: 'presentation__footer', id: 'footer' }, [
      el('div', { class: 'tap-hint', id: 'tap-hint', style: 'opacity: 0' }, ['Tap to continue']),
    ]),
  ]);

  // Add tap handler to entire screen
  screen.addEventListener('click', handleTap);

  const stage = $('#stage', screen);
  const totals = $('#totals', screen);
  const playerTotalEl = $('#player-total', screen);
  const opponentTotalEl = $('#opponent-total', screen);
  const tapHint = $('#tap-hint', screen);

  // Results storage
  const results = {
    playerScores: [],
    opponentScores: [],
    playerReactions: [],
    opponentReactions: [],
    playerTotal: 0,
    opponentTotal: 0,
    banter: []
  };

  // First roast context for second roast judging
  let firstRoastContext = null;

  // Handle tap
  function handleTap() {
    if (canTap && tapResolver) {
      canTap = false;
      tapHint.style.opacity = '0';
      tapResolver();
      tapResolver = null;
    }
  }

  // Wait for user tap
  function waitForTap() {
    return new Promise(resolve => {
      tapResolver = resolve;
      canTap = true;
      tapHint.style.opacity = '1';
    });
  }

  // Run the presentation
  async function runPresentation() {
    const firstRoaster = playerGoesFirst ? 'player' : 'opponent';
    const secondRoaster = playerGoesFirst ? 'opponent' : 'player';
    const firstRoasterData = firstRoaster === 'player' ? player : opponent;
    const secondRoasterData = secondRoaster === 'player' ? player : opponent;
    const firstRoast = firstRoaster === 'player' ? playerRoast : opponentRoast;
    const secondRoast = secondRoaster === 'player' ? playerRoast : opponentRoast;

    // === FIRST ROAST ===
    await presentRoast(firstRoasterData, firstRoast, firstRoaster);
    await waitForTap();

    // Start fetching judge reactions in background
    const firstReactionsPromise = fetchJudgeReactions(
      firstRoast, firstRoasterData, firstRoaster, false, null
    );

    // Show "Judges are deliberating..." while waiting
    showLoading('The judges are deliberating...');
    const firstReactionsData = await firstReactionsPromise;

    // Show each judge reaction, wait for tap after each
    for (let i = 0; i < judges.length; i++) {
      await showJudgeReaction(judges[i], firstReactionsData.reactions[i], firstReactionsData.scores[i]);
      await waitForTap();
    }

    // Show banter if available
    if (firstReactionsData.banter && firstReactionsData.banter.length > 0) {
      await showBanter(firstReactionsData.banter);
      await waitForTap();
    }

    // Store first roast results
    if (firstRoaster === 'player') {
      results.playerReactions = firstReactionsData.reactions;
      results.playerScores = firstReactionsData.scores;
      results.playerTotal = firstReactionsData.scores.reduce((a, b) => a + b, 0);
    } else {
      results.opponentReactions = firstReactionsData.reactions;
      results.opponentScores = firstReactionsData.scores;
      results.opponentTotal = firstReactionsData.scores.reduce((a, b) => a + b, 0);
    }

    firstRoastContext = {
      roasterName: firstRoasterData?.name || 'Roaster',
      roast: firstRoast,
      scores: firstReactionsData.scores
    };

    // Show totals
    totals.style.opacity = '1';
    updateTotals();

    // === SECOND ROAST ===
    await presentRoast(secondRoasterData, secondRoast, secondRoaster);
    await waitForTap();

    // Start fetching second reactions
    const secondReactionsPromise = fetchJudgeReactions(
      secondRoast, secondRoasterData, secondRoaster, true, firstRoastContext
    );

    showLoading('The judges consider the rebuttal...');
    const secondReactionsData = await secondReactionsPromise;

    // Show each judge reaction
    for (let i = 0; i < judges.length; i++) {
      await showJudgeReaction(judges[i], secondReactionsData.reactions[i], secondReactionsData.scores[i]);
      await waitForTap();
    }

    // Show banter if available
    if (secondReactionsData.banter && secondReactionsData.banter.length > 0) {
      await showBanter(secondReactionsData.banter);
      await waitForTap();
    }

    // Store second roast results
    if (secondRoaster === 'player') {
      results.playerReactions = secondReactionsData.reactions;
      results.playerScores = secondReactionsData.scores;
      results.playerTotal = secondReactionsData.scores.reduce((a, b) => a + b, 0);
    } else {
      results.opponentReactions = secondReactionsData.reactions;
      results.opponentScores = secondReactionsData.scores;
      results.opponentTotal = secondReactionsData.scores.reduce((a, b) => a + b, 0);
    }

    updateTotals();

    // Complete
    if (onComplete) {
      onComplete(results);
    }
  }

  // Fetch judge reactions (with banter)
  async function fetchJudgeReactions(roastText, roasterData, who, isSecondRoast, context) {
    const roasterName = roasterData?.name || (who === 'player' ? 'Player' : 'AI');
    const roasterEmoji = roasterData?.emoji || (who === 'player' ? '👤' : '🤖');

    if (getJudgeReactions) {
      try {
        const data = await getJudgeReactions(
          roastText, judges, roasterName, roasterEmoji, isSecondRoast, context
        );
        // API returns array of {name, emoji, reaction, score} plus banter
        return {
          reactions: data.map(j => j.reaction),
          scores: data.map(j => j.score),
          banter: data.banter || []
        };
      } catch (e) {
        console.error('Failed to get judge reactions:', e);
      }
    }

    // Fallback
    return {
      reactions: judges.map(() => generateFallbackReaction()),
      scores: judges.map(() => Math.floor(Math.random() * 4) + 5),
      banter: []
    };
  }

  // Present a roast
  async function presentRoast(roaster, roastText, who) {
    clearElement(stage);

    // Layout: ghost at top, roaster portrait, then speech bubble below
    stage.appendChild(el('div', { class: 'presentation__target' }, [
      Portrait({ emoji: ghost?.emoji || '👻', size: 'sm', type: 'ghost', bobbing: true }),
      el('div', {}, [
        el('div', { class: 'presentation__target-label' }, ['ROASTING']),
        el('div', { class: 'presentation__target-name' }, [ghost?.name || 'Ghost']),
      ]),
    ]));

    stage.appendChild(el('div', { class: 'presentation__roaster' }, [
      Portrait({
        emoji: roaster?.emoji || (who === 'player' ? '👤' : '🤖'),
        size: 'featured',
        spotlight: true
      }),
      el('span', { class: 'presentation__roaster-name' }, [roaster?.name || 'Roaster']),
    ]));

    // Speech bubble - text expands DOWNWARD
    const bubble = el('div', { class: 'bubble bubble--roast bubble--expand-down' });
    stage.appendChild(bubble);

    const typeWriter = new TypeWriter(bubble, { speed: 20 });
    await typeWriter.type(roastText);
  }

  // Show loading state
  function showLoading(message) {
    clearElement(stage);
    stage.appendChild(el('div', { class: 'presentation__loading' }, [
      el('div', { class: 'loading-spinner' }),
      el('div', { class: 'presentation__loading-text' }, [message]),
    ]));
  }

  // Show a judge reaction
  async function showJudgeReaction(judge, reaction, score) {
    clearElement(stage);

    // Judge portrait at top
    stage.appendChild(el('div', { class: 'presentation__judge' }, [
      Portrait({
        emoji: judge.emoji,
        size: 'lg',
        spotlight: true
      }),
      el('span', { class: 'presentation__judge-name' }, [judge.name]),
    ]));

    // Reaction bubble - expands downward
    const bubble = el('div', { class: 'bubble bubble--judge bubble--expand-down' });
    stage.appendChild(bubble);

    // Type the reaction
    const typeWriter = new TypeWriter(bubble, { speed: 15 });
    await typeWriter.type(reaction);

    // Show score badge after typing completes
    await delay(200);
    const scoreBadge = el('div', { class: 'score-badge score-badge--pop' }, [`${score}/10`]);
    stage.appendChild(scoreBadge);
  }

  // Show banter between judges
  async function showBanter(banterLines) {
    clearElement(stage);

    stage.appendChild(el('div', { class: 'presentation__banter-header' }, [
      el('span', {}, ['📢 Judge Banter']),
    ]));

    const banterContainer = el('div', { class: 'presentation__banter' });
    stage.appendChild(banterContainer);

    for (const line of banterLines) {
      const banterLine = el('div', { class: 'banter-line' });
      banterContainer.appendChild(banterLine);

      const typeWriter = new TypeWriter(banterLine, { speed: 12 });
      await typeWriter.type(line);
      await delay(300);
    }
  }

  // Update totals display
  function updateTotals() {
    playerTotalEl.textContent = results.playerTotal || '—';
    opponentTotalEl.textContent = results.opponentTotal || '—';
  }

  // Fallback reaction
  function generateFallbackReaction() {
    const reactions = [
      "I've seen better. I've also seen worse.",
      "That was certainly... words.",
      "My expectations were low, and yet...",
      "Interesting choice. Very interesting.",
      "I'm not angry, I'm just disappointed.",
    ];
    return reactions[Math.floor(Math.random() * reactions.length)];
  }

  // Start after mount
  setTimeout(runPresentation, 500);

  return screen;
}

export default PresentationScreen;
