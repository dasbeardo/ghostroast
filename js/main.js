// Entry point - ties everything together
import { render } from './render.js';
import { setRenderFunction } from './game.js';
import { state } from './state.js';

// Check for API key in URL hash (e.g., roastmortem.com/#sk-xxxx)
function checkUrlApiKey() {
  const hash = window.location.hash.slice(1); // Remove the #
  if (hash && hash.length > 10) {
    state.apiKey = hash;
    // Clear the hash from URL for security (doesn't stay in browser history)
    history.replaceState(null, '', window.location.pathname);
  }
}

// Inject render function into game module to break circular dependency
setRenderFunction(render);

// Check for API key in URL before rendering
checkUrlApiKey();

// Initialize the app
render();
