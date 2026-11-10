// Site-wide settings. Change a value here and every page updates.

export const SITE_NAME = "Moonrise Calculator";
export const DEFAULT_PAGE = "home";

// Key used to remember the visitor's chosen location in their browser.
export const STORAGE_KEY = "moonrise-location";

// Free city search service (no account or key needed).
export const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search";

// The menu. "id" must match a key in the PAGES list in js/app.js.
export const NAV = [
  { id: "home", label: "Calculator" },
  { id: "week", label: "7-Day Table" },
  { id: "about", label: "How it works" },
];
