/**
 * Roast Mortem - UI Module Index
 * Main entry point for the new UI system.
 */

// DOM utilities
export * from './dom.js';

// Components
export * from './components/index.js';

// Screens
export * from './screens/index.js';

/**
 * Initialize the UI system
 * Call this once when the app starts.
 */
export function initUI() {
  // Add any global UI initialization here
  console.log('[UI] Roast Mortem UI initialized');

  // Set up global tap-to-skip behavior
  setupTapToSkip();

  return true;
}

/**
 * Global tap-to-skip state
 */
let currentSkipCallback = null;

/**
 * Set up global tap-to-skip handler
 */
function setupTapToSkip() {
  document.addEventListener('click', handleTap);
  document.addEventListener('touchstart', handleTap, { passive: true });
}

function handleTap(event) {
  // Don't skip if tapping a button or interactive element
  if (event.target.closest('button, a, .btn, .chip, .portrait--tappable')) {
    return;
  }

  if (currentSkipCallback) {
    currentSkipCallback();
  }
}

/**
 * Register a skip callback (for current animation/typing)
 * @param {Function} callback
 */
export function onSkip(callback) {
  currentSkipCallback = callback;
}

/**
 * Clear the skip callback
 */
export function clearSkip() {
  currentSkipCallback = null;
}

/**
 * Screen transition helper
 * @param {HTMLElement} from - Current screen
 * @param {HTMLElement} to - Next screen
 * @param {string} [transition='fade'] - Transition type
 */
export async function transitionScreen(from, to, transition = 'fade') {
  // Simple fade for now, can add more transitions later
  if (from) {
    from.classList.add('animate-fade-out');
    await new Promise(r => setTimeout(r, 250));
    from.hidden = true;
    from.classList.remove('animate-fade-out');
  }

  if (to) {
    to.hidden = false;
    to.classList.add('animate-fade-in');
    await new Promise(r => setTimeout(r, 250));
    to.classList.remove('animate-fade-in');
  }
}
