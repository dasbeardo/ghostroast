/**
 * Roast Mortem - Game Controller
 * Manages game state and screen flow for the new UI.
 */

import { $, clearElement } from './dom.js';
import { initUI, transitionScreen } from './index.js';
import {
  MenuScreen,
  JudgeSelectScreen,
  GhostIntroScreen,
  DraftingScreen,
  PresentationScreen,
  ResultsScreen,
  MatchEndScreen
} from './screens/index.js';

import { state, VERSION } from '../state.js';
import { ghosts } from '../../data/ghosts.js';
import { judges } from '../../data/judges.js';
import { templates } from '../../data/templates.js';
import { wordPools } from '../../data/wordPools.js';
import { opponents } from '../../data/opponents.js';
import { callOpenAI } from '../api.js';
import { shuffle } from '../utils.js';

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
    this.opponent = opponents[Math.floor(Math.random() * opponents.length)];

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
        this.startRound();
      },
      onDestiny: () => {
        // Random judge selection
        const shuffled = shuffle([...judges]);
        const randomJudges = shuffled.slice(0, 3);
        screen.setSelectedJudges(randomJudges);
      }
    });
    this.showScreen(screen);
  }

  /**
   * Start a new round
   */
  startRound() {
    // Pick ghost (no repeats)
    const availableGhosts = ghosts.filter(g => !this.usedGhosts.includes(g.id));
    this.currentGhost = availableGhosts[Math.floor(Math.random() * availableGhosts.length)];
    this.usedGhosts.push(this.currentGhost.id);

    // Pick templates
    const shuffledTemplates = shuffle([...templates]);
    this.playerTemplate = shuffledTemplates[0];
    this.opponentTemplate = shuffledTemplates[1] || shuffledTemplates[0];

    // AI picks words immediately
    this.opponentRoast = this.generateAIRoast(this.opponentTemplate);

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
      wordPools: wordPools,
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
   * Generate AI roast from template
   */
  generateAIRoast(template) {
    const text = template?.text || "You're like [pathetic_things] — [it_shows]";
    let roast = '"';

    const regex = /\[([^\]]+)\]/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      roast += text.slice(lastIndex, match.index);
      const poolName = match[1];
      const pool = wordPools[poolName] || { base: ['something'] };
      const allWords = [...(pool.base || [])];
      const word = allWords[Math.floor(Math.random() * allWords.length)] || 'something';
      roast += word;
      lastIndex = regex.lastIndex;
    }
    roast += text.slice(lastIndex) + '"';

    return roast;
  }

  /**
   * Get judge reactions from API
   */
  async getJudgeReactions(roast, judges) {
    // For now, generate placeholder reactions
    // In production, this would call the OpenAI API
    return judges.map(judge => ({
      reaction: this.generatePlaceholderReaction(judge, roast),
      score: Math.floor(Math.random() * 4) + 5 // 5-8
    }));
  }

  /**
   * Generate placeholder reaction
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
   * Update player stats
   */
  updateStats() {
    if (!state.stats) {
      state.stats = {
        matchWins: 0,
        matchLosses: 0,
        roundWins: 0,
        roundLosses: 0,
        currentStreak: 0,
        longestStreak: 0
      };
    }

    const playerWon = this.playerMatchScore > this.opponentMatchScore;

    if (playerWon) {
      state.stats.matchWins++;
      state.stats.currentStreak++;
      if (state.stats.currentStreak > state.stats.longestStreak) {
        state.stats.longestStreak = state.stats.currentStreak;
      }
    } else {
      state.stats.matchLosses++;
      state.stats.currentStreak = 0;
    }

    state.stats.roundWins += this.playerMatchScore;
    state.stats.roundLosses += this.opponentMatchScore;

    // Save to localStorage
    localStorage.setItem('roastmortem_stats', JSON.stringify(state.stats));
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
    // TODO: Implement stats screen
    alert('Stats coming soon!');
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
