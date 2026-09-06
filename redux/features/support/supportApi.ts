import { apiSlice } from "../api/apiSlice";

export type SupportInfo = {
  email: string;
  telegram: string;
  whatsapp: string;
  hotline: string;
  workingHours: string;
  liveChatUrl: string;
  apkUrl: string;
  businessPlanPdfUrl: string;
  faqUrl: string;
};

export type TicketReply = {
  from: "user" | "admin";
  byName: string;
  message: string;
  createdAt: string;
};

export type Ticket = {
  _id: string;
  subject: string;
  category: string;
  message: string;
  status: "open" | "pending" | "resolved" | "closed";
  replies: TicketReply[];
  lastReplyAt: string;
  createdAt: string;
};

export const supportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupportInfo: builder.query<SupportInfo, void>({
      query: () => "/support/info",
      transformResponse: (r: { config: SupportInfo }) => r.config,
      providesTags: ["SupportInfo"],
    }),
    getMyTickets: builder.query<Ticket[], void>({
      query: () => "/support/tickets",
      transformResponse: (r: { tickets: Ticket[] }) => r.tickets,
      providesTags: ["SupportTickets"],
    }),
    getMyTicket: builder.query<Ticket, string>({
      query: (id) => `/support/tickets/${id}`,
      transformResponse: (r: { ticket: Ticket }) => r.ticket,
      providesTags: ["SupportTickets"],
    }),
    createTicket: builder.mutation<
      { ticket: Ticket },
      { subject: string; category: string; message: string }
    >({
      query: (body) => ({ url: "/support/tickets", method: "POST", body }),
      invalidatesTags: ["SupportTickets"],
    }),
    replyToMyTicket: builder.mutation<
      { ticket: Ticket },
      { id: string; message: string }
    >({
      query: ({ id, message }) => ({
        url: `/support/tickets/${id}/reply`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: ["SupportTickets"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSupportInfoQuery,
  useGetMyTicketsQuery,
  useGetMyTicketQuery,
  useCreateTicketMutation,
  useReplyToMyTicketMutation,
} = supportApi;
