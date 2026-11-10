// Starts the site. Reads the web address (#/home, #/week, #/about)
// and draws the matching screen between the header and the footer.

import { DEFAULT_PAGE } from "./config.js";
import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { renderHome } from "./pages/home.js";
import { renderWeek } from "./pages/week.js";
import { renderAbout } from "./pages/about.js";

// One line per screen: the address name, and the function that draws it.
const PAGES = {
  home: renderHome,
  week: renderWeek,
  about: renderAbout,
};

function showPage() {
  const requested = location.hash.replace("#/", "");
  const pageId = PAGES[requested] ? requested : DEFAULT_PAGE;

  const main = document.getElementById("page");
  main.replaceChildren();
  PAGES[pageId](main);

  renderHeader(document.getElementById("header"), pageId);
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", showPage);
renderFooter(document.getElementById("footer"));
showPage();
