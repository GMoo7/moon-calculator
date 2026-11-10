// ABOUT screen: plain-language explanation of how the calculator works,
// including a guide to the eight moon phases. The words live in js/content/aboutText.js.

import { el } from "../lib/dom.js";
import { createMoonDisc } from "../components/moonDisc.js";
import { PHASES } from "../lib/moon.js";
import {
  ABOUT_INTRO,
  ABOUT_OUTRO,
  ABOUT_TITLE,
  PHASES_INTRO,
  PHASES_TITLE,
  PHASE_TEXT,
} from "../content/aboutText.js";

// A heading with a paragraph under it.
function textSection(item) {
  const section = el("section");
  section.append(el("h2", "", item.title), el("p", "", item.text));
  return section;
}

// The list of eight phases: a small moon drawing, the name and a description.
function phaseGuide() {
  const section = el("section");
  const list = el("ul", "phase-guide");
  PHASES.forEach((phase, index) => {
    const item = el("li");
    const words = el("div");
    words.append(el("h3", "", phase.name), el("p", "", PHASE_TEXT[index]));
    item.append(createMoonDisc(index / PHASES.length, { size: 52 }), words);
    list.append(item);
  });
  section.append(el("h2", "", PHASES_TITLE), el("p", "", PHASES_INTRO), list);
  return section;
}

export function renderAbout(root) {
  const page = el("div", "prose");
  page.append(el("h1", "", ABOUT_TITLE));
  for (const item of ABOUT_INTRO) page.append(textSection(item));
  page.append(phaseGuide());
  for (const item of ABOUT_OUTRO) page.append(textSection(item));
  root.append(page);
}
