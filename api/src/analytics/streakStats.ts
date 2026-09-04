import type { NormalizedMessage } from '../types/message';
import type { StreakStats } from '../types/analytics';

function dateKey(d: Date): string {
  return d.toISOString().split('T')[0]; // "YYYY-MM-DD"
}

function addDays(d: Date, n: number): Date {
  const result = new Date(d);
  result.setDate(result.getDate() + n);
  return result;
}

export function calculateStreakStats(messages: NormalizedMessage[]): StreakStats {
  if (messages.length === 0) {
    return { longestStreakDays: 0, currentStreakDays: 0, avgGapBetweenActiveDays: 0, mostInactivePeriodDays: 0 };
  }

  // Collect unique active days sorted ascending
  const activeDaySet = new Set<string>(messages.map((m) => dateKey(m.timestamp)));
  const activeDays = Array.from(activeDaySet).sort();

  if (activeDays.length === 0) {
    return { longestStreakDays: 0, currentStreakDays: 0, avgGapBetweenActiveDays: 0, mostInactivePeriodDays: 0 };
  }

  // Find longest streak
  let longestStreakDays = 1;
  let currentRun = 1;

  for (let i = 1; i < activeDays.length; i++) {
    const prev = new Date(activeDays[i - 1]);
    const curr = new Date(activeDays[i]);
    const diffDays = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      currentRun++;
      longestStreakDays = Math.max(longestStreakDays, currentRun);
    } else {
      currentRun = 1;
    }
  }

  // Current streak (from today backwards)
  const today = dateKey(new Date());
  let currentStreakDays = 0;
  let checkDate = new Date(today);

  while (activeDaySet.has(dateKey(checkDate))) {
    currentStreakDays++;
    checkDate = addDays(checkDate, -1);
  }

  // Average gap between active days
  const gaps: number[] = [];
  let mostInactivePeriodDays = 0;

  for (let i = 1; i < activeDays.length; i++) {
    const prev = new Date(activeDays[i - 1]);
    const curr = new Date(activeDays[i]);
    const gap = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
    gaps.push(gap);
    mostInactivePeriodDays = Math.max(mostInactivePeriodDays, gap);
  }

  const avgGapBetweenActiveDays = gaps.length > 0
    ? parseFloat((gaps.reduce((s, g) => s + g, 0) / gaps.length).toFixed(1))
    : 0;

  return { longestStreakDays, currentStreakDays, avgGapBetweenActiveDays, mostInactivePeriodDays };
}
