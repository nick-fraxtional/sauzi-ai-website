---
name: brand-audit
description: Run a brand consistency audit on a page or the entire Sauzi.ai website. Checks color palette, typography, tone, chef metaphor usage, and component structure. Usage: /brand-audit [filename or "all"]
---

You are running a brand consistency audit for Sauzi.ai using the brand-orchestrator standards.

**Target:** $ARGUMENTS (if "all" or empty, audit every HTML page; otherwise audit the specified file)

## Audit Checklist

For each page being audited, check the following:

### 1. Technical Structure
- [ ] Uses `<app-header>` and `<app-footer>` from `components.js`
- [ ] Includes `<script src="components.js"></script>`
- [ ] Has Tailwind CDN script tag
- [ ] Has Google Fonts link (Lora + Inter)
- [ ] Has proper `<meta charset>`, `<meta viewport>`, `<title>`
- [ ] Has `og:title`, `og:description`, `og:image` meta tags

### 2. Color Palette Compliance
Check that Tailwind classes and inline styles use ONLY these colors:
- `#FDFAF5` / `bg-background`
- `#F7F2EA` / `bg-surface`
- `#C8860A` / `text-primary`, `bg-primary`
- `#E8A020` / `primary-mid`
- `#A84B28` / `secondary`
- `#1A1814` / `text-ink`
- Flag any hardcoded colors that deviate from the palette

### 3. Typography
- [ ] Headings (h1–h3) use `font-heading` / Lora
- [ ] Body text uses `font-body` / Inter
- [ ] Heading hierarchy is logical (no h3 before h2)

### 4. Layout
- [ ] Max-width containers use `max-w-7xl mx-auto px-4 sm:px-6`
- [ ] Page is mobile responsive (check for responsive Tailwind classes)
- [ ] No fixed pixel widths that would break on mobile

### 5. Content & Voice
- [ ] Headlines are benefit-focused and concise
- [ ] Chef/culinary metaphor is present but not overdone
- [ ] No banned phrases: "cutting-edge", "leverage", "synergy", "robust", "seamless"
- [ ] CTAs are action-oriented

### 6. Images & SVGs
- [ ] All images have `alt` text
- [ ] Images reference existing files (no broken paths)
- [ ] Images follow naming convention under `Brand Assets/`

## Output Format

For each page audited:

```
## [filename]
**Status:** PASS / NEEDS WORK / FAIL

**Issues Found:**
- [file:line] Description of issue

**Recommended Fixes:**
- Specific fix for each issue
```

End with a **Summary Table** if auditing multiple files.
