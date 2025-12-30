// Game logic
import { shuffle, $, typeText, delay } from './utils.js';
import { state, savePlayerStats, exportSaveData, importSaveData, PROXY_URL, USE_PANEL_JUDGING } from './state.js';
import { getJudgePanelResponse } from './api.js';
import {
  GHOSTS, JUDGES, TEMPLATES, WORD_POOLS, OPPONENTS,
  HOST_OPENINGS, HOST_GHOST_INTROS, HOST_GHOST_REACTIONS,
  HOST_DRAFTING_START,
  HOST_FIRST_UP_PLAYER, HOST_FIRST_UP_AI,
  HOST_AFTER_FIRST_ROAST, HOST_SECOND_UP_PLAYER, HOST_SECOND_UP_AI,
  HOST_AFTER_SECOND_ROAST,
  HOST_ROUND_WINNER_PLAYER, HOST_ROUND_WINNER_AI, HOST_ROUND_TIE,
  HOST_MATCH_WIN, HOST_MATCH_LOSS, HOST_CLOSINGS,
  getHostLine, getPlayerAwareOpening
} from '../data/index.js';

// Forward declaration - render will be injected to avoid circular dependency
let render = () => {};

export function setRenderFunction(fn) {
  render = fn;
}

// Build weighted word pool based on ghost themes
// Themed words appear 3x for higher selection chance
function buildWeightedPool(poolName, ghostThemes = []) {
  const pool = WORD_POOLS[poolName];
  if (!pool) return [];

  // Handle old format (simple array) for backwards compatibility
  if (Array.isArray(pool)) {
    return [...pool];
  }

  // New format: { base: [...], themed: { theme1: [...], ... } }
  let words = [...(pool.base || [])];

  // Add themed words with higher weight (3x)
  if (pool.themed && ghostThemes.length > 0) {
    for (const theme of ghostThemes) {
      const themedWords = pool.themed[theme] || [];
      // Add themed words 3 times for higher selection probability
      words.push(...themedWords, ...themedWords, ...themedWords);
    }
  }

  return words;
}

// Type host dialogue with effect
async function hostSpeak(text, elementId = 'host-text') {
  state.isTyping = true;
  state.showContinue = false;
  state.currentHostText = '';  // Clear while typing
  render();

  // Small delay to ensure DOM is ready
  await delay(50);

  const el = document.getElementById(elementId);
  if (el) {
    await typeText(el, text);
    // Pause after typing finishes for effect
    await delay(800);
  }

  state.isTyping = false;
  state.showContinue = true;
  state.currentHostText = text;  // Store text so it persists through re-render
  render();
}

export function bindEvents() {
  // API Key screen
  const apiKeyInput = $('#api-key-input');
  if (apiKeyInput) {
    apiKeyInput.oninput = (e) => {
      state.apiKey = e.target.value;
      render();
    };
  }

  const toggleKeyBtn = $('#toggle-key-btn');
  if (toggleKeyBtn) {
    toggleKeyBtn.onclick = () => {
      const input = $('#api-key-input');
      if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
      }
    };
  }

  const saveKeyBtn = $('#save-key-btn');
  if (saveKeyBtn && !saveKeyBtn.disabled) {
    saveKeyBtn.onclick = () => {
      localStorage.setItem('roastmortem_apikey', state.apiKey);
      // Go to player name screen if no name yet, otherwise menu
      state.screen = state.playerName ? 'menu' : 'playerName';
      render();
    };
  }

  // Access Password screen (proxy mode)
  const accessPasswordInput = $('#access-password-input');
  if (accessPasswordInput) {
    accessPasswordInput.oninput = (e) => {
      state.accessPassword = e.target.value;
      // Clear any previous error
      const errorEl = $('#password-error');
      if (errorEl) errorEl.textContent = '';
      render();
    };
    accessPasswordInput.focus();
  }

  const togglePasswordBtn = $('#toggle-password-btn');
  if (togglePasswordBtn) {
    togglePasswordBtn.onclick = () => {
      const input = $('#access-password-input');
      if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
      }
    };
  }

  const savePasswordBtn = $('#save-password-btn');
  if (savePasswordBtn && !savePasswordBtn.disabled) {
    savePasswordBtn.onclick = async () => {
      // Test the password by making a quick API call
      savePasswordBtn.disabled = true;
      savePasswordBtn.textContent = 'Checking...';

      try {
        const res = await fetch(PROXY_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Password': state.accessPassword
          },
          body: JSON.stringify({
            model: 'gpt-5.2',
            messages: [{ role: 'user', content: 'test' }],
            max_completion_tokens: 1
          })
        });

        const data = await res.json();

        if (res.status === 401 || data.error?.includes('password')) {
          const errorEl = $('#password-error');
          if (errorEl) {
            errorEl.textContent = 'Invalid password. Try again.';
            errorEl.style.color = '#f87171';
          }
          savePasswordBtn.disabled = false;
          savePasswordBtn.textContent = 'Enter the Crypt';
          return;
        }

        // Password works! Continue to game
        state.screen = state.playerName ? 'menu' : 'playerName';
        render();
      } catch (e) {
        const errorEl = $('#password-error');
        if (errorEl) {
          errorEl.textContent = 'Connection error. Check your internet.';
          errorEl.style.color = '#f87171';
        }
        savePasswordBtn.disabled = false;
        savePasswordBtn.textContent = 'Enter the Crypt';
      }
    };
  }

  // Player name screen
  const playerNameInput = $('#player-name-input');
  if (playerNameInput) {
    playerNameInput.oninput = (e) => {
      state.playerName = e.target.value;
      render();
    };
    // Auto-focus the input
    playerNameInput.focus();
  }

  const saveNameBtn = $('#save-name-btn');
  if (saveNameBtn && !saveNameBtn.disabled) {
    saveNameBtn.onclick = () => {
      state.stats.playerName = state.playerName.trim();
      savePlayerStats();
      state.screen = 'menu';
      render();
    };
  }

  // Menu buttons
  const statsBtn = $('#stats-btn');
  if (statsBtn) {
    statsBtn.onclick = () => {
      state.screen = 'stats';
      render();
    };
  }

  const changeNameBtn = $('#change-name-btn');
  if (changeNameBtn) {
    changeNameBtn.onclick = () => {
      state.screen = 'playerName';
      render();
    };
  }

  const backToMenuBtn = $('#back-to-menu-btn');
  if (backToMenuBtn) {
    backToMenuBtn.onclick = () => {
      state.screen = 'menu';
      render();
    };
  }

  const startBtn = $('#start-btn');
  if (startBtn) startBtn.onclick = startGame;

  const continueBtn = $('#continue-btn');
  if (continueBtn) continueBtn.onclick = handleContinue;

  const startRoastingBtn = $('#start-roasting-btn');
  if (startRoastingBtn) startRoastingBtn.onclick = () => {
    state.hostLine = getHostLine(HOST_DRAFTING_START);
    state.screen = 'drafting';
    render();
  };

  // Slot buttons
  document.querySelectorAll('.slot-btn:not(.filled)').forEach(btn => {
    btn.onclick = () => {
      state.activeSlot = parseInt(btn.dataset.slot);
      render();
    };
  });

  // Word buttons
  document.querySelectorAll('.word-btn').forEach(btn => {
    btn.onclick = () => selectWord(btn.dataset.word, parseInt(btn.dataset.slot));
  });

  const submitBtn = $('#submit-btn');
  if (submitBtn) submitBtn.onclick = submitToJudges;

  const retryBtn = $('#retry-btn');
  if (retryBtn) retryBtn.onclick = () => {
    state.screen = 'drafting';
    state.results = null;
    render();
  };

  const nextBtn = $('#next-btn');
  if (nextBtn) nextBtn.onclick = nextRound;

  const playAgainBtn = $('#play-again-btn');
  if (playAgainBtn) playAgainBtn.onclick = () => {
    state.screen = 'menu';
    render();
  };

  // Judging continue button (V3 panel approach)
  const judgingContinueBtn = $('#judging-continue-btn');
  if (judgingContinueBtn) judgingContinueBtn.onclick = handleJudgingContinue;

  // Card navigation (prev/next buttons)
  const cardPrevBtn = $('#card-prev');
  if (cardPrevBtn) cardPrevBtn.onclick = () => navigateCard(1);

  const cardNextBtn = $('#card-next');
  if (cardNextBtn) cardNextBtn.onclick = () => navigateCard(-1);

  // Card dots (click to jump)
  document.querySelectorAll('.card-dot').forEach(dot => {
    dot.onclick = () => {
      const index = parseInt(dot.dataset.index);
      state.currentCardIndex = index;
      render();
    };
  });

  // Card swipe handling
  const cardStack = $('#card-stack');
  if (cardStack) {
    let touchStartX = 0;
    let touchEndX = 0;

    cardStack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    cardStack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        // Swipe left = go to older cards (increment index)
        // Swipe right = go to newer cards (decrement index)
        navigateCard(diff > 0 ? 1 : -1);
      }
    }, { passive: true });
  }

  // Export/Import save data
  const exportBtn = $('#export-btn');
  if (exportBtn) {
    exportBtn.onclick = () => {
      const data = exportSaveData();
      // Copy to clipboard
      navigator.clipboard.writeText(data).then(() => {
        const msg = $('#save-message');
        if (msg) {
          msg.textContent = 'Save data copied to clipboard!';
          msg.className = 'save-message success';
          setTimeout(() => { msg.textContent = ''; msg.className = 'save-message'; }, 3000);
        }
      }).catch(() => {
        // Fallback: show in a prompt
        prompt('Copy this save data:', data);
      });
    };
  }

  const importBtn = $('#import-btn');
  if (importBtn) {
    importBtn.onclick = () => {
      const area = $('#import-area');
      if (area) area.classList.remove('hidden');
    };
  }

  const importCancelBtn = $('#import-cancel-btn');
  if (importCancelBtn) {
    importCancelBtn.onclick = () => {
      const area = $('#import-area');
      if (area) area.classList.add('hidden');
      const textarea = $('#import-textarea');
      if (textarea) textarea.value = '';
    };
  }

  const importConfirmBtn = $('#import-confirm-btn');
  if (importConfirmBtn) {
    importConfirmBtn.onclick = () => {
      const textarea = $('#import-textarea');
      const msg = $('#save-message');
      if (textarea && textarea.value.trim()) {
        const result = importSaveData(textarea.value.trim());
        if (result.success) {
          if (msg) {
            msg.textContent = `Loaded save data for ${result.playerName}!`;
            msg.className = 'save-message success';
          }
          setTimeout(() => render(), 1500);
        } else {
          if (msg) {
            msg.textContent = result.error;
            msg.className = 'save-message error';
          }
        }
      }
    };
  }

  // Skip typing on click anywhere during typing
  if (state.isTyping) {
    document.addEventListener('click', skipTyping, { once: true });
  }
}

function skipTyping() {
  // Could implement skip functionality here
}

async function handleContinue() {
  const { screen, hostPhase } = state;

  if (screen === 'matchOpening') {
    // Move to first ghost intro
    startRound([]);
  } else if (screen === 'ghostIntro') {
    if (hostPhase === 'ghostIntro') {
      // Show ghost reaction
      state.hostPhase = 'ghostReaction';
      state.showContinue = false;
      render();
      await delay(300);
      await hostSpeak(getHostLine(HOST_GHOST_REACTIONS));
      state.hostPhase = 'ready';
      render();
    }
  } else if (screen === 'matchEnd') {
    state.screen = 'menu';
    render();
  }
}

async function startGame() {
  state.opponent = OPPONENTS[Math.floor(Math.random() * OPPONENTS.length)];
  state.judges = shuffle(JUDGES).slice(0, 3);
  state.scores = { player: 0, ai: 0 };
  state.round = 1;
  state.usedGhosts = [];

  // Show match opening with host
  state.screen = 'matchOpening';
  state.showContinue = false;
  render();

  await delay(500);

  // Use player-aware opening if we have a player name, otherwise generic
  let openingLine;
  if (state.playerName) {
    openingLine = getPlayerAwareOpening(state.playerName, state.stats, state.opponent);
  } else {
    openingLine = getHostLine(HOST_OPENINGS);
  }
  await hostSpeak(openingLine);
}

async function startRound(excluded) {
  const available = GHOSTS.filter(g => !excluded.includes(g.name));
  const ghost = available[Math.floor(Math.random() * available.length)];
  state.ghost = ghost;
  state.usedGhosts = [...excluded, ghost.name];

  // Pick TWO different templates - one for player, one for AI
  const shuffledTemplates = shuffle([...TEMPLATES]);
  state.playerTemplate = shuffledTemplates[0];
  state.aiTemplate = shuffledTemplates[1] || shuffledTemplates[0]; // Fallback if only 1 template

  // Get ghost themes for weighted word selection
  const ghostThemes = ghost.themes || [];

  // Generate player's word pools with ghost-themed weighting
  state.playerWordPools = state.playerTemplate.slots.map(slot => {
    const sourceWords = slot.pool ? buildWeightedPool(slot.pool, ghostThemes) : slot.words;
    // Shuffle and take 6, removing duplicates
    const uniqueWords = [...new Set(shuffle(sourceWords))];
    return uniqueWords.slice(0, 6);
  });
  state.playerSlots = new Array(state.playerTemplate.slots.length).fill(null);

  // AI picks all its words immediately (from weighted pools)
  state.aiSlots = state.aiTemplate.slots.map(slot => {
    const sourceWords = slot.pool ? buildWeightedPool(slot.pool, ghostThemes) : slot.words;
    const shuffled = shuffle(sourceWords);
    return shuffled[0];
  });

  state.activeSlot = null;
  state.results = null;
  state.playerInsult = '';
  state.aiInsult = '';
  state.presentationPhase = 0;
  state.hostPhase = 'ghostIntro';
  state.showContinue = false;
  state.firstRoastScores = [];
  state.secondRoastScores = [];
  state.currentRoaster = null;
  state.screen = 'ghostIntro';
  render();

  // Host introduces the ghost
  await delay(500);
  await hostSpeak(getHostLine(HOST_GHOST_INTROS) + ` ${ghost.name}!`);
}

function selectWord(word, slotIndex) {
  state.playerSlots[slotIndex] = word;
  state.playerWordPools[slotIndex] = state.playerWordPools[slotIndex].filter(w => w !== word);
  state.activeSlot = null;
  render();
}

function buildInsult(template, slots) {
  let result = template.template;
  template.slots.forEach((_, i) => {
    result = result.replace(`[slot${i}]`, slots[i] || '___');
  });
  return result;
}

async function submitToJudges() {
  // Build both insults
  state.playerInsult = buildInsult(state.playerTemplate, state.playerSlots);
  state.aiInsult = buildInsult(state.aiTemplate, state.aiSlots);

  // Determine who goes first (alternates each round)
  const firstIsPlayer = state.playerGoesFirst;
  const firstRoaster = firstIsPlayer ? 'player' : 'ai';
  const secondRoaster = firstIsPlayer ? 'ai' : 'player';
  const firstInsult = firstIsPlayer ? state.playerInsult : state.aiInsult;
  const secondInsult = firstIsPlayer ? state.aiInsult : state.playerInsult;
  const firstName = firstIsPlayer ? (state.playerName || 'YOU') : state.opponent.name;
  const secondName = firstIsPlayer ? state.opponent.name : (state.playerName || 'YOU');
  const firstEmoji = firstIsPlayer ? '🎭' : state.opponent.emoji;
  const secondEmoji = firstIsPlayer ? state.opponent.emoji : '🎭';

  // Ghost context for judges (simplified for V3)
  const ghostContext = `${state.ghost.emoji} ${state.ghost.name} - ${state.ghost.died}. ${state.ghost.bio[0]}`;

  // Shuffle judge order for this round
  state.roundJudges = shuffle([...state.judges]);

  // ===== FIRST ROAST PRESENTATION =====
  state.screen = 'presentation';
  state.currentRoaster = firstRoaster;
  state.presentationPhase = 1;
  state.showContinue = false;
  state.judgingComplete = false;
  state.showBanter = false;
  state.hostLine = getHostLine(firstIsPlayer ? HOST_FIRST_UP_PLAYER : HOST_FIRST_UP_AI);
  render();

  // Type host intro for first roaster
  await delay(300);
  let hostAsideEl = document.getElementById('host-aside-text');
  if (hostAsideEl) {
    await typeText(hostAsideEl, state.hostLine, { baseSpeed: 20 });
  }
  await delay(800);

  // Type out first roast
  const firstJokeEl = document.getElementById('first-joke-text');
  if (firstJokeEl) {
    firstJokeEl.textContent = '"';
    const span = document.createElement('span');
    firstJokeEl.appendChild(span);
    await typeText(span, firstInsult, { baseSpeed: 30 });
    firstJokeEl.textContent = `"${firstInsult}"`;
    await delay(1000);
  }

  // ===== FIRST ROAST JUDGING (V3 Panel) =====
  state.hostLine = getHostLine(HOST_AFTER_FIRST_ROAST);
  state.currentHostText = '';
  state.screen = 'judging';
  state.loading = true;
  state.judgeResults = [];
  state.firstRoastBanter = [];
  state.reactionsTyped = false;
  state.visibleCards = 0;
  state.currentCardIndex = 0;
  state.showBanter = false;
  state.typedReactionCount = 0;
  state.banterTyped = false;
  render();

  // Type host transition
  await delay(300);
  hostAsideEl = document.getElementById('host-aside-text');
  if (hostAsideEl) {
    await typeText(hostAsideEl, state.hostLine, { baseSpeed: 20 });
    state.currentHostText = state.hostLine;
  }

  try {
    // Single API call for all 3 judges + banter
    const panelResponse = await getJudgePanelResponse(
      state.roundJudges,
      ghostContext,
      firstName,
      firstEmoji,
      firstInsult,
      false,
      null
    );

    // Store all results (but visibleCards controls what's shown)
    state.judgeResults = panelResponse.judges.map((j, i) => ({
      ...j,
      roaster: firstRoaster
    }));
    state.firstRoastBanter = panelResponse.banter || [];
    state.loading = false;
    render();

    // Reveal each judge card one at a time
    for (let i = 0; i < state.judgeResults.length; i++) {
      await delay(400);
      state.visibleCards = i + 1;
      state.currentCardIndex = 0; // Newest card always on top
      render();

      // Type out reaction on the visible card
      await delay(200);
      const reactionEl = document.getElementById(`judge-reaction-${i}`);
      if (reactionEl) {
        const reactionText = state.judgeResults[i].reaction;
        reactionEl.innerHTML = `"<span id="typing-target-${i}"></span>"`;
        const typingTarget = document.getElementById(`typing-target-${i}`);
        if (typingTarget) {
          await typeText(typingTarget, reactionText, { baseSpeed: 20 });
        }
      }

      // Mark this reaction as typed (reveals score with pop animation)
      state.typedReactionCount = i + 1;
      render();
      await delay(300);
    }

    // Reveal banter card
    if (state.firstRoastBanter.length > 0) {
      await delay(400);
      state.showBanter = true;
      state.visibleCards = state.judgeResults.length + 1;
      state.currentCardIndex = 0;
      render();

      // Type out banter lines
      await delay(200);
      for (let i = 0; i < state.firstRoastBanter.length; i++) {
        const banterEl = document.getElementById(`banter-${i}`);
        if (banterEl) {
          await typeText(banterEl, state.firstRoastBanter[i], { baseSpeed: 15 });
          await delay(300);
        }
      }

      // Mark banter as typed
      state.banterTyped = true;
      render();
    }

    // Mark reactions as typed and show continue button
    state.reactionsTyped = true;
    state.judgingComplete = true;
    render();

    // Store first roast scores
    state.firstRoastScores = state.judgeResults.map(r => ({
      name: r.name,
      score: r.score,
      reaction: r.reaction,
      roaster: firstRoaster
    }));

    // Wait for user to click continue
    await waitForContinue();

    // ===== SECOND ROAST PRESENTATION =====
    state.screen = 'presentation';
    state.currentRoaster = secondRoaster;
    state.presentationPhase = 2;
    state.judgingComplete = false;
    state.showBanter = false;
    state.hostLine = getHostLine(firstIsPlayer ? HOST_SECOND_UP_AI : HOST_SECOND_UP_PLAYER);
    render();

    // Type host intro for second roaster
    await delay(500);
    hostAsideEl = document.getElementById('host-aside-text');
    if (hostAsideEl) {
      await typeText(hostAsideEl, state.hostLine, { baseSpeed: 20 });
    }
    await delay(800);

    // Type out second roast
    const secondJokeEl = document.getElementById('second-joke-text');
    if (secondJokeEl) {
      secondJokeEl.textContent = '"';
      const span = document.createElement('span');
      secondJokeEl.appendChild(span);
      await typeText(span, secondInsult, { baseSpeed: 30 });
      secondJokeEl.textContent = `"${secondInsult}"`;
      await delay(1000);
    }

    // ===== SECOND ROAST JUDGING (V3 Panel) =====
    state.hostLine = getHostLine(HOST_AFTER_SECOND_ROAST);
    state.currentHostText = '';
    state.screen = 'judging';
    state.loading = true;
    state.judgeResults = [];
    state.secondRoastBanter = [];
    state.reactionsTyped = false;
    state.visibleCards = 0;
    state.currentCardIndex = 0;
    state.showBanter = false;
    state.typedReactionCount = 0;
    state.banterTyped = false;
    render();

    await delay(300);
    hostAsideEl = document.getElementById('host-aside-text');
    if (hostAsideEl) {
      await typeText(hostAsideEl, state.hostLine, { baseSpeed: 20 });
      state.currentHostText = state.hostLine;
    }

    // Build first roast context for second roast judging
    const firstRoastContext = {
      roasterName: firstName,
      roast: firstInsult,
      scores: state.firstRoastScores.map(s => s.score)
    };

    // Single API call for second roast
    const panelResponse2 = await getJudgePanelResponse(
      state.roundJudges,
      ghostContext,
      secondName,
      secondEmoji,
      secondInsult,
      true,
      firstRoastContext
    );

    // Store all results (but visibleCards controls what's shown)
    state.judgeResults = panelResponse2.judges.map((j, i) => ({
      ...j,
      roaster: secondRoaster
    }));
    state.secondRoastBanter = panelResponse2.banter || [];
    state.loading = false;
    render();

    // Reveal each judge card one at a time
    for (let i = 0; i < state.judgeResults.length; i++) {
      await delay(400);
      state.visibleCards = i + 1;
      state.currentCardIndex = 0; // Newest card always on top
      render();

      // Type out reaction on the visible card
      await delay(200);
      const reactionEl = document.getElementById(`judge-reaction-${i}`);
      if (reactionEl) {
        const reactionText = state.judgeResults[i].reaction;
        reactionEl.innerHTML = `"<span id="typing-target-${i}"></span>"`;
        const typingTarget = document.getElementById(`typing-target-${i}`);
        if (typingTarget) {
          await typeText(typingTarget, reactionText, { baseSpeed: 20 });
        }
      }

      // Mark this reaction as typed (reveals score with pop animation)
      state.typedReactionCount = i + 1;
      render();
      await delay(300);
    }

    // Reveal banter card
    if (state.secondRoastBanter.length > 0) {
      await delay(400);
      state.showBanter = true;
      state.visibleCards = state.judgeResults.length + 1;
      state.currentCardIndex = 0;
      render();

      // Type out banter lines
      await delay(200);
      for (let i = 0; i < state.secondRoastBanter.length; i++) {
        const banterEl = document.getElementById(`banter-${i}`);
        if (banterEl) {
          await typeText(banterEl, state.secondRoastBanter[i], { baseSpeed: 15 });
          await delay(300);
        }
      }

      // Mark banter as typed
      state.banterTyped = true;
      render();
    }

    // Mark reactions as typed and show continue button
    state.reactionsTyped = true;
    state.judgingComplete = true;
    render();

    // Store second roast scores
    state.secondRoastScores = state.judgeResults.map(r => ({
      name: r.name,
      score: r.score,
      reaction: r.reaction,
      roaster: secondRoaster
    }));

    // Wait for user to click continue before showing results
    await waitForContinue();

    // ===== CALCULATE FINAL RESULTS =====
    let playerTotal = 0;
    let aiTotal = 0;

    state.firstRoastScores.forEach(s => {
      if (s.roaster === 'player') playerTotal += s.score;
      else aiTotal += s.score;
    });
    state.secondRoastScores.forEach(s => {
      if (s.roaster === 'player') playerTotal += s.score;
      else aiTotal += s.score;
    });

    const winner = playerTotal > aiTotal ? 'player' : playerTotal < aiTotal ? 'ai' : 'tie';

    // Combine judge results for display
    const combinedJudges = state.roundJudges.map((judge, i) => {
      const firstScore = state.firstRoastScores[i];
      const secondScore = state.secondRoastScores[i];
      return {
        name: judge.name,
        emoji: judge.emoji,
        playerScore: firstIsPlayer ? firstScore.score : secondScore.score,
        aiScore: firstIsPlayer ? secondScore.score : firstScore.score,
        playerReaction: firstIsPlayer ? firstScore.reaction : secondScore.reaction,
        aiReaction: firstIsPlayer ? secondScore.reaction : firstScore.reaction
      };
    });

    state.results = {
      judges: combinedJudges,
      playerInsult: state.playerInsult,
      aiInsult: state.aiInsult,
      playerTotal,
      aiTotal,
      winner,
      firstBanter: state.firstRoastBanter,
      secondBanter: state.secondRoastBanter
    };

    if (winner === 'player') {
      state.scores.player++;
      state.stats.totalRoundsWon++;
    } else if (winner === 'ai') {
      state.scores.ai++;
      state.stats.totalRoundsLost++;
    } else {
      state.stats.totalRoundsTied++;
    }

    // Track highest single round score
    if (playerTotal > state.stats.highestSingleScore) {
      state.stats.highestSingleScore = playerTotal;
    }

    // Track judge scores for this player
    combinedJudges.forEach(judge => {
      if (!state.stats.judgeScores[judge.name]) {
        state.stats.judgeScores[judge.name] = { totalScore: 0, timesJudged: 0 };
      }
      state.stats.judgeScores[judge.name].totalScore += judge.playerScore;
      state.stats.judgeScores[judge.name].timesJudged++;
    });

    // Track ghosts roasted
    if (!state.stats.ghostsRoasted.includes(state.ghost.name)) {
      state.stats.ghostsRoasted.push(state.ghost.name);
    }

    // Set host line for results
    if (winner === 'player') {
      state.hostLine = getHostLine(HOST_ROUND_WINNER_PLAYER);
    } else if (winner === 'ai') {
      state.hostLine = getHostLine(HOST_ROUND_WINNER_AI);
    } else {
      state.hostLine = getHostLine(HOST_ROUND_TIE);
    }

    // Toggle who goes first next round
    state.playerGoesFirst = !state.playerGoesFirst;

    state.screen = 'results';
  } catch (err) {
    console.error(err);
    state.results = { error: 'Judges are arguing backstage. Try again.' };
    state.screen = 'results';
  }

  state.loading = false;
  render();
}

// Helper to wait for user to click continue
function waitForContinue() {
  return new Promise(resolve => {
    state.continueResolver = resolve;
    render();
  });
}

// Called when user clicks continue during judging
export function handleJudgingContinue() {
  if (state.continueResolver) {
    state.continueResolver();
    state.continueResolver = null;
  }
}

// Navigate card stack (direction: 1 = older cards, -1 = newer cards)
function navigateCard(direction) {
  const { visibleCards, showBanter, firstRoastBanter, secondRoastBanter, presentationPhase } = state;
  const currentBanter = presentationPhase === 1 ? firstRoastBanter : secondRoastBanter;
  const hasBanter = showBanter && currentBanter.length > 0;
  const totalCards = Math.min(visibleCards, 3 + (hasBanter ? 1 : 0));

  const newIndex = state.currentCardIndex + direction;
  if (newIndex >= 0 && newIndex < totalCards) {
    state.currentCardIndex = newIndex;
    render();
  }
}

async function nextRound() {
  if (state.scores.player >= 2 || state.scores.ai >= 2) {
    // Match is over - record stats
    const won = state.scores.player > state.scores.ai;

    // Update win/loss totals
    if (won) {
      state.stats.totalWins++;
      state.stats.currentWinStreak++;
      if (state.stats.currentWinStreak > state.stats.longestWinStreak) {
        state.stats.longestWinStreak = state.stats.currentWinStreak;
      }
    } else {
      state.stats.totalLosses++;
      state.stats.currentWinStreak = 0;
    }

    // Update opponent record
    const oppName = state.opponent.name;
    if (!state.stats.opponentRecords[oppName]) {
      state.stats.opponentRecords[oppName] = { wins: 0, losses: 0 };
    }
    if (won) {
      state.stats.opponentRecords[oppName].wins++;
    } else {
      state.stats.opponentRecords[oppName].losses++;
    }

    // Add to match history (keep last 10)
    state.stats.matchHistory.unshift({
      opponent: oppName,
      won,
      playerScore: state.scores.player,
      aiScore: state.scores.ai,
      date: new Date().toISOString()
    });
    if (state.stats.matchHistory.length > 10) {
      state.stats.matchHistory = state.stats.matchHistory.slice(0, 10);
    }

    // Save stats to localStorage
    savePlayerStats();

    state.screen = 'matchEnd';
    state.showContinue = false;
    render();

    const matchLine = won ? getHostLine(HOST_MATCH_WIN) : getHostLine(HOST_MATCH_LOSS);
    const closingLine = getHostLine(HOST_CLOSINGS);

    await delay(500);
    await hostSpeak(matchLine + " " + closingLine);
  } else {
    state.round++;
    startRound(state.usedGhosts);
  }
}
