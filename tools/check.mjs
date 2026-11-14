// Checks the generated site for SEO mistakes. Run it after the build:
//   node tools/check.mjs   (or: npm run check)
// It reads the finished files, not the generator, so it catches real problems:
//  - every page has a canonical address that points to itself
//  - every hreflang address exists, and the pages point at each other (reciprocity)
//  - every page lists itself, all languages and x-default
//  - sitemap.xml lists exactly the pages that exist, with the same hreflang links
//  - every link inside the site points to a file that exists

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const site = JSON.parse(await fs.readFile(path.join(root, "tools", "site.json"), "utf8"));
const siteUrl = site.siteUrl.replace(/\/+$/, "");
const problems = [];
const fail = (message) => problems.push(message);

// "https://x/it/week/" -> the file on disk for that address.
const fileFor = (url) => path.join(root, url.slice(siteUrl.length), "index.html");
const exists = (file) => fs.access(file).then(() => true, () => false);

// Every page that should exist: [{ url, file }]
const expected = [{ url: `${siteUrl}/`, file: path.join(root, "index.html") }];
for (const lang of site.languages) {
  for (const page of site.pages) {
    const url = `${siteUrl}/${lang}/${page.path ? `${page.path}/` : ""}`;
    expected.push({ url, file: fileFor(url), lang });
  }
}

// The hreflang links of a page, as { code: href }.
function hreflangs(html) {
  const found = {};
  for (const match of html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)) {
    found[match[1]] = match[2];
  }
  return found;
}

const clusters = new Map(); // page url -> its hreflang links
for (const { url, file, lang } of expected) {
  if (!(await exists(file))) {
    fail(`missing file for ${url}`);
    continue;
  }
  const html = await fs.readFile(file, "utf8");
  const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
  if (canonical !== url) fail(`${url}: canonical is ${canonical}, expected itself`);
  if (lang && !html.includes(`<html lang="${lang}">`)) fail(`${url}: <html lang> is not "${lang}"`);

  const links = hreflangs(html);
  clusters.set(url, links);
  for (const code of [...site.languages, "x-default"]) {
    if (!links[code]) fail(`${url}: no hreflang="${code}"`);
  }
  if (lang && links[lang] !== url) fail(`${url}: hreflang="${lang}" does not point to itself`);

  // Links inside the site (not http, not #, not mailto) must lead to a real file.
  for (const match of html.matchAll(/(?:href|src)="([^"#:]+)"/g)) {
    if (match[1].startsWith("data")) continue;
    const target = path.resolve(path.dirname(file), match[1]);
    const asFile = match[1].endsWith("/") ? path.join(target, "index.html") : target;
    if (!(await exists(asFile))) fail(`${url}: link "${match[1]}" points to nothing`);
  }
}

// Reciprocity: if A lists B, then B must list A.
for (const [a, links] of clusters) {
  for (const [code, b] of Object.entries(links)) {
    const back = clusters.get(b);
    if (!back) fail(`${a}: hreflang="${code}" points to ${b}, which is not a page of this site`);
    else if (!Object.values(back).includes(a)) fail(`${a} lists ${b}, but ${b} does not list it back`);
  }
}

// The sitemap must match the pages and their hreflang links.
const sitemap = await fs.readFile(path.join(root, "sitemap.xml"), "utf8");
const blocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
const inSitemap = new Set();
for (const block of blocks) {
  const loc = block.match(/<loc>([^<]+)<\/loc>/)[1];
  inSitemap.add(loc);
  const found = {};
  for (const match of block.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)) found[match[1]] = match[2];
  if (JSON.stringify(found) !== JSON.stringify(clusters.get(loc) || {})) {
    fail(`sitemap.xml: hreflang links for ${loc} differ from the page's own tags`);
  }
}
for (const { url } of expected) if (!inSitemap.has(url)) fail(`sitemap.xml is missing ${url}`);
for (const loc of inSitemap) if (!clusters.has(loc)) fail(`sitemap.xml lists ${loc}, which does not exist`);

const robots = await fs.readFile(path.join(root, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) fail("robots.txt does not point to the sitemap");

if (problems.length) {
  console.log(`Found ${problems.length} problem(s):`);
  for (const problem of problems) console.log(" -", problem);
  process.exit(1);
}
console.log(`OK: ${expected.length} pages, ${site.languages.length} languages, hreflang reciprocal, sitemap matches.`);
