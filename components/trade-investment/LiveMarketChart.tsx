"use client";

import { ColorType, createChart, type UTCTimestamp } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { Activity, ChevronDown, RefreshCw } from "lucide-react";
import baseUrl from "@/config/baseUrl";

const intervals = ["1m", "5m", "15m", "1h"] as const;
const pairs = [
  { symbol: "EUR/USD", label: "EUR/USD", desc: "Euro · US Dollar" },
  { symbol: "GBP/USD", label: "GBP/USD", desc: "British Pound · US Dollar" },
  { symbol: "USD/JPY", label: "USD/JPY", desc: "US Dollar · Japanese Yen" },
  { symbol: "USD/CHF", label: "USD/CHF", desc: "US Dollar · Swiss Franc" },
  { symbol: "USD/CAD", label: "USD/CAD", desc: "US Dollar · Canadian Dollar" },
  { symbol: "AUD/USD", label: "AUD/USD", desc: "Australian Dollar · US Dollar" },
  { symbol: "NZD/USD", label: "NZD/USD", desc: "New Zealand Dollar · US Dollar" },
] as const;

function formatterFor(symbol: string) {
  const digits = symbol.includes("JPY") ? 3 : 5;
  return new Intl.NumberFormat("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export default function LiveMarketChart() {
  const container = useRef<HTMLDivElement>(null);
  const [interval, setIntervalValue] = useState<(typeof intervals)[number]>("1m");
  const [pair, setPair] = useState<(typeof pairs)[number]>(pairs[0]);
  const [pairMenuOpen, setPairMenuOpen] = useState(false);
  const [retry, setRetry] = useState(0);
  const [quote, setQuote] = useState<{ price: number; change: number } | null>(null);
  const [status, setStatus] = useState("Connecting");

  useEffect(() => {
    if (!container.current) return;
    const host = container.current;
    const chart = createChart(host, {
      width: host.clientWidth, height: host.clientHeight,
      layout: { background: { type: ColorType.Solid, color: "#131b24" }, textColor: "#94a3b8", fontSize: 11 },
      grid: { vertLines: { color: "#ffffff08" }, horzLines: { color: "#ffffff08" } },
      rightPriceScale: { borderColor: "#ffffff12", scaleMargins: { top: 0.12, bottom: 0.08 } },
      timeScale: { borderColor: "#ffffff12", timeVisible: true, secondsVisible: false, rightOffset: 3 },
      handleScroll: { vertTouchDrag: false },
    });
    const candles = chart.addCandlestickSeries({ upColor: "#10b981", downColor: "#f87171", wickUpColor: "#10b981", wickDownColor: "#f87171", borderVisible: false });
    const observer = new ResizeObserver(() => chart.resize(host.clientWidth, host.clientHeight));
    observer.observe(host);
    let disposed = false;
    let fitted = false;
    let timer: ReturnType<typeof setTimeout>;
    let controller: AbortController | undefined;
    setQuote(null);
    setStatus("Connecting");

    const refresh = async () => {
      if (disposed) return;
      if (document.hidden) {
        setStatus("Paused");
        timer = setTimeout(refresh, 5000);
        return;
      }
      controller = new AbortController();
      const timeout = setTimeout(() => controller?.abort(), 10000);
      let failed = false;
      try {
        const response = await fetch(`${baseUrl}/forex/klines?symbol=${encodeURIComponent(pair.symbol)}&interval=${interval}`, { signal: controller.signal, cache: "no-store" });
        const json: { success?: boolean; data?: unknown; stale?: boolean } = await response.json();
        if (!response.ok || !json.success || !Array.isArray(json.data) || !json.data.length) throw new Error("Missing candles");
        const points = json.data.map((row: unknown) => {
          const c = row as Record<string, number>;
          if (![c.time, c.open, c.high, c.low, c.close].every(Number.isFinite)) throw new Error("Invalid candle");
          return { time: c.time as UTCTimestamp, open: c.open, high: c.high, low: c.low, close: c.close };
        });
        if (disposed) return;
        candles.setData(points);
        if (!fitted) { chart.timeScale().fitContent(); fitted = true; }
        const last = points[points.length - 1];
        setQuote({ price: last.close, change: ((last.close - last.open) / last.open) * 100 });
        setStatus(json.stale ? "Delayed data" : "Live");
      } catch {
        failed = true;
        if (!disposed) setStatus("Connection interrupted");
      } finally {
        clearTimeout(timeout);
        if (!disposed) timer = setTimeout(refresh, failed ? 15000 : 5000);
      }
    };
    void refresh();
    return () => { disposed = true; clearTimeout(timer); controller?.abort(); observer.disconnect(); chart.remove(); };
  }, [interval, pair, retry]);

  const priceFormat = formatterFor(pair.symbol);

  return (
    <section className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-[#131b24]" aria-label="Forex market chart">
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 font-bold"><Activity size={18} className="text-emerald-400" /> Live Market</h2>
          <span role="status" className={`flex items-center gap-2 text-xs ${status === "Live" ? "text-emerald-300" : "text-amber-300"}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{status}</span>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setPairMenuOpen(v => !v)}
              aria-haspopup="listbox"
              aria-expanded={pairMenuOpen}
              className="rounded-lg px-1 py-1 text-left hover:bg-white/5"
            >
              <span className="flex items-center gap-1.5">
                <p className="text-lg font-bold">{pair.label}</p>
                <ChevronDown size={16} className={`shrink-0 text-white/45 transition-transform ${pairMenuOpen ? "rotate-180" : ""}`} />
              </span>
              <p className="text-xs text-white/45">{pair.desc}</p>
            </button>
            {pairMenuOpen && (
              <ul role="listbox" className="scrollbar-hide absolute left-0 top-full z-10 mt-1 max-h-72 min-w-[220px] overflow-y-auto overscroll-contain rounded-xl border border-white/10 bg-[#1a2330] shadow-xl">
                {pairs.map(option => (
                  <li key={option.symbol}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={pair.symbol === option.symbol}
                      onClick={() => { setPair(option); setPairMenuOpen(false); }}
                      className={`flex w-full flex-col items-start px-3 py-2 text-left text-sm hover:bg-white/5 ${pair.symbol === option.symbol ? "text-sky-300" : "text-white/80"}`}
                    >
                      <span className="font-semibold">{option.label}</span>
                      <span className="text-xs text-white/45">{option.desc}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="text-right"><p className="text-xl font-bold tabular-nums sm:text-2xl">{quote ? priceFormat.format(quote.price) : "—"}</p><p className={`text-xs ${quote && quote.change < 0 ? "text-red-300" : "text-emerald-300"}`}>{quote ? `${quote.change >= 0 ? "+" : ""}${quote.change.toFixed(2)}% this candle` : "Waiting for market data"}</p></div>
        </div>
        <div className="mt-4 flex items-center gap-1" aria-label="Chart timeframe">{intervals.map(value => <button key={value} onClick={() => setIntervalValue(value)} aria-pressed={interval === value} className={`min-h-10 min-w-11 rounded-lg px-3 text-sm ${interval === value ? "bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/30" : "text-white/55 hover:bg-white/5"}`}>{value}</button>)}</div>
      </div>
      <div className="relative">
        <div ref={container} className="h-[260px] w-full sm:h-[330px]" aria-label="Live forex candlesticks; chart times in UTC" />
        {!quote && <div className="absolute inset-0 grid place-items-center bg-[#131b24]/90 px-5 text-center text-sm text-white/60">{status === "Connecting" ? "Loading live candles…" : <div><p>Market data is temporarily unavailable.</p><button onClick={() => setRetry(v => v + 1)} className="mx-auto mt-3 flex min-h-11 items-center gap-2 text-sky-300"><RefreshCw size={16} /> Retry connection</button></div>}</div>}
      </div>
    </section>
  );
}
