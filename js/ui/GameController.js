/**
 * Roast Mortem - Game Controller
 * Manages game state and screen flow for the new UI.
 */

import { $, clearElement } from './dom.js';
import { initUI, transitionScreen } from './index.js';
import {
  MenuScreen,
  JudgeSelectScreen,
  MatchOpeningScreen,
  GhostIntroScreen,
  DraftingScreen,
  PresentationScreen,
  ResultsScreen,
  MatchEndScreen,
  StatsScreen
} from './screens/index.js';

import { state, VERSION, savePlayerStats } from '../state.js';
import { getJudgePanelResponse } from '../api.js';
import { GHOSTS } from '../../data/ghosts.js';
import { JUDGES } from '../../data/judges.js';
import { TEMPLATES } from '../../data/templates.js';
import { WORD_POOLS } from '../../data/wordPools.js';
import { OPPONENTS } from '../../data/opponents.js';
import { shuffle } from '../utils.js';

/**
 * Build weighted word pool based on ghost themes
 * Themed words appear 3x for higher selection chance
 */
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

/**
 * Game Controller class
 */
export class GameController {
  constructor(containerSelector = '#game') {
    this.container = $(containerSelector);
    this.currentScreen = null;

    // Match state
    this.opponent = null;
    this.selectedJudges = [];
    this.usedGhosts = [];
    this.currentGhost = null;
    this.currentRound = 1;
    this.playerMatchScore = 0;
    this.opponentMatchScore = 0;
    this.playerGoesFirst = true;
    this.playerRoast = '';
    this.opponentRoast = '';
    this.playerTemplate = null;
    this.opponentTemplate = null;
    this.roundResults = null;
    this.playerTotalPoints = 0;
    this.opponentTotalPoints = 0;
  }

  /**
   * Initialize and start the game
   */
  async init() {
    initUI();
    this.showMenu();
  }

  /**
   * Show a screen with transition
   */
  showScreen(screenElement) {
    clearElement(this.container);
    this.container.appendChild(screenElement);
    this.currentScreen = screenElement;
  }

  /**
   * Show main menu
   */
  showMenu() {
    const screen = MenuScreen({
      onNewGame: () => this.startNewGame(),
      onContinue: () => this.continueGame(),
      onStats: () => this.showStats(),
      onSettings: () => this.showSettings()
    });
    this.showScreen(screen);
  }

  /**
   * Start a new game
   */
  startNewGame() {
    // Reset match state
    this.currentRound = 1;
    this.playerMatchScore = 0;
    this.opponentMatchScore = 0;
    this.playerGoesFirst = true;
    this.usedGhosts = [];
    this.playerTotalPoints = 0;
    this.opponentTotalPoints = 0;

    // Pick random opponent
    this.opponent = OPPONENTS[Math.floor(Math.random() * OPPONENTS.length)];

    // Show judge selection
    this.showJudgeSelect();
  }

  /**
   * Show judge selection screen
   */
  showJudgeSelect() {
    const screen = JudgeSelectScreen({
      opponent: this.opponent,
      onConfirm: (selectedJudges) => {
        this.selectedJudges = selectedJudges;
        this.showMatchOpening();
      },
      onDestiny: () => {
        // Random judge selection
        const shuffled = shuffle([...JUDGES]);
        const randomJudges = shuffled.slice(0, 3);
        screen.setSelectedJudges(randomJudges);
      }
    });
    this.showScreen(screen);
  }

  /**
   * Show match opening screen with host intro
   */
  showMatchOpening() {
    const screen = MatchOpeningScreen({
      player: { name: state.playerName || 'You', emoji: '👤' },
      opponent: this.opponent,
      judges: this.selectedJudges,
      stats: state.stats,
      onContinue: () => this.startRound()
    });
    this.showScreen(screen);
  }

  /**
   * Start a new round
   */
  startRound() {
    // Pick ghost (no repeats)
    const availableGhosts = GHOSTS.filter(g => !this.usedGhosts.includes(g.name));
    this.currentGhost = availableGhosts[Math.floor(Math.random() * availableGhosts.length)];
    this.usedGhosts.push(this.currentGhost.name);

    // Pick templates
    const shuffledTemplates = shuffle([...TEMPLATES]);
    this.playerTemplate = shuffledTemplates[0];
    this.opponentTemplate = shuffledTemplates[1] || shuffledTemplates[0];

    // AI picks words immediately using weighted pools
    this.opponentRoast = this.generateAIRoast(this.opponentTemplate, this.currentGhost);

    // Show ghost intro
    this.showGhostIntro();
  }

  /**
   * Show ghost intro screen
   */
  showGhostIntro() {
    const screen = GhostIntroScreen({
      ghost: this.currentGhost,
      player: { name: state.playerName || 'You', emoji: '👤' },
      opponent: this.opponent,
      playerScore: this.playerMatchScore,
      opponentScore: this.opponentMatchScore,
      round: this.currentRound,
      onStart: () => this.showDrafting()
    });
    this.showScreen(screen);
  }

  /**
   * Show drafting screen
   */
  showDrafting() {
    const screen = DraftingScreen({
      ghost: this.currentGhost,
      template: this.playerTemplate,
      wordPools: WORD_POOLS,
      rerolls: 1,
      playerScore: this.playerMatchScore,
      opponentScore: this.opponentMatchScore,
      round: this.currentRound,
      onComplete: (roast, filledSlots) => {
        this.playerRoast = roast;
        this.showPresentation();
      }
    });
    this.showScreen(screen);
  }

  /**
   * Show presentation screen
   */
  showPresentation() {
    const screen = PresentationScreen({
      ghost: this.currentGhost,
      player: { name: state.playerName || 'You', emoji: '👤' },
      opponent: this.opponent,
      playerRoast: this.playerRoast,
      opponentRoast: this.opponentRoast,
      judges: this.selectedJudges,
      playerGoesFirst: this.playerGoesFirst,
      round: this.currentRound,
      playerScore: this.playerMatchScore,
      opponentScore: this.opponentMatchScore,
      getJudgeReactions: (roast, judges) => this.getJudgeReactions(roast, judges),
      onComplete: (results) => {
        this.roundResults = results;
        this.playerTotalPoints += results.playerTotal;
        this.opponentTotalPoints += results.opponentTotal;

        // Track round stats (ghosts, judge scores, etc.)
        this.updateRoundStats(
          results.playerTotal,
          results.opponentTotal,
          results.playerTotal > results.opponentTotal,
          this.selectedJudges,
          results.playerScores
        );

        // Determine round winner
        if (results.playerTotal > results.opponentTotal) {
          this.playerMatchScore++;
        } else if (results.opponentTotal > results.playerTotal) {
          this.opponentMatchScore++;
        }

        this.showResults();
      }
    });
    this.showScreen(screen);
  }

  /**
   * Show results screen
   */
  showResults() {
    const screen = ResultsScreen({
      player: { name: state.playerName || 'You', emoji: '👤' },
      opponent: this.opponent,
      playerTotal: this.roundResults.playerTotal,
      opponentTotal: this.roundResults.opponentTotal,
      playerRoast: this.playerRoast,
      opponentRoast: this.opponentRoast,
      playerReactions: this.roundResults.playerReactions,
      opponentReactions: this.roundResults.opponentReactions,
      playerScores: this.roundResults.playerScores,
      opponentScores: this.roundResults.opponentScores,
      judges: this.selectedJudges,
      playerMatchScore: this.playerMatchScore,
      opponentMatchScore: this.opponentMatchScore,
      onContinue: () => {
        // Check if match is over
        if (this.playerMatchScore >= 2 || this.opponentMatchScore >= 2) {
          this.showMatchEnd();
        } else {
          this.currentRound++;
          this.playerGoesFirst = !this.playerGoesFirst;
          this.startRound();
        }
      }
    });
    this.showScreen(screen);
  }

  /**
   * Show match end screen
   */
  showMatchEnd() {
    // Update stats
    this.updateStats();

    const screen = MatchEndScreen({
      player: { name: state.playerName || 'You', emoji: '👤' },
      opponent: this.opponent,
      playerScore: this.playerMatchScore,
      opponentScore: this.opponentMatchScore,
      playerTotalPoints: this.playerTotalPoints,
      opponentTotalPoints: this.opponentTotalPoints,
      onPlayAgain: () => this.startNewGame(),
      onStats: () => this.showStats(),
      onMenu: () => this.showMenu()
    });
    this.showScreen(screen);
  }

  /**
   * Generate AI roast from template using weighted word pools
   */
  generateAIRoast(template, ghost) {
    const ghostThemes = ghost?.themes || [];
    let roast = '';

    // Use template slots to pick words from weighted pools
    if (template?.slots) {
      let result = template.template;
      template.slots.forEach((slot, i) => {
        const poolName = slot.pool;
        const weightedWords = buildWeightedPool(poolName, ghostThemes);
        const shuffled = shuffle(weightedWords);
        const word = shuffled[0] || 'something';
        result = result.replace(`[slot${i}]`, word);
      });
      roast = result;
    } else {
      // Fallback for templates without slots
      const text = template?.template || "You're like [pathetic_nouns] — [punchline_observations]";
      const regex = /\[([^\]]+)\]/g;
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(text)) !== null) {
        roast += text.slice(lastIndex, match.index);
        const poolName = match[1];
        const weightedWords = buildWeightedPool(poolName, ghostThemes);
        const shuffled = shuffle(weightedWords);
        const word = shuffled[0] || 'something';
        roast += word;
        lastIndex = regex.lastIndex;
      }
      roast += text.slice(lastIndex);
    }

    return roast;
  }

  /**
   * Get judge reactions from real API
   * @param {string} roast - The roast text
   * @param {Object[]} judges - Array of judges
   * @param {string} roasterName - Name of the roaster
   * @param {string} roasterEmoji - Emoji for the roaster
   * @param {boolean} isSecondRoast - Whether this is the second roast
   * @param {Object|null} firstRoastContext - Context from first roast (if second)
   */
  async getJudgeReactions(roast, judges, roasterName, roasterEmoji, isSecondRoast = false, firstRoastContext = null) {
    // Build ghost context for judges
    const ghost = this.currentGhost;
    const ghostContext = `${ghost.emoji} ${ghost.name} - ${ghost.died}. ${ghost.bio[0]}`;

    try {
      // Call the real API
      const panelResponse = await getJudgePanelResponse(
        judges,
        ghostContext,
        roasterName,
        roasterEmoji,
        roast,
        isSecondRoast,
        firstRoastContext
      );

      // Return formatted results
      return panelResponse.judges.map(j => ({
        name: j.name,
        emoji: j.emoji,
        reaction: j.reaction,
        score: j.score
      }));
    } catch (error) {
      console.error('API call failed, using fallback:', error);
      // Fallback to placeholder reactions
      return judges.map(judge => ({
        name: judge.name,
        emoji: judge.emoji,
        reaction: this.generatePlaceholderReaction(judge, roast),
        score: Math.floor(Math.random() * 4) + 5
      }));
    }
  }

  /**
   * Generate placeholder reaction (fallback)
   */
  generatePlaceholderReaction(judge, roast) {
    const reactions = [
      `That was... something. I've seen better from a fortune cookie.`,
      `Interesting approach. Bold, even. Misguided, but bold.`,
      `My grandmother hits harder than that, and she's been dead for 40 years.`,
      `I'm not angry, I'm just disappointed. Actually, I'm a little angry.`,
      `Was that supposed to hurt? Because it tickled at best.`,
    ];
    return reactions[Math.floor(Math.random() * reactions.length)];
  }

  /**
   * Update player stats - matches original game.js implementation
   */
  updateStats() {
    // Initialize stats if needed (match original structure)
    if (!state.stats) {
      state.stats = {
        playerName: state.playerName || '',
        totalWins: 0,
        totalLosses: 0,
        totalRoundsWon: 0,
        totalRoundsLost: 0,
        totalRoundsTied: 0,
        matchHistory: [],
        opponentRecords: {},
        judgeScores: {},
        ghostsRoasted: [],
        highestSingleScore: 0,
        longestWinStreak: 0,
        currentWinStreak: 0
      };
    }

    const playerWon = this.playerMatchScore > this.opponentMatchScore;

    // Update win/loss totals
    if (playerWon) {
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
    const oppName = this.opponent?.name;
    if (oppName) {
      if (!state.stats.opponentRecords[oppName]) {
        state.stats.opponentRecords[oppName] = { wins: 0, losses: 0 };
      }
      if (playerWon) {
        state.stats.opponentRecords[oppName].wins++;
      } else {
        state.stats.opponentRecords[oppName].losses++;
      }
    }

    // Add to match history (keep last 10)
    state.stats.matchHistory.unshift({
      opponent: oppName,
      won: playerWon,
      playerScore: this.playerMatchScore,
      aiScore: this.opponentMatchScore,
      date: new Date().toISOString()
    });
    if (state.stats.matchHistory.length > 10) {
      state.stats.matchHistory = state.stats.matchHistory.slice(0, 10);
    }

    // Save using the proper function
    savePlayerStats();
  }

  /**
   * Track round stats after each round
   */
  updateRoundStats(playerTotal, opponentTotal, playerWonRound, judges, playerScores) {
    if (!state.stats) return;

    // Track round wins/losses/ties
    if (playerTotal > opponentTotal) {
      state.stats.totalRoundsWon++;
    } else if (opponentTotal > playerTotal) {
      state.stats.totalRoundsLost++;
    } else {
      state.stats.totalRoundsTied++;
    }

    // Track highest single round score
    if (playerTotal > (state.stats.highestSingleScore || 0)) {
      state.stats.highestSingleScore = playerTotal;
    }

    // Track judge scores
    if (judges && playerScores) {
      judges.forEach((judge, i) => {
        const judgeName = judge.name;
        if (!state.stats.judgeScores[judgeName]) {
          state.stats.judgeScores[judgeName] = { totalScore: 0, timesJudged: 0 };
        }
        state.stats.judgeScores[judgeName].totalScore += playerScores[i] || 0;
        state.stats.judgeScores[judgeName].timesJudged++;
      });
    }

    // Track ghosts roasted
    if (this.currentGhost && !state.stats.ghostsRoasted.includes(this.currentGhost.name)) {
      state.stats.ghostsRoasted.push(this.currentGhost.name);
    }

    // Save incrementally
    savePlayerStats();
  }

  /**
   * Continue saved game
   */
  continueGame() {
    // TODO: Load saved game state
    this.showMenu();
  }

  /**
   * Show stats screen
   */
  showStats() {
    const screen = StatsScreen({
      onBack: () => this.showMenu()
    });
    this.showScreen(screen);
  }

  /**
   * Show settings
   */
  showSettings() {
    // TODO: Implement settings
    alert('Settings coming soon!');
  }
}

export default GameController;
