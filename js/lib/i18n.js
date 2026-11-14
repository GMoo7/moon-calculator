// Language support. The page's language comes from <html lang="it"> (written
// by tools/build.mjs). loadLanguage() reads that language's text files once at
// start-up, and every other file reads the words from `text`.

// The words for the current page: { lang, ui, home, about }.
export const text = {};

export async function loadLanguage(lang) {
  const folder = `../content/${lang}`;
  const [ui, home, about] = await Promise.all([
    import(`${folder}/ui.js`),
    import(`${folder}/home.js`),
    import(`${folder}/about.js`),
  ]);
  Object.assign(text, { lang, ui: ui.ui, home: home.home, about: about.about });
}

// fill("Showing {name}", { name: "Rome" }) -> "Showing Rome"
export function fill(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}
