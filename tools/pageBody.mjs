// The words of each page as plain HTML. Search engines and visitors without
// JavaScript see this; when the page loads, js/pages/ replaces it with the live version.

export function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function textSection(item) {
  return `<section><h2>${esc(item.title)}</h2><p>${esc(item.text)}</p></section>`;
}

function homeBody({ home }) {
  const tips = home.tips.map((tip) => `<h3>${esc(tip.question)}</h3><p>${esc(tip.answer)}</p>`).join("");
  return (
    `<div class="stage"><h1>${esc(home.title)}</h1><p class="lead">${esc(home.lead)}</p></div>\n` +
    `    <section class="prose tips"><h2>${esc(home.tipsTitle)}</h2>${tips}</section>`
  );
}

function weekBody({ ui }) {
  return `<h1>${esc(ui.week.title)}</h1>`;
}

function aboutBody({ ui, about }) {
  const phases = about.phaseText
    .map((line, i) => `<li><div><h3>${esc(ui.phaseNames[i])}</h3><p>${esc(line)}</p></div></li>`)
    .join("");
  return (
    `<div class="prose"><h1>${esc(about.title)}</h1>` +
    about.intro.map(textSection).join("") +
    `<section><h2>${esc(about.phasesTitle)}</h2><p>${esc(about.phasesIntro)}</p>` +
    `<ul class="phase-guide">${phases}</ul></section>` +
    about.outro.map(textSection).join("") +
    `</div>`
  );
}

const BODIES = { home: homeBody, week: weekBody, about: aboutBody };

// pageId is "home", "week" or "about"; content holds that language's text files.
export function pageBody(pageId, content) {
  return BODIES[pageId](content);
}
