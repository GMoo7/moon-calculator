// Turns numbers and dates into text people can read, in the page's language.

import { fill, text } from "./i18n.js";

// "21:43" (or "9:43 PM"). Uses the visitor's own clock style.
export function formatTime(date, timeZone) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  });
}

// "Tue, 10 Nov 2026" (day and month names in the page's language).
export function formatDate(dateString, withYear = true) {
  const [y, m, d] = dateString.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(text.lang, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: withYear ? "numeric" : undefined,
    timeZone: "UTC",
  });
}

// 95.4 -> "95° E"
export function formatBearing(degrees) {
  const name = text.ui.compass[Math.round(degrees / 45) % 8];
  return `${Math.round(degrees)}° ${name}`;
}

// 0.783 -> "78%"
export function formatPercent(fraction) {
  return `${Math.round(fraction * 100)}%`;
}

// A phase as a name, e.g. "Waxing Crescent".
export function phaseName(phase) {
  return text.ui.phaseNames[phase.index];
}

// "78% lit"
export function litText(phase) {
  return fill(text.ui.home.lit, { percent: formatPercent(phase.illumination) });
}

// "Waxing Crescent, 23% lit" (also used as the spoken description of the drawing)
export function phaseLabel(phase) {
  return fill(text.ui.home.phaseLabel, {
    name: phaseName(phase),
    percent: formatPercent(phase.illumination),
  });
}

// 52 -> "52 minutes later than the day before."
export function formatShift(minutes) {
  if (minutes === null) return "";
  const words = text.ui.shift;
  const size = Math.abs(minutes);
  if (size < 2) return words.same;
  const direction = minutes > 0 ? "later" : "earlier";
  return fill(words[direction + (size === 1 ? "One" : "Many")], { n: size });
}

// What to show when the moon does not rise or set on a day.
// eventKey is "noRise" or "noSet".
export function missingText(status, eventKey) {
  const words = text.ui.missing;
  if (status === "always-up") return words.alwaysUp;
  if (status === "never-up") return words.neverUp;
  return words[eventKey];
}
