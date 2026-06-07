# Copilot Instructions for Bee-Aura AI / Lead Recovery OS

## Mission
Build a service-business operating dashboard for lead recovery, conversation management, booking conversion, and customer lifecycle enforcement.

## Non-Negotiables

### Scope
- **Local demo only** — No database, no cloud services
- **Fake data only** — All data is hardcoded, generated, or mocked
- **No external APIs** — No OpenAI, Stripe, Twilio, WhatsApp, Supabase
- **No credentials** — No API keys, no secrets in code
- **Build first** — `npm run build` must pass, always

### Routes
Primary routes only (no new routes without approval):
- `/` — Home / overview
- `/dashboard` — KPI snapshot
- `/leads` — Lead pipeline
- `/messages` — Conversations
- `/bookings` — Confirmed appointments
- `/customers` — Client view
- `/follow-ups` — Overdue follow-ups
- `/reviews` — Review requests
- `/activity-log` — Audit trail
- `/error-log` — System warnings
- `/settings` — Configuration

Optional demo routes (prefix with `/sandbox-*`):
- `/sandbox-status`, `/sandbox-review`, `/sandbox-handover`, `/sandbox-health-check`

### Design
- **Theme**: Bee-Aura dark premium (color tokens in `BEE-AURA-UI-SPEC.md`)
- **Product first**: Workflow > aesthetics
- **Consistent tokens**: No hardcoded colors, spacing, or typography
- **Laptop readable**: 1440px viewport, comfortable text hierarchy
- **No skinny cards**: Minimum 280px width
- **No text wrapping**: One word per line = bad design

### Code Quality
- Inspect before editing
- Work one phase/page at a time
- Do not chase screenshot pixels
- Do not replace workflow with decoration
- Do not make random design changes
- Report changed files clearly

## Before You Edit

### Ask These Questions
1. What problem does this page/component solve?
2. What data flow needs to work?
3. What is the acceptance criteria?
4. Are my changes product-first?

### Check These Files
- `BEE-AURA-PRODUCT-BIBLE.md` — Product definition, demo data model
- `BEE-AURA-UI-SPEC.md` — Design tokens, component rules
- `BEE-AURA-ACCEPTANCE-CHECKLIST.md` — Phase completion criteria

## During Development

### Workflow
1. Read the current implementation
2. Understand the data flow
3. Check the design spec
4. Make minimal, focused changes
5. Verify responsive layout
6. Test fake data renders correctly
7. Run `npm run build`
8. Report changes clearly

### Red Flags (Stop if you see these)
- Any import of external API service
- Any environment variable for credentials
- Any network request that doesn't mock data
- Any route not in the approved list
- Any color/spacing value not in the spec
- Any UI that breaks at 1440px
- Any text-wrapping issues
- Build fails

## Reporting Template

When you finish changes, report:

```
## Changed Files
- app/page.tsx (Home: added KPI cards)
- app/components/KpiCard.tsx (New component)

## What Changed
Brief description of feature/fix.

## Build Status
✅ npm run build passes

## Testing
- Fake data renders correctly
- Responsive at 1440px
- No external API calls
- No broken navigation

## Remaining Work
What still needs to happen in next phase.
```

## What NOT to Do

- ❌ Add real database without approval
- ❌ Call external APIs
- ❌ Store credentials in code
- ❌ Create new routes without approval
- ❌ Change navigation without approval
- ❌ Hardcode colors/spacing
- ❌ Ignore the UI spec
- ❌ Make large rewrites without checking in first
- ❌ Deploy or set up CI/CD
- ❌ Install packages without approval

## Questions?

1. Is this change product-first?
2. Is all data fake?
3. Does the build pass?
4. Is the layout responsive?
5. Am I using design tokens?

If "yes" to all: proceed.
If "no" to any: ask Haydn first.
