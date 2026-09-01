// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register-login",
  "/register",
  "/verify-otp",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/verify-otp-password",
  "/model-test",
];

// Marketing / info pages — always reachable (logged in OR out), never redirected.
const INFO_ROUTES = ["/faq", "/about", "/blog", "/demo"];

const PUBLIC_FILE =
  /\.(?:png|jpe?g|gif|webp|svg|ico|bmp|avif|mp3|wav|ogg|mp4|webm|txt|xml|json|js|css|map|woff2?|ttf|eot)$/i;

export function middleware(request: NextRequest) {
  const token = request.cookies.get("sw99_token")?.value;
  const { pathname } = request.nextUrl;

  // Never touch API or preflight.
  if (pathname.startsWith("/api") || request.method === "OPTIONS") {
    return NextResponse.next();
  }

  // Static / public assets always pass.
  if (
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/_next/image") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/icons") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.endsWith(".webmanifest") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Info / marketing pages — no auth gate, no dashboard bounce.
  if (INFO_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // No token on a private route -> send to the sign-in page.
  if (!token && !isPublicRoute) {
    // Non-GET: return 401 instead of redirecting (form/XHR safety).
    if (request.method !== "GET") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = request.nextUrl.clone();
    url.pathname = "/register-login";
    url.search = "";
    url.searchParams.set("tab", "signin");
    // Only remember a real in-app destination (avoid looping back to auth pages).
    if (pathname && pathname !== "/" && !PUBLIC_ROUTES.includes(pathname)) {
      url.searchParams.set("next", pathname);
    }
    // 303 forces the follow-up request to be a GET.
    return NextResponse.redirect(url, 303);
  }

  // Logged in and visiting an auth page -> go to the dashboard. Home stays public.
  if (token && isPublicRoute && pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\..*).*)",
  ],
};
