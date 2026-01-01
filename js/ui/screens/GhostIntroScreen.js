/**
 * Roast Mortem - Ghost Intro Screen
 */

import { el, $ } from '../dom.js';
import { Portrait } from '../components/Portrait.js';
import { TypeWriter, delay } from '../components/Dialogue.js';
import { onSkip, clearSkip } from '../index.js';

/**
 * Render the ghost intro screen
 * @param {Object} options
 * @param {Object} options.ghost - Ghost data
 * @param {Object} options.player - Player data
 * @param {Object} options.opponent - Opponent data
 * @param {number} options.playerScore - Player match score
 * @param {number} options.opponentScore - Opponent match score
 * @param {number} options.round - Current round
 * @param {Function} options.onStart - Callback to start drafting
 * @returns {HTMLElement}
 */
export function GhostIntroScreen({
  ghost,
  player,
  opponent,
  playerScore = 0,
  opponentScore = 0,
  round = 1,
  onStart
}) {
  const screen = el('div', { class: 'screen screen-ghost-intro' }, [
    // Header
    el('header', { class: 'ghost-intro__header' }, [
      el('div', { class: 'ghost-intro__score' }, [
        el('div', {}, [`${playerScore} - ${opponentScore}`]),
        el('div', { class: 'ghost-intro__round' }, [`Round ${round}`]),
      ]),
      el('div', { class: 'ghost-intro__matchup' }, [
        Portrait({ emoji: player?.emoji || '👤', size: 'sm', type: 'player' }),
        el('span', { class: 'ghost-intro__vs' }, ['VS']),
        Portrait({ emoji: opponent?.emoji || '🤖', size: 'sm', type: 'opponent' }),
      ]),
      el('button', { class: 'btn-icon' }, ['☰']),
    ]),

    // Content
    el('div', { class: 'ghost-intro__content' }, [
      // Mort narrator
      el('div', { class: 'ghost-intro__mort' }, [
        Portrait({ emoji: '🎩', size: 'lg', type: 'host', spotlight: true }),
        el('span', { class: 'portrait-labeled__name portrait-labeled__name--amber' }, ['MORT']),
      ]),

      // Dialogue
      el('div', { class: 'ghost-intro__dialogue' }, [
        el('div', { class: 'dialogue-box' }, [
          el('div', { class: 'dialogue-box__speaker' }, ['MORT']),
          el('div', { class: 'dialogue-box__text', id: 'mort-dialogue' }),
        ]),
      ]),

      // Ghost
      el('div', { class: 'ghost-intro__ghost' }, [
        Portrait({
          emoji: ghost?.emoji || '👻',
          size: 'xl',
          type: 'ghost',
          floating: true
        }),
        el('div', { class: 'ghost-intro__ghost-name' }, [ghost?.name || 'Unknown Ghost']),
      ]),

      // Bio card
      el('div', { class: 'ghost-intro__bio bio-card bio-card--mini', style: 'opacity: 0' }, [
        el('div', { class: 'bio-card__header' }, [
          el('h4', { class: 'bio-card__name' }, [ghost?.name || 'Unknown']),
          el('div', { class: 'bio-card__cause' }, [`💀 ${ghost?.causeOfDeath || 'Unknown causes'}`]),
        ]),
        el('ul', { class: 'bio-card__facts' },
          (ghost?.bio || ['No bio available']).map(fact =>
            el('li', { class: 'bio-card__fact' }, [fact])
          )
        ),
      ]),

      // Actions
      el('div', { class: 'ghost-intro__actions' }, [
        el('button', {
          class: 'btn btn--primary btn--full',
          style: 'opacity: 0',
          onClick: onStart
        }, ['Start Roasting']),
        el('div', { class: 'tap-hint' }, ['Tap to skip']),
      ]),
    ]),
  ]);

  // Animate the intro
  async function playIntro() {
    const dialogueEl = $('#mort-dialogue', screen);
    const bioCard = $('.ghost-intro__bio', screen);
    const startBtn = $('.btn--primary', screen);
    const typeWriter = new TypeWriter(dialogueEl, { speed: 25 });

    let skipped = false;
    const skipAll = () => {
      skipped = true;
      typeWriter.complete();
    };
    onSkip(skipAll);

    // Beat 1: Intro
    await typeWriter.type(`Our next dearly departed...`);
    if (!skipped) await delay(500);

    // Beat 2: Name and cause
    typeWriter.element.textContent = '';
    await typeWriter.type(`${ghost?.name || 'Unknown'}. Cause of death: ${ghost?.causeOfDeath || 'unknown'}.`);
    if (!skipped) await delay(800);

    // Beat 3: Bio lines
    for (const line of (ghost?.bio || [])) {
      if (skipped) break;
      typeWriter.element.textContent = '';
      await typeWriter.type(`"${line}"`);
      if (!skipped) await delay(600);
    }

    // Show bio card
    bioCard.style.opacity = '1';
    bioCard.classList.add('animate-fade-in-up');

    // Beat 4: Reaction
    if (!skipped) await delay(400);
    typeWriter.element.textContent = '';
    const reactions = [
      "Well that's... something.",
      "They really lived, didn't they?",
      "The network has outdone itself.",
      "I've seen worse. Not much worse, but worse.",
    ];
    await typeWriter.type(reactions[Math.floor(Math.random() * reactions.length)]);

    // Show start button
    startBtn.style.opacity = '1';
    startBtn.classList.add('animate-pop-in');

    clearSkip();
  }

  // Start intro after a brief delay
  setTimeout(playIntro, 300);

  return screen;
}

export default GhostIntroScreen;
