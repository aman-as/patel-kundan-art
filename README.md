# Patel Kundan Art — website

Kundan & customized jewellery manufacturing · Beadonpura, Karol Bagh, New Delhi.

Static site. Astro, no framework on the client, no backend. Builds to plain HTML
and deploys free on Cloudflare Pages.

---

## Run it locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
npm run preview  # serve the built site
```

Node 18 or newer.

---

## The two things you will actually edit

### 1. Contact details — `src/data/site.ts`

**Every** phone number, WhatsApp link, address and structured-data tag on the
site is generated from this one file. Change a number here and it updates in the
header, the footer, the sticky mobile bar, every WhatsApp button and the
schema.org markup Google reads — all at once.

Never hard-code a phone number anywhere else.

Two fields are deliberately left empty because the facts are not yet confirmed:

| Field | What happens while it is empty |
|---|---|
| `hours` | The Hours block on Contact is not rendered, and opening hours are left out of the structured data |
| `foundedYear` | No founding claim appears anywhere on the site |

Fill either one in and it appears automatically. Nothing unverified is published.

### 2. The portfolio — `src/content/products/`

To add a piece:

1. Put the photograph in `src/assets/img/work/`
2. Add a `.md` file in `src/content/products/`:

```markdown
---
title: Three-strand rani haar with matching earrings
category: Necklace Sets     # Necklace Sets | Chokers | Bangles | Earrings | Custom Work
image: ../../assets/img/work/your-photo.png
alt: Describe the piece for someone who cannot see it
note: One short line. Form and craft only.
order: 10                   # lower numbers first
featured: true              # show on the home page
---
```

The grid, the ordering, the responsive sizes and the WebP conversion all happen
automatically.

**Rule:** describe only what is visible in the photograph. Never state weight,
purity, stone type or price.

---

## Structure

```
src/
  data/site.ts          single source of truth — contacts, address, geo, links
  content/products/     the portfolio, one file per piece
  assets/img/
    work/               product photographs (optimised at build time)
    brand/              the Kundanwala mark
  components/           Header, Footer, StickyContactBar, ContactButtons,
                        ProductGrid, PageHero, Mark
  layouts/BaseLayout    <head>, SEO tags, LocalBusiness JSON-LD
  pages/                one file per page — the URL is the filename
  styles/global.css     design tokens: colour, type scale, spacing, buttons
public/                 served as-is: robots.txt, favicon
```

### Pages

| URL | File |
|---|---|
| `/` | `src/pages/index.astro` |
| `/our-work/` | `src/pages/our-work.astro` |
| `/for-jewellers/` | `src/pages/for-jewellers.astro` |
| `/custom-orders/` | `src/pages/custom-orders.astro` |
| `/workshop/` | `src/pages/workshop.astro` |
| `/contact/` | `src/pages/contact.astro` |

---

## Design notes

The product photographs are cut-outs shot on navy velvet with soft edges. They
composite cleanly on dark grounds and halo visibly on white — so sections that
show work are ink, and sections that are read are ivory. This is a constraint of
the assets, not a style preference. If future photographs are shot on white,
this can be revisited.

The Kundanwala mark is stored as a white alpha mask and tinted with CSS
`mask-image`, so one file works in any colour without a second asset.

Client-side JavaScript: one `IntersectionObserver` for a fade-in on scroll.
Nothing else. The navigation, the layout and the buttons all work with
JavaScript disabled.

---

## Deploy — GitHub Pages, no build step

`npm run build` writes the finished site into **`docs/`**, and `docs/` is
committed to the repository. GitHub Pages serves that folder as-is — no
GitHub Actions, no Node on the server, nothing to configure beyond one switch.

**One-time setup:** repository → **Settings → Pages → Build and deployment**

| Field | Value |
|---|---|
| Source | Deploy from a branch |
| Branch | `main` |
| Folder | `/docs` |

Save. The site appears within a minute or two at:

```
https://aman-as.github.io/patel-kundan-art/
```

**To publish a change:** run `npm run build`, then commit and push. Whatever is
in `docs/` is what the world sees.

If you never run the build locally, the site simply keeps serving the last
`docs/` that was committed — which is a perfectly good place to be.

> Astro's asset folder is renamed from `_astro/` to `assets/` in
> `astro.config.mjs`. GitHub Pages runs Jekyll, which silently deletes folders
> beginning with an underscore. Do not change that setting back.

### Moving to patelkundanart.com later

Two lines at the top of `astro.config.mjs`:

```js
const SITE = 'https://patelkundanart.com';
const BASE = '/';
```

Then in the repository, **Settings → Pages → Custom domain**, enter the domain
and follow the DNS instructions. Also update the `Sitemap:` line in
`public/robots.txt`.

Every internal link is built through `url()` in `src/data/site.ts`, so those
two lines move the entire site. Nothing else needs editing.

> Note: on a project URL like `aman-as.github.io/patel-kundan-art/`, search
> engines read `robots.txt` from the domain root, which this site does not
> control. It starts working once the custom domain is in place.

---

## Still to be added

- [ ] The real year the family began kundan work (`foundedYear`)
- [ ] Business hours (`hours`)
- [ ] More product photography — the portfolio currently holds four pieces
- [ ] Workshop photographs: the bench, the brothers, work in progress
- [ ] A photograph of a job register page for `/workshop/`
- [ ] Open Graph share image at `public/og/default.jpg`
