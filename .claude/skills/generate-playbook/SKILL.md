---
name: generate-playbook
description: Generate a new client playbook for a specific tech stack. Adds the playbook to playbooks.html and creates a detailed playbook content section. Usage: /generate-playbook [tech stack description, e.g. "Shopify + Recharge + BigQuery"]
---

You are generating a new Sauzi.ai playbook for a specific client tech stack.

**Target stack:** $ARGUMENTS (if none provided, ask the user which tech stack to build the playbook for)

## Step 1: Read the Existing Playbooks Page

Read `playbooks.html` to understand the current page structure, component patterns, and how existing playbooks are displayed.

## Step 2: Write the Playbook Content

Using the marketing-agent playbook format, create the following content sections:

1. **Stack Overview Card** — short title + 2-sentence description of the stack
2. **The Challenge** — what data problem this stack typically creates (non-technical language)
3. **The Sauzi Recipe** — numbered steps showing how Sauzi builds the solution
4. **Data Flow Diagram** — an SVG-based visual showing: `Source → ETL → Warehouse → AI Layer → Insight` with the specific tools for this stack
5. **Outcomes** — 3-4 bullet points of what the client can now do
6. **CTA** — button linking to contact/demo

## Step 3: Update playbooks.html

Add the new playbook to `playbooks.html`:
- Add a card to the playbook listing grid
- Create the full playbook detail section (can be a show/hide panel or a new section at the bottom of the page)
- Ensure the data flow SVG is inline in the HTML, using brand colors (#C8860A, #F7F2EA, #A84B28, #1A1814)

## Step 4: Cross-link

- Check if any existing blog posts mention the relevant tech stack — if so, note which ones to link to this playbook
- Add a "See related playbooks" section if other playbooks exist for similar stacks

## Step 5: Report

Summarize what was added to `playbooks.html` and suggest related content to create (blog post, LinkedIn post) using `/new-blog-post`.
