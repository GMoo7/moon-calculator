// Remembers the visitor's chosen location in their own browser,
// so they do not have to search again on every page.

import { STORAGE_KEY } from "../config.js";

export function saveLocation(location) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
  } catch {
    // Storage can be blocked (private mode). The site still works without it.
  }
}

// Returns the saved location, or null if there is none.
export function loadLocation() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}
