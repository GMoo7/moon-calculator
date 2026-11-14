// HOME screen: pick a place, then step through the dates and watch the moon change.
// The moon stays in view beside the date arrows and the moonrise time.

import { el } from "../lib/dom.js";
import { createLocationPicker } from "../components/locationPicker.js";
import { animateMoonPhase, createMoonDisc } from "../components/moonDisc.js";
import { fill, text } from "../lib/i18n.js";
import { loadLocation } from "../lib/storage.js";
import { getMoonDay, riseShiftMinutes } from "../lib/moonDay.js";
import { moonPhase } from "../lib/moon.js";
import { addDays, browserTimeZone, todayString } from "../lib/time.js";
import {
  formatBearing,
  formatDate,
  formatShift,
  formatTime,
  litText,
  missingText,
  phaseLabel,
  phaseName,
} from "../lib/format.js";

// A small label with a value under it, e.g. "Moonset" / "17:12".
function fact(label, value) {
  const box = el("div", "fact");
  box.append(el("dt", "", label), el("dd", "", value));
  return box;
}

// The questions and answers under the result. Words come from js/content/<language>/home.js.
function buildTips() {
  const box = el("section", "prose tips");
  box.append(el("h2", "", text.home.tipsTitle));
  for (const tip of text.home.tips) box.append(el("h3", "", tip.question), el("p", "", tip.answer));
  return box;
}

export function renderHome(root) {
  const words = text.ui.home;
  let location = loadLocation();
  let disc = null; // the moon drawing: kept, so its phase can change smoothly
  let discIsSouth = null;

  const dateInput = el("input");
  dateInput.type = "date";
  dateInput.value = todayString(location?.timezone || browserTimeZone());
  dateInput.setAttribute("aria-label", words.dateLabel);
  dateInput.addEventListener("input", showResult);

  // A small "‹" or "›" button that moves the date by one day.
  function stepButton(label, symbol, days) {
    const button = el("button", "btn btn-ghost btn-step", symbol);
    button.type = "button";
    button.setAttribute("aria-label", label);
    button.addEventListener("click", () => {
      dateInput.value = addDays(dateInput.value || todayString(browserTimeZone()), days);
      showResult();
    });
    return button;
  }

  const dateField = el("div", "date-field");
  dateField.append(stepButton(words.previousDay, "‹", -1), dateInput, stepButton(words.nextDay, "›", 1));

  // The date arrows and the moon are never rebuilt, only the text changes.
  const resultText = el("div", "hero-text");
  const moonBox = el("div", "hero-moon");

  // The text on the left: either the moonrise, or (before a city is chosen) today's phase.
  function fillText(date, day, phase) {
    resultText.replaceChildren(
      el("p", "hero-date", formatDate(date)),
      el("p", "hero-place", location ? location.name : words.noCity)
    );

    if (!day) {
      resultText.append(
        el("p", "hero-label", words.moonPhase),
        el("p", "hero-time is-text", phaseName(phase)),
        el("p", "hero-sub", fill(words.chooseCity, { lit: litText(phase) }))
      );
      return;
    }

    const zone = location.timezone;
    const riseText = day.rise ? formatTime(day.rise, zone) : missingText(day.status, "noRise");
    const setText = day.set ? formatTime(day.set, zone) : missingText(day.status, "noSet");
    const facts = el("dl", "facts");
    facts.append(fact(words.moonset, setText), fact(words.moonPhase, phaseLabel(phase)));

    resultText.append(
      el("p", "hero-label", words.moonrise),
      el("p", day.rise ? "hero-time" : "hero-time is-text", riseText)
    );
    if (day.bearing !== null) {
      resultText.append(el("p", "hero-sub", fill(words.look, { bearing: formatBearing(day.bearing) })));
    }
    if (day.rise) {
      const shift = formatShift(riseShiftMinutes(location, date, day.rise));
      if (shift) resultText.append(el("p", "hero-sub", shift));
    }
    resultText.append(facts, el("p", "note", fill(words.timesIn, { zone })));
  }

  // First time (or when the hemisphere changes) draw the moon; after that, just change its phase.
  function showMoon(phase) {
    const isSouth = location ? location.lat < 0 : false;
    const label = phaseLabel(phase);
    if (!disc || isSouth !== discIsSouth) {
      disc = createMoonDisc(phase.fraction, { size: 280, label, south: isSouth, rise: true });
      discIsSouth = isSouth;
      moonBox.replaceChildren(disc);
    } else {
      disc.setAttribute("aria-label", label);
      animateMoonPhase(disc, phase.fraction);
    }
  }

  function showResult() {
    const date = dateInput.value || todayString(browserTimeZone());
    const day = location ? getMoonDay(location, date) : null;
    const phase = day ? day.phase : moonPhase(new Date(`${date}T12:00:00Z`));
    fillText(date, day, phase);
    showMoon(phase);
  }

  // Everything above the tips sits in one grid, so the moon stays beside the date arrows.
  const stage = el("div", "stage");
  stage.append(
    el("h1", "", text.home.title),
    el("p", "lead", text.home.lead),
    createLocationPicker((chosen) => {
      location = chosen;
      showResult();
    }),
    dateField,
    resultText,
    moonBox
  );
  root.append(stage, buildTips());
  showResult();
}
