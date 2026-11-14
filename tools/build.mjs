// The site generator. Run it with:  node tools/build.mjs   (or: npm run build)
//
// It reads tools/site.json and the text in js/content/<language>/, then writes:
//   /<language>/index.html, /<language>/week/index.html, /<language>/about/index.html
//   /index.html (language chooser), /404.html, /sitemap.xml, /robots.txt
//   /CNAME (only when siteUrl is your own domain, not github.io)
// Run it again whenever you change the text, the languages or the domain.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { pageHtml } from "./pageHtml.mjs";
import { notFoundHtml, robotsTxt, rootHtml, sitemapXml } from "./seoFiles.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function loadSite() {
  const site = JSON.parse(await fs.readFile(path.join(root, "tools", "site.json"), "utf8"));
  site.siteUrl = site.siteUrl.replace(/\/+$/, "");
  if (!site.languages.includes(site.defaultLanguage)) {
    throw new Error(`defaultLanguage "${site.defaultLanguage}" must be one of the languages`);
  }
  return site;
}

// Reads one language's four text files: { ui, meta, home, about }.
async function loadContent(lang) {
  const content = {};
  for (const name of ["ui", "meta", "home", "about"]) {
    const file = pathToFileURL(path.join(root, "js", "content", lang, `${name}.js`)).href;
    content[name] = (await import(file))[name];
  }
  return content;
}

async function write(relativePath, text) {
  const file = path.join(root, relativePath);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, text);
  console.log("wrote", relativePath);
}

const site = await loadSite();
const contents = {};
for (const lang of site.languages) contents[lang] = await loadContent(lang);
const year = new Date().getFullYear();

for (const lang of site.languages) {
  for (const page of site.pages) {
    const folder = path.join(lang, page.path, "index.html");
    await write(folder, pageHtml({ site, lang, page, contents, year }));
  }
}
await write("index.html", rootHtml({ site, contents }));
await write("404.html", notFoundHtml({ site, contents }));
await write("sitemap.xml", sitemapXml(site));
await write("robots.txt", robotsTxt(site));

const host = new URL(site.siteUrl).hostname;
if (!host.endsWith("github.io")) await write("CNAME", `${host}\n`);
console.log(`\nDone. Site address used in all tags: ${site.siteUrl}`);
