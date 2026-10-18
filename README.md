# Patel Kundan Art — website

Kundan & jadau specialists · custom gold and silver jewellery manufacturing ·
Beadonpura, Karol Bagh, New Delhi.

Static site. Astro, no framework on the client, no backend. Builds to plain HTML
in `docs/`, which GitHub Pages serves.

---

## Run it locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in docs/
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

### 2. The words — `src/pages/`

Each page is one file, and its words sit in plain HTML inside it. Lists that
repeat (steps, services, questions) are kept as small arrays at the top of the
page file, so a line can be changed without touching the layout.

**No gallery.** The site deliberately has no gallery, portfolio, photo grid or
carousel. Real workshop photographs, when there are some, go inside the
sections they belong to.

---

## Structure

```
src/
  data/site.ts          single source of truth — contacts, address, geo, links,
                        the five pages in menu order
  assets/img/brand/     the Kundanwala mark
  assets/fonts/         the self-hosted fonts
  components/           Header, Footer, StickyContactBar, ContactButtons,
                        FilmHero, JobThread, CraftStages, Makes, Faq,
                        PageHero, Mark, SiteMotion, ScrollStory
  layouts/BaseLayout    <head>, SEO tags, LocalBusiness JSON-LD
  pages/                one file per page — the URL is the filename
  styles/global.css     design tokens: colour, type scale, spacing, buttons
public/                 served as-is: robots.txt, favicon, the opening film
```

### Pages

| URL | File | Menu name |
|---|---|---|
| `/` | `src/pages/index.astro` | Home |
| `/workshop/` | `src/pages/workshop.astro` | Our Workshop |
| `/custom-orders/` | `src/pages/custom-orders.astro` | For Individuals |
| `/for-jewellers/` | `src/pages/for-jewellers.astro` | For Jewellers |
| `/contact/` | `src/pages/contact.astro` | Contact |

---

## Design notes

Reading sections sit on warm ivory with dark brown text; the opening film, the
page openings and the closing call to action are dark. Antique gold is used
only for labels, numbers and hairlines. Every text colour passes WCAG AA on
the surface it sits on (see the colour tokens at the top of
`src/styles/global.css`).

The Kundanwala mark is stored as a white alpha mask and tinted with CSS
`mask-image`, so one file works in any colour without a second asset.

Client-side JavaScript is enhancement only: the scroll-played film, the gold
thread and the fade-ins. The navigation, the layout, the questions and the
buttons all work with JavaScript disabled, and motion stops for visitors who
ask for reduced motion.

---

## Deploy — Cloudflare Pages, no build step

`npm run build` writes the finished site into **`docs/`**, and `docs/` is
committed to the repository. Cloudflare Pages serves that folder as-is, and
publishes again by itself every time `main` changes.

**Cloudflare Pages settings** (Workers & Pages → the project → Settings → Build):

| Field | Value |
|---|---|
| Production branch | `main` |
| Framework preset | None |
| Build command | *(empty)* |
| Build output directory | `docs` |

Live at:

```
https://patelkundanart.pages.dev/
```

**To publish a change:** run `npm run build`, then commit and push to `main`.
Whatever is in `docs/` is what the world sees.

**The old address.** GitHub Pages (Settings → Pages: branch `main`, folder
`/docs`) still serves the same folder at `aman-as.github.io/patel-kundan-art/`.
Every page there forwards the visitor to the same page on the Cloudflare
address (script at the top of `BaseLayout.astro`), so old shared links keep
working. Leave it switched on.

> Astro's asset folder is renamed from `_astro/` to `assets/` in
> `astro.config.mjs`. GitHub Pages runs Jekyll, which silently deletes folders
> beginning with an underscore. Do not change that setting back.

### Moving to a domain of its own later

Change `SITE` at the top of `astro.config.mjs` to the new address, rebuild,
then add the domain in Cloudflare Pages → the project → Custom domains.
Every internal link, the canonical tags, the sitemap and `robots.txt` follow
that one line.

---

## Still to be added

- [ ] The real year the family began kundan work (`foundedYear`)
- [ ] Business hours (`hours`)
- [ ] Workshop photographs: the bench, the tools, work in progress (inside sections, never a gallery)
- [ ] A photograph of a job register page for `/workshop/`
- [ ] Open Graph share image at `public/og/default.jpg`
