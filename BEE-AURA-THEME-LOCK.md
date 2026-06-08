# Bee-Aura AI Theme Lock

Status: Design direction locked for sandbox demo
Scope: Local/demo only, fake data only

## Core design direction

Bee-Aura AI should feel like a premium, modern, dark-tech business operating system.

The product should not feel like a plain admin dashboard, a basic CRM, or separate unrelated pages.

## Colour system

- Base: deep navy / blue-black
- Primary action: Bee-Aura gold / yellow
- System glow: electric blue / cyan-blue
- Success: green
- Warning: amber / gold
- Risk: red
- Social/channel colours:
  - WhatsApp: green
  - Facebook: blue
  - Website: orange
  - Email: red
  - Instagram: purple
  - SMS: yellow
  - Phone: teal/cyan

## Layout standard

Dashboard and Leads are the current sizing reference.

Pages should:
- Fit a normal laptop viewport
- Avoid oversized cards
- Avoid huge headings inside app pages
- Use compact dashboard-style panels
- Keep spacing tight but premium
- Use clear grids and tables
- Avoid looking zoomed in
- Avoid adding empty dead space

## Brand rules

Product first. Theme second. Brand everywhere.

This means:
- Every page must clearly help the business owner run leads, bookings, messages, customers, follow-ups, reviews, and operations.
- Bee-Aura branding should be visible but not overpower the product.
- Gold should guide important actions.
- Blue should create the premium tech atmosphere.

## Code/style rules

Patch to Learn, Rebuild Clean.

Small patches are okay for minor fixes.
If a page needs more than 2–3 visual patches, rebuild/standardise the section cleanly.

Avoid stacking endless CSS blocks.
Prefer clean page-specific standards:
- Landing: landing-*
- Dashboard: command-*
- Leads: lf-* / leads-final-*
- Messages: messages-standard-* or one final messages namespace

## Current audit finding

Home, Dashboard, Leads, and Messages are in good direction.

Messages is functional but still needs final standardisation so it feels the same size and quality as Dashboard and Leads.

Bookings should not start until Messages is visually accepted and committed.
