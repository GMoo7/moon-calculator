// HOME screen: pick a place and a date, then see moonrise, moonset and phase.

import { el } from "../lib/dom.js";
import { createLocationPicker } from "../components/locationPicker.js";
import { loadLocation } from "../lib/storage.js";
import { getMoonDay } from "../lib/moonDay.js";
import { browserTimeZone, todayString } from "../lib/time.js";
import {
  formatBearing,
  formatDate,
  formatPercent,
  formatTime,
  missingText,
} from "../lib/format.js";

// One big number with a label above it and a small note below it.
function stat(label, value, note = "") {
  const box = el("div", "stat");
  box.append(el("span", "stat-label", label), el("span", "stat-value", value));
  if (note) box.append(el("span", "stat-note", note));
  return box;
}

export function renderHome(root) {
  let location = loadLocation();
  const result = el("section", "card");

  const dateInput = el("input");
  dateInput.type = "date";
  dateInput.value = todayString(location?.timezone || browserTimeZone());
  dateInput.setAttribute("aria-label", "Date");
  dateInput.addEventListener("input", showResult);

  const dateBox = el("section", "card");
  dateBox.append(el("h2", "", "Date"), dateInput);

  function showResult() {
    result.replaceChildren();
    if (!location || !dateInput.value) {
      result.append(el("p", "message", "Choose a place above to see the moonrise time."));
      return;
    }

    const day = getMoonDay(location, dateInput.value);
    const zone = location.timezone;
    const stats = el("div", "stats");
    stats.append(
      stat(
        "🌙 Moonrise",
        day.rise ? formatTime(day.rise, zone) : missingText(day.status, "moonrise"),
        day.bearing === null ? "" : `Look ${formatBearing(day.bearing)}`
      ),
      stat("Moonset", day.set ? formatTime(day.set, zone) : missingText(day.status, "moonset")),
      stat(`${day.phase.emoji} Phase`, day.phase.name, `${formatPercent(day.phase.illumination)} lit`)
    );

    result.append(
      el("h2", "", `${formatDate(dateInput.value)} · ${location.name}`),
      stats,
      el("p", "note", `Times are in ${zone} time.`)
    );
  }

  root.append(
    el("h1", "", "What time does the moon rise?"),
    el("p", "lead", "Find the moonrise and moonset time for any city and any date, plus the moon phase and the direction to look."),
    createLocationPicker((chosen) => {
      location = chosen;
      showResult();
    }),
    dateBox,
    result
  );
  showResult();
}
