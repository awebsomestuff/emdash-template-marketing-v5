# EmDash Marketing Template

A conversion-focused landing page template built with [EmDash](https://github.com/emdash-cms/emdash) and deployed on Cloudflare Workers with D1 and R2.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/awebsomestuff/emdash-template-marketing)

## Features

- Hero section with CTA
- Logo cloud (social proof)
- Features grid with icons
- Benefits section with alternating layout
- Testimonials
- Pricing cards (3 plans)
- FAQ accordion
- Final CTA section
- Dark/light mode
- SEO metadata
- Fully CMS-managed content

## Pages

| Page | Route |
|---|---|
| Landing page | `/` |
| Static pages | `/pages/:slug` |

## Infrastructure

- **Runtime:** Cloudflare Workers
- **Database:** D1
- **Storage:** R2
- **Framework:** Astro + EmDash

## Local Development

```bash
npm install
npx emdash dev
```
