// What search engines and the page head need (English): titles, descriptions,
// the language's own name. Used by tools/build.mjs, not by the browser.

export const meta = {
  languageName: "English",
  ogLocale: "en_US",
  languageMenu: "Language",
  chooseLanguage: "Choose your language",
  tagline: "Moonrise and moonset times for any city and date.",
  noscript: "This calculator needs JavaScript. Please turn it on and reload.",
  notFound: {
    title: "Page not found",
    text: "We could not find that page.",
    link: "Go to the start page",
  },
  pages: {
    home: {
      title: "Moonrise Calculator – What time does the moon rise tonight?",
      description:
        "Free moonrise and moonset calculator. See what time the moon rises today, tonight or on any date for any city, plus the moon phase and which direction to look.",
    },
    week: {
      title: "Moonrise Times for the Next 7 Days – Moonrise Calculator",
      description:
        "Moonrise, moonset and moon phase for the next 7 days in any city, in one easy table. Plan when to watch the moon rise this week.",
    },
    about: {
      title: "How Moonrise Is Calculated, and the 8 Moon Phases – Moonrise Calculator",
      description:
        "Learn why the moon rises about 50 minutes later every day, why some days have no moonrise, and what the eight moon phases look like.",
    },
  },
};
