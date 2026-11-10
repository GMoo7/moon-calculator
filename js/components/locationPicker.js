// The city search box. Used on the Calculator and the 7-Day Table pages.
// The visitor can search for a city or use their device's location.

import { POPULAR_CITIES } from "../config.js";
import { el } from "../lib/dom.js";
import { searchCity } from "../lib/geocode.js";
import { loadLocation, saveLocation } from "../lib/storage.js";
import { browserTimeZone } from "../lib/time.js";

// onChange(location) is called every time the visitor picks a place.
export function createLocationPicker(onChange) {
  const box = el("div", "picker");
  const current = el("p", "current");
  const form = el("form", "row");
  const message = el("p", "message");
  const results = el("div", "results");

  const input = el("input");
  input.type = "search";
  input.placeholder = "Search for a city, e.g. Rome";
  input.required = true;
  input.setAttribute("aria-label", "City name");

  const searchButton = el("button", "btn", "Search");
  searchButton.type = "submit";
  const gpsButton = el("button", "btn btn-ghost", "Use my location");
  gpsButton.type = "button";

  function showCurrent(location) {
    current.textContent = location
      ? `Showing ${location.name}`
      : "Search for a city or use your location.";
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
    message.textContent = "Searching…";
    results.replaceChildren();
    try {
      const places = await searchCity(input.value.trim());
      message.textContent = places.length ? "Pick your place:" : "No city found. Check the spelling.";
      for (const place of places) {
        const button = el("button", "result", place.name);
        button.type = "button";
        button.addEventListener("click", () => choose(place));
        results.append(button);
      }
    } catch {
      message.textContent = "Could not reach the city search. Check your internet and try again.";
    }
  });

  gpsButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
      message.textContent = "Your browser cannot share its location. Search for a city instead.";
      return;
    }
    message.textContent = "Finding your location…";
    navigator.geolocation.getCurrentPosition(
      (position) =>
        choose({
          name: "My location",
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timezone: browserTimeZone(),
        }),
      () => {
        message.textContent = "Could not get your location. Search for a city instead.";
      }
    );
  });

  // One-tap cities, so a first-time visitor sees a result in one click.
  const popular = el("div", "popular");
  for (const city of POPULAR_CITIES) {
    const chip = el("button", "chip", city.name.split(",")[0]);
    chip.type = "button";
    chip.addEventListener("click", () => choose(city));
    popular.append(chip);
  }

  form.append(input, searchButton, gpsButton);
  box.append(form, popular, current, message, results);
  showCurrent(loadLocation());
  return box;
}
