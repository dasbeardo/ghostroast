// All rendering functions
import { $ } from './utils.js';
import { state, VERSION } from './state.js';
import { bindEvents, handleJudgingContinue } from './game.js';
import { HOST, JUDGES, JUDGE_TAGS } from '../data/index.js';

export function render() {
  const app = $('#app');

  switch (state.screen) {
    case 'apiKey':
      app.innerHTML = renderApiKey();
      break;
    case 'accessPassword':
      app.innerHTML = renderAccessPassword();
      break;
    case 'playerName':
      app.innerHTML = renderPlayerName();
      break;
    case 'menu':
      app.innerHTML = renderMenu();
      break;
    case 'stats':
      app.innerHTML = renderStats();
      break;
    case 'judgeSelect':
      app.innerHTML = renderJudgeSelect();
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
        <p class="host-text" id="host-text">${state.currentHostText || ''}</p>
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
      <h1 class="menu-title">Roast Mortem</h1>
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
      <div class="version">v${VERSION}</div>
    </div>
  `;
}

function renderAccessPassword() {
  const hasPassword = state.accessPassword && state.accessPassword.length > 0;

  return `
    <div class="api-key-screen">
      <div class="menu-emoji">👻🔥</div>
      <h1 class="menu-title">Roast Mortem</h1>
      <p class="api-key-desc">Enter the access password to play.</p>

      <div class="api-key-input-wrapper">
        <input
          type="password"
          id="access-password-input"
          class="api-key-input"
          placeholder="Password..."
          value="${state.accessPassword}"
        />
        <button class="btn btn-small" id="toggle-password-btn">👁</button>
      </div>

      <p class="api-key-note">Ask the game host for the password.</p>

      ${hasPassword ? `
        <button class="btn" id="save-password-btn">Enter the Crypt</button>
      ` : `
        <button class="btn" id="save-password-btn" disabled>Enter Password</button>
      `}

      <div id="password-error" class="password-error"></div>
      <div class="version">v${VERSION}</div>
    </div>
  `;
}

function renderPlayerName() {
  const hasName = state.playerName && state.playerName.trim().length > 0;
  const isReturning = state.stats.totalWins > 0 || state.stats.totalLosses > 0;

  return `
    <div class="player-name-screen">
      <div class="menu-emoji">🎭</div>
      <h1 class="menu-title">${isReturning ? 'Welcome Back' : 'Who Goes There?'}</h1>
      <p class="player-name-desc">${isReturning
        ? `Good to see you again. Still going by the same name?`
        : `Every roaster needs a name. What shall the spirits call you?`}</p>

      <div class="player-name-input-wrapper">
        <input
          type="text"
          id="player-name-input"
          class="player-name-input"
          placeholder="Enter your stage name..."
          value="${state.playerName}"
          maxlength="20"
        />
      </div>

      ${isReturning ? `
        <div class="returning-stats">
          <p>Record: ${state.stats.totalWins}W - ${state.stats.totalLosses}L</p>
          ${state.stats.currentWinStreak > 1 ? `<p class="streak">Current streak: ${state.stats.currentWinStreak} wins</p>` : ''}
        </div>
      ` : ''}

      ${hasName ? `
        <button class="btn" id="save-name-btn">${isReturning ? 'Continue' : 'Enter the Séance'}</button>
      ` : `
        <button class="btn" id="save-name-btn" disabled>Enter Your Name</button>
      `}
      <div class="version">v${VERSION}</div>
    </div>
  `;
}

function renderMenu() {
  const hasStats = state.stats.totalWins > 0 || state.stats.totalLosses > 0;
  const winRate = hasStats
    ? Math.round((state.stats.totalWins / (state.stats.totalWins + state.stats.totalLosses)) * 100)
    : 0;

  return `
    <div class="menu">
      <div class="menu-emoji">👻🔥</div>
      <h1 class="menu-title">Roast Mortem</h1>
      <p class="menu-subtitle">with your host, Mort Holloway</p>

      ${state.playerName ? `
        <div class="player-welcome">
          <span class="player-welcome-name">🎭 ${state.playerName}</span>
          ${hasStats ? `<span class="player-welcome-record">${state.stats.totalWins}W - ${state.stats.totalLosses}L (${winRate}%)</span>` : ''}
        </div>
      ` : ''}

      <p class="menu-desc">Dead people take the stage. You craft roasts. Three random judges decide who burns brightest. Best of 3.</p>
      <button class="btn" id="start-btn">Enter the Séance</button>

      <div class="menu-links">
        ${hasStats ? `<button class="btn-link" id="stats-btn">View Stats</button>` : ''}
        <button class="btn-link" id="change-name-btn">Change Name</button>
      </div>

      <div class="version">v${VERSION}</div>
    </div>
  `;
}

function renderStats() {
  const { stats } = state;
  const hasStats = stats.totalWins > 0 || stats.totalLosses > 0;
  const winRate = hasStats
    ? Math.round((stats.totalWins / (stats.totalWins + stats.totalLosses)) * 100)
    : 0;

  // Get sorted opponent records
  const opponentEntries = Object.entries(stats.opponentRecords || {})
    .map(([name, record]) => ({ name, ...record }))
    .sort((a, b) => (b.wins - b.losses) - (a.wins - a.losses));

  // Get sorted judge averages
  const judgeEntries = Object.entries(stats.judgeScores || {})
    .map(([name, data]) => ({
      name,
      avg: data.timesJudged > 0 ? (data.totalScore / data.timesJudged).toFixed(1) : 0,
      times: data.timesJudged
    }))
    .filter(j => j.times > 0)
    .sort((a, b) => b.avg - a.avg);

  return `
    <div class="stats-screen">
      <h1 class="stats-title">🎭 ${stats.playerName || 'Your'} Stats</h1>

      <div class="stats-overview">
        <div class="stat-box">
          <div class="stat-value">${stats.totalWins}</div>
          <div class="stat-label">Wins</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${stats.totalLosses}</div>
          <div class="stat-label">Losses</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${winRate}%</div>
          <div class="stat-label">Win Rate</div>
        </div>
      </div>

      <div class="stats-details">
        <div class="stat-row">
          <span class="stat-row-label">Rounds Won:</span>
          <span class="stat-row-value">${stats.totalRoundsWon}</span>
        </div>
        <div class="stat-row">
          <span class="stat-row-label">Rounds Lost:</span>
          <span class="stat-row-value">${stats.totalRoundsLost}</span>
        </div>
        <div class="stat-row">
          <span class="stat-row-label">Best Single Round Score:</span>
          <span class="stat-row-value">${stats.highestSingleScore || 0}</span>
        </div>
        <div class="stat-row">
          <span class="stat-row-label">Longest Win Streak:</span>
          <span class="stat-row-value">${stats.longestWinStreak || 0}</span>
        </div>
        <div class="stat-row">
          <span class="stat-row-label">Current Win Streak:</span>
          <span class="stat-row-value">${stats.currentWinStreak || 0}</span>
        </div>
        <div class="stat-row">
          <span class="stat-row-label">Ghosts Roasted:</span>
          <span class="stat-row-value">${(stats.ghostsRoasted || []).length}</span>
        </div>
      </div>

      ${opponentEntries.length > 0 ? `
        <div class="stats-section">
          <h2 class="stats-section-title">Record vs Opponents</h2>
          <div class="opponent-records">
            ${opponentEntries.map(opp => `
              <div class="opponent-record">
                <span class="opponent-name">${opp.name}</span>
                <span class="opponent-score ${opp.wins > opp.losses ? 'winning' : opp.wins < opp.losses ? 'losing' : ''}">${opp.wins}W - ${opp.losses}L</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${judgeEntries.length > 0 ? `
        <div class="stats-section">
          <h2 class="stats-section-title">Average Score per Judge</h2>
          <div class="judge-averages">
            ${judgeEntries.map(judge => `
              <div class="judge-avg">
                <span class="judge-avg-name">${judge.name}</span>
                <span class="judge-avg-score">${judge.avg}</span>
                <span class="judge-avg-times">(${judge.times}x)</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${(stats.matchHistory || []).length > 0 ? `
        <div class="stats-section">
          <h2 class="stats-section-title">Recent Matches</h2>
          <div class="match-history">
            ${stats.matchHistory.slice(0, 5).map(match => `
              <div class="match-history-item ${match.won ? 'won' : 'lost'}">
                <span class="match-result">${match.won ? 'W' : 'L'}</span>
                <span class="match-opponent">vs ${match.opponent}</span>
                <span class="match-score">${match.playerScore}-${match.aiScore}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="stats-actions">
        <button class="btn" id="back-to-menu-btn">Back to Menu</button>
      </div>

      <div class="save-data-section">
        <h2 class="stats-section-title">Save Data</h2>
        <div class="save-data-buttons">
          <button class="btn btn-small" id="export-btn">Export</button>
          <button class="btn btn-small" id="import-btn">Import</button>
        </div>
        <div id="import-area" class="import-area hidden">
          <textarea id="import-textarea" class="import-textarea" placeholder="Paste save data here..."></textarea>
          <div class="import-buttons">
            <button class="btn btn-small" id="import-confirm-btn">Load Data</button>
            <button class="btn-link" id="import-cancel-btn">Cancel</button>
          </div>
        </div>
        <div id="save-message" class="save-message"></div>
      </div>

      <div class="version">v${VERSION}</div>
    </div>
  `;
}

function renderJudgeSelect() {
  const { opponent, selectedJudges, playerName, judgeFilter } = state;
  const displayName = playerName || 'YOU';

  // Filter judges based on current filter
  const filteredJudges = judgeFilter
    ? JUDGES.filter(j => j.tags && j.tags.includes(judgeFilter))
    : JUDGES;

  return `
    <div class="judge-select">
      <div class="judge-select-header">
        <h2>Your Opponent</h2>
        <div class="opponent-preview">
          <span class="opponent-emoji">${opponent.emoji}</span>
          <span class="opponent-name">${opponent.name}</span>
        </div>
      </div>

      <div class="judge-select-body">
        <h3>Choose Your Judges</h3>
        <p class="judge-select-hint">Select 3 judges or let fate decide</p>

        <div class="judge-filter-bar">
          <button class="filter-btn ${!judgeFilter ? 'active' : ''}" data-filter="">All</button>
          ${JUDGE_TAGS.map(tag => `
            <button class="filter-btn ${judgeFilter === tag ? 'active' : ''}" data-filter="${tag}">
              ${tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          `).join('')}
        </div>

        <div class="judge-grid">
          ${filteredJudges.map(judge => {
            const isSelected = selectedJudges.some(j => j.id === judge.id);
            const isDisabled = !isSelected && selectedJudges.length >= 3;
            return `
              <button class="judge-tile ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}"
                      data-judge-id="${judge.id}" ${isDisabled ? 'disabled' : ''}>
                <span class="judge-tile-emoji">${judge.emoji}</span>
                <span class="judge-tile-name">${judge.name}</span>
              </button>
            `;
          }).join('')}
        </div>

        <div class="judge-select-selected">
          <div class="selected-judges">
            ${[0, 1, 2].map(i => {
              const judge = selectedJudges[i];
              return `
                <div class="selected-judge-slot ${judge ? 'filled' : 'empty'}">
                  ${judge ? `<span class="selected-judge-emoji">${judge.emoji}</span>` : '<span class="empty-slot">?</span>'}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="judge-select-actions">
          <button class="btn btn-secondary" id="random-judges-btn">🎲 Surprise Me</button>
          <button class="btn" id="confirm-judges-btn" ${selectedJudges.length < 3 ? 'disabled' : ''}>
            Start Match →
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderMatchOpening() {
  const { opponent, judges, playerName } = state;
  const displayName = playerName || 'YOU';

  return `
    <div class="match-opening">
      ${renderHostBox(true)}

      <div class="match-info ${state.showContinue ? 'revealed' : 'hidden'}">
        <div class="matchup">
          <div class="matchup-player">
            <div class="matchup-emoji">🎭</div>
            <div class="matchup-name">${displayName}</div>
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
  const { scores, opponent, ghost, round, playerTemplate, playerSlots, activeSlot, playerWordPools, aiTemplate, hostLine, playerName } = state;
  const displayName = playerName || 'YOU';

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
          <div class="score-label">${displayName}</div>
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
  const { ghost, opponent, presentationPhase, currentRoaster, hostLine, playerName } = state;
  const displayName = playerName || 'YOU';

  // Use currentRoaster directly - it's set by game.js when entering presentation
  const isPlayerTurn = currentRoaster === 'player';
  const currentLabel = isPlayerTurn ? `🎭 ${displayName}` : `${opponent.emoji} ${opponent.name}`;
  const showingFirst = presentationPhase === 1;

  return `
    <div class="presentation">
      <div class="presentation-header">
        <div class="presentation-ghost">${ghost.emoji} ${ghost.name}</div>
        <div class="presentation-title">${showingFirst ? 'FIRST ROAST' : 'SECOND ROAST'}</div>
      </div>

      ${hostLine ? `
        <div class="host-aside centered">
          <span class="host-aside-emoji">${HOST.emoji}</span>
          <span class="host-aside-text" id="host-aside-text"></span>
        </div>
      ` : ''}

      <div class="presentation-single">
        <div class="presentation-joke active">
          <div class="joke-label">${currentLabel}</div>
          <div class="joke-text" id="${showingFirst ? 'first' : 'second'}-joke-text"></div>
        </div>
      </div>

      <div class="presentation-status">
        ${isPlayerTurn ? `${displayName} is delivering...` : `${opponent.name} is roasting...`}
      </div>
    </div>
  `;
}

function renderJudging() {
  const { roundJudges, judgeResults, opponent, hostLine, currentRoaster, playerInsult, aiInsult, playerName, loading, showBanter, judgingComplete, firstRoastBanter, secondRoastBanter, presentationPhase, reactionsTyped, visibleCards, currentCardIndex, typedReactionCount, banterTyped } = state;
  const displayName = playerName || 'YOU';

  // Use currentRoaster directly - it's set by game.js and persists through judging
  const judgingPlayer = currentRoaster === 'player';
  const judgingLabel = judgingPlayer ? `🎭 ${displayName}` : `${opponent.emoji} ${opponent.name}`;
  const currentInsult = judgingPlayer ? playerInsult : aiInsult;

  // Get the current banter based on which roast we're judging
  const currentBanter = presentationPhase === 1 ? firstRoastBanter : secondRoastBanter;

  // Build cards array in appearance order: [Judge1, Judge2, Judge3, Banter]
  const allCards = [];
  judgeResults.forEach((result, i) => {
    allCards.push({ type: 'judge', judgeIndex: i, result });
  });
  if (showBanter && currentBanter.length > 0) {
    allCards.push({ type: 'banter', banter: currentBanter });
  }

  // Only include cards that have been revealed
  const revealedCards = allCards.slice(0, visibleCards);

  // Reverse for deck order (newest on top = index 0)
  const deckCards = revealedCards.slice().reverse();

  const totalCards = deckCards.length;

  return `
    <div class="judging">
      <div class="judging-header">
        <div class="judging-for">Judging: ${judgingLabel}</div>
      </div>

      ${hostLine ? `
        <div class="host-aside centered">
          <span class="host-aside-emoji">${HOST.emoji}</span>
          <span class="host-aside-text" id="host-aside-text">${state.currentHostText || ''}</span>
        </div>
      ` : ''}

      <div class="roast-being-judged">
        <div class="roast-being-judged-label">${judgingLabel}</div>
        <div class="roast-being-judged-text">"${currentInsult}"</div>
      </div>

      ${loading ? `
        <div class="judges-loading">
          <div class="judges-loading-emojis">
            ${roundJudges.map(j => `<span class="loading-emoji">${j.emoji}</span>`).join('')}
          </div>
          <p class="loading-text">Judges are deliberating...</p>
        </div>
      ` : ''}

      ${totalCards > 0 ? `
        <div class="card-stack" id="card-stack">
          ${deckCards.map((card, deckIndex) => {
            const isActive = deckIndex === currentCardIndex;
            const isPrev = deckIndex < currentCardIndex;
            const isNext = deckIndex > currentCardIndex;
            const cardClass = isActive ? 'active' : (isPrev ? 'prev' : 'next');

            if (card.type === 'judge') {
              const result = card.result;
              const i = card.judgeIndex;
              const isTyped = i < typedReactionCount;
              const showScore = isTyped || reactionsTyped;
              const showReaction = isTyped ? `"${result.reaction}"` : '';
              return `
                <div class="judge-card ${cardClass}" data-index="${deckIndex}">
                  <div class="judge-card-header">
                    <span class="judge-card-emoji">${result.emoji || roundJudges[i]?.emoji || '🎭'}</span>
                    <span class="judge-card-name">${result.name}</span>
                    <span class="judge-card-score ${showScore ? 'revealed' : 'hidden'}">${result.score}</span>
                  </div>
                  <div class="judge-card-reaction" id="judge-reaction-${i}">${showReaction}</div>
                </div>
              `;
            } else {
              // Banter card
              const showBanterContent = banterTyped || reactionsTyped;
              return `
                <div class="judge-card banter-card ${cardClass}" data-index="${deckIndex}">
                  <div class="judge-card-header">
                    <span class="judge-card-emoji">💬</span>
                    <span class="judge-card-name">Judges React</span>
                  </div>
                  <div class="banter-card-content">
                    ${card.banter.map((line, i) => `
                      <div class="banter-line" id="banter-${i}">${showBanterContent ? line : ''}</div>
                    `).join('')}
                  </div>
                </div>
              `;
            }
          }).join('')}
        </div>

        ${totalCards > 1 ? `
          <div class="card-dots">
            ${deckCards.map((_, i) => `
              <span class="card-dot ${i === currentCardIndex ? 'active' : ''}" data-index="${i}"></span>
            `).join('')}
          </div>
          <div class="card-nav">
            <button class="card-nav-btn" id="card-prev" ${currentCardIndex >= totalCards - 1 ? 'disabled' : ''}>←</button>
            <button class="card-nav-btn" id="card-next" ${currentCardIndex <= 0 ? 'disabled' : ''}>→</button>
          </div>
        ` : ''}
      ` : ''}

      ${judgingComplete ? `
        <div class="judging-continue">
          <button class="btn" id="judging-continue-btn">Continue →</button>
        </div>
      ` : ''}
    </div>
  `;
}

function renderResults() {
  const { results, opponent, roundJudges, scores, hostLine, playerName } = state;
  const displayName = playerName || 'YOU';

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
      ${hostLine ? `
        <div class="host-aside centered">
          <span class="host-aside-emoji">${HOST.emoji}</span>
          <span class="host-aside-text" id="host-aside-text"></span>
        </div>
      ` : ''}

      <div class="round-winner-banner">
        <div class="round-winner-label">ROUND WINNER</div>
        <div class="round-winner-text ${results.winner}">
          ${results.winner === 'player' ? `🏆 ${displayName}` : results.winner === 'ai' ? `${opponent.emoji} ${opponent.name}` : '🤝 TIE'}
        </div>
      </div>

      <button class="btn btn-full" id="next-btn">
        ${scores.player >= 2 || scores.ai >= 2 ? 'Final Results' : 'Next Ghost'}
      </button>

      <div class="scoreboard">
        <div class="score-box">
          <div class="score-label">${displayName}</div>
          <div class="score-value">${scores.player}</div>
        </div>
        <div class="score-center">
          <div class="score-vs">MATCH</div>
        </div>
        <div class="score-box">
          <div class="score-label">${opponent.emoji} ${opponent.name}</div>
          <div class="score-value">${scores.ai}</div>
        </div>
      </div>

      <div class="results-grid">
        <div class="result-card ${results.winner === 'player' ? 'winner-player' : ''}">
          <div class="result-card-label">🎭 ${displayName}</div>
          <div class="result-card-insult">"${results.playerInsult}"</div>
          <div class="result-card-score player">${results.playerTotal}</div>
        </div>
        <div class="result-card ${results.winner === 'ai' ? 'winner-ai' : ''}">
          <div class="result-card-label">${opponent.emoji} ${opponent.name}</div>
          <div class="result-card-insult">"${results.aiInsult}"</div>
          <div class="result-card-score ai">${results.aiTotal}</div>
        </div>
      </div>

      <div class="judge-results-dual">
        ${results.judges.map((j, i) => `
          <div class="judge-result-card-dual">
            <div class="judge-result-header">
              <div class="judge-result-emoji">${roundJudges[i]?.emoji || '🎭'}</div>
              <div class="judge-result-name">${j.name}</div>
            </div>
            <div class="judge-dual-reactions">
              <div class="judge-dual-reaction player">
                <div class="dual-reaction-label">On your roast:</div>
                <div class="dual-reaction-text">"${j.playerReaction}"</div>
                <div class="dual-reaction-score">${j.playerScore}</div>
              </div>
              <div class="judge-dual-reaction ai">
                <div class="dual-reaction-label">On ${opponent.name}'s:</div>
                <div class="dual-reaction-text">"${j.aiReaction}"</div>
                <div class="dual-reaction-score">${j.aiScore}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderMatchEnd() {
  const { scores, opponent, judges, playerName, stats } = state;
  const displayName = playerName || 'YOU';
  const won = scores.player > scores.ai;

  return `
    <div class="match-end">
      ${renderHostBox(false)}

      <div class="match-end-content">
        <div class="match-end-emoji">${won ? '👻👑' : '💀'}</div>
        <h1 class="match-end-title ${won ? 'won' : 'lost'}">
          ${won ? 'GHOST ROASTER SUPREME' : `${opponent.emoji} ${opponent.name} WINS`}
        </h1>
        <p class="match-end-score">${displayName} ${scores.player} - ${scores.ai} ${opponent.name}</p>
        <p class="match-end-judges">Judged by: ${judges.map(j => j.emoji).join(' ')}</p>

        ${playerName ? `
          <div class="match-end-stats">
            <p>Career: ${stats.totalWins}W - ${stats.totalLosses}L</p>
            ${stats.currentWinStreak >= 2 ? `<p class="streak-note">${stats.currentWinStreak} win streak!</p>` : ''}
          </div>
        ` : ''}
      </div>

      ${state.showContinue ? `
        <button class="btn" id="play-again-btn">Play Again</button>
      ` : ''}
    </div>
  `;
}
