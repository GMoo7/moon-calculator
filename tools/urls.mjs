// Address helpers for the generator. site.siteUrl never ends with a slash.

// "https://example.com/it/week/" for language "it" and page path "week".
export function pageUrl(site, lang, path) {
  return `${site.siteUrl}/${lang}/${path ? `${path}/` : ""}`;
}

export function rootUrl(site) {
  return `${site.siteUrl}/`;
}

// Every language version of one page, plus "x-default" (what to show people whose
// language we do not have): [{ hreflang, href }]. The home page falls back to the
// language chooser at the root; other pages fall back to the default language.
export function alternates(site, page) {
  const list = site.languages.map((lang) => ({ hreflang: lang, href: pageUrl(site, lang, page.path) }));
  const fallback = page.id === "home" ? rootUrl(site) : pageUrl(site, site.defaultLanguage, page.path);
  list.push({ hreflang: "x-default", href: fallback });
  return list;
}

// Links inside the site are relative ("../../it/"), so they work on any host or
// folder. A page at /en/ is 1 folder deep, /en/week/ is 2, the root is 0.
export function prefixFor(page) {
  return page ? "../".repeat(page.path ? 2 : 1) : "";
}

// Link from one page to the page `target` in language `lang`.
export function relativeLink(prefix, lang, target) {
  return `${prefix}${lang}/${target.path ? `${target.path}/` : ""}`;
}

// "/moon-calculator" for https://x.github.io/moon-calculator, "" for a plain domain.
export function basePath(site) {
  return new URL(site.siteUrl).pathname.replace(/\/+$/, "");
}
