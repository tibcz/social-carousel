---
name: social-carousel
description: Turn any idea, article, thread, or notes into a polished multi-slide social media carousel (LinkedIn document post, Instagram carousel, X image set, TikTok photo post). Designs branded HTML slides and renders them to crisp PNG images plus a LinkedIn-ready PDF, and writes the post caption. Use when the user asks for a carousel, swipe post, slide post, social cards, LinkedIn document/PDF post, Instagram slides, or wants content turned into a visual multi-slide post.
license: MIT
---

# Social Carousel

Create scroll-stopping carousel posts: opinionated slide copy, a designed HTML deck, and pixel-perfect exports (PNGs for Instagram/X/TikTok, PDF for LinkedIn) — plus the caption to publish with it.

## Workflow

Follow these five steps in order. Do not skip step 1.

### Step 1 — Lock the brief (ask only what's missing)

Establish four things before designing anything. Infer what you can from context; ask the user only for genuine gaps, in a single message:

1. **Source content** — the idea, article, list, or argument to turn into slides.
2. **Platform** — determines size, slide count, and export format. Default: LinkedIn (4:5, PDF). See `references/platforms.md`.
3. **Theme** — pick from the catalog below based on the content's vibe; confirm only if ambiguous.
4. **Identity** — author name, @handle, and optional brand color. If unknown, ask the user for their branding wanted on their carousel before generating anything.

### Step 2 — Write the slide copy first

Copy before pixels. Draft the full slide-by-slide script as plain text using the narrative arc and hook formulas in `references/copywriting.md`. Hard limits:

- **One idea per slide.** If a slide needs the word "and", it's probably two slides.
- **Hook slide ≤ 12 words.** It must work as a standalone thumbnail.
- **Body slides ≤ 40 words.** Headline ≤ 8 words, support text ≤ 30 words.
- **6–12 slides total** (sweet spot: 8–10). Last slide is always a CTA.
- Every slide must survive the **squint test**: legible at 10% zoom.
- Never use the em dash in your text `—` (the most common giveaway of AI-generated content).

Show the script to the user only if the source content was thin or ambiguous; otherwise proceed.

### Step 3 — Build the deck from a theme template

Copy the chosen theme file from `templates/` to the working directory as `deck.html`, then replace the placeholder content with the script. Never write slide HTML from scratch — the templates carry the design system (type scale, spacing, safe margins, print CSS for PDF export).

| Theme | File | Best for |
|---|---|---|
| **Editorial** | `templates/editorial.html` | Essays, opinion, storytelling, personal brands — serif, paper-white, magazine feel |
| **Gradient Pop** | `templates/gradient-pop.html` | Marketing, growth, creator economy — vivid gradients, glass cards, big energy |
| **Dark Terminal** | `templates/dark-terminal.html` | Dev tools, engineering, AI/technical content — code aesthetic, mono accents |
| **Minimal Swiss** | `templates/minimal-swiss.html` | Frameworks, data, B2B, design — white space, grid, one accent color |
| **Neo Brutal** | `templates/neo-brutal.html` | Bold opinions, creator marketing, brands with attitude — thick borders, hard shadows, loud type |
| **Soft Pastel** | `templates/soft-pastel.html` | Wellness, coaching, education, lifestyle — rounded cards, pastel blobs, friendly warmth |
| **Luxe Noir** | `templates/luxe-noir.html` | Luxury, finance, premium personal brands — near-black, gold hairlines, elegant serif |
| **Blueprint** | `templates/blueprint.html` | Product, engineering process, systems thinking — drafting grid, FIG. annotations, mono details |
| **Retro Press** | `templates/retro-press.html` | Newsletters, indie creators, culture commentary — riso red/blue on cream, halftone, print charm |
| **Aurora Glass** | `templates/aurora-glass.html` | SaaS, AI products, startup launches — dark mode, aurora glow, glass cards, gradient text |

Rules when filling templates:

- Keep every `class` and structural element; change text, accent color (`--accent`), and identity footer only.
- Reuse slide types as needed (e.g. four "numbered point" slides) by duplicating that `<section class="slide">` block; delete unused ones.
- Update the `N/M` slide counters after the final slide count is known.
- All content stays inside the built-in 96px safe margin — never add edge-touching text.
- For non-default sizes, change only `--slide-w`/`--slide-h` in `:root` (sizes per platform in `references/platforms.md`).

### Step 4 — Render

```bash
node scripts/render.mjs deck.html --out out/ --pdf
```

Produces `out/slide-01.png` … `slide-NN.png` at 2× resolution and `out/carousel.pdf` (the file LinkedIn document posts actually require). Requires Playwright; the script prints exact install commands if missing (`npm i playwright && npx playwright install chromium`).

**Fallbacks, in order:**
1. System Chromium/Chrome: `chromium --headless=new --screenshot=out.png --window-size=1080,1350 deck.html` (one slide per page; the script handles multi-slide, raw Chrome doesn't — only use for spot checks).
2. No browser at all: deliver `deck.html` and tell the user to open it in a browser and use the render command locally, or print to PDF (the print CSS produces a correct one-slide-per-page PDF from the browser's print dialog).

### Step 5 — Deliver the package

Hand over, in one message:

1. The rendered slides (and PDF for LinkedIn).
2. A **caption** written per the platform conventions in `references/copywriting.md` (hook line, 2–4 short lines of context, CTA, 3–5 hashtags — hashtags only where the platform rewards them).
3. One-line publishing instruction (e.g. "LinkedIn → start a post → **Add a document** → upload `carousel.pdf`").

## Quality gate (check before delivering)

- [ ] Hook slide works alone — would you stop scrolling?
- [ ] No slide over 40 words; no orphan ideas split across slides
- [ ] Text contrast ≥ 4.5:1; body text ≥ 36px at 1080px width
- [ ] Slide counters correct; identity footer on every slide; CTA slide last
- [ ] PNGs are the right dimensions and 2× sharp; PDF pages match slides 1:1
- [ ] Caption included; no em-dash-riddled AI-sounding copy (read it aloud)

## File map

```
social-carousel/
├── SKILL.md                    ← you are here
├── references/
│   ├── platforms.md            ← sizes, limits, safe areas, publishing steps per platform
│   └── copywriting.md          ← hook formulas, narrative arc, CTA & caption patterns
├── templates/                  ← 10 complete themed decks with every slide type
└── scripts/render.mjs          ← HTML → PNGs + PDF (Playwright)
```
