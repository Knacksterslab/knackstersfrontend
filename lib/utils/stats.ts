/**
 * Dynamic stats calculator
 * Hours grow by 200/day and professionals by 1/week from the baseline date.
 */

const BASELINE_DATE = new Date('2026-03-27T00:00:00.000Z');
const BASELINE_HOURS = 960000;
const BASELINE_PROFESSIONALS = 9999;
const HOURS_PER_DAY = 200;
const PROFESSIONALS_PER_WEEK = 1;

export function getLiveStats() {
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysDiff = Math.max(0, Math.floor((now.getTime() - BASELINE_DATE.getTime()) / msPerDay));
  const weeksDiff = Math.floor(daysDiff / 7);

  const hoursDelivered = BASELINE_HOURS + daysDiff * HOURS_PER_DAY;
  const professionals = BASELINE_PROFESSIONALS + weeksDiff * PROFESSIONALS_PER_WEEK;

  return {
    hoursDelivered: hoursDelivered.toLocaleString() + '+',
    hoursDeliveredLabel: 'Hours Delivered',
    professionals: professionals.toLocaleString() + '+',
    professionalsLabel: 'Professionals in Network',
  };
}
