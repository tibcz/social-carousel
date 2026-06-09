# Platform Specs & Publishing Guide

Last verified: June 2026. When in doubt, 1080×1350 (4:5) is the safest universal size.

## Quick reference

| Platform | Format to upload | Size (px) | Ratio | Max slides | Ideal slides |
|---|---|---|---|---|---|
| **LinkedIn** (document post) | **PDF** | 1080×1350 | 4:5 | 300 pages | 8–12 |
| **Instagram** (carousel) | PNG/JPG | 1080×1350 | 4:5 | 20 | 7–10 |
| **Instagram** (square, legacy feel) | PNG/JPG | 1080×1080 | 1:1 | 20 | 7–10 |
| **X / Twitter** (image set) | PNG | 1600×900 | 16:9 | 4 | 4 |
| **TikTok** (photo mode) | PNG/JPG | 1080×1920 | 9:16 | 35 | 8–12 |
| **Facebook** (carousel-style album) | PNG/JPG | 1080×1350 | 4:5 | 10 | 6–8 |
| **Threads** | PNG/JPG | 1080×1350 | 4:5 | 20 | 6–10 |

To change deck size, edit only the CSS variables in the template:

```css
:root { --slide-w: 1080px; --slide-h: 1350px; }   /* LinkedIn / IG portrait (default) */
:root { --slide-w: 1080px; --slide-h: 1080px; }   /* square */
:root { --slide-w: 1600px; --slide-h: 900px;  }   /* X */
:root { --slide-w: 1080px; --slide-h: 1920px; }   /* TikTok */
```

## Platform notes

### LinkedIn — the carousel platform
- LinkedIn carousels are **PDF document posts**, not image posts. Upload `carousel.pdf` via *Start a post → Add a document*. Give the document a title — it shows above the post.
- Text inside the PDF stays selectable and is indexed; this helps reach. The render script's PDF keeps real text.
- 4:5 portrait gets the most feed height. Avoid 16:9 — it looks tiny on mobile.
- The first page is shown as a static preview until the reader clicks; the hook slide carries the entire post.
- Native documents strongly outperform image links; never post slides as a plain multi-image post on LinkedIn.

### Instagram
- Up to 20 slides per carousel. Mixed ratios are not allowed — every slide must match slide 1.
- 4:5 (1080×1350) maximizes feed real estate. Instagram re-compresses aggressively: export PNG at 2× (the script's default) so text survives compression.
- **Safe area:** keep critical text ≥ 96px from edges and ≥ 180px from the bottom edge — the UI (username, like bar) overlays the bottom on some surfaces.
- Slide 2 is "teased" by a peek animation on some clients — make slide 2 visually continuous with slide 1 where possible.

### X / Twitter
- Max 4 images per post; the carousel becomes a 2×2 grid preview, so each slide must work cropped to roughly square in the grid.
- Better pattern for >4 slides: a thread with 1 image per tweet, hook slide on tweet 1.
- 16:9 (1600×900) renders cleanly in-feed without cropping a single image.

### TikTok photo mode
- 9:16 full-bleed; up to 35 images. Swipe-through is auto-advancing — keep ≤ 25 words per slide here, less than other platforms.
- **Safe area is severe:** right rail (buttons) ≈ 140px, bottom (caption/music) ≈ 320px. Keep all text in the upper-left two-thirds.

### Facebook & Threads
- Follow Instagram rules (same Meta pipeline). Facebook albums reorder by engagement — number the slides visibly so order survives.

## Universal safe-area rules

- 96px minimum margin on all sides (built into the templates — don't fight it).
- Hook slide must be legible as a ~110px-wide thumbnail (grid view, share previews).
- Round counters and page numbers go top-right or bottom-right; platforms never overlay there except TikTok.
