// Site-wide settings. Change a value here and every page updates.
// (Words and the site name live in js/content/<language>/.)

// Key used to remember the visitor's chosen location in their browser.
export const STORAGE_KEY = "moonrise-location";

// Free city search service (no account or key needed).
export const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search";

// One-tap cities shown under the search box. Add or remove lines freely.
// "id" must match a name in "cities" in each js/content/<language>/ui.js.
export const POPULAR_CITIES = [
  { id: "london", lat: 51.5072, lng: -0.1276, timezone: "Europe/London" },
  { id: "newYork", lat: 40.7128, lng: -74.006, timezone: "America/New_York" },
  { id: "losAngeles", lat: 34.0522, lng: -118.2437, timezone: "America/Los_Angeles" },
  { id: "saoPaulo", lat: -23.5505, lng: -46.6333, timezone: "America/Sao_Paulo" },
  { id: "dubai", lat: 25.2048, lng: 55.2708, timezone: "Asia/Dubai" },
  { id: "mumbai", lat: 19.076, lng: 72.8777, timezone: "Asia/Kolkata" },
  { id: "tokyo", lat: 35.6762, lng: 139.6503, timezone: "Asia/Tokyo" },
  { id: "sydney", lat: -33.8688, lng: 151.2093, timezone: "Australia/Sydney" },
];
