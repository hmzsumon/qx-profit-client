"use client";

import { ColorType, createChart, type UTCTimestamp } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { Activity, RefreshCw } from "lucide-react";

const intervals = ["1m", "5m", "15m", "1h"] as const;
const priceFormat = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function LiveMarketChart() {
  const container = useRef<HTMLDivElement>(null);
  const [interval, setIntervalValue] = useState<(typeof intervals)[number]>("1m");
  const [retry, setRetry] = useState(0);
  const [quote, setQuote] = useState<{ price: number; change: number } | null>(null);
  const [status, setStatus] = useState("Connecting");
  const [updated, setUpdated] = useState<string | null>(null);

  useEffect(() => {
    if (!container.current) return;
    const host = container.current;
    const chart = createChart(host, {
      width: host.clientWidth, height: host.clientHeight,
      layout: { background: { type: ColorType.Solid, color: "#131b24" }, textColor: "#94a3b8", fontSize: 11 },
      grid: { vertLines: { color: "#ffffff08" }, horzLines: { color: "#ffffff08" } },
      rightPriceScale: { borderColor: "#ffffff12", scaleMargins: { top: 0.12, bottom: 0.23 } },
      timeScale: { borderColor: "#ffffff12", timeVisible: true, secondsVisible: false, rightOffset: 3 },
      handleScroll: { vertTouchDrag: false },
    });
    const candles = chart.addCandlestickSeries({ upColor: "#10b981", downColor: "#f87171", wickUpColor: "#10b981", wickDownColor: "#f87171", borderVisible: false });
    const volume = chart.addHistogramSeries({ priceFormat: { type: "volume" }, priceScaleId: "volume", lastValueVisible: false, priceLineVisible: false });
    chart.priceScale("volume").applyOptions({ scaleMargins: { top: 0.85, bottom: 0 } });
    const observer = new ResizeObserver(() => chart.resize(host.clientWidth, host.clientHeight));
    observer.observe(host);
    let disposed = false;
    let fitted = false;
    let timer: ReturnType<typeof setTimeout>;
    let controller: AbortController | undefined;
    setQuote(null);
    setUpdated(null);
    setStatus("Connecting");

    const refresh = async () => {
      if (disposed) return;
      if (document.hidden) {
        setStatus("Paused");
        timer = setTimeout(refresh, 3000);
        return;
      }
      controller = new AbortController();
      const timeout = setTimeout(() => controller?.abort(), 10000);
      let failed = false;
      try {
        // Public market data only: no credentials, balances or account information are sent.
        const response = await fetch(`https://data-api.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=${interval}&limit=80`, { signal: controller.signal, cache: "no-store", credentials: "omit" });
        if (!response.ok) throw new Error("Market unavailable");
        const raw: unknown = await response.json();
        if (!Array.isArray(raw) || !raw.length) throw new Error("Missing candles");
        const points = raw.map((row: unknown) => {
          if (!Array.isArray(row)) throw new Error("Invalid candle");
          const values = row.slice(0, 6).map(Number);
          if (values.length !== 6 || !values.every(Number.isFinite)) throw new Error("Invalid candle");
          return { time: (values[0] / 1000) as UTCTimestamp, open: values[1], high: values[2], low: values[3], close: values[4], volume: values[5] };
        });
        if (disposed) return;
        candles.setData(points);
        volume.setData(points.map(p => ({ time: p.time, value: p.volume, color: p.close >= p.open ? "#10b98155" : "#f8717155" })));
        if (!fitted) { chart.timeScale().fitContent(); fitted = true; }
        const last = points[points.length - 1];
        setQuote({ price: last.close, change: ((last.close - last.open) / last.open) * 100 });
        setUpdated(new Date().toLocaleTimeString("en-US", { hour12: false }));
        const period = interval === "1h" ? 3600000 : parseInt(interval) * 60000;
        setStatus(Date.now() - Number(last.time) * 1000 > period + 60000 ? "Delayed data" : "Live");
      } catch {
        failed = true;
        if (!disposed) setStatus("Connection interrupted");
      } finally {
        clearTimeout(timeout);
        if (!disposed) timer = setTimeout(refresh, failed ? 15000 : 3000);
      }
    };
    void refresh();
    return () => { disposed = true; clearTimeout(timer); controller?.abort(); observer.disconnect(); chart.remove(); };
  }, [interval, retry]);

  return (
    <section className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-[#131b24]" aria-label="Bitcoin market chart">
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 font-bold"><Activity size={18} className="text-emerald-400" /> Live Market</h2>
          <span role="status" className={`flex items-center gap-2 text-xs ${status === "Live" ? "text-emerald-300" : "text-amber-300"}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{status}</span>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-lg font-bold">BTC / USDT</p><p className="text-xs text-white/45">Bitcoin · Binance spot market</p></div>
          <div className="text-right"><p className="text-xl font-bold tabular-nums sm:text-2xl">{quote ? priceFormat.format(quote.price) : "—"}</p><p className={`text-xs ${quote && quote.change < 0 ? "text-red-300" : "text-emerald-300"}`}>{quote ? `${quote.change >= 0 ? "+" : ""}${quote.change.toFixed(2)}% this candle` : "Waiting for market data"}</p></div>
        </div>
        <div className="mt-4 flex items-center gap-1" aria-label="Chart timeframe">{intervals.map(value => <button key={value} onClick={() => setIntervalValue(value)} aria-pressed={interval === value} className={`min-h-10 min-w-11 rounded-lg px-3 text-sm ${interval === value ? "bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/30" : "text-white/55 hover:bg-white/5"}`}>{value}</button>)}</div>
      </div>
      <div className="relative">
        <div ref={container} className="h-[260px] w-full sm:h-[330px]" aria-label="Live candlesticks and trading volume; chart times in UTC" />
        {!quote && <div className="absolute inset-0 grid place-items-center bg-[#131b24]/90 px-5 text-center text-sm text-white/60">{status === "Connecting" ? "Loading live candles…" : <div><p>Market data is temporarily unavailable.</p><button onClick={() => setRetry(v => v + 1)} className="mx-auto mt-3 flex min-h-11 items-center gap-2 text-sky-300"><RefreshCw size={16} /> Retry connection</button></div>}</div>}
      </div>
      <div className="space-y-2 border-t border-white/10 px-4 py-3 text-xs text-white/45"><p>Updates every 3 seconds · Chart time: UTC{updated ? ` · Updated ${updated}` : ""}</p><p className="text-white/65">Market prices do not determine your daily payout. This chart does not represent trades with your investment.</p><a href="https://www.tradingview.com/" target="_blank" rel="noreferrer" className="inline-block text-sky-300 hover:underline">Charts by TradingView</a></div>
    </section>
  );
}
