# Moonrise Calculator

A free website that shows what time the moon rises and sets for any city and
any date, plus the moon phase and the direction to look.

It is plain HTML, CSS and JavaScript. There is nothing to install and no
build step.

## Folder map

```
moon-calculator/
├── index.html            The one web page. It loads the styles and js/app.js.
├── RULES.md              The rules for working on this project. Read first.
├── css/
│   ├── base.css          Colours, fonts, basic text.
│   ├── layout.css        Header, main area and footer positions.
│   └── components.css    Cards, buttons, inputs, result numbers, table.
└── js/
    ├── app.js            Starts the site and shows the right screen.
    ├── config.js         Site name, menu and other settings in one place.
    ├── pages/            ONE FILE PER SCREEN
    │   ├── home.js       The calculator.
    │   ├── week.js       The 7-day table.
    │   └── about.js      How it works.
    ├── components/       Pieces shared by several screens (one copy each)
    │   ├── header.js     Top bar and menu.
    │   ├── footer.js     Bottom text.
    │   └── locationPicker.js   City search / "use my location" box.
    └── lib/              Helper code with no screen of its own
        ├── moon.js       The moon maths (position, rise, set, phase).
        ├── moonDay.js    Everything about the moon for one day and place.
        ├── time.js       Dates and time zones.
        ├── format.js     Turns numbers into readable text.
        ├── geocode.js    City name to coordinates.
        ├── storage.js    Remembers the chosen location in the browser.
        └── dom.js        Small helper for building page elements.
```

## How a screen gets shown

1. The address ends in `#/home`, `#/week` or `#/about`.
2. `js/app.js` finds that name in its `PAGES` list and calls the matching
   function from `js/pages/`.
3. The header and footer come from `js/components/` and are the same everywhere.

## Adding a new screen

1. Create `js/pages/yourpage.js` that exports `renderYourpage(root)`.
2. Add it to `PAGES` in `js/app.js`.
3. Add a menu entry to `NAV` in `js/config.js`.

## Running it on your computer

Browsers block JavaScript modules when you double-click `index.html`, so use a
tiny local server instead:

```
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Putting it online (GitHub Pages)

Repo **Settings → Pages → Build and deployment**: set Source to
"Deploy from a branch", choose `main` and `/ (root)`, then Save.
The site appears at `https://gmoo7.github.io/moon-calculator/`.
