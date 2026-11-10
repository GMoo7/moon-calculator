// Draws the moon as it really looks: the lit part follows the phase.
// Used in the header, on the Calculator page and in the 7-Day Table.

const SVG_NS = "http://www.w3.org/2000/svg";
const RADIUS = 100;

// Faint dark patches (the lunar "seas") so the disc looks like the moon.
const SEAS = [
  { x: -30, y: -35, r: 22 },
  { x: 22, y: -12, r: 28 },
  { x: -12, y: 38, r: 17 },
  { x: 48, y: 32, r: 13 },
  { x: -58, y: 6, r: 11 },
];

let discCount = 0; // gives every disc its own clip-path id

function svgEl(tag, attributes = {}) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, value);
  return node;
}

// Outline of the lit part. fraction: 0 = new moon, 0.5 = full, 1 = new again.
function litOutline(fraction) {
  const bend = Math.cos(2 * Math.PI * fraction); // 1 new, 0 quarter, -1 full
  const growing = fraction < 0.5;
  const edgeWidth = Math.abs(bend) * RADIUS;
  const edgeSweep = growing === bend > 0 ? 0 : 1;
  const limbSweep = growing ? 1 : 0;
  return (
    `M 0 ${-RADIUS} A ${RADIUS} ${RADIUS} 0 0 ${limbSweep} 0 ${RADIUS} ` +
    `A ${edgeWidth} ${RADIUS} 0 0 ${edgeSweep} 0 ${-RADIUS} Z`
  );
}

// options: size (pixels), label (spoken description, leave out if decorative),
// south (true in the southern hemisphere, where the moon looks turned upside down),
// rise (true to play the one-time "moonrise" entrance).
export function createMoonDisc(fraction, options = {}) {
  const { size = 24, label = "", south = false, rise = false } = options;
  const clipId = `moon-lit-${discCount++}`;

  const svg = svgEl("svg", { viewBox: "-100 -100 200 200", width: size, height: size });
  svg.setAttribute("class", rise ? "moon-disc rise" : "moon-disc");
  if (label) {
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", label);
  } else {
    svg.setAttribute("aria-hidden", "true");
  }

  const clip = svgEl("clipPath", { id: clipId });
  clip.append(svgEl("path", { d: litOutline(fraction) }));

  const lit = svgEl("g", { "clip-path": `url(#${clipId})` });
  lit.append(svgEl("circle", { r: RADIUS, class: "moon-lit" }));
  for (const sea of SEAS) {
    lit.append(svgEl("circle", { cx: sea.x, cy: sea.y, r: sea.r, class: "moon-sea" }));
  }

  const body = svgEl("g", south ? { transform: "rotate(180)" } : {});
  body.append(svgEl("circle", { r: RADIUS, class: "moon-dark" }), lit);
  svg.append(clip, body);
  return svg;
}
