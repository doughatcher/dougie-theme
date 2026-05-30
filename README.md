# Dougie — micro.blog theme

A versatile Hugo theme for [micro.blog](https://micro.blog) hosted sites.

Adapts to your needs: microblog timeline, long-form publication, or one-page portfolio. Configure branding, theme variant, social links, and CTA copy through per-site plugin settings — no code changes needed when reusing across multiple sites on the same account.

## Variants

- **default** — clean, editorial-leaning, light background. Suited to publication-style sites with a /blog section.
- **starfield** — animated dark theme. Suited to personal/social-feed sites where the timeline is the focus.

Switch via the `theme_variant` setting under the plugin's per-site config in micro.blog.

## Install

In your micro.blog account, install this plugin from the plugin directory (if listed) or via GitHub URL:

```
https://github.com/doughatcher/dougie-theme
```

Select the plugin as your active theme. Configure per-site settings in the plugin's settings panel (`/account/plugins/dougie-theme`).

## Per-site configuration

All of these are set in the micro.blog plugin settings UI; they vary independently per installed site:

| Setting | Type | Purpose |
|---|---|---|
| `theme_variant` | select | Default or Starfield |
| `site_bio` | text | One-line tagline below title |
| `profile_image_url` | text | Header profile / brand image |
| `consulting_cta_enabled` | bool | Show CTA at bottom of /blog/ posts |
| `consulting_cta_text` | textarea | CTA body copy |
| `consulting_cta_url` | text | CTA destination link |
| `social_links_json` | textarea | Footer social links (JSON array) |
| `share_strip_enabled` | bool | LinkedIn/X/Bluesky/etc share row on single posts |

## Repos that consume this theme

- [`doughatcher/executive-blog`](https://github.com/doughatcher/executive-blog) — doughatcher.com pillar essays (private)
- superterran.net — microblog timeline (no overlay repo)
- leaning.blue — microblog timeline (no overlay repo)

## Adding to a new site

1. Install the plugin (above)
2. (Optional) Create an overlay repo for site-specific layouts / content / static assets. Point micro.blog's theme deploy at it. The overlay's `layouts/` overrides the plugin's same-named files; static assets stack additively.
3. Configure the per-site params in plugin settings.

## Development

Theme files live under `layouts/`, `static/`, `theme.toml`. Variants live under `static/themes/`.

Site-agnostic. No hardcoded names, URLs, or branding — those all come from the per-site `.Site.Params.*` values that get populated by the plugin settings UI.

## License

MIT. See `LICENSE`.
