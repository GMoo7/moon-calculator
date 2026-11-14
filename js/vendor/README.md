# js/vendor/

Code written by other people, copied in unchanged. **Do not edit these files.**

| File | What it is |
| --- | --- |
| `astronomy.min.js` | Only the parts of [Astronomy Engine](https://github.com/cosinekitty/astronomy) 2.1.19 this site uses (moonrise, moonset, phase, position). One long line because it is minified. |
| `LICENSE-astronomy-engine-MIT.txt` | Its licence. It must stay next to the code. |

## How to rebuild `astronomy.min.js`

You only need this to update the library. The site itself has no build step.

```
mkdir tmp && cd tmp && npm init -y && npm install astronomy-engine esbuild
echo 'export { Body, Observer, SearchRiseSet, MoonPhase, Illumination, Equator, Horizon } from "astronomy-engine";' > entry.mjs
npx esbuild entry.mjs --bundle --minify --format=esm --legal-comments=none --outfile=astronomy.min.js
```

Copy the new file over the old one and re-run the accuracy check described in the main `README.md`.
