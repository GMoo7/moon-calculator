// Moon maths: when the moon rises and sets, where it is, and its phase.
// The hard astronomy is done by the Astronomy Engine library (see js/vendor/).
// This file is the only place that talks to it, so the rest of the site
// never needs to know which library is used.

import {
  Body,
  Equator,
  Horizon,
  Illumination,
  MoonPhase,
  Observer,
  SearchRiseSet,
} from "../vendor/astronomy.min.js";

const DAY_MS = 86400000;
const RISE = 1;
const SET = -1;
// Moon centre this far below the horizon (degrees) still shows its top edge.
const TOP_EDGE_DEGREES = -0.25;

// The moon has eight named phases (names live in js/content/<language>/ui.js).
export const PHASE_COUNT = 8;

// Where the moon is in the sky, as azimuth (compass degrees, clockwise
// from north) and altitude (degrees above the horizon, air bending included).
function skyPosition(date, observer) {
  const sky = Equator(Body.Moon, date, observer, true, true);
  return Horizon(date, observer, sky.ra, sky.dec, "normal");
}

// Which way to look (bearing, degrees clockwise from north) at a time and place.
export function moonPosition(date, lat, lng) {
  return { bearing: skyPosition(date, new Observer(lat, lng, 0)).azimuth };
}

// Which of the eight phases it is (index), how far round the cycle (fraction)
// and how much of the moon is lit (illumination, 0 to 1).
export function moonPhase(date) {
  const fraction = MoonPhase(date) / 360; // 0 = new, 0.5 = full
  const index = Math.round(fraction * PHASE_COUNT) % PHASE_COUNT; // 0 = new moon ... 7
  const illumination = Illumination(Body.Moon, date).phase_fraction;
  return { index, fraction, illumination };
}

// The first time the moon crosses the horizon in this direction, or null
// if it does not happen before `end`.
function crossingBefore(direction, observer, start, end) {
  const days = (end - start) / DAY_MS;
  const found = SearchRiseSet(Body.Moon, observer, direction, start, days);
  return found && found.date < end ? found.date : null;
}

// Find the moonrise and moonset between two moments (usually one local day).
// status is "ok", or "always-up" / "never-up" when neither happens (far north/south).
export function findRiseAndSet(start, end, lat, lng) {
  const observer = new Observer(lat, lng, 0);
  const rise = crossingBefore(RISE, observer, start, end);
  const set = crossingBefore(SET, observer, start, end);

  let status = "ok";
  if (!rise && !set) {
    const startedUp = skyPosition(start, observer).altitude >= TOP_EDGE_DEGREES;
    status = startedUp ? "always-up" : "never-up";
  }
  return { rise, set, status };
}
