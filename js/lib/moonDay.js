// Everything about the moon for ONE day at ONE place.
// Both the Calculator page and the 7-Day Table page use this single copy.

import { addDays, startOfDay } from "./time.js";
import { findRiseAndSet, moonPhase, moonPosition } from "./moon.js";

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
