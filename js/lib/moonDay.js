// Everything about the moon for ONE day at ONE place.
// Both the Calculator page and the 7-Day Table page use this single copy.

import { addDays, startOfDay } from "./time.js";
import { findRiseAndSet, moonPhase, moonPosition } from "./moon.js";

// How many minutes later (positive) or earlier (negative) the moon rises
// than on the day before. Returns null if either day has no moonrise.
// rise is today's moonrise, which the caller already has.
export function riseShiftMinutes(location, date, rise) {
  const { lat, lng, timezone } = location;
  const yesterday = addDays(date, -1);
  const start = startOfDay(yesterday, timezone);
  const end = startOfDay(date, timezone);
  const before = findRiseAndSet(start, end, lat, lng).rise;
  if (!rise || !before) return null;
  // Take away the length of the day, so only the "extra" delay is left.
  return Math.round((rise - before - (end - start)) / 60000);
}

// location looks like { name, lat, lng, timezone }, date is "YYYY-MM-DD".
export function getMoonDay(location, date) {
  const { lat, lng, timezone } = location;
  const start = startOfDay(date, timezone);
  const end = startOfDay(addDays(date, 1), timezone);
  const { rise, set, status } = findRiseAndSet(start, end, lat, lng);
  const noon = new Date((start.getTime() + end.getTime()) / 2);

  return {
    rise,
    set,
    status,
    bearing: rise ? moonPosition(rise, lat, lng).bearing : null,
    phase: moonPhase(noon),
  };
}
