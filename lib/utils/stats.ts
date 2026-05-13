/**
 * Dynamic stats calculator
 * Hours grow by 200/day from the baseline date.
 */

const BASELINE_DATE = new Date('2026-05-13T00:00:00.000Z');
const BASELINE_HOURS = 960000;
const HOURS_PER_DAY = 200;

export function getLiveStats() {
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysDiff = Math.max(0, Math.floor((now.getTime() - BASELINE_DATE.getTime()) / msPerDay));

  const hoursDelivered = BASELINE_HOURS + daysDiff * HOURS_PER_DAY;

  return {
    hoursDelivered: hoursDelivered.toLocaleString() + '+',
    hoursDeliveredLabel: 'Hours Delivered',
  };
}
