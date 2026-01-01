/**
 * Roast Mortem - Dialogue Component
 * Typewriter text effect and dialogue display.
 */

import { el, $ } from '../dom.js';

/**
 * Default typing speed (ms per character)
 */
const DEFAULT_SPEED = 30;

/**
 * Punctuation pause multipliers
 */
const PAUSE_CHARS = {
  '.': 8,
  '!': 8,
  '?': 8,
  ',': 3,
  ':': 4,
  ';': 4,
  '—': 5,
  '...': 12
};

/**
 * TypeWriter class for managing typewriter effect
 */
export class TypeWriter {
  constructor(element, options = {}) {
    this.element = element;
    this.speed = options.speed || DEFAULT_SPEED;
    this.onComplete = options.onComplete || (() => {});
    this.onCharacter = options.onCharacter || (() => {});

    this.text = '';
    this.index = 0;
    this.isTyping = false;
    this.isPaused = false;
    this.timeoutId = null;
  }

  /**
   * Start typing text
   * @param {string} text - Text to type
   * @returns {Promise<void>} - Resolves when typing is complete
   */
  type(text) {
    return new Promise((resolve) => {
      this.text = text;
      this.index = 0;
      this.isTyping = true;
      this.isPaused = false;
      this.element.textContent = '';
      this.element.classList.add('typing-cursor');

      const typeNext = () => {
        if (!this.isTyping) {
          this.element.classList.remove('typing-cursor');
          resolve();
          return;
        }

        if (this.isPaused) {
          this.timeoutId = setTimeout(typeNext, 50);
          return;
        }

        if (this.index >= this.text.length) {
          this.isTyping = false;
          this.element.classList.remove('typing-cursor');
          this.onComplete();
          resolve();
          return;
        }

        const char = this.text[this.index];
        this.element.textContent += char;
        this.index++;
        this.onCharacter(char, this.index);

        // Calculate delay for next character
        let delay = this.speed;

        // Check for punctuation pauses
        for (const [punct, multiplier] of Object.entries(PAUSE_CHARS)) {
          if (this.text.substring(this.index - punct.length, this.index) === punct) {
            delay = this.speed * multiplier;
            break;
          }
        }

        this.timeoutId = setTimeout(typeNext, delay);
      };

      typeNext();
    });
  }

  /**
   * Complete typing immediately (skip to end)
   */
  complete() {
    if (!this.isTyping) return;

    clearTimeout(this.timeoutId);
    this.element.textContent = this.text;
    this.element.classList.remove('typing-cursor');
    this.isTyping = false;
    this.onComplete();
  }

  /**
   * Pause typing
   */
  pause() {
    this.isPaused = true;
  }

  /**
   * Resume typing
   */
  resume() {
    this.isPaused = false;
  }

  /**
   * Stop typing completely
   */
  stop() {
    clearTimeout(this.timeoutId);
    this.isTyping = false;
    this.element.classList.remove('typing-cursor');
  }

  /**
   * Check if currently typing
   */
  get typing() {
    return this.isTyping;
  }
}

/**
 * Create a dialogue box element
 *
 * @param {Object} options
 * @param {string} options.speaker - Speaker name
 * @param {string} [options.text] - Initial text (optional, can type later)
 * @param {string} [options.id] - Element ID
 * @returns {HTMLElement}
 */
export function DialogueBox({ speaker, text = '', id }) {
  const attrs = { class: 'dialogue-box' };
  if (id) attrs.id = id;

  return el('div', attrs, [
    el('div', { class: 'dialogue-box__speaker' }, [speaker]),
    el('div', { class: 'dialogue-box__text' }, [text])
  ]);
}

/**
 * Create a dialogue box with typewriter capability
 *
 * @param {Object} options
 * @param {string} options.speaker - Speaker name
 * @param {Object} [options.typeOptions] - TypeWriter options
 * @returns {{element: HTMLElement, typeWriter: TypeWriter}}
 */
export function createDialogue({ speaker, typeOptions = {} }) {
  const element = DialogueBox({ speaker });
  const textElement = $('.dialogue-box__text', element);
  const typeWriter = new TypeWriter(textElement, typeOptions);

  return { element, typeWriter, textElement };
}

/**
 * Type text with optional skip on tap
 *
 * @param {HTMLElement} element - Element to type into
 * @param {string} text - Text to type
 * @param {Object} [options] - Options
 * @param {number} [options.speed] - Typing speed
 * @param {boolean} [options.skippable=true] - Allow tap to skip
 * @returns {Promise<void>}
 */
export async function typeText(element, text, options = {}) {
  const { speed = DEFAULT_SPEED, skippable = true } = options;

  const typeWriter = new TypeWriter(element, { speed });

  if (skippable) {
    const skipHandler = () => {
      typeWriter.complete();
      document.removeEventListener('click', skipHandler);
      document.removeEventListener('touchstart', skipHandler);
    };

    document.addEventListener('click', skipHandler);
    document.addEventListener('touchstart', skipHandler, { passive: true });

    await typeWriter.type(text);

    document.removeEventListener('click', skipHandler);
    document.removeEventListener('touchstart', skipHandler);
  } else {
    await typeWriter.type(text);
  }
}

/**
 * Delay helper
 * @param {number} ms
 * @returns {Promise<void>}
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Skippable delay - resolves early on tap
 * @param {number} ms
 * @returns {Promise<void>}
 */
export function skippableDelay(ms) {
  return new Promise(resolve => {
    let resolved = false;

    const done = () => {
      if (resolved) return;
      resolved = true;
      document.removeEventListener('click', done);
      document.removeEventListener('touchstart', done);
      resolve();
    };

    document.addEventListener('click', done);
    document.addEventListener('touchstart', done, { passive: true });
    setTimeout(done, ms);
  });
}

export default { TypeWriter, DialogueBox, createDialogue, typeText, delay, skippableDelay };
