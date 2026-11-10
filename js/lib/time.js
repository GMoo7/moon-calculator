// Date and time helpers that understand time zones.
// Dates are passed around as text like "2026-11-10" (year-month-day).

// How many minutes a time zone is ahead of UTC at a given moment.
function offsetMinutes(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);
  const v = {};
  for (const part of parts) v[part.type] = Number(part.value);
  const localAsUtc = Date.UTC(v.year, v.month - 1, v.day, v.hour, v.minute, v.second);
  return (localAsUtc - Math.floor(date.getTime() / 1000) * 1000) / 60000;
}

// Today's date as "YYYY-MM-DD" in the given time zone.
export function todayString(timeZone) {
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(new Date());
}

// Add (or subtract) days from a "YYYY-MM-DD" date.
export function addDays(dateString, days) {
  const [y, m, d] = dateString.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

// The exact moment a local day starts (midnight) in the given time zone.
export function startOfDay(dateString, timeZone) {
  const [y, m, d] = dateString.split("-").map(Number);
  const guess = Date.UTC(y, m - 1, d);
  const first = guess - offsetMinutes(new Date(guess), timeZone) * 60000;
  const second = guess - offsetMinutes(new Date(first), timeZone) * 60000;
  return new Date(second);
}

// The visitor's own time zone, e.g. "Europe/Rome".
export function browserTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
