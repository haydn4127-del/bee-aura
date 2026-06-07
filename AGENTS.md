# Bee-Aura AI / Lead Recovery OS — Agent Rules

## Project Status
- **Stage**: Local demo / fake-data sandbox only
- **Database**: None (fake data only)
- **APIs**: None (no external services)
- **Deployment**: Not configured
- **Build Target**: `npm run build` must pass

## Core Philosophy
**Product First. Theme Second. Brand Everywhere.**

The Lead Recovery OS workflow is the source of truth. The Bee-Aura dark premium design system enhances it. Brand elements reinforce both without compromising function.

## Product Purpose
Bee-Aura AI is **not** a chatbot front end. It is a **service-business operating dashboard** for home-services and local trades, solving:
- Missed calls and voicemail follow-ups
- WhatsApp/SMS enquiry management
- Converting urgent leads into bookings
- Enforcing follow-ups (jobs booked, still to confirm, waiting payment)
- Requesting reviews and managing testimonials
- Displaying urgent job queue and daily workload
- Surfacing missed follow-ups and critical jobs
- Keeping the owner in control of every lead

## Navigation Architecture

### Primary Routes (Required)
```
/ (Home)
/dashboard (KPI overview, quick wins)
/leads (Lead pipeline, recovery focus)
/messages (Conversation threads, follow-up queue)
/bookings (Confirmed appointments, calendar)
/customers (Client relationship view)
/follow-ups (Due follow-ups, enforcement)
/reviews (Review requests, testimonials)
/activity-log (System events, audit trail)
/error-log (Warnings, failures, debug info)
/settings (Config, preferences)
```

### Secondary Routes (Optional Demo Routes)
- `/sandbox-status` — Development dashboard
- `/sandbox-review` — Fake data review
- `/sandbox-handover` — Demo mode info
- `/sandbox-health-check` — System diagnostics

## Working Principles

### Before Editing
1. **Inspect the current state** — Read page components and data flow
2. **Understand the workflow** — Know what problem the page solves
3. **Check the acceptance criteria** — Is this phase complete?
4. **Review the UI spec** — Are design tokens correct?

### During Implementation
1. **Work one phase/page at a time** — No parallel feature work
2. **Product function first** — Layout and interaction matter most
3. **Apply theme consistently** — Use design tokens, not magic values
4. **No random changes** — Every edit serves the product roadmap
5. **Do not chase pixels** — Screenshot fidelity is secondary
6. **Do not replace workflow** — Never hide information for aesthetics

### After Changes
1. **List changed files clearly**
2. **Verify `npm run build` passes**
3. **Confirm no UI breaks**
4. **Check responsive laptop layout**

## Hard Rules (No Exceptions)

### Scope Boundaries
- ✅ Local demo only
- ✅ Fake data only
- ❌ No database
- ❌ No Supabase
- ❌ No Stripe
- ❌ No Twilio
- ❌ No WhatsApp
- ❌ No OpenAI API
- ❌ No API keys
- ❌ No real customer data
- ❌ No deployment setup
- ❌ No external services

### Navigation & Routes
- ❌ No route changes without approval
- ❌ No duplicate navigation
- ❌ Keep secondary routes in `/sandbox-*` prefix

### UI/UX Standards
- ❌ No skinny vertical cards
- ❌ No one-word-per-line text wrapping
- ✅ Responsive laptop layout required (1280px–1440px range)
- ✅ Use design tokens for colors, spacing, and reusable styles (no random hardcoded values)
- ✅ All content readable and functional on normal laptop screens

### Build & Dependencies
- ✅ `npm run build` must pass
- ❌ No package installs without approval
- ✅ Haydn will run terminal commands if Copilot cannot show output

## Design System Constraints

- Use only `BEE-AURA-UI-SPEC.md` color tokens
- Typography: Heading, Body, Mono (defined in spec)
- Spacing: 4px-based scale (4, 8, 12, 16, 24, 32, 48, 64)
- Panels are light on dark, not cards with shadows
- Buttons follow spec rules (size, padding, hover states)
- Badges for status indicators only
- Charts are data-driven, not decorative

## Reporting Standards

When reporting changes:
```
Changed Files:
- app/page.tsx (Home page: added KPI summary)
- app/components/KpiCard.tsx (New component for stat display)

Build Status: ✅ npm run build passes
UI Status: ✅ Responsive at 1440px
Scope Check: ✅ Fake data only, no API calls
```

## Strict Working Checklist
- [ ] Inspect before editing
- [ ] Understand the workflow being changed
- [ ] Apply design tokens only (no magic values)
- [ ] Verify responsive at 1440px
- [ ] Confirm fake data only
- [ ] Run `npm run build` before reporting
- [ ] Report changed files with purpose
- [ ] Stop before large rewrites unless Haydn approves

---

**Read next**: `BEE-AURA-PRODUCT-BIBLE.md` for full product definition and demo data model.
