// Game logic
import { shuffle, $, typeText, delay } from './utils.js';
import { state } from './state.js';
import { getJudgeResponse } from './api.js';
import {
  GHOSTS, JUDGES, TEMPLATES, WORD_POOLS, OPPONENTS,
  HOST_OPENINGS, HOST_GHOST_INTROS, HOST_GHOST_REACTIONS,
  HOST_DRAFTING_START, HOST_JUDGING_INTROS,
  HOST_ROUND_WINNER_PLAYER, HOST_ROUND_WINNER_AI, HOST_ROUND_TIE,
  HOST_MATCH_WIN, HOST_MATCH_LOSS, HOST_CLOSINGS,
  getHostLine
} from '../data/index.js';

// Forward declaration - render will be injected to avoid circular dependency
let render = () => {};

export function setRenderFunction(fn) {
  render = fn;
}

// Type host dialogue with effect
async function hostSpeak(text, elementId = 'host-text') {
  state.isTyping = true;
  state.showContinue = false;
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
      localStorage.setItem('roastaghost_apikey', state.apiKey);
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
  await hostSpeak(getHostLine(HOST_OPENINGS));
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

  // Generate player's word pools
  state.playerWordPools = state.playerTemplate.slots.map(slot => {
    const sourceWords = slot.pool ? WORD_POOLS[slot.pool] : slot.words;
    return shuffle(sourceWords).slice(0, 6);
  });
  state.playerSlots = new Array(state.playerTemplate.slots.length).fill(null);

  // AI picks all its words immediately (random from pools)
  state.aiSlots = state.aiTemplate.slots.map(slot => {
    const sourceWords = slot.pool ? WORD_POOLS[slot.pool] : slot.words;
    const shuffled = shuffle(sourceWords);
    return shuffled[0]; // AI just picks randomly
  });

  state.activeSlot = null;
  state.results = null;
  state.playerInsult = '';
  state.aiInsult = '';
  state.presentationPhase = 0;
  state.hostPhase = 'ghostIntro';
  state.showContinue = false;
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

  // PRESENTATION PHASE - show the jokes with drama
  state.screen = 'presentation';
  state.presentationPhase = 1;
  state.showContinue = false;
  render();

  // Player's joke types out
  await delay(500);
  const playerJokeEl = document.getElementById('player-joke-text');
  if (playerJokeEl) {
    playerJokeEl.textContent = '"';
    const playerSpan = document.createElement('span');
    playerJokeEl.appendChild(playerSpan);
    await typeText(playerSpan, state.playerInsult, { baseSpeed: 30 });
    playerJokeEl.textContent = `"${state.playerInsult}"`;
    await delay(1000);
  }

  // AI's joke types out - update DOM directly, don't re-render
  const aiJokeCard = document.querySelector('.presentation-joke:nth-child(2)');
  if (aiJokeCard) aiJokeCard.classList.add('active');

  await delay(500);
  const aiJokeEl = document.getElementById('ai-joke-text');
  if (aiJokeEl) {
    aiJokeEl.textContent = '"';
    const aiSpan = document.createElement('span');
    aiJokeEl.appendChild(aiSpan);
    await typeText(aiSpan, state.aiInsult, { baseSpeed: 30 });
    aiJokeEl.textContent = `"${state.aiInsult}"`;
    await delay(1000);
  }

  // Transition to judging
  state.presentationPhase = 3;
  state.loading = true;
  state.screen = 'judging';
  state.judgeResults = [];
  state.currentJudgeIndex = 0;
  state.hostLine = getHostLine(HOST_JUDGING_INTROS);

  // Shuffle judge order for this round
  state.roundJudges = shuffle([...state.judges]);
  render();

  // Type the host's judging intro
  await delay(300);
  const hostAsideEl = document.getElementById('host-aside-text');
  if (hostAsideEl) {
    await typeText(hostAsideEl, state.hostLine, { baseSpeed: 20 });
  }

  // Simplified context for judges - just the jokes, no template structure
  const ghostContext = `🎭 TONIGHT'S GHOST: ${state.ghost.emoji} ${state.ghost.name}
Died: ${state.ghost.died}
• ${state.ghost.bio[0]}
• ${state.ghost.bio[1]}
• ${state.ghost.bio[2]}

🎤 THE ROASTS:
PLAYER: "${state.playerInsult}"
${state.opponent.emoji} ${state.opponent.name}: "${state.aiInsult}"`;

  try {
    // Process each judge sequentially
    for (let i = 0; i < state.roundJudges.length; i++) {
      state.currentJudgeIndex = i;
      state.hostLine = ''; // Clear host line during judging
      render();

      const judge = state.roundJudges[i];
      const priorReactions = state.judgeResults;

      const result = await getJudgeResponse(judge, ghostContext, priorReactions, state.playerInsult, state.aiInsult, state.opponent);

      // Add result but with empty reaction initially (for typewriter)
      const reactionText = result.reaction;
      result.reaction = '';
      state.judgeResults.push(result);
      render();

      // Type out the judge's reaction with quotes
      await delay(200);
      const reactionEl = document.getElementById(`judge-reaction-${i}`);
      if (reactionEl) {
        // Create a span for the typing effect
        reactionEl.innerHTML = `"<span id="typing-target-${i}"></span>"`;
        const typingTarget = document.getElementById(`typing-target-${i}`);
        if (typingTarget) {
          await typeText(typingTarget, reactionText, { baseSpeed: 25 });
        }
        // Store the final reaction in state for results screen
        state.judgeResults[i].reaction = reactionText;
      }

      // Pause so user can read
      await delay(1200);
    }

    // Calculate final scores
    const playerTotal = state.judgeResults.reduce((sum, j) => sum + j.playerScore + (j.playerBonus || 0), 0);
    const aiTotal = state.judgeResults.reduce((sum, j) => sum + j.aiScore + (j.aiBonus || 0), 0);
    const winner = playerTotal > aiTotal ? 'player' : playerTotal < aiTotal ? 'ai' : 'tie';

    state.results = {
      judges: state.judgeResults,
      playerInsult: state.playerInsult,
      aiInsult: state.aiInsult,
      playerTotal,
      aiTotal,
      winner
    };

    if (winner === 'player') state.scores.player++;
    else if (winner === 'ai') state.scores.ai++;

    // Set host line for results
    if (winner === 'player') {
      state.hostLine = getHostLine(HOST_ROUND_WINNER_PLAYER);
    } else if (winner === 'ai') {
      state.hostLine = getHostLine(HOST_ROUND_WINNER_AI);
    } else {
      state.hostLine = getHostLine(HOST_ROUND_TIE);
    }

    // Short delay before showing final results
    await delay(1000);
    state.screen = 'results';
  } catch (err) {
    console.error(err);
    state.results = { error: 'Judges are arguing backstage. Try again.' };
    state.screen = 'results';
  }

  state.loading = false;
  render();
}

async function nextRound() {
  if (state.scores.player >= 2 || state.scores.ai >= 2) {
    // Match is over
    state.screen = 'matchEnd';
    state.showContinue = false;
    render();

    const won = state.scores.player > state.scores.ai;
    const matchLine = won ? getHostLine(HOST_MATCH_WIN) : getHostLine(HOST_MATCH_LOSS);
    const closingLine = getHostLine(HOST_CLOSINGS);

    await delay(500);
    await hostSpeak(matchLine + " " + closingLine);
  } else {
    state.round++;
    startRound(state.usedGhosts);
  }
}
