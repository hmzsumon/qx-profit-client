export type MarketCandle = { time: number; open: number; high: number; low: number; close: number };

export function aggregateCandles(rows: MarketCandle[], seconds: number): MarketCandle[] {
  const result: MarketCandle[] = [];
  for (const row of [...rows].sort((a, b) => a.time - b.time)) {
    if (![row.time, row.open, row.high, row.low, row.close].every(Number.isFinite) || row.low <= 0) continue;
    const time = Math.floor(row.time / seconds) * seconds;
    const last = result[result.length - 1];
    if (last?.time === time) {
      last.high = Math.max(last.high, row.high);
      last.low = Math.min(last.low, row.low);
      last.close = row.close;
    } else result.push({ ...row, time });
  }
  return result;
}

export function applyTrade(current: MarketCandle | undefined, price: number, timestamp: number, seconds: number): MarketCandle {
  const time = Math.floor(timestamp / seconds) * seconds;
  if (current && time < current.time) return current;
  if (!current || time > current.time) return { time, open: price, high: price, low: price, close: price };
  return { ...current, high: Math.max(current.high, price), low: Math.min(current.low, price), close: price };
}
