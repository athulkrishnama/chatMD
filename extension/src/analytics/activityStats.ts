import type { NormalizedMessage } from './message';
import type { ActivityStats } from './analytics';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function calculateActivityStats(messages: NormalizedMessage[]): ActivityStats {
  const byHour = new Array(24).fill(0);
  const byDayOfWeek = new Array(7).fill(0);

  for (const msg of messages) {
    byHour[msg.timestamp.getHours()]++;
    byDayOfWeek[msg.timestamp.getDay()]++;
  }

  const peakHour = byHour.indexOf(Math.max(...byHour));
  const hoursCopy = [...byHour];
  hoursCopy[peakHour] = -1;
  const secondPeakHour = hoursCopy.indexOf(Math.max(...hoursCopy));

  const peakDayIndex = byDayOfWeek.indexOf(Math.max(...byDayOfWeek));
  const leastActiveDayIndex = byDayOfWeek.indexOf(Math.min(...byDayOfWeek));

  // Time of day buckets
  let morning = 0, afternoon = 0, evening = 0, night = 0;
  for (let h = 0; h < 24; h++) {
    const count = byHour[h];
    if (h >= 6 && h < 12) morning += count;
    else if (h >= 12 && h < 18) afternoon += count;
    else if (h >= 18 && h < 22) evening += count;
    else night += count; // 22–05
  }

  const total = messages.length || 1;
  const nightMessagePercentage = parseFloat(((night / total) * 100).toFixed(1));

  return {
    byHour,
    byDayOfWeek,
    peakHour,
    secondPeakHour,
    peakDay: DAYS[peakDayIndex],
    leastActiveDay: DAYS[leastActiveDayIndex],
    morningMessages: morning,
    afternoonMessages: afternoon,
    eveningMessages: evening,
    nightMessages: night,
    nightMessagePercentage,
  };
}
