# Bee-Aura AI — Copilot Development Rules

## Mission
Implement the Lead Recovery OS with the Bee-Aura dark premium design system, one page at a time, with fake data only. Product first, theme second, brand everywhere.

---

## Non-Negotiable Principles

### Product First
- The workflow solves a real problem: recovering missed leads, enforcing follow-ups, showing pipeline visibility
- Design serves the workflow, not the reverse
- Never hide information for aesthetics
- Information density > blank space

### Theme Second
- Bee-Aura dark premium design enhances the product
- Use design tokens consistently
- Avoid pixel-perfect chasing
- Responsive at 1440px is enough (mobile is secondary)

### Brand Everywhere
- Apply Bee-Aura color system (see `BEE-AURA-UI-SPEC.md`)
- Enforce spacing rules (4px grid, comfortable spacing)
- Use typography scale (no random sizes)
- Maintain visual consistency across pages

---

## Before You Edit Anything

### Inspect the Codebase
1. Read the page/component you're about to change
2. Understand the current data flow
3. Check what state exists (UI only? Any logic?)

### Understand the Workflow
1. What problem does this page solve?
2. What data needs to be displayed?
3. How does it connect to other pages?
4. What actions can the user take?

### Check the Product Bible
- Look up the page in `BEE-AURA-PRODUCT-BIBLE.md`
- Read the page purpose (5-second answer)
- Check the success criteria
- Verify the data model

### Review the UI Spec
- Check `BEE-AURA-UI-SPEC.md` for design tokens
- Verify spacing, typography, colors
- Check component rules (panels, buttons, badges, tables, etc.)

### Ask These Questions
1. Is this change product-first or theme-first?
2. Will fake data be visible and realistic?
3. Does the layout work at 1440px?
4. Will `npm run build` pass?
5. Can I complete this in one phase without breaking other pages?

**If any answer is "no": ask Haydn first.**

---

## During Implementation

### Work Phase-by-Phase
1. **Do NOT parallelize feature work** — finish Home before starting Dashboard
2. **Do NOT refactor large sections** unless explicitly approved
3. **Do NOT add new dependencies** without approval
4. **Work one page or one major section at a time**

### Implementation Checklist
- [ ] Inspect current code
- [ ] Understand the workflow being changed
- [ ] Read the Product Bible page definition
- [ ] Review the UI spec for design rules
- [ ] Implement using only fake data
- [ ] Apply design tokens (no hardcoded values)
- [ ] Verify responsive at 1440px
- [ ] Test navigation links
- [ ] Run `npm run build`
- [ ] Report changes clearly

### Red Flags (STOP if you see these)
- Any import of `axios`, `fetch` (unless mocked)
- Any environment variable (`.env`, `process.env`)
- Any external API service (`openai`, `stripe`, `supabase`, `twilio`)
- Any database setup (`sqlite`, `postgres`, `supabase`)
- Any API credential or secret in code
- Any route not in the approved list
- Any color/spacing not from the design spec
- Any UI that breaks at 1440px
- Text wrapping to one word per line
- Build fails

**If you spot a red flag: stop immediately and ask Haydn.**

---

## Code Quality Standards

### Fake Data Rules
- **All data is hardcoded or generated** at component load
- **No persistence** between page reloads (demo only)
- **No API calls** to external services
- **Mock data utilities** in `/app/lib/mockData.ts` (centralize fake data)
- **Clear naming**: `mockLeads()`, `mockConversations()`, etc.

### Component Structure
```
/app
  /components
    - Reusable components only (Button, Card, Panel, Badge)
    - No page-specific logic here
  /(route)
    - page.tsx (page component)
    - No sub-folders unless absolutely necessary
```

### Import Paths
- Use relative paths: `import { Button } from '@/components/Button'`
- Avoid deeply nested folders
- Keep component tree flat

### File Naming
- Component files: PascalCase (`Button.tsx`, `KpiCard.tsx`)
- Page files: lowercase folder, `page.tsx` inside
- Mock data: camelCase (`mockLeads.ts`, `mockBookings.ts`)

### TypeScript
- Use types/interfaces (don't use `any`)
- Define data model types matching `BEE-AURA-PRODUCT-BIBLE.md`
- Keep types close to where they're used

---

## Scope Boundaries

### ✅ IN SCOPE
- Building pages with fake data
- Styling pages with Bee-Aura design tokens
- Creating navigation between pages
- Adding status indicators, badges, tables
- Displaying mock lead/message/booking data
- Creating form layouts (read-only or demo interaction)

### ❌ OUT OF SCOPE
- Real database
- Real API calls
- Supabase, Firebase, etc.
- Stripe, payment processing
- Twilio, WhatsApp, messaging APIs
- OpenAI, AI integrations
- Email sending
- Authentication / login
- Deployment setup
- CI/CD configuration

**Any of these requires explicit approval.**

---

## Design Token Application

### Colors
Always use tokens from `BEE-AURA-UI-SPEC.md`:

**Bad (hardcoded):**
```css
background-color: #0f0f0f;
```

**Good (token-based):**
```css
background-color: var(--neutral-950);
```

Or in React:
```tsx
className="bg-neutral-950 text-neutral-100"
```

### Spacing
4px grid only:

**Bad:**
```css
padding: 10px 15px;
margin: 20px 0;
```

**Good:**
```css
padding: 8px 16px; /* 2×4px, 4×4px */
margin: 24px 0; /* 6×4px */
```

### Charts & SVG Data
Small SVG values are acceptable if driven by data:

**Acceptable (data-driven):**
```jsx
<rect width={dataValue * 10} height={scale} />
```

**Not acceptable (hardcoded layout):**
```jsx
<rect x="42" y="18" width="200" height="150" /> // hardcoded positions
```

### Typography
Use the scale from the spec:

**Bad:**
```css
font-size: 15px;
line-height: 1.4;
```

**Good:**
```css
/* Heading 3 */
font-size: 20px;
line-height: 28px;
font-weight: 600;
```

---

## Testing Before Reporting

### Build Verification
```bash
npm run build
```
**This MUST pass.** If it doesn't, fix errors before reporting.

### Responsive Check
- Open page in browser (1280px–1440px viewport)
- Test all links and interactions
- Verify no text wrapping issues
- Check sidebar navigation
- Verify fake data displays correctly

### Data Flow Check
- Is all data fake? ✅
- Are there any API calls? ❌
- Do components get data from mock utilities? ✅
- Do routes link to the right pages? ✅

### Scope Check
- No database imports? ✅
- No external API keys? ✅
- No undeclared dependencies? ✅
- No broken links? ✅

---

## Reporting Changes

When you finish a phase, report in this format:

```
## Changed Files
- app/page.tsx (Home page: added KPI summary grid)
- app/components/KpiCard.tsx (New: KPI card component)
- app/lib/mockData.ts (New: mockLeads, mockStats functions)

## What Changed
Brief 1-2 sentence description of what was implemented.

## Build Status
✅ npm run build passes

## Testing
- [x] Fake data renders correctly
- [x] Responsive at 1440px
- [x] No external API calls
- [x] All navigation links work
- [x] No hardcoded color/spacing values
- [x] Design tokens applied

## Notes
Any blockers or questions for the next phase.

## Remaining Work
What should happen in the next phase.
```

---

## Workflow Checklift Before & After

### Before You Start
- [ ] Read the page purpose in the Product Bible
- [ ] Understand the success criteria
- [ ] Review the design spec
- [ ] Inspect the current code
- [ ] Ask: "Is this product-first?"

### During Implementation
- [ ] Work on ONE page/phase at a time
- [ ] Use only fake data
- [ ] Apply design tokens (no hardcoded values)
- [ ] Keep components small and reusable
- [ ] Add TypeScript types
- [ ] Test responsive at 1440px

### After Implementation
- [ ] Run `npm run build` (must pass)
- [ ] Verify fake data displays
- [ ] Test all navigation links
- [ ] Check responsive layout
- [ ] Report changes clearly
- [ ] Ask for approval before next phase

---

## Questions? Decision Tree

| Question | Answer | Next Step |
|----------|--------|-----------|
| Is this local/demo only? | No | Ask Haydn ❌ |
| Will build pass? | No | Fix errors before reporting ❌ |
| Is all data fake? | No | Use mock data ❌ |
| Does it break at 1440px? | Yes | Fix responsive layout ❌ |
| Am I hardcoding colors/spacing? | Yes | Use design tokens ❌ |
| Is this product-first? | No | Reconsider the change ❌ |
| Do I need a new route? | Yes | Ask Haydn ❌ |
| Do I need to install a package? | Yes | Ask Haydn ❌ |
| Does all this still apply? | No | Re-read this file ❌ |

**If all answers are "yes" (good answers):** proceed with confidence ✅

---

## No Exceptions

These are **hard rules**. No exceptions without explicit approval from Haydn:

1. **Fake data only** — No real database
2. **No external services** — No APIs, no credentials
3. **No new routes** — Only the approved list
4. **No random design changes** — Every change serves the product
5. **Build must pass** — Always
6. **Design tokens only** — No hardcoded colors/spacing
7. **Product first** — Workflow > aesthetics

---

## Summary

**Before you code:**
1. Inspect
2. Understand
3. Review spec
4. Ask questions

**While coding:**
1. Fake data only
2. Use design tokens
3. Work phase-by-phase
4. No random changes

**After coding:**
1. Build passes
2. Test fake data
3. Verify responsive
4. Report clearly

**If stuck:**
- Ask Haydn ✅
- Don't guess ❌
- Don't skip rules ❌
