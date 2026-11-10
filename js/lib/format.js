// Turns numbers and dates into text people can read.

const COMPASS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

// "21:43" (or "9:43 PM", depending on the visitor's settings).
export function formatTime(date, timeZone) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  });
}

// "Tue, 10 Nov 2026" from a "YYYY-MM-DD" string.
export function formatDate(dateString, withYear = true) {
  const [y, m, d] = dateString.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString([], {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: withYear ? "numeric" : undefined,
    timeZone: "UTC",
  });
}

// 95.4 -> "95° E"
export function formatBearing(degrees) {
  const name = COMPASS[Math.round(degrees / 45) % 8];
  return `${Math.round(degrees)}° ${name}`;
}

// 0.783 -> "78%"
export function formatPercent(fraction) {
  return `${Math.round(fraction * 100)}%`;
}

// What to show when the moon does not rise or set on a day.
export function missingText(status, eventName) {
  if (status === "always-up") return "Moon stays up all day";
  if (status === "never-up") return "Moon stays down all day";
  return `No ${eventName} this day`;
}
