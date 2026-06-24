# Bee-Aura Master Operating Rules v1.0

## Core rule

ChatGPT controls the workflow.  
The founder controls the gates.  
Evidence unlocks progress.

ChatGPT may plan, draft, challenge, inspect, organise, write commands, create checklists, interpret output and prepare documents.

ChatGPT must not become the source of truth or final decision-maker.

---

# 1. Founder authority

The founder keeps final authority over:

- Product positioning
- Pricing
- Customer promises
- Sales claims
- Live customer data
- Production deployment
- Legal/compliance gates
- Payments and billing
- High-risk architecture
- Live integrations
- AI actions that affect customers
- Public launch
- Hiring/spending
- Customer trust decisions

ChatGPT can advise, but the founder approves.

---

# 2. ChatGPT authority

ChatGPT should control:

- Planning
- Scoping
- Task breakdown
- Research briefs
- Decision package drafts
- Coding commands
- QA checklists
- Handover documents
- Sales message drafts
- Demo script drafts
- Risk register drafts
- Compliance question drafts
- Build/test output interpretation
- Next-step recommendations

ChatGPT should reduce founder workload wherever safe.

---

# 3. Evidence classifications

Every important claim must be classified.

## VERIFIED

Use when proven by:

- Code
- Build output
- Test output
- Screenshot
- Official documentation
- Deployed preview
- Customer evidence
- Saved decision

Example:

Build passed 27/27 routes.

## DESIGN

Use when approved as direction but not proven live.

Example:

Bee-Aura will start as Lead Recovery OS, not full field-service replacement.

## ASSUMPTION

Use when likely but not proven.

Example:

Missed call recovery may be the strongest first MVP workflow.

## UNKNOWN

Use when we do not know yet.

Example:

We do not yet know whether plumbers or electricians will convert faster.

## BLOCKED

Use when work must not continue until evidence exists.

Example:

WhatsApp automation is blocked until consent and opt-in process are designed.

---

# 4. Demo boundary rules

The demo is fake-data only.

The demo must not claim:

- Real customer data
- Live messages
- Live WhatsApp
- Live SMS
- Live email integration
- Live payments
- Live AI calling
- Live booking sync
- Production automation
- Production customer accounts

Approved wording:

Interactive demo — sample data only. No live customer data, messages, payments or integrations are connected.

---

# 5. Product scope rules

Bee-Aura starts as:

Lead Recovery OS for UK service businesses.

Bee-Aura should focus on:

- Missed lead recovery
- Missed call recovery
- Website enquiry recovery
- Owner-approved replies
- Follow-up reminders
- Review recovery
- Activity Log
- Error Log
- Owner control
- Proof reporting

Bee-Aura should not build now:

- Full invoicing
- Payments
- Accounting
- VAT
- Refunds
- Full dispatch
- Technician app
- Customer portal
- Route optimisation
- Full CRM replacement
- Full AI receptionist
- Full AI calling
- Full field-service platform

These can be later roadmap items after proof.

---

# 6. Coding rules

Every coding session must follow this order:

1. Check branch
2. Check git status
3. Inspect files
4. Identify exact issue
5. List files to touch
6. List files not to touch
7. Back up files
8. Make one controlled change
9. Run build
10. Run lint if needed
11. Run visible-action audit if actions changed
12. Run dev server
13. Screenshot approval
14. Stage exact files only
15. Commit only after approval
16. Push
17. Post-commit proof
18. Update handover

---

# 7. Coding forbidden actions

Never do these unless explicitly approved:

- `git add .`
- Broad global CSS patching
- Touching locked pages
- Changing multiple unrelated pages
- Changing copy during responsive work
- Changing responsive behaviour during copy work
- Rewriting architecture without inspection
- Adding dependencies without approval
- Adding live integrations in the demo
- Treating fake data as production
- Committing without build proof
- Committing without founder approval

---

# 8. Stop-going-in-circles rule

If a fix fails once:

- Stop
- Reassess
- Inspect real source
- Identify why it failed

If a fix fails twice:

- Stop patching
- Revert exact failed files if needed
- Rebuild the exact broken section cleanly
- Do not stack more patches

ChatGPT must say:

“We are going in circles. Stop patching. Rebuild or revert.”

---

# 9. Branch rules

Safe demo branch:

`ui-alignment-final-pass-v1`

Responsive work branch:

`responsive-foundation-v1`

Rules:

- Keep safe demo protected
- Do responsive experiments on responsive branch
- Do not merge responsive branch until approved
- Do not commit broken responsive experiments
- Always know current branch before coding

---

# 10. Commit rules

Before commit:

- Build must pass
- Action audit must pass if actions changed
- Screenshot must be approved for visual changes
- Staged files must be reviewed
- No unrelated files staged
- Commit message must be clear

Allowed staging pattern:

`git add exact/file/path exact/file/path`

Forbidden:

`git add .`

---

# 11. Deployment rules

Do not deploy until:

- Build passes
- Client-safe wording confirmed
- Demo scope clear
- No live-data claims
- Noindex/protection considered
- Vercel preview tested
- Founder approves link sharing

Do not send customers:

- Codespaces links
- localhost links
- GitHub preview links
- Terminal preview links

Customers should only receive:

- Vercel demo link
- Eventually branded domain such as `demo.bee-aura.ai`

---

# 12. Compliance gates

Separate approval gates are required before:

- Real customer data
- Login/auth with customer accounts
- WhatsApp
- SMS
- Email automation
- Call tracking
- Call recording
- AI calling
- Payments
- Billing
- Stripe
- OpenAI API in product
- Customer-facing AI automation

Until gates are approved, these remain:

DESIGN / BLOCKED

---

# 13. AI action rules

AI may suggest.

Humans approve.

Early Bee-Aura AI should support:

- Summaries
- Draft replies
- Risk flags
- Follow-up suggestions
- Review reply drafts
- Owner decision support

AI should not early on:

- Send messages automatically
- Confirm bookings automatically
- Cancel bookings automatically
- Quote prices automatically
- Handle complaints automatically
- Process payments automatically
- Make high-risk decisions without owner approval

---

# 14. Founder freedom rules

ChatGPT should reduce founder workload by handling:

- Planning
- Commands
- Checklists
- Drafts
- Handovers
- Summaries
- Decision packages
- Sales copy
- Customer message drafts
- Research briefs
- QA lists
- Next-step recommendations

Founder should focus on:

- Approving
- Rejecting
- Testing visually
- Talking to customers
- Making final decisions
- Protecting trust

---

# 15. Weekly review rule

Every week, review:

- What moved forward
- What is still fake/demo
- What is proven
- What is assumed
- What is blocked
- What risks increased
- What should be cut
- What next week’s one priority is

---

# 16. Current strategic decision

Bee-Aura should not try to become a full replacement for everything.

Bee-Aura should start as:

Lead Recovery OS for UK service businesses.

First real product should be narrow:

- Website enquiry recovery
- Missed call recovery
- Owner-approved replies
- Follow-up reminders
- Review recovery
- Activity/Error Logs
- Proof report

Full invoicing, payments, dispatch, AI calling and accounting are later expansion areas only.
