import { apiSlice } from "../api/apiSlice";

export type DailyVideo = {
  _id: string;
  title: string;
  description?: string;
  url: string;
  posterUrl?: string;
  publishDate: string;
  createdAt: string;
  durationSec?: number;
};

export const dailyVideoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDailyVideos: builder.query<
      { success: boolean; videos: DailyVideo[] },
      void
    >({
      query: () => ({ url: "/daily-videos", method: "GET" }),
      providesTags: ["DailyVideos"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetDailyVideosQuery } = dailyVideoApi;
