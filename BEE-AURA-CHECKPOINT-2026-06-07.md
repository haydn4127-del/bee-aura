# Bee-Aura AI / Lead Recovery OS Checkpoint — 2026-06-07

## Current status
Local/demo sandbox only in GitHub Codespaces.

Project path:
`/workspaces/bee-aura`

## Scope
- Fake data only
- No database
- No Supabase
- No Stripe
- No Twilio
- No WhatsApp
- No OpenAI API
- No API keys
- No live integrations
- No real customer data
- No deployment

## Current workflow
Use ChatGPT Controlled Terminal Mode:
1. One controlled change at a time
2. Exact terminal command/file replacement
3. Run `npm run build`
4. Preview changed page
5. Commit and push
6. Then next change

Avoid broad Copilot redesigns.

## Routes now present
- /
- /dashboard
- /leads
- /messages
- /bookings
- /customers
- /follow-ups
- /reviews
- /activity-log
- /error-log
- /settings

## Governance
Governance/spec files created and corrected:
- AGENTS.md
- .github/copilot-instructions.md
- BEE-AURA-PRODUCT-BIBLE.md
- BEE-AURA-UI-SPEC.md
- BEE-AURA-COPILOT-RULES.md
- BEE-AURA-ACCEPTANCE-CHECKLIST.md

Product principle:
Product first. Theme second. Brand everywhere.

## Demo business
Northfield Home Services  
Birmingham, UK  
Owner: Marcus Northfield  
Coordinator: Sarah

Services:
- Emergency boiler repair
- Plumbing leak repair
- Drain clearance
- Electrical fault inspection
- Thermostat installation
- Annual boiler servicing
- Maintenance plans

## Data
Central fake data file:
`app/lib/mockData.ts`

## Design progress
Dashboard:
- Moving toward dark Bee-Aura command-centre style.
- 12-column layout added.
- Assistant card changed to wide strip.
- Needs final polishing later, one change at a time.

Leads:
- Moving toward premium Leads table layout.
- Top controls added.
- Tabs added.
- Table, badges, pagination and Lead Outcomes card added.
- Sidebar assistant card added.
- Current tweak needed: Leads page/table box should drop/stretch a little lower to fill the page better while keeping text readable.

## Next recommended step
Continue with Leads page only:
- CSS-only vertical fit tweak
- Build
- Preview
- Commit
Then move to the next single page/section.
