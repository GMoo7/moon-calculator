// Every short label, button and message on the site (English).
// {name}, {zone} and similar are filled in by the code: keep them as they are.

export const ui = {
  siteName: "Moonrise Calculator",
  menu: { home: "Calculator", week: "7-Day Table", about: "How it works" },
  footer: "Calculated in your browser, accurate to within a couple of minutes.",

  picker: {
    placeholder: "Search for a city, e.g. Rome",
    inputLabel: "City name",
    search: "Search",
    useMyLocation: "Use my location",
    showing: "Showing {name}",
    prompt: "Search for a city or use your location.",
    searching: "Searching…",
    pickPlace: "Pick your place:",
    notFound: "No city found. Check the spelling.",
    searchFailed: "Could not reach the city search. Check your internet and try again.",
    noGeolocation: "Your browser cannot share its location. Search for a city instead.",
    finding: "Finding your location…",
    locationFailed: "Could not get your location. Search for a city instead.",
    myLocation: "My location",
  },

  home: {
    dateLabel: "Date",
    previousDay: "Previous day",
    nextDay: "Next day",
    noCity: "No city chosen yet",
    moonrise: "Moonrise",
    moonset: "Moonset",
    moonPhase: "Moon phase",
    lit: "{percent} lit",
    phaseLabel: "{name}, {percent} lit",
    chooseCity: "{lit}. Choose a city to see when the moon rises.",
    look: "Look {bearing} on the horizon.",
    timesIn: "Times are in {zone} time.",
  },

  week: {
    title: "Moonrise times for the next 7 days",
    chooseCity: "Choose a city above to see the next 7 days.",
    columns: ["Date", "Moonrise", "Moonset", "Phase"],
    note: "Times are in {zone} time. A dash (—) means the moon does not rise or set that day.",
  },

  shift: {
    same: "About the same time as the day before.",
    laterOne: "1 minute later than the day before.",
    laterMany: "{n} minutes later than the day before.",
    earlierOne: "1 minute earlier than the day before.",
    earlierMany: "{n} minutes earlier than the day before.",
  },

  missing: {
    alwaysUp: "Moon stays up all day",
    neverUp: "Moon stays down all day",
    noRise: "No moonrise this day",
    noSet: "No moonset this day",
  },

  // North, north-east, east ... in this order.
  compass: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"],

  // The eight phases, starting at the new moon.
  phaseNames: [
    "New Moon",
    "Waxing Crescent",
    "First Quarter",
    "Waxing Gibbous",
    "Full Moon",
    "Waning Gibbous",
    "Last Quarter",
    "Waning Crescent",
  ],

  // Names of the one-tap cities. Coordinates live in js/config.js.
  cities: {
    london: "London, United Kingdom",
    newYork: "New York, United States",
    losAngeles: "Los Angeles, United States",
    saoPaulo: "São Paulo, Brazil",
    dubai: "Dubai, United Arab Emirates",
    mumbai: "Mumbai, India",
    tokyo: "Tokyo, Japan",
    sydney: "Sydney, Australia",
  },
};
