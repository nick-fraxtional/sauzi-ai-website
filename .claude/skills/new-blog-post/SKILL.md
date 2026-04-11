---
name: new-blog-post
description: Create a new blog post for Sauzi.ai. Generates the full HTML blog post file, a blog card for blog.html, and a companion LinkedIn post. Usage: /new-blog-post [topic or title]
---

You are creating a new blog post for Sauzi.ai. Follow these steps in order:

## Step 1: Research Existing Patterns
Read two existing blog post files to match the HTML structure and content style:
- Read `blog-ai-data-analysts.html`
- Read `blog-data-teams.html`
- Read the blog card section in `blog.html` to understand the card format

## Step 2: Write the Blog Post

Use the content-agent voice and brand guidelines:
- **Topic:** $ARGUMENTS (if none provided, ask the user for a topic)
- Chef/culinary brand metaphors where natural
- 600–900 words
- Structure: Hook → Problem → Insight → Solution → Takeaway → CTA
- File name: `blog-[slug].html` where slug is a short kebab-case version of the title

Create the full HTML file following the exact same structure as existing blog posts, including:
- All brand colors and Tailwind config
- `<app-header>` and `<app-footer>`
- `<script src="components.js"></script>`
- Proper meta tags including `og:title`, `og:description`, `og:image`
- Blog hero image placeholder at `Brand Assets/blog/[slug]-hero.svg`

## Step 3: Add the Blog Card to blog.html

Read `blog.html`, then insert a new blog card into the grid following the exact same card format as existing entries.

## Step 4: Generate the LinkedIn Post

Write a companion LinkedIn post for the same content:
- Hook under 200 characters
- 3-5 short paragraphs
- Ends with a link reference placeholder and 3-5 hashtags
- Save as a `.md` file in `LinkedIn Posts/[slug]-linkedin.md`

## Step 5: Report

List the files created/modified and note that an SVG hero image still needs to be generated (suggest running `/generate-svg blog-hero [slug]`).
