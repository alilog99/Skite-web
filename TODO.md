## TODO / Roadmap

This document tracks deferred items that are not required right now but are recommended for the next iterations. Use it as a living backlog.

Conventions

- [ ] = pending, [x] = done
- Priority: P1 (high), P2 (medium), P3 (low)
- Suggested sections: Now, Next, Later

### Domain & Hosting

- [ ] P2 Set primary domain in Firebase Hosting and enforce redirect (www → skite.info or vice‑versa)
- [ ] P2 Add HSTS header (stage rollout):
  - [ ] Start with: `Strict-Transport-Security: max-age=86400` (1 day)
  - [ ] Raise to: `max-age=31536000; includeSubDomains`
  - [ ] Optional preload once all subdomains are HTTPS‑ready
- [ ] P3 Keep DNS TTL at 1h during changes; raise to 24h when stable (IONOS)

### Security Hardening

- [ ] P2 Add Content-Security-Policy (CSP) tailored to current assets
- [ ] P2 Add security headers in `firebase.json`:
  - [ ] `X-Content-Type-Options: nosniff`
  - [ ] `Referrer-Policy: strict-origin-when-cross-origin`
  - [ ] `Permissions-Policy` (disable unused browser features)
  - [ ] `X-Frame-Options: DENY` (or rely on CSP `frame-ancestors`)

### Performance

- [ ] P2 Code‑split large bundle (> 500 kB) with dynamic imports
- [ ] P2 Convert hero/banner to WebP/AVIF fallback; ensure lazy loading where safe
- [ ] P3 Preload critical fonts and above‑the‑fold CSS where helpful
- [ ] P3 Add Lighthouse performance budget and CI check

### Monitoring & Analytics

- [ ] P2 Set up uptime monitoring for `skite.info` (e.g., Cronitor/UptimeRobot)
- [ ] P2 Error tracking (e.g., Sentry) for frontend
- [ ] P3 Core Web Vitals reporting (e.g., web‑vitals → analytics)
- [ ] P3 Configure Google/Firebase Analytics (if desired)

### CI/CD & Quality

- [ ] P2 GitHub Actions: build + type‑check + lint on PRs
- [ ] P3 Auto‑deploy to Firebase on `main` with manual approval
- [ ] P3 Enforce `yarn format:check` and `yarn lint` in CI

### SEO

- [ ] P2 Add `sitemap.xml` and `robots.txt`
- [ ] P3 Ensure OpenGraph/Twitter cards for key pages

### Payments & Backend (Stripe/Firebase)

- [ ] P2 Verify live Stripe webhook flow end‑to‑end in production
- [ ] P3 Add alerting on failed webhook deliveries
- [ ] P3 Add rate limiting/validation for public endpoints

### Accessibility (a11y)

- [ ] P2 Audit color contrast and focus order
- [ ] P3 Keyboard navigation and screen reader checks

### PWA (Optional)

- [ ] P3 Add `manifest.json` and service worker for offline caching

### Data & Backups

- [ ] P3 Firestore backup schedule and retention policy

### How to use this file

- Update priorities and check items as you complete them.
- Add OWNER and DUE where relevant, e.g.:
  - [ ] P2 Add CSP (OWNER: Ali, DUE: 2025‑08‑20)
