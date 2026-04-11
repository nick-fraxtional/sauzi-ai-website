# Sauzi.ai Brand Audit
**Date:** 2026-04-10
**Scope:** All 13 HTML pages
**Auditor:** Claude Code (brand-orchestrator)

---

## Executive Summary

The site is structurally sound and color-consistent across all pages. The primary issues are:
1. **OG social meta tags missing on 12 of 13 pages** — only `index.html` has them
2. **Banned phrases found in 2 pages** — "cutting-edge" and "seamlessly" in a blog post; "leverage" in why-sauzi.html
3. **Typography aliases inconsistent** — `font-heading`/`font-body` only defined on `index.html`'s Tailwind config; other pages use `font-serif`/`font-sans` (functional but inconsistent)
4. **Blog image path inconsistency** — `blog.html` featured post pulls from `LinkedIn Posts/` instead of `Brand Assets/blog/`
5. **CTA inconsistency on index.html** — two competing CTAs ("Let's Talk" vs "Get My Data Readiness Map")

---

## Page-by-Page Audit

---

## index.html
**Status:** NEEDS WORK

**Issues Found:**
- [index.html:160-161] Primary CTA is "Let's Talk" but the form CTA is "Get My Data Readiness Map" — two different CTAs competing in the same section. The hero should use the stronger, more specific CTA.
- [index.html:325] Phase 3 list item says "Claude / Cowork Connection" — "Cowork" is inconsistently capitalized across the site
- [index.html:74] `font-heading` and `font-body` aliases defined only here; other pages don't extend them, causing subtle class drift if someone uses `font-heading` on a non-index page

**Recommended Fixes:**
- Change hero primary CTA from "Let's Talk" to "Get My Data Readiness Map" for consistency and specificity
- Standardize "Cowork" capitalization across all references
- Move `font-heading`/`font-body` config into components.js or ensure all pages include it

---

## how-it-works.html
**Status:** NEEDS WORK

**Issues Found:**
- [how-it-works.html:head] Missing `og:title`, `og:description`, `og:image` meta tags
- [how-it-works.html:33-36] Tailwind config omits `font-heading`/`font-body` aliases that index.html defines

**Recommended Fixes:**
- Add OG meta tags:
  ```html
  <meta property="og:title" content="How It Works | Sauzi.ai">
  <meta property="og:description" content="Sauzi shows every step of the implementation. We configure your warehouse, model your data, and connect the AI tools. No black boxes — ever.">
  <meta property="og:image" content="https://sauzi.ai/Brand Assets/og-image.png">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://sauzi.ai/how-it-works.html">
  ```

---

## why-sauzi.html
**Status:** NEEDS WORK

**Issues Found:**
- [why-sauzi.html:head] Missing `og:title`, `og:description`, `og:image` meta tags
- [why-sauzi.html:227] **Banned word:** "leverage" — "want the leverage that comes from not needing one"
- [why-sauzi.html:33-36] Tailwind config omits `font-heading`/`font-body` aliases

**Recommended Fixes:**
- Add OG meta tags:
  ```html
  <meta property="og:title" content="Why Sauzi | Sauzi.ai">
  <meta property="og:description" content="Implementation you can see. AI agents that never sleep. See why growing e-commerce brands choose Sauzi over in-house teams and agencies.">
  <meta property="og:image" content="https://sauzi.ai/Brand Assets/og-image.png">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://sauzi.ai/why-sauzi.html">
  ```
- Replace banned word: "You need to want the advantage that comes from not needing one."

---

## playbooks.html
**Status:** NEEDS WORK

**Issues Found:**
- [playbooks.html:head] Missing `og:title`, `og:description`, `og:image` meta tags
- [playbooks.html:33-36] Tailwind config omits `font-heading`/`font-body` aliases

**Recommended Fixes:**
- Add OG meta tags:
  ```html
  <meta property="og:title" content="Implementation Playbooks | Sauzi.ai">
  <meta property="og:description" content="Stack-specific implementation blueprints from Sauzi.ai. See exactly what we build in each phase — and what your AI agents can answer on day one.">
  <meta property="og:image" content="https://sauzi.ai/Brand Assets/og-image.png">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://sauzi.ai/playbooks.html">
  ```

---

## blog.html
**Status:** NEEDS WORK

**Issues Found:**
- [blog.html:head] Missing `og:title`, `og:description`, `og:image` meta tags
- [blog.html:118] Featured post image references `LinkedIn Posts/AI Data Analysts/ai_data_analysts.jpg` — should be under `Brand Assets/blog/`

**Recommended Fixes:**
- Add OG meta tags
- Move or alias blog image to `Brand Assets/blog/ai_data_analysts.jpg`

---

## blog-ai-data-analysts.html
**Status:** NEEDS WORK

**Issues Found:**
- [blog-ai-data-analysts.html:head] Missing `og:title`, `og:description`, `og:image` meta tags

**Recommended Fixes:**
- Add OG meta tags with blog-specific title and description

---

## blog-ai-data-culture.html
**Status:** FAIL

**Issues Found:**
- [blog-ai-data-culture.html:head] Missing `og:title`, `og:description`, `og:image` meta tags
- [blog-ai-data-culture.html:137] **Banned phrase:** "cutting-edge" — "certainly not a lack of cutting-edge technology"
- [blog-ai-data-culture.html:174] **Banned phrase:** "seamlessly" — "seamlessly trust an AI agent tomorrow"

**Recommended Fixes:**
- Add OG meta tags
- Line 137: Replace "cutting-edge technology" → "sophisticated technology"
- Line 174: Replace "seamlessly trust an AI agent tomorrow" → "trust an AI agent tomorrow without friction"

---

## blog-data-team-impact.html
**Status:** NEEDS WORK

**Issues Found:**
- [blog-data-team-impact.html:head] Missing `og:title`, `og:description`, `og:image` meta tags

**Recommended Fixes:**
- Add OG meta tags with post-specific content

---

## blog-data-teams.html
**Status:** NEEDS WORK

**Issues Found:**
- [blog-data-teams.html:head] Missing `og:title`, `og:description`, `og:image` meta tags

**Recommended Fixes:**
- Add OG meta tags with post-specific content

---

## blog-monday-metrics-cltv.html
**Status:** NEEDS WORK

**Issues Found:**
- [blog-monday-metrics-cltv.html:head] Missing `og:title`, `og:description`, `og:image` meta tags

**Recommended Fixes:**
- Add OG meta tags with post-specific content

---

## blog-monday-metrics-retention.html
**Status:** NEEDS WORK

**Issues Found:**
- [blog-monday-metrics-retention.html:head] Missing `og:title`, `og:description`, `og:image` meta tags

**Recommended Fixes:**
- Add OG meta tags with post-specific content

---

## blog-monday-metrics-weeks-of-cover.html
**Status:** NEEDS WORK

**Issues Found:**
- [blog-monday-metrics-weeks-of-cover.html:head] Missing `og:title`, `og:description`, `og:image` meta tags

**Recommended Fixes:**
- Add OG meta tags with post-specific content

---

## blog-planning-ai-project.html
**Status:** NEEDS WORK

**Issues Found:**
- [blog-planning-ai-project.html:head] Missing `og:title`, `og:description`, `og:image` meta tags

**Recommended Fixes:**
- Add OG meta tags with post-specific content

---

## Summary Table

| Page | OG Tags | Color Palette | Typography | Banned Words | Chef Metaphor | Status |
|------|---------|---------------|------------|--------------|----------------|--------|
| index.html | ✅ | ✅ | ✅ | ✅ | ⚠️ Implicit | NEEDS WORK |
| how-it-works.html | ❌ | ✅ | ✅ | ✅ | ✅ Strong | NEEDS WORK |
| why-sauzi.html | ❌ | ✅ | ✅ | ❌ "leverage" | ⚠️ Minimal | NEEDS WORK |
| playbooks.html | ❌ | ✅ | ✅ | ✅ | ✅ Present | NEEDS WORK |
| blog.html | ❌ | ✅ | ✅ | ✅ | ⚠️ Minimal | NEEDS WORK |
| blog-ai-data-analysts.html | ❌ | ✅ | ✅ | ✅ | ⚠️ Minimal | NEEDS WORK |
| blog-ai-data-culture.html | ❌ | ✅ | ✅ | ❌ "cutting-edge", "seamlessly" | ⚠️ Minimal | FAIL |
| blog-data-team-impact.html | ❌ | ✅ | ✅ | ✅ | ⚠️ Minimal | NEEDS WORK |
| blog-data-teams.html | ❌ | ✅ | ✅ | ✅ | ⚠️ Minimal | NEEDS WORK |
| blog-monday-metrics-cltv.html | ❌ | ✅ | ✅ | ✅ | ⚠️ Minimal | NEEDS WORK |
| blog-monday-metrics-retention.html | ❌ | ✅ | ✅ | ✅ | ⚠️ Minimal | NEEDS WORK |
| blog-monday-metrics-weeks-of-cover.html | ❌ | ✅ | ✅ | ✅ | ⚠️ Minimal | NEEDS WORK |
| blog-planning-ai-project.html | ❌ | ✅ | ✅ | ✅ | ⚠️ Minimal | NEEDS WORK |

---

## Priority Fix List

### Critical (affects SEO/sharing)
1. **Add OG meta tags to all 12 non-index pages** — without these, social shares show no preview image or description

### High (brand voice compliance)
2. **blog-ai-data-culture.html** — remove "cutting-edge" and "seamlessly"
3. **why-sauzi.html** — remove "leverage" (replace with "advantage")

### Medium (UX/copy consistency)
4. **index.html** — align hero CTA from "Let's Talk" → "Get My Data Readiness Map"
5. **blog.html** — fix featured image path from `LinkedIn Posts/` to `Brand Assets/blog/`

### Low (technical debt)
6. Standardize `font-heading`/`font-body` Tailwind aliases across all pages
