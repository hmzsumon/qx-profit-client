/* Profit leaderboard API (RTK Query). */
import { apiSlice } from "../api/apiSlice";

export type ProfitRankRow = {
  rank: number;
  name: string;
  avatar: string;
  profit: number;
  isMe: boolean;
};

export type ProfitLeaderboard = {
  top: ProfitRankRow[];
  me: { rank: number; profit: number } | null;
};

export const leaderboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfitLeaderboard: builder.query<ProfitLeaderboard, void>({
      query: () => ({ url: "/leaderboard/profit", method: "GET" }),
      transformResponse: (resp: { status: string; data: ProfitLeaderboard }) =>
        resp.data,
    }),
  }),
  overrideExisting: false,
});

export const { useGetProfitLeaderboardQuery } = leaderboardApi;
