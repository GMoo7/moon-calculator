// HOME screen: pick a place and a date, see the moonrise time as the headline,
// with moonset, phase and a drawing of the moon next to it.

import { el } from "../lib/dom.js";
import { createLocationPicker } from "../components/locationPicker.js";
import { createMoonDisc } from "../components/moonDisc.js";
import { loadLocation } from "../lib/storage.js";
import { getMoonDay } from "../lib/moonDay.js";
import { moonPhase } from "../lib/moon.js";
import { browserTimeZone, todayString } from "../lib/time.js";
import {
  formatBearing,
  formatDate,
  formatPercent,
  formatTime,
  missingText,
} from "../lib/format.js";

// A small label with a value under it, e.g. "Moonset" / "17:12".
function fact(label, value) {
  const box = el("div", "fact");
  box.append(el("dt", "", label), el("dd", "", value));
  return box;
}

export function renderHome(root) {
  let location = loadLocation();
  const result = el("section", "hero");

  const dateInput = el("input");
  dateInput.type = "date";
  dateInput.value = todayString(location?.timezone || browserTimeZone());
  dateInput.setAttribute("aria-label", "Date");
  dateInput.addEventListener("input", showResult);

  // The big text on the left: either the moonrise, or (before a city is chosen) today's phase.
  function buildMain(date, day, phase) {
    const main = el("div", "hero-main");
    const lit = `${formatPercent(phase.illumination)} lit`;
    main.append(
      el("p", "hero-date", formatDate(date)),
      el("p", "hero-place", location ? location.name : "No city chosen yet")
    );

    if (!day) {
      main.append(
        el("p", "hero-label", "Moon phase"),
        el("p", "hero-time is-text", phase.name),
        el("p", "hero-sub", `${lit}. Choose a city to see when the moon rises.`)
      );
      return main;
    }

    const zone = location.timezone;
    const riseText = day.rise ? formatTime(day.rise, zone) : missingText(day.status, "moonrise");
    const setText = day.set ? formatTime(day.set, zone) : missingText(day.status, "moonset");
    const facts = el("dl", "facts");
    facts.append(fact("Moonset", setText), fact("Moon phase", `${phase.name}, ${lit}`));

    main.append(
      el("p", "hero-label", "Moonrise"),
      el("p", day.rise ? "hero-time" : "hero-time is-text", riseText)
    );
    if (day.bearing !== null) {
      main.append(el("p", "hero-sub", `Look ${formatBearing(day.bearing)} on the horizon`));
    }
    main.append(facts, el("p", "note", `Times are in ${zone} time.`));
    return main;
  }

  function showResult() {
    const date = dateInput.value || todayString(browserTimeZone());
    const day = location ? getMoonDay(location, date) : null;
    const phase = day ? day.phase : moonPhase(new Date(`${date}T12:00:00Z`));

    const moon = el("div", "hero-moon");
    moon.append(
      createMoonDisc(phase.fraction, {
        size: 280,
        label: `${phase.name}, ${formatPercent(phase.illumination)} lit`,
        south: location ? location.lat < 0 : false,
        rise: true,
      })
    );
    result.replaceChildren(buildMain(date, day, phase), moon);
  }

  const controls = el("div", "controls");
  controls.append(
    createLocationPicker((chosen) => {
      location = chosen;
      showResult();
    }),
    dateInput
  );

  root.append(
    el("h1", "", "What time does the moon rise?"),
    el("p", "lead", "Moonrise and moonset times for any city and date, with the moon phase and the direction to look."),
    controls,
    result
  );
  showResult();
}
