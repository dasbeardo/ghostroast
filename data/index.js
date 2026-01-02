// Re-export all data for convenience
export { GHOSTS } from './ghosts.js';
export { JUDGES, JUDGE_TAGS } from './judges.js';
export { TEMPLATES } from './templates.js';
export { WORD_POOLS } from './wordPools.js';
export { OPPONENTS } from './opponents.js';
export { ADS, getRandomAds } from './ads.js';
export {
  HOST, getHostLine, getPlayerAwareOpening, getJudgeHistoryLine,
  HOST_OPENINGS, HOST_GHOST_INTROS, HOST_GHOST_REACTIONS,
  HOST_CONTESTANT_INTROS, HOST_DRAFTING_START, HOST_JUDGING_INTROS,
  HOST_FIRST_UP_PLAYER, HOST_FIRST_UP_AI,
  HOST_AFTER_FIRST_ROAST, HOST_SECOND_UP_PLAYER, HOST_SECOND_UP_AI,
  HOST_AFTER_SECOND_ROAST, HOST_JUDGE_REACTIONS,
  HOST_ROUND_WINNER_PLAYER, HOST_ROUND_WINNER_AI, HOST_ROUND_TIE,
  HOST_NEXT_ROUND, HOST_MATCH_WIN, HOST_MATCH_LOSS, HOST_CLOSINGS,
  HOST_PLAYER_OPENINGS, HOST_JUDGE_HISTORY
} from './host.js';
