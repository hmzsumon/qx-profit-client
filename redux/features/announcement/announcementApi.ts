import { apiSlice } from "../api/apiSlice";

export type Announcement = {
  _id: string;
  title: string;
  message?: string;
  imageUrl?: string;
  createdAt: string;
};

export const announcementApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnnouncements: builder.query<
      { success: boolean; items: Announcement[] },
      void
    >({
      query: () => ({ url: "/announcements", method: "GET" }),
      providesTags: ["Announcements"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAnnouncementsQuery } = announcementApi;
