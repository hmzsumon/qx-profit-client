/* Matches backend RankSummaryResponse from the rank service. */

export type RankKey = string;

export interface RankLevelBreakdown {
  level: number;
  members: number;
  volume: number;
  pct: number; // 0..1
}

export interface RankTierProgress {
  teamVolume: number;
  target: number;
  pct: number; // 0..1
  remaining: number;
  overall: number; // 0..100
}

export interface RankSummaryItem {
  key: RankKey;
  name: string;
  targetVolume: number;
  rewardUsd: number;
  sortOrder: number;
  progress: RankTierProgress;
  qualified: boolean;
  claimed: boolean;
  claimedAt?: string;
}

export interface RankSummaryResponse {
  overall: { teamVolume: number };
  levels: RankLevelBreakdown[];
  ranks: RankSummaryItem[];
}
