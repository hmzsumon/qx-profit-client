const DAY = 86400000;
const DHAKA_OFFSET = 6 * 3600000;

// Mirrors the existing API cron: 30 1 * * 1-5, Asia/Dhaka.
// Keep this display schedule aligned if that cron is changed later.
export function investmentProgress(now: number, excludedWeekDays: number[] = []) {
  const local = new Date(now + DHAKA_OFFSET);
  const midnight = Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate()) - DHAKA_OFFSET;
  let nextRun: number | null = null;
  for (let offset = 0; offset < 8; offset++) {
    const candidate = midnight + offset * DAY + 90 * 60000;
    const weekday = new Date(candidate + DHAKA_OFFSET).getUTCDay();
    if (candidate > now && weekday >= 1 && weekday <= 5 && !excludedWeekDays.includes(weekday)) {
      nextRun = candidate;
      break;
    }
  }
  return { nextRun, dayProgress: Math.max(0, Math.min(100, (now - midnight) / DAY * 100)) };
}

export function countdown(milliseconds: number) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60]
    .map(value => String(value).padStart(2, "0")).join(":");
}
