// Starts the site. Each page is its own real address (/en/, /it/week/ ...) written
// by tools/build.mjs, which sets <html lang> and <body data-page>. This file reads
// those two values, loads the language and draws the matching screen.

import { createMoonDisc } from "./components/moonDisc.js";
import { loadLanguage } from "./lib/i18n.js";
import { renderHome } from "./pages/home.js";
import { renderWeek } from "./pages/week.js";
import { renderAbout } from "./pages/about.js";

// One line per screen: the page name, and the function that draws it.
const PAGES = {
  home: renderHome,
  week: renderWeek,
  about: renderAbout,
};

await loadLanguage(document.documentElement.lang);

// The little moon next to the site name in the header.
document.querySelector(".logo-moon")?.append(createMoonDisc(0.15, { size: 26 }));

const main = document.getElementById("page");
main.replaceChildren(); // removes the plain text the page shipped with for search engines
PAGES[document.body.dataset.page](main);
