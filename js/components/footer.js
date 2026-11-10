// The small text at the bottom of every page.

import { SITE_NAME } from "../config.js";
import { el } from "../lib/dom.js";

export function renderFooter(root) {
  const year = new Date().getFullYear();
  root.replaceChildren(
    el("p", "", `© ${year} ${SITE_NAME}. Calculated in your browser, accurate to within a few minutes.`)
  );
}
