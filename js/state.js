// Game state - single source of truth

export const VERSION = '0.2.0';

export const state = {
  screen: 'apiKey',  // Start with API key screen
  apiKey: localStorage.getItem('roastaghost_apikey') || '',  // Persist key
  opponent: null,
  ghost: null,
  judges: [],
  roundJudges: [], // Shuffled order for this round

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
  secondRoastScores: []   // Scores from judging the second roast
};
