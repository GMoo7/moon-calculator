// The city search box. Used on the Calculator and the 7-Day Table pages.
// The visitor can search for a city or use their device's location.

import { POPULAR_CITIES } from "../config.js";
import { el } from "../lib/dom.js";
import { fill, text } from "../lib/i18n.js";
import { searchCity } from "../lib/geocode.js";
import { loadLocation, saveLocation } from "../lib/storage.js";
import { browserTimeZone } from "../lib/time.js";

// onChange(location) is called every time the visitor picks a place.
export function createLocationPicker(onChange) {
  const words = text.ui.picker;
  const box = el("div", "picker");
  const current = el("p", "current");
  const form = el("form", "row");
  const message = el("p", "message");
  const results = el("div", "results");

  const input = el("input");
  input.type = "search";
  input.placeholder = words.placeholder;
  input.required = true;
  input.setAttribute("aria-label", words.inputLabel);

  const searchButton = el("button", "btn", words.search);
  searchButton.type = "submit";
  const gpsButton = el("button", "btn btn-ghost", words.useMyLocation);
  gpsButton.type = "button";

  function showCurrent(location) {
    current.textContent = location ? fill(words.showing, { name: location.name }) : words.prompt;
  }

  function choose(location) {
    saveLocation(location);
    showCurrent(location);
    results.replaceChildren();
    message.textContent = "";
    onChange(location);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    message.textContent = words.searching;
    results.replaceChildren();
    try {
      const places = await searchCity(input.value.trim());
      message.textContent = places.length ? words.pickPlace : words.notFound;
      for (const place of places) {
        const button = el("button", "result", place.name);
        button.type = "button";
        button.addEventListener("click", () => choose(place));
        results.append(button);
      }
    } catch {
      message.textContent = words.searchFailed;
    }
  });

  gpsButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
      message.textContent = words.noGeolocation;
      return;
    }
    message.textContent = words.finding;
    navigator.geolocation.getCurrentPosition(
      (position) =>
        choose({
          name: words.myLocation,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timezone: browserTimeZone(),
        }),
      () => {
        message.textContent = words.locationFailed;
      }
    );
  });

  // One-tap cities, so a first-time visitor sees a result in one click.
  const popular = el("div", "popular");
  for (const city of POPULAR_CITIES) {
    const name = text.ui.cities[city.id];
    const chip = el("button", "chip", name.split(",")[0]);
    chip.type = "button";
    chip.addEventListener("click", () => choose({ name, lat: city.lat, lng: city.lng, timezone: city.timezone }));
    popular.append(chip);
  }

  form.append(input, searchButton, gpsButton);
  box.append(form, popular, current, message, results);
  showCurrent(loadLocation());
  return box;
}
