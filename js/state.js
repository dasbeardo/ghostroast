// Game state - single source of truth

export const VERSION = '0.6.5.1';

// Proxy configuration - set this to your Cloudflare Worker URL after deploying
// Leave empty to use direct API key mode
export const PROXY_URL = '';  // e.g., 'https://roast-mortem-api.your-subdomain.workers.dev'

// V3 Hybrid: Single API call for all 3 judges + banter
// Uses method acting character blocks with efficient architecture
export const USE_PANEL_JUDGING = true;

// Migrate old localStorage keys (from pre-rebrand)
function migrateOldData() {
  // Check for old stats
  const oldStats = localStorage.getItem('roastaghost_stats');
  if (oldStats && !localStorage.getItem('roastmortem_stats')) {
    localStorage.setItem('roastmortem_stats', oldStats);
    localStorage.removeItem('roastaghost_stats');
  }

  // Check for old API key
  const oldKey = localStorage.getItem('roastaghost_apikey');
  if (oldKey && !localStorage.getItem('roastmortem_apikey')) {
    localStorage.setItem('roastmortem_apikey', oldKey);
    localStorage.removeItem('roastaghost_apikey');
  }
}

// Run migration on load
migrateOldData();

// Load player stats from localStorage
function loadPlayerStats() {
  const saved = localStorage.getItem('roastmortem_stats');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return null;
    }
  }
  return null;
}

const savedStats = loadPlayerStats();

export const state = {
  screen: PROXY_URL ? 'accessPassword' : 'apiKey',  // Start with appropriate auth screen
  apiKey: localStorage.getItem('roastmortem_apikey') || '',  // Persist key (direct mode)
  accessPassword: '',  // For proxy mode (not persisted for security)

  // Player profile
  playerName: savedStats?.playerName || '',

  // Player stats (persisted in localStorage)
  stats: savedStats || {
    playerName: '',
    totalWins: 0,
    totalLosses: 0,
    totalRoundsWon: 0,
    totalRoundsLost: 0,
    totalRoundsTied: 0,
    matchHistory: [],  // Last 10 matches { opponent, won, playerScore, aiScore, date }
    opponentRecords: {},  // { opponentName: { wins, losses } }
    judgeScores: {},  // { judgeName: { totalScore, timesJudged } }
    ghostsRoasted: [],  // Names of all ghosts roasted
    highestSingleScore: 0,  // Best score from 3 judges in one round
    longestWinStreak: 0,
    currentWinStreak: 0
  },
  opponent: null,
  ghost: null,
  judges: [],
  roundJudges: [], // Shuffled order for this round
  selectedJudges: [], // Judges being selected on selection screen
  judgeFilter: null,  // Current filter tag (null = show all)

  // Player's roast
  playerTemplate: null,
  playerWordPools: [],
  playerSlots: [],
  playerInsult: '',

  // AI's roast (separate template!)
  aiTemplate: null,
  aiSlots: [],
  aiInsult: '',

  activeSlot: null,
  results: null,
  judgeResults: [], // Individual judge results as they come in
  currentJudgeIndex: 0, // Which judge is currently being processed
  loading: false,
  scores: { player: 0, ai: 0 },
  round: 1,
  usedGhosts: [],

  // Host state
  hostLine: '',           // Current line being displayed
  hostPhase: '',          // opening, ghostIntro, ghostReaction, draftingStart, judgingIntro, roundWinner, matchEnd
  isTyping: false,        // Whether typewriter is currently running
  canSkip: false,         // Whether user can skip current typing
  showContinue: false,    // Whether to show continue button
  currentHostText: '',    // Persisted host text (survives re-renders)

  // Presentation phase
  presentationPhase: 0,   // 0=not started, 1=player presenting, 2=ai presenting, 3=done

  // Single-joke judging flow
  playerGoesFirst: true,  // Alternates each round
  currentRoaster: null,   // 'player' or 'ai' - who is being judged right now
  firstRoastScores: [],   // Scores from judging the first roast
  secondRoastScores: [],  // Scores from judging the second roast

  // Banter (V3 hybrid approach)
  firstRoastBanter: [],   // Banter lines after first roast judging
  secondRoastBanter: [],  // Banter lines after second roast judging
  showBanter: false,      // Whether to show banter section
  judgingComplete: false, // Whether current judging phase is done (show continue)
  continueResolver: null, // Promise resolver for continue button
  reactionsTyped: false,  // Whether reactions have finished typing (persist content on re-render)

  // Card stack UI
  visibleCards: 0,        // How many judge cards have been revealed (0-3, then 4 for banter)
  currentCardIndex: 0,    // Which card is currently shown (0 = top/newest, 3 = oldest judge)
  typedReactionCount: 0,  // How many judge reactions have finished typing (for persistence)
  banterTyped: false      // Whether banter has finished typing
};

// Save player stats to localStorage
export function savePlayerStats() {
  localStorage.setItem('roastmortem_stats', JSON.stringify(state.stats));
}

// Export save data as JSON string
export function exportSaveData() {
  const data = {
    version: VERSION,
    exportedAt: new Date().toISOString(),
    stats: state.stats
  };
  return JSON.stringify(data, null, 2);
}

// Import save data from JSON string
export function importSaveData(jsonString) {
  try {
    const data = JSON.parse(jsonString);

    // Validate it has stats
    if (!data.stats || typeof data.stats !== 'object') {
      return { success: false, error: 'Invalid save data: missing stats' };
    }

    // Validate required fields exist
    const requiredFields = ['playerName', 'totalWins', 'totalLosses'];
    for (const field of requiredFields) {
      if (!(field in data.stats)) {
        return { success: false, error: `Invalid save data: missing ${field}` };
      }
    }

    // Merge imported data into current state
    state.stats = data.stats;
    state.playerName = data.stats.playerName || '';

    // Save to localStorage
    savePlayerStats();

    return { success: true, playerName: data.stats.playerName };
  } catch (e) {
    return { success: false, error: 'Could not parse save data: ' + e.message };
  }
}
