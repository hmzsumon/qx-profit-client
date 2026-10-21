import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol") || "BTCUSDT";
  const seconds = Number(request.nextUrl.searchParams.get("seconds") || 5);
  if (!["BTCUSDT", "ETHUSDT", "SOLUSDT"].includes(symbol) || ![5, 15, 60].includes(seconds)) {
    return NextResponse.json({ message: "Unsupported market or timeframe" }, { status: 400 });
  }
  const params = new URLSearchParams({ symbol, interval: seconds < 60 ? "1s" : "1m", limit: "1000" });
  try {
    const response = await fetch(`https://data-api.binance.vision/api/v3/klines?${params}`, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error("Market history unavailable");
    const rows: unknown = await response.json();
    if (!Array.isArray(rows)) throw new Error("Invalid market history");
    const data = rows.map((row: unknown[]) => ({ time: Math.floor(Number(row[0]) / 1000), open: Number(row[1]), high: Number(row[2]), low: Number(row[3]), close: Number(row[4]) }));
    return NextResponse.json({ data }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ message: "Market history unavailable" }, { status: 502 });
  }
}
