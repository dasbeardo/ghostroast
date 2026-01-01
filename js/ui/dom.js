/**
 * Roast Mortem - DOM Utilities
 * Helper functions for DOM manipulation.
 */

/**
 * Query selector shorthand
 * @param {string} selector - CSS selector
 * @param {Element} [parent=document] - Parent element to search within
 * @returns {Element|null}
 */
export const $ = (selector, parent = document) => parent.querySelector(selector);

/**
 * Query selector all shorthand
 * @param {string} selector - CSS selector
 * @param {Element} [parent=document] - Parent element to search within
 * @returns {NodeList}
 */
export const $$ = (selector, parent = document) => parent.querySelectorAll(selector);

/**
 * Create an element with attributes and children
 * @param {string} tag - HTML tag name
 * @param {Object} [attrs={}] - Attributes to set
 * @param {(string|Element)[]} [children=[]] - Child elements or text
 * @returns {Element}
 */
export function createElement(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);

  // Handle special attributes
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class' || key === 'className') {
      el.className = Array.isArray(value) ? value.join(' ') : value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(el.style, value);
    } else if (key === 'data' && typeof value === 'object') {
      for (const [dataKey, dataValue] of Object.entries(value)) {
        el.dataset[dataKey] = dataValue;
      }
    } else if (key.startsWith('on') && typeof value === 'function') {
      const event = key.slice(2).toLowerCase();
      el.addEventListener(event, value);
    } else if (value !== null && value !== undefined && value !== false) {
      el.setAttribute(key, value);
    }
  }

  // Add children
  for (const child of children) {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof Element) {
      el.appendChild(child);
    }
  }

  return el;
}

/**
 * Shorthand for createElement
 */
export const el = createElement;

/**
 * Create element from HTML string
 * @param {string} html - HTML string
 * @returns {Element}
 */
export function htmlToElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstChild;
}

/**
 * Remove all children from an element
 * @param {Element} element
 */
export function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Wait for next animation frame
 * @returns {Promise<number>}
 */
export function nextFrame() {
  return new Promise(resolve => requestAnimationFrame(resolve));
}

/**
 * Wait for transition/animation to complete
 * @param {Element} element
 * @returns {Promise<void>}
 */
export function waitForAnimation(element) {
  return new Promise(resolve => {
    const onEnd = () => {
      element.removeEventListener('animationend', onEnd);
      element.removeEventListener('transitionend', onEnd);
      resolve();
    };
    element.addEventListener('animationend', onEnd);
    element.addEventListener('transitionend', onEnd);
  });
}

/**
 * Add class, wait for animation, remove class
 * @param {Element} element
 * @param {string} className
 * @returns {Promise<void>}
 */
export async function animateClass(element, className) {
  element.classList.add(className);
  await waitForAnimation(element);
  element.classList.remove(className);
}

/**
 * Show element with animation
 * @param {Element} element
 * @param {string} [animationClass='animate-fade-in']
 */
export async function show(element, animationClass = 'animate-fade-in') {
  element.classList.remove('hidden');
  element.hidden = false;
  if (animationClass) {
    await animateClass(element, animationClass);
  }
}

/**
 * Hide element with animation
 * @param {Element} element
 * @param {string} [animationClass='animate-fade-out']
 */
export async function hide(element, animationClass = 'animate-fade-out') {
  if (animationClass) {
    await animateClass(element, animationClass);
  }
  element.classList.add('hidden');
  element.hidden = true;
}

/**
 * Delegate event handling
 * @param {Element} parent - Parent element to attach listener to
 * @param {string} eventType - Event type (click, etc.)
 * @param {string} selector - CSS selector for target elements
 * @param {Function} handler - Event handler
 */
export function delegate(parent, eventType, selector, handler) {
  parent.addEventListener(eventType, (event) => {
    const target = event.target.closest(selector);
    if (target && parent.contains(target)) {
      handler(event, target);
    }
  });
}
