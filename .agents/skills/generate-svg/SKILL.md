---
name: generate-svg
description: Generate a brand-compliant SVG image for the Sauzi.ai website. Handles blog heroes, thumbnails, banners, and icons. Usage: /generate-svg [type] [name/description] — e.g. /generate-svg blog-hero ai-data-analysts or /generate-svg banner home-hero
---

You are generating an SVG image for Sauzi.ai using the svg-agent standards.

**Arguments:** $ARGUMENTS
Parse the arguments as: [type] [name] [optional: description of desired visual]

## Image Type → Dimensions

| Type keyword | Width | Height | Save path |
|---|---|---|---|
| `blog-hero` | 1200 | 630 | `Brand Assets/blog/[name]-hero.svg` |
| `blog-thumb` | 400 | 280 | `Brand Assets/blog/[name]-thumb.svg` |
| `banner` | 1440 | 400 | `Brand Assets/banners/[name].svg` |
| `icon` | 120 | 120 | `Brand Assets/icons/[name].svg` |
| `social` | 1200 | 627 | `Brand Assets/social/[name].svg` |

## Brand Color Palette

```
#FDFAF5  background (warm cream)
#F7F2EA  surface (light beige)
#C8860A  primary (amber/gold)
#E8A020  primary-mid (lighter amber)
#A84B28  secondary (rust/terracotta)
#1A1814  ink (near-black)
#6B6560  ink-2
#B0AA9F  ink-3
```

## Design Instructions

1. **Background:** Always start with `#FDFAF5` or a gradient from `#FDFAF5` to `#F7F2EA`
2. **Chef/culinary theme:** Incorporate abstract culinary shapes — flowing curves suggesting motion/orchestration, circular forms suggesting ingredients or plates, geometric precision suggesting expert craft
3. **Amber accents:** Use `#C8860A` / `#E8A020` for highlights, key shapes, and visual focal points
4. **Rust accents:** Use `#A84B28` sparingly for contrast and warmth
5. **No text** in thumbnails and icons (too small); text in heroes should be minimal and only in `font-family="Lora, serif"`
6. **Abstract over literal** — suggest "data flow" with connected nodes and lines, not literal server icons

## Output

1. Write the complete SVG to the correct path under `Brand Assets/`
2. Create any missing subdirectories noted in the path
3. Print the `<img>` tag to use in HTML: `<img src="[path]" alt="[suggested alt text]" ...>`
4. Note the file size and confirm it's pure SVG (no external dependencies)
