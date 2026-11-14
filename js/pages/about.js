// ABOUT screen: plain-language explanation of how the calculator works,
// including a guide to the eight moon phases. The words live in js/content/<language>/about.js.

import { el } from "../lib/dom.js";
import { createMoonDisc } from "../components/moonDisc.js";
import { text } from "../lib/i18n.js";
import { PHASE_COUNT } from "../lib/moon.js";

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
  for (let index = 0; index < PHASE_COUNT; index++) {
    const item = el("li");
    const words = el("div");
    words.append(el("h3", "", text.ui.phaseNames[index]), el("p", "", text.about.phaseText[index]));
    item.append(createMoonDisc(index / PHASE_COUNT, { size: 52 }), words);
    list.append(item);
  }
  section.append(el("h2", "", text.about.phasesTitle), el("p", "", text.about.phasesIntro), list);
  return section;
}

export function renderAbout(root) {
  const page = el("div", "prose");
  page.append(el("h1", "", text.about.title));
  for (const item of text.about.intro) page.append(textSection(item));
  page.append(phaseGuide());
  for (const item of text.about.outro) page.append(textSection(item));
  root.append(page);
}
