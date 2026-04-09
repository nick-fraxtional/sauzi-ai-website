# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for Sauzi.ai — no build system, no package manager, no backend. All pages are plain HTML files served directly.

## Tech Stack

- **HTML/CSS/JS**: Vanilla, no framework
- **Tailwind CSS**: Loaded via CDN (`https://cdn.tailwindcss.com`); all configuration is inline in each HTML file's `<script>` tag — there is no `tailwind.config.js`
- **Fonts**: Lora (headings) and Inter (body) from Google Fonts
- **Web Components**: `<app-header>` and `<app-footer>` defined in `components.js`

## Architecture

### Pages
- `index.html` — landing/home page
- `how-it-works.html`, `playbooks.html`, `why-sauzi.html` — product/marketing pages
- `blog.html` — blog listing page
- `blog-*.html` — individual blog post pages (8 articles)

### Shared Components (`components.js`)
Two custom Web Components registered globally:
- `<app-header>` (`GlobalNav`) — fixed navbar with mobile hamburger menu; active link highlighting auto-detected via `window.location.pathname`
- `<app-footer>` (`GlobalFooter`) — consistent site footer

Every HTML page includes `<script src="components.js">` and uses `<app-header>` and `<app-footer>`.

### Styling Conventions
- Tailwind config is embedded per-file inside `<script>tailwind.config = { theme: { extend: { ... } } }</script>`
- Custom component styles live in `<style type="text/tailwindcss">` blocks in each file's `<head>`
- **Brand color palette** (consistent across all pages):
  - `background: #FDFAF5` (warm cream)
  - `surface: #F7F2EA` (light beige)
  - `primary: #C8860A` (amber/gold)
  - `primary-mid: #E8A020` (lighter amber)
  - `secondary: #A84B28` (rust/terracotta)
  - `ink: #1A1814` / `ink-2: #6B6560` / `ink-3: #B0AA9F`
- Max-width containers use `max-w-7xl mx-auto px-4 sm:px-6`

### Adding a New Blog Post
Copy an existing `blog-*.html` file as a template. Add the new post card to `blog.html`. Place any images in `Brand Assets/blog/`.

## Development

No build step required — open HTML files directly in a browser or serve with any static file server:

```bash
# Quick local server (Python)
python3 -m http.server 8080

# Or with Node
npx serve .
```

To preview changes to `components.js`, a local server is needed (Web Components require same-origin script loading; `file://` may block module imports in some browsers).
