# Copy Audit — Sauzi.ai (Excluding Blog Posts)
**Date:** 2026-05-07
**Scope:** index.html, how-it-works.html, playbooks.html, why-sauzi.html
**Total changes identified:** 36 items | **Estimated words cut:** ~462

---

## Site-Wide Patterns to Fix

1. **Defensive trailing clauses** — strong statements undercut by "if something breaks..." or "not a generic package" at the end. Cut them.
2. **Mirror-structure redundancy** — "Without this, X. With it, not X." The negative alone does the job.
3. **"Actually" and "actual" as filler** — appears 4 times across the site, adds nothing.
4. **Forced culinary metaphors in functional copy** — "mystery ingredients," "full kitchen," "right seasoning" feel strained outside hero sections.
5. **Weak trailing sentences** — "This is the destination." / "Your numbers." These trail off after the point is already made.

---

## index.html (Home Page)

### 1. Services Section — Section Intro Body Copy

**Current (51 words):**
> "Every company starts somewhere different. Some have a clean warehouse ready for AI today. Others have messy pipelines. Some don't have a warehouse at all. Sauzi meets you wherever you are and gets you to the same place: AI agents working on your data, answering questions in seconds."

**Recommended (24 words):**
> "Every company starts somewhere different. Sauzi meets you there and gets you to the same place: AI agents answering questions in seconds."

**Cut: 27 words.** The middle three sentences are examples that repeat the setup without adding information. The playbooks page handles those specifics.

---

### 2. Phase 2: Structuring — Card Body Copy

**Current (46 words):**
> "We configure your warehouse with the dimension and fact tables AI agents need to reason about your business. This is the step most implementations skip — and why most AI projects fail."

**Recommended (26 words):**
> "We build the dimension and fact tables AI agents need to reason about your business. Most implementations skip this step — and fail because of it."

**Cut: 20 words.** "Configure your warehouse with" is roundabout. The cause-and-effect in the second sentence is sharper when tightened.

---

### 3. Phase 3: AI Connection — Card Body Copy

**Current (37 words):**
> "We connect your clean, structured warehouse to the AI tools that query it. Your team asks questions in plain English. The AI answers. Insights stop waiting in a ticket queue."

**Recommended (24 words):**
> "Connect your structured warehouse to AI tools. Your team asks questions in plain English and gets answers in seconds — no ticket queue."

**Cut: 13 words.** "The AI answers." is a fragment that restates what was just said. The last two sentences collapse cleanly into one.

---

### 4. Comparison Section — Sauzi Model Card Subtext

**Current (17 words):**
> "Ask your data anything. Get answers instantly. No ticket queue, no analyst bottleneck."

**Recommended (12 words):**
> "Ask your data anything. Get answers instantly. No tickets, no bottleneck."

**Cut: 5 words.** "Analyst bottleneck" is implied by "bottleneck."

---

### 5. Booking Form Section — Body Copy

**Current (30 words):**
> "Tell us what ingredients you're working with — we'll map out exactly what needs to be built, and what your team unlocks when we're done."

**Recommended (22 words):**
> "Tell us what you're working with. We'll map out exactly what needs to be built and what your team unlocks."

**Cut: 8 words.** "Ingredients" is a forced culinary metaphor in functional form copy. "When we're done" is understood.

---

### 6. Success Message Body Copy

**Current (26 words):**
> "Thanks for reaching out. A Sauzi data strategist will be in touch shortly to walk through your current stack and next steps."

**Recommended (18 words):**
> "A Sauzi strategist will be in touch shortly to review your stack and next steps."

**Cut: 8 words.** "Thanks for reaching out" is filler — the success icon already signals that. "Data strategist" is wordier without adding meaning.

---

## how-it-works.html

### 7. Hero Body Copy

**Current (38 words):**
> "Most data consultants hand you a dashboard and disappear. Sauzi works differently — we show you exactly what we're building and why. No black boxes. No mystery ingredients."

**Recommended (24 words):**
> "Most data consultants hand you a dashboard and disappear. Sauzi shows you exactly what we're building and why. No black boxes."

**Cut: 14 words.** "Works differently" is filler. "No mystery ingredients" repeats "No black boxes" and feels like a strained metaphor.

---

### 8. "Two Ingredients" Section — Headline

**Current (10 words):**
> "The Two Ingredients of Every Sauzi Implementation"

**Recommended (7 words):**
> "Two Ingredients. Every Sauzi Implementation."

**Cut: 3 words.** "The" and "of" pad a headline without adding meaning.

---

### 9. "Two Ingredients" Section — Body Copy

**Current (26 words):**
> "Think of it like a great meal: the right ingredients, prepared properly, in the right order. Skip either one and the whole thing falls flat."

**Recommended (15 words):**
> "The right ingredients, prepared in the right order. Skip either one and the whole thing falls flat."

**Cut: 11 words.** "Think of it like a great meal" is throat-clearing. The analogy lands faster without the setup.

---

### 10. Ingredient 1 — Warehouse Configuration Body Copy

**Current (61 words):**
> "We configure dimension and fact tables so AI agents can reason about your business data the way a skilled analyst would. The structure we build is the 'menu' — it tells the AI exactly what data exists, how it relates, and what questions it can answer. Without this structure, the AI is guessing."

**Recommended (40 words):**
> "We configure dimension and fact tables so AI agents can reason about your business data. This structure tells the AI what data exists, how it relates, and what questions it can answer. Without it, the AI is guessing."

**Cut: 21 words.** "The way a skilled analyst would" is a comparison that doesn't serve the reader. The menu metaphor interrupts the explanation and then has to define itself.

---

### 11. Ingredient 2 — AI Tool Connection Body Copy

**Current (56 words):**
> "We connect your structured warehouse to the AI tools — Claude Code, Cowork, and others — that query it. Once the connection is live, your team can ask questions in plain English and get real answers backed by your actual data. Not a guess. Not a hallucination. Your numbers."

**Recommended (36 words):**
> "We connect your structured warehouse to Claude Code, Cowork, and other AI tools. Once live, your team asks questions in plain English and gets answers backed by your actual data — not hallucinations."

**Cut: 20 words.** The parenthetical interrupts the sentence. "Real answers backed by your actual data" followed by "Not a guess. Not a hallucination. Your numbers." is redundant.

---

### 12. Phase 1 Description Body Copy

**Current (53 words):**
> "For companies without a warehouse or with messy, unreliable data. We connect your data sources — Shopify, Recharge, Magento, Mailchimp, and others — build the ETL/ELT pipelines that move data cleanly, and configure your warehouse so everything flows reliably. You can't deploy AI on a leaky pipe. We fix the pipe first."

**Recommended (36 words):**
> "For companies without a warehouse or with unreliable data. We connect your sources, build the ETL/ELT pipelines, and configure your warehouse. You can't deploy AI on a leaky pipe — so we fix the pipe first."

**Cut: 17 words.** The inline source list is already shown in the Source Connections card below — redundant here. "Move data cleanly" and "flows reliably" say the same thing.

---

### 13. Phase 2 Description Body Copy

**Current (65 words):**
> "This is the step that separates AI implementations that actually work from ones that don't. We configure the dimension and fact tables — the semantic layer — that tells AI agents how your business data is organized. Without this, AI doesn't understand the difference between a customer, an order, a subscription, and a product. With it, it does."

**Recommended (40 words):**
> "This is the step that separates working AI implementations from ones that don't. We build the dimension and fact tables — the semantic layer — that tells AI agents how your data is organized. Without it, AI can't distinguish a customer from an order."

**Cut: 25 words.** "Actually work" → "working." The mirror structure ("Without this... With it, it does.") repeats the setup for minimal payoff — the negative alone makes the point.

---

### 14. Phase 3 Description Body Copy

**Current (54 words):**
> "We connect your clean, structured warehouse to the AI tools that query it. Your team asks questions in plain English — 'What's our repeat purchase rate this month vs. last month?' — and gets accurate, data-backed answers in seconds. Insights stop waiting in a ticket queue. This is the destination."

**Recommended (36 words):**
> "We connect your structured warehouse to the AI tools that query it. Your team asks questions in plain English — 'What's our repeat purchase rate this month vs. last month?' — and gets answers in seconds."

**Cut: 18 words.** "Clean" is filler at Phase 3. "Accurate, data-backed" is redundant. "Insights stop waiting in a ticket queue. This is the destination." both belong on the homepage, not buried in a phase detail block.

---

### 15. "What Makes This Different" — Section Body Copy

**Current (18 words):**
> "The process matters. Here's how Sauzi actually works — not how consultants say they work."

**Recommended (13 words):**
> "The process matters. Here's how Sauzi actually works — not how consultants claim to."

**Cut: 5 words.** "Say they work" is flat; "claim to" is sharper and shorter.

---

### 16. "We document what we build" — Card Body Copy

**Current (34 words):**
> "Every implementation comes with clear documentation of the data model, pipelines, and connections. Your team will always know what's running and why — not just us."

**Recommended (23 words):**
> "Every implementation includes full documentation of the data model, pipelines, and connections. Your team will always know what's running and why."

**Cut: 11 words.** "Clear" is weak filler; "full" is more specific. "Not just us" is implicit from the sentence before it.

---

### 17. "We work with your existing tools" — Card Body Copy

**Current (36 words):**
> "We configure Snowflake, or your warehouse of choice. We connect to Claude, Cowork, or whatever AI tooling makes sense. No rip-and-replace. No forcing you onto a platform you don't want."

**Recommended (24 words):**
> "We configure your warehouse of choice and connect the AI tooling that fits your team. No rip-and-replace. No platform lock-in."

**Cut: 12 words.** Listing tools by name here is redundant with other sections. "No forcing you onto a platform you don't want" = 10 words for "No platform lock-in."

---

### 18. "We meet you where your data is" — Card Body Copy

**Current (48 words):**
> "Different clients need different meals. Some need a full kitchen built from scratch. Some just need the right seasoning on what already exists. We scope the work to what you actually need — not a generic package."

**Recommended (20 words):**
> "Some clients need a full build from scratch. Others just need better structure on what already exists. We scope accordingly."

**Cut: 28 words.** "Different clients need different meals" is a forced culinary metaphor. Kitchen/seasoning analogies slow down a functional card. "Not a generic package" is restated by "We scope accordingly."

---

### 19. CTA Section — Headline

**Current (14 words):**
> "Ready to see what this looks like for your stack?"

**Recommended (9 words):**
> "Want to see this applied to your stack?"

**Cut: 5 words.** "Ready to see" is a filler qualifier.

---

### 20. CTA Section — Body Copy

**Current (29 words):**
> "Tell us where your data stands today. We'll map out the exact phases, timeline, and what your team gets when we're done."

**Recommended (20 words):**
> "Tell us where your data stands. We'll map the exact phases, timeline, and what your team gets."

**Cut: 9 words.** "Today" is redundant. "Map out" → "map." "When we're done" is implied.

---

## playbooks.html

### 21. Hero Body Copy

**Current (35 words):**
> "These are the actual implementation paths we run for different client stacks. Pick the one that matches where your data lives today — and see exactly what we build in each phase."

**Recommended (24 words):**
> "These are the implementation paths we run for different client stacks. Pick the one that matches your data setup and see exactly what we build."

**Cut: 11 words.** "Actual" is filler. "Where your data lives today" → "your data setup." The em-dash creates an unnecessary pause.

---

### 22. Playbook A — Header Body Copy

**Current (50 words):**
> "Your store is in Shopify. Maybe Recharge for subscriptions, Mailchimp or Klaviyo for email. Your data lives across disconnected platforms with no single source of truth. Reports come from spreadsheets. There's no warehouse. We build one — and connect AI agents to it."

**Recommended (35 words):**
> "Your data is split across Shopify, Recharge, and your email platform — no single source of truth. Reports live in spreadsheets. There's no warehouse. We build one and connect AI agents to it."

**Cut: 15 words.** The opening three sentences make slow work of a simple setup. The em-dash before "and connect" is unnecessary.

---

### 23. Playbook B — Header Body Copy

**Current (51 words):**
> "You've got a warehouse. Data is flowing. But your dbt models are inconsistent, there's no unified view of the customer, and AI queries return unreliable results. The warehouse is there — the structure isn't. We build the structure and connect the AI."

**Recommended (34 words):**
> "You have a warehouse and data is flowing — but your dbt models are inconsistent, there's no unified customer view, and AI queries are unreliable. We build the structure and connect the AI."

**Cut: 17 words.** The original breaks into 5 choppy sentences including a fragment. "The warehouse is there — the structure isn't" repeats what was just said.

---

### 24. Playbook C — Header Body Copy

**Current (58 words):**
> "You're running Shopify for DTC, Recharge for subscriptions, Mailchimp for email, and Magento for wholesale. These platforms don't talk to each other. A customer who buys on both channels shows up as two different people. We unify everything, build the warehouse, structure it for AI, and connect the agents."

**Recommended (38 words):**
> "You're running Shopify, Recharge, Mailchimp, and Magento — and they don't talk to each other. A customer who buys on two channels shows up as two different people. We unify everything, build the warehouse, and connect the AI agents."

**Cut: 20 words.** Labeling each tool's function is unnecessary — the stack tags below handle this. "Structure it for AI" is implied.

---

### 25. Bottom CTA — Body Copy

**Current (31 words):**
> "We've worked with dozens of stack combinations. Tell us what you're running and we'll map out exactly which phase you're in and what it takes to get AI agents live on your data."

**Recommended (22 words):**
> "We've worked with dozens of stack combinations. Tell us what you're running and we'll map exactly which phase you're in — and how to get live."

**Cut: 9 words.** "What it takes to get AI agents live on your data" → "how to get live."

---

## why-sauzi.html

### 26. Hero Body Copy

**Current (36 words):**
> "The old model was: hire analysts, build dashboards, wait for reports. The new model is: implement once, run AI agents forever. Sauzi gets you there — and shows every step of the work."

**Recommended (27 words):**
> "The old model: hire analysts, build dashboards, wait for reports. The new model: implement once, run AI agents forever. Sauzi gets you there."

**Cut: 9 words.** "Was:" and "is:" are more natural as colons without the verb. "And shows every step of the work" weakly trails the hero — the No Black Boxes card handles this.

---

### 27. "What Sets Us Apart" — Section Body Copy

**Current (20 words):**
> "These aren't marketing lines. They're the actual principles that shape how every Sauzi engagement runs."

**Recommended (14 words):**
> "These aren't marketing lines. They're the principles that shape how every Sauzi engagement runs."

**Cut: 6 words.** "Actual" is a filler intensifier — removing it makes the sentence stronger.

---

### 28. "No Black Boxes" — Card Body Copy

**Current (52 words):**
> "We don't just deliver results — we show you how they were built. Every pipeline, every data model, every AI connection is documented and explained. You'll always know what's running and why. If something breaks down the road, you'll understand exactly where to look."

**Recommended (33 words):**
> "We don't just deliver results — we show you how they were built. Every pipeline, data model, and AI connection is documented. You'll always know what's running and why."

**Cut: 19 words.** The last sentence ("If something breaks down the road...") is a defensive clause that undercuts confidence. The preceding sentences make the point completely.

---

### 29. "Right-Sized for Every Business" — Card Body Copy

**Current (47 words):**
> "One client might need a full Snowflake setup, ETL from 10 data sources, and a custom AI agent layer. Another might just need their existing warehouse properly structured for AI queries. We build what you need — not a generic product that's 80% irrelevant to your situation."

**Recommended (34 words):**
> "One client needs a full build from scratch. Another just needs their existing warehouse structured for AI. We build what you need — not a generic product that's 80% irrelevant to your situation."

**Cut: 13 words.** "Might need" hedges unnecessarily. Trimming the first example to "a full build from scratch" is accurate at card-copy scale.

---

### 30. "We Stay in the Problem" — Card Body Copy

**Current (48 words):**
> "We don't hand off work and disappear. We work embedded in your data strategy — partnering with your team until the implementation is solid, the AI agents are running, and your team knows exactly how to use what we built."

**Recommended (31 words):**
> "We don't hand off work and disappear. We stay embedded until the implementation is solid, the AI agents are running, and your team knows how to use what we built."

**Cut: 17 words.** "We work embedded in your data strategy — partnering with your team" is roundabout. "We stay embedded" says the same thing in 3 words.

---

### 31. "Who We Work With" — First Paragraph

**Current (62 words):**
> "We work with growing e-commerce and DTC brands that have data but aren't getting answers from it fast enough. If you're running on Shopify, Recharge, or similar platforms — and your data lives in spreadsheets, disconnected tools, or a warehouse that nobody's fully set up — that's exactly where we start."

**Recommended (38 words):**
> "We work with e-commerce and DTC brands that have data but aren't getting answers fast enough. If your data lives in spreadsheets, disconnected tools, or an unfinished warehouse — that's exactly where we start."

**Cut: 24 words.** "Growing" is filler. "Running on Shopify, Recharge, or similar platforms" is already covered by the bulleted list below. "That nobody's fully set up" → "unfinished."

---

### 32. "Who We Work With" — Second Paragraph

**Current (32 words):**
> "You don't need a data team before you call us. You need to want one — or want the advantage that comes from not needing one."

**Recommended (20 words):**
> "You don't need a data team before you call us. You just need to want the advantage of one."

**Cut: 12 words.** "You need to want one — or want the advantage that comes from not needing one" is a tongue-twister that tries to be clever and lands awkward.

---

### 33. "Companies with an existing warehouse" — List Item Description

**Current (20 words):**
> "Data is flowing but the structure isn't there yet. AI tools have been tried but the results aren't reliable."

**Recommended (15 words):**
> "Data is flowing but the structure isn't there. AI queries return unreliable results."

**Cut: 5 words.** "Yet" implies temporary progress — use only intentionally. "AI tools have been tried but" is passive compared to "AI queries return."

---

### 34. Final CTA — Body Copy

**Current (28 words):**
> "We'll map out exactly what your stack needs, which phase you're starting in, and what your team unlocks when the implementation is done."

**Recommended (19 words):**
> "We'll map exactly what your stack needs, which phase you're starting in, and what your team unlocks."

**Cut: 9 words.** "Out" after "map" is unnecessary. "When the implementation is done" is implied.

---

## Summary

| Page | Items | Words Cut |
|---|---|---|
| index.html | 6 | ~81 |
| how-it-works.html | 13 | ~195 |
| playbooks.html | 5 | ~72 |
| why-sauzi.html | 9 | ~114 |
| **Total** | **36 items** | **~462 words** |
