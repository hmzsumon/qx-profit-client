import { apiSlice } from "../api/apiSlice";

export const qxBrokerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrokerLink: builder.query<{ success: boolean; brokerUrl: string }, void>({
      query: () => ({ url: "/qx-broker/link", method: "GET" }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetBrokerLinkQuery } = qxBrokerApi;
