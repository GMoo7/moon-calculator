// Site-wide settings. Change a value here and every page updates.

export const SITE_NAME = "Moonrise Calculator";
export const DEFAULT_PAGE = "home";

// Key used to remember the visitor's chosen location in their browser.
export const STORAGE_KEY = "moonrise-location";

// Free city search service (no account or key needed).
export const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search";

// One-tap cities shown under the search box. Add or remove lines freely.
export const POPULAR_CITIES = [
  { name: "London, United Kingdom", lat: 51.5072, lng: -0.1276, timezone: "Europe/London" },
  { name: "New York, United States", lat: 40.7128, lng: -74.006, timezone: "America/New_York" },
  { name: "Los Angeles, United States", lat: 34.0522, lng: -118.2437, timezone: "America/Los_Angeles" },
  { name: "São Paulo, Brazil", lat: -23.5505, lng: -46.6333, timezone: "America/Sao_Paulo" },
  { name: "Dubai, United Arab Emirates", lat: 25.2048, lng: 55.2708, timezone: "Asia/Dubai" },
  { name: "Mumbai, India", lat: 19.076, lng: 72.8777, timezone: "Asia/Kolkata" },
  { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503, timezone: "Asia/Tokyo" },
  { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093, timezone: "Australia/Sydney" },
];

// The menu. "id" must match a key in the PAGES list in js/app.js.
export const NAV = [
  { id: "home", label: "Calculator" },
  { id: "week", label: "7-Day Table" },
  { id: "about", label: "How it works" },
];
