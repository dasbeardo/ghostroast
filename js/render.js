// All rendering functions
import { $ } from './utils.js';
import { state } from './state.js';
import { bindEvents } from './game.js';
import { HOST } from '../data/index.js';

export function render() {
  const app = $('#app');

  switch (state.screen) {
    case 'apiKey':
      app.innerHTML = renderApiKey();
      break;
    case 'menu':
      app.innerHTML = renderMenu();
      break;
    case 'matchOpening':
      app.innerHTML = renderMatchOpening();
      break;
    case 'ghostIntro':
      app.innerHTML = renderGhostIntro();
      break;
    case 'drafting':
      app.innerHTML = renderDrafting();
      break;
    case 'presentation':
      app.innerHTML = renderPresentation();
      break;
    case 'judging':
      app.innerHTML = renderJudging();
      break;
    case 'results':
      app.innerHTML = renderResults();
      break;
    case 'matchEnd':
      app.innerHTML = renderMatchEnd();
      break;
  }

  bindEvents();
}

// Host dialogue box component
function renderHostBox(showContinue = false) {
  return `
    <div class="host-box">
      <div class="host-avatar">
        <div class="host-emoji">${HOST.emoji}</div>
        <div class="host-name">Mort</div>
      </div>
      <div class="host-dialogue">
        <p class="host-text" id="host-text"></p>
        ${state.isTyping ? `<span class="typing-indicator">▌</span>` : ''}
      </div>
      ${showContinue && state.showContinue ? `
        <button class="btn btn-small" id="continue-btn">Continue</button>
      ` : ''}
    </div>
  `;
}

function renderApiKey() {
  const hasKey = state.apiKey && state.apiKey.length > 0;

  return `
    <div class="api-key-screen">
      <div class="menu-emoji">👻🔥</div>
      <h1 class="menu-title">The Ghost Roast</h1>
      <p class="api-key-desc">This game uses OpenAI's API for AI-powered judges. Enter your API key to play.</p>

      <div class="api-key-input-wrapper">
        <input
          type="password"
          id="api-key-input"
          class="api-key-input"
          placeholder="sk-proj-..."
          value="${state.apiKey}"
        />
        <button class="btn btn-small" id="toggle-key-btn">👁</button>
      </div>

      <p class="api-key-note">Your key is stored locally in your browser and never sent anywhere except OpenAI.</p>

      ${hasKey ? `
        <button class="btn" id="save-key-btn">Continue</button>
      ` : `
        <button class="btn" id="save-key-btn" disabled>Enter API Key</button>
      `}

      <p class="api-key-help">
        <a href="https://platform.openai.com/api-keys" target="_blank">Get an API key from OpenAI →</a>
      </p>
    </div>
  `;
}

function renderMenu() {
  return `
    <div class="menu">
      <div class="menu-emoji">👻🔥</div>
      <h1 class="menu-title">The Ghost Roast</h1>
      <p class="menu-subtitle">with your host, Mort Holloway</p>
      <p class="menu-desc">Dead people take the stage. You craft roasts. Three random judges decide who burns brightest. Best of 3.</p>
      <button class="btn" id="start-btn">Enter the Séance</button>
    </div>
  `;
}

function renderMatchOpening() {
  const { opponent, judges } = state;

  return `
    <div class="match-opening">
      ${renderHostBox(true)}

      <div class="match-info ${state.showContinue ? 'revealed' : 'hidden'}">
        <div class="matchup">
          <div class="matchup-player">
            <div class="matchup-emoji">🎭</div>
            <div class="matchup-name">YOU</div>
          </div>
          <div class="matchup-vs">VS</div>
          <div class="matchup-opponent">
            <div class="matchup-emoji">${opponent.emoji}</div>
            <div class="matchup-name">${opponent.name}</div>
          </div>
        </div>

        <div class="judges-panel">
          <div class="judges-label">TODAY'S JUDGES</div>
          <div class="judges-row">
            ${judges.map(j => `
              <div class="judge-preview">
                <div class="judge-preview-emoji">${j.emoji}</div>
                <div class="judge-preview-name">${j.name.split(' ')[0]}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderGhostIntro() {
  const { ghost, round, hostPhase, showContinue } = state;

  // Different states of the ghost intro
  const showGhostInfo = hostPhase === 'ghostReaction' || hostPhase === 'ready';
  const showBio = hostPhase === 'ghostReaction' || hostPhase === 'ready';

  return `
    <div class="ghost-intro">
      <div class="round-label">ROUND ${round}</div>

      ${renderHostBox(true)}

      <div class="ghost-reveal ${showGhostInfo ? 'revealed' : 'hidden'}">
        <div class="ghost-emoji">${ghost.emoji}</div>
        <h2 class="ghost-name">${ghost.name}</h2>
        <p class="ghost-died">☠️ ${ghost.died}</p>

        <div class="ghost-bio ${showBio ? 'revealed' : 'hidden'}">
          ${ghost.bio.map(line => `<p>${line}</p>`).join('')}
        </div>
      </div>

      ${hostPhase === 'ready' ? `
        <button class="btn" id="start-roasting-btn">🎤 Start Roasting</button>
      ` : ''}
    </div>
  `;
}

function renderDrafting() {
  const { scores, opponent, ghost, round, playerTemplate, playerSlots, activeSlot, playerWordPools, aiTemplate, hostLine } = state;

  // Build player's template with slots
  let templateHtml = playerTemplate.template;
  playerTemplate.slots.forEach((slot, i) => {
    const filled = playerSlots[i];
    const isActive = activeSlot === i;
    const classes = ['slot-btn'];
    if (filled) classes.push('filled');
    if (isActive) classes.push('active');

    templateHtml = templateHtml.replace(
      `[slot${i}]`,
      `<button class="${classes.join(' ')}" data-slot="${i}">${filled || slot.label}</button>`
    );
  });

  // Build AI's template preview (just show the structure)
  let aiTemplatePreview = aiTemplate.template;
  aiTemplate.slots.forEach((slot, i) => {
    aiTemplatePreview = aiTemplatePreview.replace(`[slot${i}]`, `[${slot.label}]`);
  });

  const isComplete = playerSlots.every(s => s !== null);

  return `
    <div class="drafting">
      <div class="scoreboard">
        <div class="score-box">
          <div class="score-label">YOU</div>
          <div class="score-value">${scores.player}</div>
        </div>
        <div class="score-center">
          <div class="score-vs">VS ${ghost.emoji}</div>
          <div class="score-round">Round ${round}/3</div>
        </div>
        <div class="score-box">
          <div class="score-label">${opponent.emoji} ${opponent.name}</div>
          <div class="score-value">${scores.ai}</div>
        </div>
      </div>

      ${hostLine ? `
        <div class="host-aside">
          <span class="host-aside-emoji">${HOST.emoji}</span>
          <span class="host-aside-text">${hostLine}</span>
        </div>
      ` : ''}

      <div class="roast-card">
        <div class="roast-label">YOUR ROAST:</div>
        <div class="roast-template">${templateHtml}</div>
      </div>

      ${activeSlot !== null ? `
        <div class="word-picker">
          <div class="word-picker-label">PICK: ${playerTemplate.slots[activeSlot].label}</div>
          <div class="word-options">
            ${playerWordPools[activeSlot].map(word => `
              <button class="word-btn" data-word="${word}" data-slot="${activeSlot}">${word}</button>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="opponent-template">
        <div class="opponent-template-label">${opponent.emoji} ${opponent.name}'s template:</div>
        <div class="opponent-template-text">"${aiTemplatePreview}"</div>
      </div>

      ${isComplete ? `
        <div class="submit-section">
          <button class="btn" id="submit-btn">🎤 Deliver Roast</button>
        </div>
      ` : ''}
    </div>
  `;
}

function renderPresentation() {
  const { ghost, opponent, presentationPhase, playerInsult, aiInsult } = state;

  return `
    <div class="presentation">
      <div class="presentation-header">
        <div class="presentation-ghost">${ghost.emoji} ${ghost.name}</div>
        <div class="presentation-title">THE ROASTS</div>
      </div>

      <div class="presentation-jokes">
        <div class="presentation-joke ${presentationPhase >= 1 ? 'active' : ''}">
          <div class="joke-label">🎭 YOU</div>
          <div class="joke-text" id="player-joke-text">${presentationPhase > 1 ? `"${playerInsult}"` : ''}</div>
        </div>

        <div class="presentation-joke ${presentationPhase >= 2 ? 'active' : ''}">
          <div class="joke-label">${opponent.emoji} ${opponent.name}</div>
          <div class="joke-text" id="ai-joke-text">${presentationPhase > 2 ? `"${aiInsult}"` : ''}</div>
        </div>
      </div>

      ${presentationPhase < 3 ? `
        <div class="presentation-status">
          ${presentationPhase === 1 ? 'Delivering your roast...' : 'Opponent is responding...'}
        </div>
      ` : ''}
    </div>
  `;
}

function renderJudging() {
  const { roundJudges, judgeResults, currentJudgeIndex, opponent, hostLine } = state;

  return `
    <div class="judging">
      ${hostLine ? `
        <div class="host-aside centered">
          <span class="host-aside-emoji">${HOST.emoji}</span>
          <span class="host-aside-text" id="host-aside-text"></span>
        </div>
      ` : ''}

      <div class="judges-progress">
        ${roundJudges.map((j, i) => `
          <div class="judge-progress-item ${i < judgeResults.length ? 'done' : i === currentJudgeIndex ? 'active' : ''}">
            <div class="judge-progress-emoji">${j.emoji}</div>
            <div class="judge-progress-status">
              ${i < judgeResults.length ? '✓' : i === currentJudgeIndex ? '...' : ''}
            </div>
          </div>
        `).join('')}
      </div>

      ${judgeResults.length > 0 ? `
        <div class="judge-results-stream">
          ${judgeResults.map((result, i) => `
            <div class="judge-result-card revealed">
              <div class="judge-result-emoji">${roundJudges[i].emoji}</div>
              <div class="judge-result-content">
                <div class="judge-result-name">${result.name}</div>
                <div class="judge-result-reaction" id="judge-reaction-${i}">${result.reaction ? `"${result.reaction}"` : ''}</div>
              </div>
              <div class="judge-result-scores">
                <div class="judge-score-player">You: ${result.playerScore}</div>
                <div class="judge-score-ai">${opponent.emoji}: ${result.aiScore}</div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${currentJudgeIndex < roundJudges.length ? `
        <div class="current-judge-thinking">
          <div class="thinking-emoji">${roundJudges[currentJudgeIndex].emoji}</div>
          <p class="thinking-text">${roundJudges[currentJudgeIndex].name} is judging...</p>
        </div>
      ` : ''}
    </div>
  `;
}

function renderResults() {
  const { results, opponent, roundJudges, scores, hostLine } = state;

  if (results.error) {
    return `
      <div class="error">
        <p class="error-text">${results.error}</p>
        <button class="btn" id="retry-btn">Retry</button>
      </div>
    `;
  }

  return `
    <div class="results">
      <div class="scoreboard">
        <div class="score-box">
          <div class="score-label">YOU</div>
          <div class="score-value">${scores.player}</div>
        </div>
        <div class="score-center">
          <div class="score-vs">RESULTS</div>
        </div>
        <div class="score-box">
          <div class="score-label">${opponent.emoji} ${opponent.name}</div>
          <div class="score-value">${scores.ai}</div>
        </div>
      </div>

      ${hostLine ? `
        <div class="host-aside centered">
          <span class="host-aside-emoji">${HOST.emoji}</span>
          <span class="host-aside-text" id="host-aside-text"></span>
        </div>
      ` : ''}

      <div class="results-grid">
        <div class="result-card ${results.winner === 'player' ? 'winner-player' : ''}">
          <div class="result-card-label">YOU</div>
          <div class="result-card-insult">"${results.playerInsult}"</div>
          <div class="result-card-score player">${results.playerTotal}</div>
        </div>
        <div class="result-card ${results.winner === 'ai' ? 'winner-ai' : ''}">
          <div class="result-card-label">${opponent.emoji} ${opponent.name}</div>
          <div class="result-card-insult">"${results.aiInsult}"</div>
          <div class="result-card-score ai">${results.aiTotal}</div>
        </div>
      </div>

      <div class="judge-results">
        ${results.judges.map((j, i) => `
          <div class="judge-result-card">
            <div class="judge-result-emoji">${roundJudges[i]?.emoji || '🎭'}</div>
            <div class="judge-result-content">
              <div class="judge-result-name">${j.name}</div>
              <div class="judge-result-reaction">"${j.reaction}"</div>
            </div>
            <div class="judge-result-scores">
              <div class="judge-score-player">${j.playerScore}</div>
              <div class="judge-score-ai">${j.aiScore}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="round-winner-banner">
        <div class="round-winner-label">ROUND WINNER</div>
        <div class="round-winner-text ${results.winner}">
          ${results.winner === 'player' ? '🏆 YOU' : results.winner === 'ai' ? `${opponent.emoji} ${opponent.name}` : '🤝 TIE'}
        </div>
      </div>

      <button class="btn btn-full" id="next-btn">
        ${scores.player >= 2 || scores.ai >= 2 ? 'Final Results' : 'Next Ghost'}
      </button>
    </div>
  `;
}

function renderMatchEnd() {
  const { scores, opponent, judges } = state;
  const won = scores.player > scores.ai;

  return `
    <div class="match-end">
      ${renderHostBox(false)}

      <div class="match-end-content">
        <div class="match-end-emoji">${won ? '👻👑' : '💀'}</div>
        <h1 class="match-end-title ${won ? 'won' : 'lost'}">
          ${won ? 'GHOST ROASTER SUPREME' : `${opponent.emoji} ${opponent.name} WINS`}
        </h1>
        <p class="match-end-score">You ${scores.player} - ${scores.ai} ${opponent.name}</p>
        <p class="match-end-judges">Judged by: ${judges.map(j => j.emoji).join(' ')}</p>
      </div>

      ${state.showContinue ? `
        <button class="btn" id="play-again-btn">Play Again</button>
      ` : ''}
    </div>
  `;
}
