// The top bar with the site name and menu. Shown on every page.

import { NAV, SITE_NAME } from "../config.js";
import { el } from "../lib/dom.js";

// activeId is the page being shown, so its menu link can be highlighted.
export function renderHeader(root, activeId) {
  const bar = el("div", "bar");

  const logo = el("a", "logo", `🌙 ${SITE_NAME}`);
  logo.href = "#/home";

  const menu = el("nav", "menu");
  for (const item of NAV) {
    const link = el("a", item.id === activeId ? "active" : "", item.label);
    link.href = `#/${item.id}`;
    menu.append(link);
  }

  bar.append(logo, menu);
  root.replaceChildren(bar);
}
