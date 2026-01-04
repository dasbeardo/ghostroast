/**
 * Ad Break Screen - Fake sponsor ads during API loading
 * Shows 3 ads with typewriter text effect, user controls advancement
 */

import { el } from '../dom.js';
import { getRandomAds } from '../../../data/ads.js';

/**
 * @param {Object} options
 * @param {Promise} options.apiPromise - Promise that resolves when API is ready
 * @param {Function} options.onComplete - Called when user exits ad break
 */
export function AdBreakScreen({ apiPromise, onComplete }) {
  const ads = getRandomAds(3);
  let currentAdIndex = 0;
  let playedAds = new Set(); // Ads that have fully typed out
  let apiReady = false;
  let typewriterActive = false;
  let typewriterRafId = null;
  let currentCharIndex = 0;
  let lastTypeTime = 0;
  const TYPE_INTERVAL = 30; // ms per character

  // Create screen structure
  const screen = el('div', { class: 'screen screen-ad-break' }, [
    // Header
    el('header', { class: 'ad-break__header' }, [
      el('span', { class: 'ad-break__icon' }, ['📺']),
      el('span', { class: 'ad-break__title' }, ['A WORD FROM OUR SPONSORS']),
    ]),

    // Ad container
    el('div', { class: 'ad-break__container' }, [
      // Image area (30%)
      el('div', { class: 'ad-break__image-area', id: 'ad-image-area' }, [
        el('div', { class: 'ad-break__image', id: 'ad-image' }),
      ]),

      // Text area (70%)
      el('div', { class: 'ad-break__text-area' }, [
        el('div', { class: 'ad-break__sponsor', id: 'ad-sponsor' }),
        el('div', { class: 'ad-break__text', id: 'ad-text' }),
      ]),
    ]),

    // Footer with dots and button
    el('footer', { class: 'ad-break__footer' }, [
      // Progress dots
      el('div', { class: 'ad-break__dots', id: 'ad-dots' },
        ads.map((_, i) => el('span', {
          class: `ad-break__dot ${i === 0 ? 'ad-break__dot--active' : ''}`,
          'data-index': i
        }))
      ),

      // Skip button (hidden until API ready)
      el('button', {
        class: 'btn btn--primary ad-break__skip',
        id: 'skip-btn',
        style: 'opacity: 0; pointer-events: none;',
        onClick: handleSkip
      }, ['BACK TO THE SHOW →']),
    ]),

    // Navigation arrows
    el('button', {
      class: 'ad-break__nav ad-break__nav--prev',
      id: 'prev-btn',
      onClick: () => navigateAd(-1)
    }, ['‹']),
    el('button', {
      class: 'ad-break__nav ad-break__nav--next',
      id: 'next-btn',
      onClick: () => navigateAd(1)
    }, ['›']),

    // Tap hint
    el('div', { class: 'ad-break__hint', id: 'ad-hint' }, ['Swipe or tap arrows to browse ads']),
  ]);

  // Get references
  const imageArea = screen.querySelector('#ad-image-area');
  const imageEl = screen.querySelector('#ad-image');
  const sponsorEl = screen.querySelector('#ad-sponsor');
  const textEl = screen.querySelector('#ad-text');
  const dotsContainer = screen.querySelector('#ad-dots');
  const skipBtn = screen.querySelector('#skip-btn');
  const prevBtn = screen.querySelector('#prev-btn');
  const nextBtn = screen.querySelector('#next-btn');
  const hintEl = screen.querySelector('#ad-hint');

  // Watch for API ready
  if (apiPromise) {
    apiPromise.then(() => {
      apiReady = true;
      skipBtn.style.opacity = '1';
      skipBtn.style.pointerEvents = 'auto';
      skipBtn.classList.add('ad-break__skip--ready');
    }).catch(() => {
      // Even on error, let them continue
      apiReady = true;
      skipBtn.style.opacity = '1';
      skipBtn.style.pointerEvents = 'auto';
      skipBtn.textContent = 'CONTINUE →';
    });
  } else {
    // No promise provided, show skip immediately
    apiReady = true;
    skipBtn.style.opacity = '1';
    skipBtn.style.pointerEvents = 'auto';
  }

  function handleSkip() {
    stopTypewriter();
    if (onComplete) onComplete();
  }

  function navigateAd(direction) {
    const newIndex = currentAdIndex + direction;
    if (newIndex < 0 || newIndex >= ads.length) return;

    // Mark current ad as "played" if we're leaving it
    playedAds.add(currentAdIndex);

    currentAdIndex = newIndex;
    showAd(currentAdIndex);
    updateDots();
    updateNavButtons();
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.ad-break__dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('ad-break__dot--active', i === currentAdIndex);
      dot.classList.toggle('ad-break__dot--played', playedAds.has(i));
    });
  }

  function updateNavButtons() {
    // Use CSS class for disabled state
    prevBtn.classList.toggle('ad-break__nav--disabled', currentAdIndex <= 0);
    nextBtn.classList.toggle('ad-break__nav--disabled', currentAdIndex >= ads.length - 1);
  }

  function stopTypewriter() {
    typewriterActive = false;
    if (typewriterRafId) {
      cancelAnimationFrame(typewriterRafId);
      typewriterRafId = null;
    }
  }

  function showAd(index) {
    stopTypewriter();

    const ad = ads[index];
    const hasPlayed = playedAds.has(index);

    // Update sponsor name
    sponsorEl.textContent = ad.sponsor;

    // Setup image (hidden initially if has revealAt and hasn't played)
    const shouldHideImage = ad.revealAt && !hasPlayed;
    imageEl.textContent = ad.image;
    imageEl.style.background = ad.imageBg || 'var(--color-bg-mid)';
    imageArea.classList.toggle('ad-break__image-area--hidden', shouldHideImage);
    imageArea.classList.remove('ad-break__image-area--revealed');

    // Show text
    if (hasPlayed) {
      // Already played - show full text immediately
      textEl.textContent = ad.text;
      imageArea.classList.remove('ad-break__image-area--hidden');
    } else {
      // First time - typewriter effect using requestAnimationFrame (Safari-friendly)
      textEl.textContent = '';
      currentCharIndex = 0;
      lastTypeTime = 0;
      startTypewriter(ad);
    }

    // Hide hint after first interaction
    hintEl.style.opacity = index > 0 ? '0' : '1';
  }

  function startTypewriter(ad) {
    const text = ad.text;
    const revealWord = ad.revealAt ? ad.revealAt.toLowerCase() : null;
    let revealed = false;

    typewriterActive = true;

    // Safari fallback: if text is still empty after 150ms, show it all at once
    const safariFallback = setTimeout(() => {
      if (typewriterActive && textEl.textContent.length === 0) {
        console.warn('Typewriter fallback triggered (Safari?)');
        stopTypewriter();
        textEl.textContent = text;
        playedAds.add(currentAdIndex);
        updateDots();
        imageArea.classList.remove('ad-break__image-area--hidden');
      }
    }, 150);

    function typeStep(timestamp) {
      if (!typewriterActive) {
        clearTimeout(safariFallback);
        return;
      }

      // Initialize lastTypeTime on first frame
      if (!lastTypeTime) lastTypeTime = timestamp;

      // Check if enough time has passed for next character
      const elapsed = timestamp - lastTypeTime;
      if (elapsed >= TYPE_INTERVAL) {
        lastTypeTime = timestamp;

        if (currentCharIndex < text.length) {
          currentCharIndex++;
          const currentText = text.substring(0, currentCharIndex);
          textEl.textContent = currentText;

          // Clear fallback once we've started typing
          if (currentCharIndex === 1) {
            clearTimeout(safariFallback);
          }

          // Check for reveal word
          if (revealWord && !revealed && currentText.toLowerCase().includes(revealWord)) {
            revealed = true;
            imageArea.classList.remove('ad-break__image-area--hidden');
            imageArea.classList.add('ad-break__image-area--revealed');
          }
        } else {
          // Finished typing
          clearTimeout(safariFallback);
          stopTypewriter();
          playedAds.add(currentAdIndex);
          updateDots();

          // Reveal image if not already
          if (!revealed) {
            imageArea.classList.remove('ad-break__image-area--hidden');
          }
          return; // Don't schedule another frame
        }
      }

      // Schedule next frame
      typewriterRafId = requestAnimationFrame(typeStep);
    }

    // Start the animation loop
    typewriterRafId = requestAnimationFrame(typeStep);
  }

  // Allow tapping on screen to speed up / complete current typewriter
  screen.addEventListener('click', (e) => {
    // Don't interfere with button clicks
    if (e.target.closest('button')) return;

    // If typewriter is running, complete it
    if (typewriterActive) {
      stopTypewriter();
      const ad = ads[currentAdIndex];
      textEl.textContent = ad.text;
      playedAds.add(currentAdIndex);
      updateDots();
      imageArea.classList.remove('ad-break__image-area--hidden');
    }
  });

  // Swipe support
  let touchStartX = 0;
  screen.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });
  screen.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      navigateAd(diff > 0 ? 1 : -1);
    }
  });

  // Initialize - defer to ensure DOM is mounted (Safari fix)
  // Use setTimeout(0) as Safari handles this more reliably than rAF for initialization
  setTimeout(() => {
    showAd(0);
    updateNavButtons();
  }, 0);

  return screen;
}

export default AdBreakScreen;
