// Moon maths: where the moon is, when it rises and sets, and its phase.
// Uses simple, well-known formulas. Results are accurate to a few minutes.

const RAD = Math.PI / 180;
const DAY_MS = 86400000;
const AXIS_TILT = RAD * 23.4397;      // tilt of the Earth's axis
const EARTH_RADIUS_KM = 6378.14;
const REFRACTION = RAD * 0.5667;      // air bends light, so the moon looks higher
const STEP_MS = 30 * 60 * 1000;       // we look at the sky every 30 minutes

const PHASES = [
  { name: "New Moon", emoji: "🌑" },
  { name: "Waxing Crescent", emoji: "🌒" },
  { name: "First Quarter", emoji: "🌓" },
  { name: "Waxing Gibbous", emoji: "🌔" },
  { name: "Full Moon", emoji: "🌕" },
  { name: "Waning Gibbous", emoji: "🌖" },
  { name: "Last Quarter", emoji: "🌗" },
  { name: "Waning Crescent", emoji: "🌘" },
];

// Days since 1 Jan 2000 12:00 UTC. All the formulas below use this number.
function daysSince2000(date) {
  return date.getTime() / DAY_MS - 10957.5;
}

// The moon's position among the stars (right ascension, declination),
// along the ecliptic (longitude) and its distance from Earth (km).
// Adds up the biggest wobbles in the moon's orbit (shortened Meeus series).
function moonCoords(d) {
  const sin = Math.sin;
  const cos = Math.cos;
  const meanLon = 218.3164477 + 13.17639648 * d;
  const D = RAD * (297.8501921 + 12.19074912 * d);       // angle between moon and sun
  const S = RAD * (357.5291092 + 0.98560028 * d);        // sun's anomaly
  const M = RAD * (134.9633964 + 13.06499295 * d);       // moon's anomaly
  const F = RAD * (93.272095 + 13.22935027 * d);         // distance from orbit node

  const lon = RAD * (meanLon + 6.288774 * sin(M) + 1.274027 * sin(2 * D - M) +
    0.658314 * sin(2 * D) + 0.213618 * sin(2 * M) - 0.185116 * sin(S) -
    0.114332 * sin(2 * F) + 0.058793 * sin(2 * D - 2 * M) +
    0.057066 * sin(2 * D - S - M) + 0.053322 * sin(2 * D + M) +
    0.045758 * sin(2 * D - S));
  const lat = RAD * (5.128122 * sin(F) + 0.280602 * sin(M + F) +
    0.277693 * sin(M - F) + 0.173238 * sin(2 * D - F) +
    0.055413 * sin(2 * D + F - M) + 0.046272 * sin(2 * D - F - M) +
    0.032573 * sin(2 * D + F) + 0.017198 * sin(2 * M + F));
  const distance = 385000.56 - 20905.355 * cos(M) - 3699.111 * cos(2 * D - M) -
    2955.968 * cos(2 * D) - 569.925 * cos(2 * M);

  const ra = Math.atan2(
    Math.sin(lon) * Math.cos(AXIS_TILT) - Math.tan(lat) * Math.sin(AXIS_TILT),
    Math.cos(lon)
  );
  const dec = Math.asin(
    Math.sin(lat) * Math.cos(AXIS_TILT) +
      Math.cos(lat) * Math.sin(AXIS_TILT) * Math.sin(lon)
  );
  return { lon, ra, dec, distance };
}

// Where the sun is along the ecliptic. Needed to work out the moon phase.
function sunLongitude(d) {
  const anomaly = RAD * (357.5291 + 0.98560028 * d);
  const centre =
    RAD *
    (1.9148 * Math.sin(anomaly) +
      0.02 * Math.sin(2 * anomaly) +
      0.0003 * Math.sin(3 * anomaly));
  return anomaly + centre + RAD * 102.9372 + Math.PI;
}

// How high the moon is (altitude, radians) and which way to look
// (bearing, degrees clockwise from north) at a given time and place.
// riseAltitude is how high the moon's centre must be to count as "risen".
// It depends on how close the moon is (a close moon looks shifted lower).
export function moonPosition(date, lat, lng) {
  const d = daysSince2000(date);
  const { ra, dec, distance } = moonCoords(d);
  const parallax = Math.asin(EARTH_RADIUS_KM / distance);
  const riseAltitude = 0.7275 * parallax - REFRACTION;
  const phi = RAD * lat;
  const hourAngle = RAD * (280.16 + 360.9856235 * d + lng) - ra;
  const altitude = Math.asin(
    Math.sin(phi) * Math.sin(dec) +
      Math.cos(phi) * Math.cos(dec) * Math.cos(hourAngle)
  );
  const fromSouth = Math.atan2(
    Math.sin(hourAngle),
    Math.cos(hourAngle) * Math.sin(phi) - Math.tan(dec) * Math.cos(phi)
  );
  return { altitude, riseAltitude, bearing: (fromSouth / RAD + 180 + 360) % 360 };
}

// Phase name, emoji and how much of the moon is lit (0 to 1).
export function moonPhase(date) {
  const d = daysSince2000(date);
  const angle = moonCoords(d).lon - sunLongitude(d);
  const fraction = (((angle / (2 * Math.PI)) % 1) + 1) % 1; // 0 = new, 0.5 = full
  const phase = PHASES[Math.round(fraction * 8) % 8];
  return { ...phase, fraction, illumination: (1 - Math.cos(angle)) / 2 };
}

// Height of the moon above the "rising line". Positive = risen.
function heightAboveHorizon(time, lat, lng) {
  const { altitude, riseAltitude } = moonPosition(new Date(time), lat, lng);
  return altitude - riseAltitude;
}

// Narrow down the exact moment the moon crosses the horizon
// between two times (we know it happens somewhere in between).
function pinpointCrossing(from, to, lat, lng) {
  const risingUp = heightAboveHorizon(from, lat, lng) < 0;
  let low = from;
  let high = to;
  for (let i = 0; i < 25; i++) {
    const middle = (low + high) / 2;
    const isUp = heightAboveHorizon(middle, lat, lng) >= 0;
    if (isUp === risingUp) high = middle;
    else low = middle;
  }
  return new Date((low + high) / 2);
}

// Find the moonrise and moonset between two moments (usually one local day).
// status is "ok", or "always-up" / "never-up" when neither happens (far north/south).
export function findRiseAndSet(start, end, lat, lng) {
  let rise = null;
  let set = null;
  let before = heightAboveHorizon(start.getTime(), lat, lng);
  const startedUp = before >= 0;

  for (let t = start.getTime() + STEP_MS; t < end.getTime() + STEP_MS; t += STEP_MS) {
    const now = Math.min(t, end.getTime());
    const after = heightAboveHorizon(now, lat, lng);
    if (before < 0 && after >= 0 && !rise) {
      rise = pinpointCrossing(now - STEP_MS, now, lat, lng);
    } else if (before >= 0 && after < 0 && !set) {
      set = pinpointCrossing(now - STEP_MS, now, lat, lng);
    }
    before = after;
  }

  let status = "ok";
  if (!rise && !set) status = startedUp ? "always-up" : "never-up";
  return { rise, set, status };
}
