"use client";

import { useEffect, useRef, useState } from "react";
import { ColorType, createChart, LineStyle, type UTCTimestamp } from "lightweight-charts";
import { Activity, RefreshCw } from "lucide-react";
import { aggregateCandles, applyTrade, type MarketCandle } from "@/lib/marketCandles";

const markets = ["BTCUSDT", "ETHUSDT", "SOLUSDT"];
const timeframes = [{ seconds: 5, label: "5s" }, { seconds: 15, label: "15s" }, { seconds: 60, label: "1m" }];

export default function LiveCandlestickChart() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [seconds, setSeconds] = useState(5);
  const [retry, setRetry] = useState(0);
  const [status, setStatus] = useState("Connecting");
  const [quote, setQuote] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(5);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    setStatus("Connecting"); setQuote(null);
    const chart = createChart(host, {
      width: host.clientWidth, height: host.clientHeight,
      layout: { background: { type: ColorType.Solid, color: "#131b24" }, textColor: "#94a3b8", fontSize: 11 },
      grid: { vertLines: { color: "#ffffff08", style: LineStyle.Dashed }, horzLines: { color: "#ffffff08", style: LineStyle.Dashed } },
      rightPriceScale: { borderColor: "#ffffff12", scaleMargins: { top: 0.15, bottom: 0.1 } },
      timeScale: { borderColor: "#ffffff12", timeVisible: true, secondsVisible: true, rightOffset: 5, barSpacing: 8, shiftVisibleRangeOnNewBar: true },
      handleScroll: { vertTouchDrag: false },
    });
    const series = chart.addCandlestickSeries({ upColor: "#10b981", downColor: "#f87171", wickUpColor: "#10b981", wickDownColor: "#f87171", borderVisible: false, priceLineStyle: LineStyle.Solid, priceFormat: { type: "price", precision: 2, minMove: 0.01 } });
    const observer = new ResizeObserver(() => {
      if (host.clientWidth && host.clientHeight) chart.resize(host.clientWidth, host.clientHeight);
    });
    observer.observe(host);
    let disposed = false;
    let socket: WebSocket | null = null;
    let reconnect: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0, lastMessage = 0, connectingAt = 0;
    let receivedTrade = false;
    let current: MarketCandle | undefined;
    let points: MarketCandle[] = [];
    let dirty = false, historyLoaded = false;
    const pending: { price: number; time: number }[] = [];
    const controller = new AbortController();
    const historyTimeout = setTimeout(() => controller.abort(), 12000);

    const consume = (price: number, time: number) => {
      const next = applyTrade(current, price, time, seconds);
      if (next === current) return;
      if (!current || next.time !== current.time) points.push(next);
      else points[points.length - 1] = next;
      current = next; dirty = true;
    };
    const connect = () => {
      if (disposed) return;
      setStatus(attempts ? "Reconnecting" : "Connecting");
      connectingAt = Date.now(); receivedTrade = false;
      socket = new WebSocket(`wss://data-stream.binance.vision/ws/${symbol.toLowerCase()}@trade`);
      socket.onopen = () => { attempts = 0; lastMessage = Date.now(); };
      socket.onmessage = event => {
        if (disposed) return;
        try {
          const data = JSON.parse(event.data);
          if (data.e !== "trade" || data.s !== symbol) return;
          const price = Number(data.p), time = Number(data.T) / 1000;
          if (!Number.isFinite(price) || price <= 0 || !Number.isFinite(time)) return;
          lastMessage = Date.now();
          receivedTrade = true;
          if (!historyLoaded) {
            pending.push({ price, time });
            if (pending.length > 10000) pending.shift();
          } else consume(price, time);
        } catch { /* Ignore malformed stream messages. */ }
      };
      socket.onerror = () => {
        if (socket) { socket.onerror = null; socket.close(); }
      };
      socket.onclose = () => {
        if (disposed) return;
        setStatus("Reconnecting");
        reconnect = setTimeout(connect, Math.min(1000 * 2 ** attempts++, 15000));
      };
    };
    connect();
    void (async () => {
      try {
        const response = await fetch(`/api/market/candles?symbol=${symbol}&seconds=${seconds}`, { signal: controller.signal, cache: "no-store" });
        if (!response.ok) throw new Error("History unavailable");
        const json = await response.json();
        if (!Array.isArray(json.data)) throw new Error("Invalid history");
        points = aggregateCandles(json.data, seconds);
      } catch {
        // History failure must not stop incoming live trades.
        points = [];
      } finally {
        clearTimeout(historyTimeout);
        if (!disposed) {
          current = points[points.length - 1];
          pending.forEach(tick => consume(tick.price, tick.time));
          pending.length = 0; historyLoaded = true;
          series.setData(points.map(point => ({ ...point, time: point.time as UTCTimestamp })));
          chart.timeScale().setVisibleLogicalRange({ from: points.length - (host.clientWidth < 640 ? 32 : 65), to: Math.max(points.length, 1) + 5 });
          dirty = true;
        }
      }
    })();
    // Consume every trade to retain true high/low; paint at most 10 times/sec.
    const paint = setInterval(() => {
      if (!historyLoaded || !dirty || !current) return;
      dirty = false;
      if (points.length > 1500) {
        points = points.slice(-1000);
        series.setData(points.map(point => ({ ...point, time: point.time as UTCTimestamp })));
      } else series.update({ ...current, time: current.time as UTCTimestamp });
      setQuote(current.close);
    }, 100);
    const heartbeat = setInterval(() => {
      setRemaining(seconds - Math.floor(Date.now() / 1000) % seconds);
      if (socket?.readyState === WebSocket.OPEN) {
        const age = Date.now() - lastMessage;
        setStatus(age < 5000 && receivedTrade && historyLoaded && current ? "Live" : "Waiting for trades");
        if (age > 20000) socket.close();
      }
      if (socket?.readyState === WebSocket.CONNECTING && Date.now() - connectingAt > 10000) socket.close();
    }, 250);
    return () => {
      disposed = true; controller.abort();
      clearTimeout(historyTimeout); clearTimeout(reconnect);
      clearInterval(paint); clearInterval(heartbeat);
      if (socket) { socket.onclose = null; socket.onmessage = null; socket.onerror = null; socket.close(); }
      observer.disconnect(); chart.remove();
    };
  }, [symbol, seconds, retry]);

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#131b24]" aria-label="Live candlestick chart">
      <div className="space-y-3 p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-sm font-semibold"><Activity size={18} className="text-sky-400" /> Live candlestick chart</h2>
          <span role="status" className={`flex items-center gap-1.5 text-xs ${status === "Live" ? "text-emerald-400" : "text-amber-300"}`}><span className={`h-1.5 w-1.5 rounded-full bg-current ${status === "Live" ? "animate-pulse" : ""}`} />{status}</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <select aria-label="Chart market" value={symbol} onChange={e => setSymbol(e.target.value)} className="min-h-11 min-w-0 max-w-full rounded-lg border border-white/15 bg-[#1a2330] px-3 text-sm text-white">
            {markets.map(market => <option key={market} value={market}>{market.replace("USDT", " / USDT")}</option>)}
          </select>
          <div className="text-right"><p className="font-semibold tabular-nums">{quote?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? "—"}</p><p className="text-xs text-white/45 tabular-nums">Next candle in {remaining}s</p></div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1" role="group" aria-label="Candle timeframe">
            {timeframes.map(frame => <button key={frame.seconds} type="button" aria-pressed={seconds === frame.seconds} onClick={() => setSeconds(frame.seconds)} className={`min-h-11 min-w-11 rounded-lg px-3 text-sm ${seconds === frame.seconds ? "bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/30" : "text-white/60 hover:bg-white/5"}`}>{frame.label}</button>)}
          </div>
          <button type="button" aria-label="Reconnect live chart" onClick={() => setRetry(value => value + 1)} className="flex h-11 w-11 items-center justify-center rounded-lg text-sky-300 hover:bg-white/5"><RefreshCw size={16} /></button>
        </div>
      </div>
      <div className="relative h-[340px] w-full min-w-0 sm:h-[440px]">
        <div ref={hostRef} className="h-full w-full" />
        {quote === null && <div className="pointer-events-none absolute inset-0 grid place-items-center px-5 text-center text-sm text-white/60">{status === "Reconnecting" ? "Connection interrupted. Reconnecting…" : "Waiting for live market trades…"}</div>}
      </div>
      <p className="px-3 py-3 text-[11px] text-white/40 sm:px-4">Binance live trades · 24/7 · UTC<span className="ml-2">Charts: <a href="https://www.tradingview.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">TradingView Lightweight Charts™</a></span></p>
    </section>
  );
}
