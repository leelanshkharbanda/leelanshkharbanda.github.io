# Field Notes — variant A

A self-contained static portfolio variant for Leelansh Kharbanda.

## Run / view
Open `index.html` directly in a browser, or serve this directory from any
static host. There is no build, no package install and no server requirement.
All paths are relative, so the variant also works at
`/variants/field-notes/index.html`. `404.html` is the branded error sheet.

## Files
- `index.html` — cover, three case sheets, four-item index, thinking, about,
  contact, footer.
- `404.html` — branded "Page not filed." error sheet.
- `css/style.css` — all styling, both color schemes, reduced-motion and
  forced-colors handling.
- `js/main.js` — optional entrance fade; under 1 KB; content is visible
  without it.
- `BRIEF.md` — the design and content brief.
- `INSPIRATION.md` — screenshot research decode and non-copying statement.

## Properties
- Static only: no CDN, web fonts, frameworks, analytics or external requests.
  Every figure is inline SVG drawn for this variant.
- System serif display (Georgia) plus system monospace for annotations; no
  font files are fetched.
- Light/dark themes driven by `prefers-color-scheme`; no JS theme state.
- One `h1`, skip link, landmarks, named nav, 44 px targets, mono ≥14 px,
  body ≥16 px, visible focus, reduced-motion and forced-colors support.
- Verified content boundaries: no employer/title/completed degree/graduation
  year, no forks, no live radio, no GPU measurement, no hard scheme count.

## Content sources
Facts come from `research/github-identity.md` (public GitHub profile and
non-fork repositories, read 2026-11-25). Design principles come from the
research documents listed in `INSPIRATION.md`. No copy, assets, fonts or code
were taken from reference sites.
