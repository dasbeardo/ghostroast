// Utility functions

export function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function $(selector) {
  return document.querySelector(selector);
}

// Typewriter effect for host/judge dialogue
// Returns a promise that resolves when typing is complete
export function typeText(element, text, options = {}) {
  const {
    baseSpeed = 35,        // ms per character
    pauseChars = '.,!?;:', // chars that trigger a pause
    pauseTime = 250,       // pause duration after punctuation
    emphasisSpeed = 60,    // slower speed for emphasis
    ellipsisSpeed = 120,   // speed for ... sequences
  } = options;

  // Handle edge cases
  if (!element || !text) {
    return Promise.resolve();
  }

  // Clean text of emphasis markers for display
  const cleanText = text.replace(/\*/g, '');

  return new Promise((resolve) => {
    let i = 0;
    let inEmphasis = false;
    element.textContent = '';

    function typeNext() {
      if (i >= text.length) {
        resolve();
        return;
      }

      const char = text[i];
      const nextChar = text[i + 1] || '';

      // Toggle emphasis mode on asterisks (don't show the asterisk)
      if (char === '*') {
        inEmphasis = !inEmphasis;
        i++;
        // Use requestAnimationFrame to avoid stack overflow on consecutive asterisks
        requestAnimationFrame(typeNext);
        return;
      }

      // Add the character
      element.textContent += char;
      i++;

      // Determine delay for next character
      let charDelay = baseSpeed;

      if (inEmphasis) {
        charDelay = emphasisSpeed;
      } else if (char === '.' && nextChar === '.') {
        // Ellipsis - slow down
        charDelay = ellipsisSpeed;
      } else if (pauseChars.includes(char)) {
        // Punctuation pause
        charDelay = baseSpeed + pauseTime;
      }

      setTimeout(typeNext, charDelay);
    }

    typeNext();
  });
}

// Type multiple lines with pauses between
export async function typeLines(element, lines, options = {}) {
  const { linePause = 500, ...typeOptions } = options;

  for (let i = 0; i < lines.length; i++) {
    if (i > 0) {
      element.textContent += '\n';
      await new Promise(r => setTimeout(r, linePause));
    }

    const startLen = element.textContent.length;
    const tempEl = {
      textContent: '',
      get length() { return this.textContent.length; }
    };

    await typeText(tempEl, lines[i], typeOptions);
    element.textContent += tempEl.textContent;
  }
}

// Skip typewriter and show full text (for impatient users)
export function skipTypewriter(element, fullText) {
  element.textContent = fullText.replace(/\*/g, '');
}

// Delay helper
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
