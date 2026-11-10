// WEEK screen: a table with moonrise, moonset and phase for the next 7 days.

import { el } from "../lib/dom.js";
import { createLocationPicker } from "../components/locationPicker.js";
import { loadLocation } from "../lib/storage.js";
import { getMoonDay } from "../lib/moonDay.js";
import { addDays, todayString } from "../lib/time.js";
import { formatDate, formatTime } from "../lib/format.js";

const DAYS_SHOWN = 7;

// One table row: a list of cell texts.
function makeRow(cells, cellTag = "td") {
  const row = el("tr");
  for (const text of cells) row.append(el(cellTag, "", text));
  return row;
}

export function renderWeek(root) {
  let location = loadLocation();
  const box = el("section", "card");

  function showTable() {
    box.replaceChildren();
    if (!location) {
      box.append(el("p", "message", "Choose a place above to see the next 7 days."));
      return;
    }

    const zone = location.timezone;
    const table = el("table");
    table.append(makeRow(["Date", "Moonrise", "Moonset", "Phase"], "th"));

    const today = todayString(zone);
    for (let i = 0; i < DAYS_SHOWN; i++) {
      const date = addDays(today, i);
      const day = getMoonDay(location, date);
      table.append(
        makeRow([
          formatDate(date, false),
          day.rise ? formatTime(day.rise, zone) : "—",
          day.set ? formatTime(day.set, zone) : "—",
          `${day.phase.emoji} ${day.phase.name}`,
        ])
      );
    }

    const wrap = el("div", "table-wrap");
    wrap.append(table);
    box.append(
      el("h2", "", `Next 7 days · ${location.name}`),
      wrap,
      el("p", "note", `Times are in ${zone} time. A dash (—) means the moon does not rise or set that day.`)
    );
  }

  root.append(
    el("h1", "", "Moonrise times for the next 7 days"),
    createLocationPicker((chosen) => {
      location = chosen;
      showTable();
    }),
    box
  );
  showTable();
}
