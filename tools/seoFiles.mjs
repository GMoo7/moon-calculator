// The files that are not ordinary pages: sitemap.xml, robots.txt, the language
// chooser at the site root, and the 404 page.

import { esc } from "./pageBody.mjs";
import { NOTE, headHtml } from "./pageHtml.mjs";
import { alternates, basePath, pageUrl, rootUrl } from "./urls.mjs";

// One <url> block: the page address plus every language version (hreflang).
function urlBlock(loc, page, site) {
  const links = alternates(site, page)
    .map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`)
    .join("\n");
  return `  <url>\n    <loc>${loc}</loc>\n${links}\n  </url>`;
}

// The sitemap lists the root chooser and every language version of every page.
export function sitemapXml(site) {
  const home = site.pages.find((page) => page.id === "home");
  const blocks = [urlBlock(rootUrl(site), home, site)];
  for (const page of site.pages) {
    for (const lang of site.languages) blocks.push(urlBlock(pageUrl(site, lang, page.path), page, site));
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${blocks.join("\n")}
</urlset>
`;
}

export function robotsTxt(site) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${site.siteUrl}/sitemap.xml\n`;
}

// The page at the site root: a plain list of languages. Old links such as /#/week
// are sent on to the right language. Everyone else just sees the list.
export function rootHtml({ site, contents }) {
  const home = site.pages.find((page) => page.id === "home");
  const main = contents[site.defaultLanguage];
  const items = site.languages
    .map((lang) => {
      const { meta } = contents[lang];
      return `<li><a href="${lang}/" hreflang="${lang}" lang="${lang}"><strong>${esc(meta.languageName)}</strong></a><p lang="${lang}">${esc(meta.tagline)}</p></li>`;
    })
    .join("\n        ");
  const heading = site.languages.map((lang) => esc(contents[lang].meta.chooseLanguage)).join(" · ");
  const pages = JSON.stringify(Object.fromEntries(site.pages.map((page) => [page.id, page.path ? `${page.path}/` : ""])));
  const head = headHtml({
    prefix: "",
    title: `${main.ui.siteName} – ${main.meta.tagline}`,
    description: main.meta.pages.home.description,
    canonical: rootUrl(site),
    alternates: alternates(site, home),
    siteName: main.ui.siteName,
    ogLocale: main.meta.ogLocale,
    otherLocales: site.languages.filter((code) => code !== site.defaultLanguage).map((code) => contents[code].meta.ogLocale),
  });

  return `<!DOCTYPE html>
${NOTE}
<html lang="${site.defaultLanguage}">
<head>
${head}
</head>
<body>
  <header id="header"><div class="bar"><span class="logo">${esc(main.ui.siteName)}</span></div></header>
  <main id="page">
    <div class="prose">
      <h1>${heading}</h1>
      <ul class="language-list">
        ${items}
      </ul>
    </div>
  </main>
  <script>
    // Old links like /#/week go to the visitor's language (or the default).
    (function () {
      var pages = ${pages};
      var languages = ${JSON.stringify(site.languages)};
      var wanted = location.hash.replace("#/", "");
      if (!pages.hasOwnProperty(wanted)) return;
      var preferred = (navigator.languages || [navigator.language]).map(function (code) { return String(code).slice(0, 2); });
      var lang = preferred.filter(function (code) { return languages.indexOf(code) > -1; })[0] || "${site.defaultLanguage}";
      location.replace(lang + "/" + pages[wanted]);
    })();
  </script>
</body>
</html>
`;
}

// GitHub Pages shows this for any address that does not exist. It uses full paths
// for its styles because it can appear at any depth. Not listed in the sitemap.
export function notFoundHtml({ site, contents }) {
  const lang = site.defaultLanguage;
  const { meta, ui } = contents[lang];
  const base = basePath(site);
  const head = headHtml({
    prefix: `${base}/`,
    title: `${meta.notFound.title} – ${ui.siteName}`,
    description: meta.notFound.text,
    robots: "noindex",
    siteName: ui.siteName,
    ogLocale: meta.ogLocale,
  });
  return `<!DOCTYPE html>
${NOTE}
<html lang="${lang}">
<head>
${head}
</head>
<body>
  <main id="page">
    <div class="prose">
      <h1>${esc(meta.notFound.title)}</h1>
      <p>${esc(meta.notFound.text)}</p>
      <p><a href="${base}/">${esc(meta.notFound.link)}</a></p>
    </div>
  </main>
</body>
</html>
`;
}
