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
- [ ] Workshop photographs: the bench, the tools, work in progress (inside sections, never a gallery)
- [ ] A photograph of a job register page for `/workshop/`
- [ ] Open Graph share image at `public/og/default.jpg`
