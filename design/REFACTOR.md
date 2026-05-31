# Dougie theme — v2.5 refactor

This refactor evolves the **Default** variant into a calmer black-on-white editorial
look, fixes the heavy-sidebar proportions, and adds **per-site layout, palette, and
type controls** — all driven through the theme's existing shadcn-style HSL token
system, so `static/css/main.css` is **not** rewritten. The interactive prototype in
this project (`Dougie Theme.html`) is the canonical visual + behavioral spec.

> I can read your repo but not push to it. Commit these files to
> `doughatcher/dougie-theme@main` (or run them through your `.github/deploy`
> workflow). Everything below is layered/additive and reversible.

## Files changed / added

| File | Change |
|---|---|
| `static/css/dougie-system.css` | **NEW.** The whole refactor layer — token overrides (editorial palette), 6 accent palettes, 3 type pairings, sidebar↔topbar + homepage modes, embed/pagination/footer polish, Americana flagline. Loads after `main.css`. |
| `layouts/partials/head.html` | Loads Newsreader + IBM Plex (Sans/Mono) and `dougie-system.css` after `main.css`. |
| `layouts/_default/baseof.html` | Emits `data-identity / data-home / data-accent / data-font / data-flagline` on `<body>` from params; mounts `topbar.html`. |
| `layouts/partials/topbar.html` | **NEW.** Full-width top-header identity block (shown when `identity_layout = topbar`). |
| `layouts/index.html` | Homepage-composition wrapper (`home-feed/magazine/sectioned`), content-type chip, magazine grid split, and pagination + `Archive · RSS · JSON Feed` moved into a styled `.dougie-foot`. |
| `plugin.json` | Version 2.5.0; new configurable fields (below). |

## New plugin.json fields (Micro.blog → Plug-ins → Dougie → Settings)

| Param | Values | Default |
|---|---|---|
| `identity_layout` | `sidebar` \| `topbar` | `sidebar` |
| `home_layout` | `feed` \| `magazine` \| `sectioned` | `feed` |
| `accent` | `graphite` \| `emerald` \| `cobalt` \| `crimson` \| `amber` \| `violet` | `graphite` |
| `font_pairing` | `editorial` \| `sans` \| `literary` | `editorial` |
| `flagline` | boolean (red/white/blue top stripe) | off |
| `posts_per_page` | number | `20` |
| `show_footer_feeds` | boolean | on |

These join the existing per-site toggles (`theme_default`, `show_avatar`, `show_bio`,
`show_from_the_blog`, `show_publications_sidebar`, `share_strip_enabled`,
`consulting_cta_*`, `show_dark_mode_toggle`, etc.), so each property is just a
different settings profile on the same theme.

## Recommended per-property settings

- **doughatcher.com** — `identity_layout: sidebar`, `home_layout: feed`, `accent: graphite` (or `emerald` to keep the current brand cue), `font_pairing: editorial`, `theme_default: default`. Restrained, C-level.
- **leaning.blue** — `accent: cobalt`, `flagline: true`, `font_pairing: editorial`. Editorial Americana; consider `home_layout: magazine` for a front-page feel.
- **superterran.net** — `theme_default: starfield` (its existing space variant is the personal/culture flair), `accent: violet`, `home_layout: feed`.

## How the pieces map to the prototype

- **Sidebar ↔ top header** = `data-identity`; the rail and `topbar.html` are the same identity content in two chromes.
- **Feed / Magazine / Sectioned** = `data-home` wrapper classes on `index.html`.
- **6 palettes** = `data-accent` re-points `--primary`/`--ring` (light + dark) — the same token `main.css` already uses for links/buttons.
- **Type pairings** = `data-font` swaps `--font-serif/sans/mono`.
- **Proportion fix** = `--sidebar-width` pulled from 400px to 300px; timeline rows drop the heavy card chrome for hairline rules.

## Follow-ups (need a local Hugo build to verify — couldn't run it here)

1. **YouTube facade** — `dougie-system.css` ships styles for a `.dougie-yt` play-button facade. Point `static/js/link-previews.js` at that markup (or your existing embed path) so video posts render the card from the prototype. Reddit/news links already flow through `link-preview.html` + `.link-preview-card`, now restyled.
2. **Publications in the home feed** — the prototype mixes Publications into the timeline. Today they live under `categories/term.html`. If you want them inline on the homepage, include the `publications` category in the `index.html` paginator query (currently filtered to `Type in (post, posts)`).
3. **Build check** — run `hugo --minify` against Hugo 0.91 (your `min_version`) and confirm the new `{{ range $i, $p := … }}` index loop and the magazine `home-grid` close tag behave with 1 vs many posts.
4. **`screenshot.png`** — regenerate the plugin thumbnail from the new Default look before publishing to the official directory.
