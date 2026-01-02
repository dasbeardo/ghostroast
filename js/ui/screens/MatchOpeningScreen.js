/**
 * Roast Mortem - Match Opening Screen
 * Shows host intro with typewriter effect before the match begins.
 */

import { el, $ } from '../dom.js';
import { Portrait } from '../components/Portrait.js';
import { TypeWriter, delay } from '../components/Dialogue.js';
import { onSkip, clearSkip } from '../index.js';
import {
  HOST_OPENINGS,
  getHostLine,
  getPlayerAwareOpening
} from '../../../data/host.js';

// Note: Path is from js/ui/screens/ to data/ = ../../../data/

/**
 * Render the match opening screen
 * @param {Object} options
 * @param {Object} options.player - Player data
 * @param {Object} options.opponent - Opponent data
 * @param {Object[]} options.judges - Selected judges
 * @param {Object} options.stats - Player stats for personalized intro
 * @param {Function} options.onContinue - Callback when ready to start
 * @returns {HTMLElement}
 */
export function MatchOpeningScreen({
  player,
  opponent,
  judges,
  stats,
  onContinue
}) {
  const screen = el('div', { class: 'screen screen-match-opening' }, [
    // Host section
    el('div', { class: 'match-opening__host' }, [
      Portrait({ emoji: '🎩', size: 'xl', type: 'host', spotlight: true }),
      el('span', { class: 'match-opening__host-name' }, ['MORT HOLLOWAY']),
    ]),

    // Dialogue box
    el('div', { class: 'match-opening__dialogue' }, [
      el('div', { class: 'dialogue-box' }, [
        el('div', { class: 'dialogue-box__speaker' }, ['MORT']),
        el('div', { class: 'dialogue-box__text', id: 'host-dialogue' }),
      ]),
    ]),

    // Matchup preview
    el('div', { class: 'match-opening__matchup', id: 'matchup', style: 'opacity: 0' }, [
      el('div', { class: 'match-opening__versus' }, [
        el('div', { class: 'match-opening__fighter' }, [
          Portrait({ emoji: player?.emoji || '👤', size: 'lg', type: 'player' }),
          el('span', { class: 'match-opening__fighter-name' }, [player?.name || 'YOU']),
        ]),
        el('div', { class: 'match-opening__vs' }, ['VS']),
        el('div', { class: 'match-opening__fighter' }, [
          Portrait({ emoji: opponent?.emoji || '🤖', size: 'lg', type: 'opponent' }),
          el('span', { class: 'match-opening__fighter-name' }, [opponent?.name || 'AI']),
        ]),
      ]),
    ]),

    // Judges preview
    el('div', { class: 'match-opening__judges', id: 'judges-panel', style: 'opacity: 0' }, [
      el('div', { class: 'match-opening__judges-label' }, ["TONIGHT'S JUDGES"]),
      el('div', { class: 'match-opening__judges-row' },
        (judges || []).map(judge =>
          el('div', { class: 'match-opening__judge' }, [
            Portrait({ emoji: judge.emoji, size: 'md' }),
            el('span', { class: 'match-opening__judge-name' }, [judge.name]),
          ])
        )
      ),
    ]),

    // Continue button
    el('div', { class: 'match-opening__actions', id: 'actions', style: 'opacity: 0' }, [
      el('button', {
        class: 'btn btn--primary btn--full',
        onClick: onContinue
      }, ['Begin the Roast']),
      el('div', { class: 'tap-hint' }, ['Tap anywhere to skip']),
    ]),
  ]);

  const dialogueEl = $('#host-dialogue', screen);
  const matchupEl = $('#matchup', screen);
  const judgesEl = $('#judges-panel', screen);
  const actionsEl = $('#actions', screen);

  // Run the intro sequence
  async function playIntro() {
    let skipped = false;
    const skipAll = () => { skipped = true; };
    onSkip(skipAll);

    const typeWriter = new TypeWriter(dialogueEl, { speed: 25 });

    // Get personalized opening line if we have player stats
    let openingLine;
    if (player?.name && stats) {
      openingLine = getPlayerAwareOpening(player.name, stats, opponent);
    } else {
      openingLine = getHostLine(HOST_OPENINGS);
    }

    // Type the opening
    await typeWriter.type(openingLine);

    if (!skipped) await delay(800);

    // Show matchup
    matchupEl.style.opacity = '1';
    matchupEl.classList.add('animate-fade-in-up');

    if (!skipped) await delay(600);

    // Show judges
    judgesEl.style.opacity = '1';
    judgesEl.classList.add('animate-fade-in-up');

    if (!skipped) await delay(400);

    // Show continue button
    actionsEl.style.opacity = '1';
    actionsEl.classList.add('animate-fade-in');

    clearSkip();
  }

  // Start intro after mount
  setTimeout(playIntro, 300);

  return screen;
}

export default MatchOpeningScreen;
