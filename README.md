# 🎠 social-carousel

**Turn any idea into a scroll-stopping carousel post — designed slides, crisp PNG exports, a LinkedIn-ready PDF, and the caption to ship it with.**

A skill for [Claude Code](https://claude.com/claude-code) and any coding agent that reads `SKILL.md` files (Cursor, Codex CLI, Gemini CLI, …). You say *"make me a carousel about X"* — the agent writes the slide copy using a proven narrative arc, builds the deck from one of four designed themes, renders pixel-perfect exports, and hands you a publish-ready package.

```text
You:    Turn my blog post about code review into a LinkedIn carousel.

Agent:  ✓ 9-slide script (hook → stakes → 5 beats → recap → CTA)
        ✓ deck.html built on the Dark Terminal theme
        ✓ out/slide-01.png … slide-09.png  (2160×2700, 2× sharp)
        ✓ out/carousel.pdf                  (LinkedIn document post format)
        ✓ caption + 3 niche hashtags
        → "LinkedIn → Start a post → Add a document → upload carousel.pdf"
```

## Why this exists

- **LinkedIn carousels are PDFs, not images.** Almost everyone gets this wrong. This skill renders a real one-page-per-slide PDF with selectable, indexable text.
- **Copy first, pixels second.** The skill enforces a copywriting playbook — hook formulas, ≤ 40 words per slide, one idea per slide, exactly one CTA — before any HTML is touched.
- **Designed, not generated-looking.** Four hand-built themes with real type scales, safe margins, and print CSS. The agent fills templates; it never improvises layout.
- **Every platform's quirks handled.** Slide limits, aspect ratios, safe areas, and publishing steps for LinkedIn, Instagram, X, TikTok, Facebook, and Threads.

## The themes

| | Vibe | Best for |
|---|---|---|
| **Editorial** | Paper-white, serif, magazine rules | Essays, opinion, personal brands |
| **Gradient Pop** | Vivid gradients, glass cards | Marketing, growth, creator content |
| **Dark Terminal** | Window chrome, mono accents, terminal green | Dev tools, engineering, AI content |
| **Minimal Swiss** | White space, grid hairlines, one accent | Frameworks, data, B2B, design |

Every theme ships all eight slide types (hook cover, stakes, numbered point, body + stat, quote, checklist, recap, CTA) so decks stay visually varied without leaving the design system.

## Install

**Claude Code** — clone the skill into your skills directory:

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/tibcz/social-carousel ~/.claude/skills/social-carousel
```

Project-local instead: `git clone https://github.com/tibcz/social-carousel .claude/skills/social-carousel`

**Other agents** — point your agent at `social-carousel/SKILL.md` as context (Cursor rules, Codex `AGENTS.md` include, etc.). The skill is plain markdown + HTML + one Node script; nothing is Claude-specific.

**Rendering** (one-time setup):

```bash
npm i playwright && npx playwright install chromium
```

No Node? The decks are plain HTML — open in a browser and print to PDF; the built-in print CSS produces a correct one-slide-per-page PDF.

## Use it

```text
"Make a carousel from this article: <paste>"
"Turn my last 5 tweets about pricing into an Instagram carousel, gradient theme"
"LinkedIn carousel: 7 lessons from my failed startup. Editorial theme, accent #C92A2A"
```

Or render a deck manually:

```bash
node social-carousel/scripts/render.mjs deck.html --out out/ --pdf
```

## What's inside

```
social-carousel/
├── SKILL.md                    # the workflow: brief → copy → build → render → deliver
├── references/
│   ├── platforms.md            # sizes, limits, safe areas, publishing steps per platform
│   └── copywriting.md          # hook formulas, narrative arc, CTA & caption patterns
├── templates/
│   ├── editorial.html
│   ├── gradient-pop.html
│   ├── dark-terminal.html
│   └── minimal-swiss.html
└── scripts/
    └── render.mjs              # HTML → PNGs (2×) + LinkedIn PDF, via Playwright
```

## License

MIT — use it, fork it, rebrand the themes.
