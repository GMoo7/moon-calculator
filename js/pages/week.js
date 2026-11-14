// WEEK screen: a table with moonrise, moonset and phase for the next 7 days.

import { el } from "../lib/dom.js";
import { createLocationPicker } from "../components/locationPicker.js";
import { createMoonDisc } from "../components/moonDisc.js";
import { fill, text } from "../lib/i18n.js";
import { loadLocation } from "../lib/storage.js";
import { getMoonDay } from "../lib/moonDay.js";
import { addDays, todayString } from "../lib/time.js";
import { formatDate, formatPercent, formatTime, phaseName } from "../lib/format.js";

const DAYS_SHOWN = 7;

// One table row. Each cell is plain text or a ready-made element.
function makeRow(cells, cellTag = "td") {
  const row = el("tr");
  for (const content of cells) {
    const cell = el(cellTag);
    cell.append(content);
    row.append(cell);
  }
  return row;
}

// The phase column: a small drawing of the moon, its name and how much is lit.
function phaseCell(phase, south) {
  const box = el("div", "phase-cell");
  box.append(
    createMoonDisc(phase.fraction, { size: 24, south }),
    el("span", "phase-name", phaseName(phase)),
    el("span", "dim", formatPercent(phase.illumination))
  );
  return box;
}

export function renderWeek(root) {
  const words = text.ui.week;
  let location = loadLocation();
  const box = el("section", "week");

  function showTable() {
    box.replaceChildren();
    if (!location) {
      box.append(el("p", "message", words.chooseCity));
      return;
    }

    const zone = location.timezone;
    const table = el("table");
    table.append(makeRow(words.columns, "th"));

    const today = todayString(zone);
    for (let i = 0; i < DAYS_SHOWN; i++) {
      const date = addDays(today, i);
      const day = getMoonDay(location, date);
      const row = makeRow([
        formatDate(date, false),
        day.rise ? formatTime(day.rise, zone) : "—",
        day.set ? formatTime(day.set, zone) : "—",
        phaseCell(day.phase, location.lat < 0),
      ]);
      if (i === 0) row.className = "today";
      table.append(row);
    }

    const wrap = el("div", "table-wrap");
    wrap.append(table);
    box.append(el("h2", "", location.name), wrap, el("p", "note", fill(words.note, { zone })));
  }

  root.append(
    el("h1", "", words.title),
    createLocationPicker((chosen) => {
      location = chosen;
      showTable();
    }),
    box
  );
  showTable();
}
