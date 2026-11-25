# Council Decision: Production Origin and Hosting Contract

Status: resolved
Blocked by: —

## Decision

Use `https://leelanshkharbanda.github.io` as the default production origin because the user already owns that GitHub Pages origin and it returned HTTP 200 during research. `SITE_URL` can override the HTTPS origin for a future custom domain.

- Output remains fully static.
- `public/_headers` supplies cache and security rules for compatible static hosts; GitHub Pages manages its own server headers, so these rules are not claimed as active there.
- `public/.nojekyll` is included.
- Canonicals, Open Graph URLs, robots, and sitemap derive from the configured Astro `site` value.
- Local preview verifies deep links and real 404 responses. Hosted caching, compression, security headers, and deployed 404 behavior remain deployment checks.
- No deployment or push is performed during this autonomous build.

## Acceptance criteria

A future release must set the final `SITE_URL`, deploy the static `dist/`, verify direct project URLs and 404 status, inspect response headers, and regenerate metadata if the origin changes.
