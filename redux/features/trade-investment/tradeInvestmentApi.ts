import { apiSlice } from "../api/apiSlice";

export type TradeInvestmentConfig = {
  minAmount: number;
  minWithdraw: number;
  lockDays: number;
  dailyProfitPercent: number;
  cancelChargePercent: number;
  levelPercents: number[];
  excludedWeekDays?: number[];
  isActive: boolean;
};

export type TradeInvestmentAccount = {
  _id: string;
  balance: number;
  status: "active" | "inactive" | "cancelled";
  lockUntil?: string;
  firstInvestedAt?: string;
  totalTransferredIn: number;
  totalTransferredOut: number;
  totalUserProfit: number;
  totalTeamBonus: number;
  totalCompanyCut: number;
  totalCancelCharge: number;
  lastProfitDayKey?: string;
  cancelledAt?: string;
};

export type TradeInvestmentLog = {
  _id: string;
  type:
    | "transfer_in"
    | "transfer_out"
    | "profit"
    | "generation_bonus"
    | "company_cut"
    | "cancel";
  amount: number;
  dayKey?: string;
  grossProfit?: number;
  userProfit?: number;
  percentSnapshot?: number;
  chargePercent?: number;
  chargeAmount?: number;
  refundAmount?: number;
  balanceAfter?: number;
  note?: string;
  createdAt: string;
};

export const tradeInvestmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyTradeInvestment: builder.query<
      {
        success: boolean;
        config: TradeInvestmentConfig;
        account: TradeInvestmentAccount | null;
        logs: TradeInvestmentLog[];
      },
      void
    >({
      query: () => "/trade-investment/me",
      providesTags: ["TradeInvestment", "TradeInvestmentLogs"],
    }),
    transferToTradeInvestment: builder.mutation<any, { amount: number }>({
      query: (body) => ({ url: "/trade-investment/transfer-in", method: "POST", body }),
      invalidatesTags: ["User", "TradeInvestment", "TradeInvestmentLogs", "Transactions"],
    }),
    transferFromTradeInvestment: builder.mutation<any, { amount: number }>({
      query: (body) => ({ url: "/trade-investment/transfer-out", method: "POST", body }),
      invalidatesTags: ["User", "TradeInvestment", "TradeInvestmentLogs", "Transactions"],
    }),
    cancelTradeInvestment: builder.mutation<any, void>({
      query: () => ({ url: "/trade-investment/cancel", method: "POST" }),
      invalidatesTags: ["User", "TradeInvestment", "TradeInvestmentLogs", "Transactions"],
    }),
    getMyTradeInvestmentLogs: builder.query<
      { success: boolean; items: TradeInvestmentLog[] },
      number | void
    >({
      query: (limit = 100) => `/trade-investment/logs?limit=${limit}`,
      providesTags: ["TradeInvestmentLogs"],
    }),
  }),
});

export const {
  useGetMyTradeInvestmentQuery,
  useTransferToTradeInvestmentMutation,
  useTransferFromTradeInvestmentMutation,
  useCancelTradeInvestmentMutation,
  useGetMyTradeInvestmentLogsQuery,
} = tradeInvestmentApi;
