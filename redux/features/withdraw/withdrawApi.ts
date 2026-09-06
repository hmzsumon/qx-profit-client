import { apiSlice } from "../api/apiSlice";

export const withdrawApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // create new withdraw request
    createWithdrawRequest: builder.mutation<any, any>({
      query: (body) => ({
        url: `/new-withdraw-request`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User", "Withdraws"],
    }),

    // get  my withdraw requests
    getMyWithdrawRequests: builder.query<any, any>({
      query: () => `/my-withdraws`,
      providesTags: ["Withdraws"],
    }),

    // withdrawal config (min / fee / processing time / on-off)
    getWithdrawConfig: builder.query<
      {
        config: {
          isActive: boolean;
          feePercent: number;
          minAmount: number;
          maxAmount: number;
          presetAmounts: number[];
          processingTime: string;
          requireKyc: boolean;
        };
      },
      void
    >({
      query: () => `/withdraw-config`,
    }),

    // get all agents
    getAllAgents: builder.query<any, any>({
      query: () => `/get-all-agents`,
    }),
  }),
});

export const {
  useCreateWithdrawRequestMutation,
  useGetMyWithdrawRequestsQuery,
  useGetAllAgentsQuery,
  useGetWithdrawConfigQuery,
} = withdrawApi;
