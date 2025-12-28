// Entry point - ties everything together
import { render } from './render.js';
import { setRenderFunction } from './game.js';

// Inject render function into game module to break circular dependency
setRenderFunction(render);

// Initialize the app
render();
