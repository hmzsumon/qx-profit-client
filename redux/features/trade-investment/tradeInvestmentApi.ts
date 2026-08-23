import { apiSlice } from "../api/apiSlice";

export type TradeInvestmentConfig = {
  minAmount: number;
  lockDays: number;
  dailyProfitPercent: number;
  userProfitPercent: number;
  teamBonusPercent: number;
  companyPercent: number;
  levelPercents: number[];
  isActive: boolean;
};

export type TradeInvestmentAccount = {
  _id: string;
  balance: number;
  status: "active" | "inactive";
  lockUntil?: string;
  totalTransferredIn: number;
  totalTransferredOut: number;
  totalUserProfit: number;
  totalTeamBonus: number;
  totalCompanyCut: number;
  lastProfitDayKey?: string;
};

export type TradeInvestmentLog = {
  _id: string;
  type: "transfer_in" | "transfer_out" | "profit" | "generation_bonus" | "company_cut";
  amount: number;
  dayKey?: string;
  grossProfit?: number;
  userProfit?: number;
  teamBonusPool?: number;
  companyCut?: number;
  percentSnapshot?: number;
  balanceAfter?: number;
  note?: string;
  createdAt: string;
};

export const tradeInvestmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyTradeInvestment: builder.query<{ success: boolean; config: TradeInvestmentConfig; account: TradeInvestmentAccount | null; logs: TradeInvestmentLog[] }, void>({
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
    getMyTradeInvestmentLogs: builder.query<{ success: boolean; items: TradeInvestmentLog[] }, number | void>({
      query: (limit = 100) => `/trade-investment/logs?limit=${limit}`,
      providesTags: ["TradeInvestmentLogs"],
    }),
  }),
});

export const { useGetMyTradeInvestmentQuery, useTransferToTradeInvestmentMutation, useTransferFromTradeInvestmentMutation, useGetMyTradeInvestmentLogsQuery } = tradeInvestmentApi;
