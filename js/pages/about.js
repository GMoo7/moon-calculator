// ABOUT screen: plain-language explanation of how the calculator works.
// The text is fixed (written by us), so it is safe to set as HTML.

import { el } from "../lib/dom.js";

const CONTENT = `
  <h1>How the moonrise calculator works</h1>

  <section class="card">
    <h2>How is moonrise worked out?</h2>
    <p>The calculator follows the moon across the sky for your chosen day, using
    the same orbit maths astronomers use. Moonrise is the moment the top edge of
    the moon appears above a flat, open horizon. Moonset is the moment it
    disappears.</p>
  </section>

  <section class="card">
    <h2>Why does moonrise change every day?</h2>
    <p>The moon travels around the Earth in the same direction the Earth spins,
    so each day it rises about 50 minutes later than the day before. A full moon
    rises around sunset, and a new moon rises around sunrise.</p>
  </section>

  <section class="card">
    <h2>Why is there sometimes no moonrise?</h2>
    <p>Because the moon rises later each day, about once a month a calendar day
    is skipped: the moon rises just before midnight on one day and just after
    midnight on the next. Close to the poles the moon can also stay up, or stay
    down, for a whole day.</p>
  </section>

  <section class="card">
    <h2>How accurate is it?</h2>
    <p>We compared the results with a professional astronomy library for several
    cities. Times usually match within 2 to 3 minutes, and within about 8 minutes
    in the far north. Hills, buildings and weather change when you actually see
    the moon, so allow a little extra time.</p>
  </section>

  <section class="card">
    <h2>Privacy</h2>
    <p>Everything is calculated in your browser. Your chosen place is saved only
    on your own device. When you search for a city, the city name is sent to the
    free Open-Meteo search service so it can return coordinates.</p>
  </section>
`;

export function renderAbout(root) {
  const page = el("div");
  page.innerHTML = CONTENT;
  root.append(page);
}
