/**
 * Roast Mortem - Portrait Component
 * Renders character portraits with various states.
 */

import { el } from '../dom.js';

/**
 * Portrait sizes
 */
export const PortraitSize = {
  SM: 'sm',
  MD: 'md',      // default
  LG: 'lg',
  XL: 'xl',
  FEATURED: 'featured'
};

/**
 * Portrait types (affects border color)
 */
export const PortraitType = {
  DEFAULT: 'default',
  GHOST: 'ghost',
  HOST: 'host',
  PLAYER: 'player',
  OPPONENT: 'opponent'
};

/**
 * Create a portrait element
 *
 * @param {Object} options
 * @param {string} [options.image] - Image URL (optional, falls back to emoji)
 * @param {string} [options.emoji] - Fallback emoji if no image
 * @param {string} [options.alt] - Alt text for image
 * @param {string} [options.size] - Size variant (sm, md, lg, xl, featured)
 * @param {string} [options.type] - Type variant (ghost, host, player, opponent)
 * @param {boolean} [options.spotlight] - Whether portrait has spotlight glow
 * @param {boolean} [options.winner] - Whether portrait shows winner state
 * @param {boolean} [options.dimmed] - Whether portrait is dimmed
 * @param {boolean} [options.selected] - Whether portrait is selected
 * @param {boolean} [options.floating] - Whether to apply float animation
 * @param {boolean} [options.tappable] - Whether portrait is interactive
 * @param {Function} [options.onClick] - Click handler
 * @param {string[]} [options.extraClasses] - Additional CSS classes
 * @returns {HTMLElement}
 */
export function Portrait({
  image,
  emoji,
  alt = '',
  size,
  type,
  spotlight = false,
  winner = false,
  dimmed = false,
  selected = false,
  floating = false,
  bobbing = false,
  tappable = false,
  onClick,
  extraClasses = []
} = {}) {
  // Build class list
  const classes = ['portrait'];

  if (size && size !== 'md') {
    classes.push(`portrait--${size}`);
  }

  if (type && type !== 'default') {
    classes.push(`portrait--${type}`);
  }

  if (spotlight) classes.push('portrait--spotlight');
  if (winner) classes.push('portrait--winner');
  if (dimmed) classes.push('portrait--dimmed');
  if (selected) classes.push('portrait--selected');
  if (floating) classes.push('portrait--floating');
  if (bobbing) classes.push('portrait--bobbing');
  if (tappable || onClick) classes.push('portrait--tappable');

  classes.push(...extraClasses);

  // Create the portrait element
  const attrs = {
    class: classes,
    role: tappable ? 'button' : undefined,
    tabindex: tappable ? '0' : undefined
  };

  if (onClick) {
    attrs.onClick = onClick;
  }

  // Content: image or emoji
  const content = [];

  if (image) {
    content.push(el('img', { src: image, alt, loading: 'lazy' }));
  } else if (emoji) {
    content.push(emoji);
  }

  return el('div', attrs, content);
}

/**
 * Create a labeled portrait (portrait with name below)
 *
 * @param {Object} options - Portrait options (see Portrait)
 * @param {string} options.name - Name to display below portrait
 * @param {string} [options.nameColor] - Name color variant (amber, teal, green)
 * @returns {HTMLElement}
 */
export function LabeledPortrait({ name, nameColor, ...portraitOptions }) {
  const nameClasses = ['portrait-labeled__name'];
  if (nameColor) {
    nameClasses.push(`portrait-labeled__name--${nameColor}`);
  }

  return el('div', { class: 'portrait-labeled' }, [
    Portrait(portraitOptions),
    el('span', { class: nameClasses }, [name])
  ]);
}

/**
 * Update portrait state
 *
 * @param {HTMLElement} portrait - Portrait element
 * @param {Object} state - State to update
 */
export function updatePortraitState(portrait, {
  spotlight,
  winner,
  dimmed,
  selected
} = {}) {
  if (spotlight !== undefined) {
    portrait.classList.toggle('portrait--spotlight', spotlight);
  }
  if (winner !== undefined) {
    portrait.classList.toggle('portrait--winner', winner);
  }
  if (dimmed !== undefined) {
    portrait.classList.toggle('portrait--dimmed', dimmed);
  }
  if (selected !== undefined) {
    portrait.classList.toggle('portrait--selected', selected);
  }
}

export default Portrait;
