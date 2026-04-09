# Fraxtional.io — Blog Post Image Asset Template

**Workflow:** Drop in a LinkedIn post (`.txt`) + its companion image (`.jpg/png`) → get a thumbnail prompt and banner prompt ready for Nano Banana.

---

## Brand Style Reference

All generated images must stay on-brand. Append the base style string (below) to every prompt.

| Token | Value |
|---|---|
| Background | Deep blue-black `#0F172A` |
| Primary accent | Emerald green `#10B981` |
| Secondary accent | Indigo `#6366F1` |
| Tone | Premium, modern, tech-forward |
| Feel | Glassmorphism, subtle gradients, clean geometry, soft emerald glow |

**Base style string** — append to every prompt:
```
dark blue-black background (#0F172A), glowing emerald green accents (#10B981),
indigo highlights (#6366F1), premium tech aesthetic, glassmorphism elements,
subtle gradient mesh, cinematic lighting, ultra-clean, no text, no people
```

---

## How to Use This File

1. Paste the LinkedIn post text under `linkedin_post`
2. Note the companion image filename under `source_image`
3. From the post, extract the `title` and `slug` (title → lowercase, spaces to hyphens)
4. Write the `thumbnail_prompt` and `banner_prompt` based on the post's core concept
5. Run both prompts through **Nano Banana**
6. Save outputs using the naming convention at the bottom of this file

---

## Prompt Writing Guide

### Reading the LinkedIn post
- **Hook line** = the core visual metaphor (e.g. "CLTV isn't a metric — it's a hope" → broken/incomplete structure)
- **Key concept** = what the post is really about (e.g. bad data undermining decisions)
- **Tone** = educational? cautionary? aspirational? Let this guide the mood

### Thumbnail (1:1 square)
- One strong, centered visual metaphor — bold enough to read at card size
- No clutter, no text, no more than 2 focal elements
- Represents the *concept*, not the content

### Banner (16:9 wide)
- Atmospheric expansion of the thumbnail concept
- More depth, negative space, and environmental scale
- Should feel immersive at full blog-post width

---

## Topic Visual Vocabulary

| Topic | Visual Concepts |
|---|---|
| Data strategy & analytics | flowing data streams, glowing grids, network nodes, broken/fractured structures |
| Company culture & leadership | interconnected rings, layered human-shaped forms, interlocking shapes |
| Fractional executives & hiring | modular blocks, puzzle pieces, key-and-lock, interlocking gears |
| Metrics & measurement | scales, dials, abstract dashboards, glowing formulas |
| General / mixed | geometric abstraction, light refracting through glass, orbiting elements |

---

---

## Post Entries

---

### Post 001 — *(example entry — do not use as a live post, for reference only)*

> **NOTE TO AI:** This is a completed example showing how to fill out the template correctly. Use it as a structural reference only. Do not generate images from this entry unless explicitly instructed.

```yaml
title: "Monday Metrics: CLTV"
slug: monday-metrics-cltv
source_image: monday_metrics_cltv.jpg
linkedin_post: monday_metrics_cltv.txt
topic_tags: [data strategy, metrics, CLTV, data quality]
```

**Core concept from post:** CLTV looks like a math problem but is really a data quality problem — companies make million-dollar decisions on a metric built on broken inputs.

**Source image components (extract from the provided image):**
- Identify the primary title/metric/concept from the image
- List any formula, equation, or step-by-step breakdown shown
- Note any supporting data sections (charts, bars, stats, tables)
- Note any warning/breakdown/problem cards shown
- Note any checklist, audit, or action items shown
- Capture any closing statement or key takeaway line

**Thumbnail Prompt (1:1)**
```
Condensed dark infographic-style graphic, centered vertical layout on deep
blue-black background (#0F172A): top section shows the bold primary title and
subtitle from the source image in white text; below it reproduce the core
structural element from the source image (formula bar, equation, or key concept)
as horizontal glassmorphism pill blocks with emerald (#10B981) highlight on the
final/result element and indigo (#6366F1) on a key middle element; below that
reproduce any supporting breakdown or warning section from the source image as
a row of 2–3 compact cards with red-tinted glassmorphism borders; at the bottom
reproduce any data visualization from the source (bar chart, stats, or checklist)
as compact glassmorphism panels; overall aesthetic: premium dark UI, glassmorphism
panels with subtle inner borders, soft emerald glow on key elements, ultra-clean
typography hierarchy, no photos, no people, square 1:1 composition
```

**Banner Prompt (16:9)**
```
Wide dark infographic dashboard layout on deep blue-black background (#0F172A),
landscape 3-column layout: left column contains the bold primary title, subtitle,
and the core structural element from the source image (formula, equation, or
concept) rendered as connected glassmorphism pill blocks with emerald (#10B981)
on the result element and indigo (#6366F1) on a key input — plus any example or
numerical row below it; center column reproduces any breakdown, warning, or
problem section from the source image as 2–3 glassmorphism cards with red-tinted
borders and icon labels; right column reproduces any data visualization, bar
chart, or checklist from the source image as compact stacked glassmorphism panels,
with a closing takeaway statement in a subtle emerald-tinted box at the bottom;
soft emerald radial glow behind the left column, premium dark UI aesthetic,
glassmorphism panels throughout, clean typographic hierarchy, ultra-clean,
no photos, no people, 16:9 widescreen composition
```

**Output filenames:**
```
monday-metrics-cltv-thumbnail.png
monday-metrics-cltv-banner.png
```

---

### Post 002 — *(blank template)*

```yaml
title: ""
slug: 
source_image: 
linkedin_post: 
topic_tags: []
```

**Core concept from post:** [1–2 sentences: what is the post really about? What's the emotional hook?]

**Source image components (extract from the provided image):**
- Identify the primary title/metric/concept from the image
- List any formula, equation, or step-by-step breakdown shown
- Note any supporting data sections (charts, bars, stats, tables)
- Note any warning/breakdown/problem cards shown
- Note any checklist, audit, or action items shown
- Capture any closing statement or key takeaway line

**Thumbnail Prompt (1:1)**
```
Condensed dark infographic-style graphic, centered vertical layout on deep
blue-black background (#0F172A): top section shows the bold primary title and
subtitle from the source image in white text; below it reproduce the core
structural element from the source image (formula bar, equation, or key concept)
as horizontal glassmorphism pill blocks with emerald (#10B981) highlight on the
final/result element and indigo (#6366F1) on a key middle element; below that
reproduce any supporting breakdown or warning section from the source image as
a row of 2–3 compact cards with red-tinted glassmorphism borders; at the bottom
reproduce any data visualization from the source (bar chart, stats, or checklist)
as compact glassmorphism panels; overall aesthetic: premium dark UI, glassmorphism
panels with subtle inner borders, soft emerald glow on key elements, ultra-clean
typography hierarchy, no photos, no people, square 1:1 composition
```

**Banner Prompt (16:9)**
```
Wide dark infographic dashboard layout on deep blue-black background (#0F172A),
landscape 3-column layout: left column contains the bold primary title, subtitle,
and the core structural element from the source image (formula, equation, or
concept) rendered as connected glassmorphism pill blocks with emerald (#10B981)
on the result element and indigo (#6366F1) on a key input — plus any example or
numerical row below it; center column reproduces any breakdown, warning, or
problem section from the source image as 2–3 glassmorphism cards with red-tinted
borders and icon labels; right column reproduces any data visualization, bar
chart, or checklist from the source image as compact stacked glassmorphism panels,
with a closing takeaway statement in a subtle emerald-tinted box at the bottom;
soft emerald radial glow behind the left column, premium dark UI aesthetic,
glassmorphism panels throughout, clean typographic hierarchy, ultra-clean,
no photos, no people, 16:9 widescreen composition
```

**Output filenames:**
```
{slug}-thumbnail.png
{slug}-banner.png
```

---

## File Naming Convention

```
{slug}-thumbnail.png   →  1:1 square   — blog list / grid card
{slug}-banner.png      →  16:9 wide    — hero image on blog post page
```

Slug format: lowercase, spaces replaced with hyphens, no special characters.