// ✅ baseQueryWithReauth.ts – RTK Query Auto-Refresh Access Token Middleware

import baseUrl from "@/config/baseUrl";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import {
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logoutUser } from "@/redux/features/auth/authSlice";

// ⚙️ Normal baseQuery with credentials (cookie auth)
const baseQuery = fetchBaseQuery({
  baseUrl, // ✅ Use baseUrl from config
  credentials: "include", // ✅ send cookies automatically
});

const LOGIN_URL = "/register-login?tab=signin";

// don't bounce to login while the user is on a public / auth page
const isProtectedPath = () => {
  if (typeof window === "undefined") return false;
  const p = window.location.pathname;
  return !(
    p === "/" ||
    p.startsWith("/register-login") ||
    p.startsWith("/verify-email") ||
    p.startsWith("/forgot-password") ||
    p.startsWith("/reset-password") ||
    p.startsWith("/faq") ||
    p.startsWith("/about") ||
    p.startsWith("/blog") ||
    p.startsWith("/demo")
  );
};

// 🔁 Middleware-enhanced baseQuery with refresh retry logic
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // 🔄 try to get new access token
    const refreshResult = await baseQuery(
      "/refresh-token",
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // ✅ retry original query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // ❌ Refresh failed → the 5-minute session is over. Sign out.
      api.dispatch(logoutUser());
      if (isProtectedPath()) {
        window.location.assign(LOGIN_URL);
      }
    }
  }

  return result;
};
