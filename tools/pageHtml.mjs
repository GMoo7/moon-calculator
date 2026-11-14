// Builds the complete HTML of one page: head (title, canonical, hreflang, social tags),
// header with menu and language links, readable page text, footer, and the script.

import { esc, pageBody } from "./pageBody.mjs";
import { alternates, pageUrl, prefixFor, relativeLink } from "./urls.mjs";

export const NOTE = "<!-- Written by tools/build.mjs from js/content/. Do not edit by hand: change the source and run the build. -->";
const FAVICON =
  "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2246%22 fill=%22%23efe9d6%22/><circle cx=%2270%22 cy=%2242%22 r=%2240%22 fill=%22%230c1022%22/></svg>";
const STYLES = ["base", "layout", "components", "pages"];

// Everything between <head> and </head>. `info` describes the page:
// { prefix, lang, ogLocale, title, description, canonical, alternates, others, siteName, robots }
export function headHtml(info) {
  const lines = [
    `<meta charset="utf-8">`,
    `<meta name="viewport" content="width=device-width, initial-scale=1">`,
    `<title>${esc(info.title)}</title>`,
    `<meta name="description" content="${esc(info.description)}">`,
    `<meta name="theme-color" content="#0c1022">`,
  ];
  if (info.robots) lines.push(`<meta name="robots" content="${info.robots}">`);
  if (info.canonical) lines.push(`<link rel="canonical" href="${info.canonical}">`);
  for (const alt of info.alternates || []) {
    lines.push(`<link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}">`);
  }
  if (info.canonical) {
    lines.push(
      `<meta property="og:type" content="website">`,
      `<meta property="og:site_name" content="${esc(info.siteName)}">`,
      `<meta property="og:title" content="${esc(info.title)}">`,
      `<meta property="og:description" content="${esc(info.description)}">`,
      `<meta property="og:url" content="${info.canonical}">`,
      `<meta property="og:locale" content="${info.ogLocale}">`
    );
    for (const locale of info.otherLocales || []) {
      lines.push(`<meta property="og:locale:alternate" content="${locale}">`);
    }
  }
  lines.push(
    `<link rel="icon" href="${FAVICON}">`,
    `<link rel="preload" href="${info.prefix}fonts/bricolage-grotesque-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>`,
    ...STYLES.map((name) => `<link rel="stylesheet" href="${info.prefix}css/${name}.css">`)
  );
  return lines.map((line) => `  ${line}`).join("\n");
}

// The top bar: logo, menu, and links to the same page in the other languages.
function headerHtml({ prefix, site, lang, page, contents }) {
  const { ui, meta } = contents[lang];
  const menu = site.pages
    .map((target) => {
      const active = target.id === page.id ? ` class="active" aria-current="page"` : "";
      return `<a href="${relativeLink(prefix, lang, target)}"${active}>${esc(ui.menu[target.id])}</a>`;
    })
    .join("\n        ");
  const languages = site.languages
    .map((code) => {
      const name = esc(contents[code].meta.languageName);
      if (code === lang) return `<span aria-current="true">${name}</span>`;
      return `<a href="${relativeLink(prefix, code, page)}" hreflang="${code}" lang="${code}">${name}</a>`;
    })
    .join("\n        ");
  return `<header id="header">
    <div class="bar">
      <a class="logo" href="${prefix}${lang}/"><span class="logo-moon" aria-hidden="true"></span>${esc(ui.siteName)}</a>
      <nav class="menu">
        ${menu}
      </nav>
      <nav class="langs" aria-label="${esc(meta.languageMenu)}">
        ${languages}
      </nav>
    </div>
  </header>`;
}

// One page in one language. `contents[lang]` = { ui, meta, home, about }.
export function pageHtml({ site, lang, page, contents, year }) {
  const content = contents[lang];
  const prefix = prefixFor(page);
  const info = content.meta.pages[page.id];
  const head = headHtml({
    prefix,
    title: info.title,
    description: info.description,
    canonical: pageUrl(site, lang, page.path),
    alternates: alternates(site, page),
    siteName: content.ui.siteName,
    ogLocale: content.meta.ogLocale,
    otherLocales: site.languages.filter((code) => code !== lang).map((code) => contents[code].meta.ogLocale),
  });

  return `<!DOCTYPE html>
${NOTE}
<html lang="${lang}">
<head>
${head}
</head>
<body data-page="${page.id}">
  ${headerHtml({ prefix, site, lang, page, contents })}
  <main id="page">
    ${pageBody(page.id, content)}
    <noscript>${esc(content.meta.noscript)}</noscript>
  </main>
  <footer id="footer"><p>© ${year} ${esc(content.ui.siteName)}. ${esc(content.ui.footer)}</p></footer>
  <script type="module" src="${prefix}js/app.js"></script>
</body>
</html>
`;
}
