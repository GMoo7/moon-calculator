// City search: turns a name like "Rome" into coordinates and a time zone.
// Uses the free Open-Meteo geocoding service.

import { GEOCODE_URL } from "../config.js";

// Returns a list of { name, lat, lng, timezone }. Empty list = nothing found.
export async function searchCity(query) {
  const url = `${GEOCODE_URL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("City search failed");

  const data = await response.json();
  return (data.results || []).map((place) => ({
    name: [place.name, place.admin1, place.country].filter(Boolean).join(", "),
    lat: place.latitude,
    lng: place.longitude,
    timezone: place.timezone,
  }));
}
