# Bee-Aura AI — Feature Acceptance Checklist

Use this checklist to verify each page is complete and ready before proceeding to the next phase.

---

## Phase 1: Home Page (`/`)

### Product Completeness
- [ ] Page greets the owner by name (Marcus Northfield)
- [ ] Displays 3-5 key stats (calls today, urgent leads, pending follow-ups, revenue today, jobs booked)
- [ ] Shows next 3 actions due NOW (critical: follow-ups, callbacks, messages needing reply)
- [ ] Recent activity list (last 5 events with timestamps)
- [ ] All elements link to deeper pages

### Fake Data
- [ ] Stats show realistic numbers (25+ demo leads, 12+ bookings, 8+ follow-ups)
- [ ] Owner name is "Marcus Northfield"
- [ ] Activity log has 5+ events with timestamps
- [ ] Customer examples: Amelia Ward, Daniel Khan, Priya Shah, Lucas Green, Eleanor Price, Ben Carter, Jade Wilson, Michael Osei
- [ ] Services are home-services based (boiler repair, plumbing, drainage, electrical, thermostat, servicing)
- [ ] Links navigate correctly to `/dashboard`, `/leads`, `/follow-ups`

### Design & Responsive
- [ ] Uses Bee-Aura dark theme (dark backgrounds, light text)
- [ ] All colors are design tokens (no hardcoded hex)
- [ ] Spacing is 4px-based (4, 8, 12, 16, 24, 32, 48)
- [ ] Responsive at 1280px–1440px (no single-column, comfortable text)
- [ ] Cards minimum 280px width
- [ ] No text wrapping to one word per line
- [ ] Sidebar navigation visible

### Navigation & Scope
- [ ] No external API calls
- [ ] No database imports
- [ ] All data is hardcoded or from mock utilities
- [ ] No credentials in code
- [ ] Links point to approved routes only

### Build & Quality
- [ ] `npm run build` passes
- [ ] No console errors
- [ ] TypeScript errors = 0
- [ ] Components are small and reusable

---

## Phase 2: Dashboard Page (`/dashboard`)

### Product Completeness
- [ ] KPI cards: new leads (week), conversion rate (%), callback rate < 4 hours (%), average job value (£), customer satisfaction (%), repeat customer rate (%)
- [ ] Trend indicators (up/down arrows) for week-over-week comparison
- [ ] Top lead sources (emergency calls, Google, Facebook, referral, website)
- [ ] Lead urgency breakdown (critical emergencies, high-value jobs, scheduled services)
- [ ] No more than 8 visual elements on page

### Fake Data
- [ ] KPI cards show realistic numbers (25+ new leads per week, 50% conversion, 95% callback rate)
- [ ] Trends show realistic week-over-week changes
- [ ] Lead sources match home-services (emergency calls, Google, Facebook, referral, website)
- [ ] Urgency breakdown reflects service-business demand

### Design & Responsive
- [ ] All KPI cards use semantic color tokens
- [ ] Charts use Bee-Aura color palette only
- [ ] No gradients or 3D effects
- [ ] Responsive at 1280px–1440px (grid layout, not single column)
- [ ] All text readable

### Navigation & Scope
- [ ] No external API calls
- [ ] Charts are data-driven (no decorative)
- [ ] All colors from spec
- [ ] Links to other pages work

### Build & Quality
- [ ] `npm run build` passes
- [ ] No console errors
- [ ] Chart library is lightweight (e.g., Recharts, Chart.js, or manual SVG)

---

## Phase 3: Leads Page (`/leads`)

### Product Completeness
- [ ] Leads grouped by stage: Emergency/Urgent, Interested, Awaiting Quote, Booked, Completed, Won't Proceed
- [ ] Each lead shows: name, phone, address, service needed, urgency, time since contact, next action, status
- [ ] Can filter by source, urgency, date range (optional for MVP)
- [ ] Quick actions: call customer, send quote, create follow-up, mark as booked
- [ ] At least 15+ demo leads distributed across stages

### Fake Data
- [ ] Lead names, phone numbers, addresses are realistic UK examples
- [ ] Mix of contact dates (recent + old)
- [ ] Next actions vary (call, send quote, arrange visit, follow-up)
- [ ] Urgency indicators: critical (emergency), high (urgent), normal (standard)
- [ ] Services match home-services offerings

### Design & Responsive
- [ ] Uses table or card layout (readable at 1280px–1440px)
- [ ] Row hover state clear
- [ ] Urgency badges use semantic colors (red/yellow/green)
- [ ] No skinny columns
- [ ] Text readable (no forced wrapping)

### Navigation & Scope
- [ ] Clicking lead name could link to messages/activity (future)
- [ ] Click "View Messages" links to `/messages`
- [ ] All data is fake
- [ ] No external API calls

### Build & Quality
- [ ] `npm run build` passes
- [ ] No console errors

---

## Phase 4: Messages Page (`/messages`)

### Product Completeness
- [ ] All conversation threads listed
- [ ] Sort by: urgency (unanswered voicemail first), date, channel (phone, WhatsApp, SMS, email, Facebook)
- [ ] Preview of last message visible
- [ ] Unread badge count (voicemails especially prominent)
- [ ] Quick actions: reply, resolve, archive
- [ ] At least 10+ demo conversation threads

### Fake Data
- [ ] Thread subjects match customer names and emergency status
- [ ] Last message preview is readable
- [ ] Timestamps are realistic (recent + older)
- [ ] Mix of channels (phone voicemail, WhatsApp, SMS, email, Facebook)
- [ ] Some threads unread, some read, some with high urgency

### Design & Responsive
- [ ] Thread list readable at 1280px–1440px
- [ ] Hover state clear
- [ ] Unread/urgent state visually distinct (color or badge)
- [ ] Preview text truncated gracefully (no forced wrapping)

### Navigation & Scope
- [ ] Click thread to expand (optional for MVP)
- [ ] Link to linked lead `/leads`
- [ ] All data is fake
- [ ] No external messaging API

### Build & Quality
- [ ] `npm run build` passes
- [ ] No console errors

---

## Phase 5: Bookings Page (`/bookings`)

### Product Completeness
- [ ] Calendar view (preferred) or list with date/time columns
- [ ] Show: customer name, service, date/time, location, engineer assigned, status
- [ ] Next 7 days highlighted (upcoming)
- [ ] Emergency/same-day jobs at top
- [ ] Past bookings shown (completed)
- [ ] Quick actions: reschedule, send reminder, mark complete, collect payment
- [ ] At least 7+ upcoming + 5+ past bookings

### Fake Data
- [ ] Customer names match demo customers (Amelia Ward, Daniel Khan, etc.)
- [ ] Services match home-services offerings (boiler repair, plumbing, drain clearance, electrical, thermostat, servicing)
- [ ] Times are realistic (typical service hours)
- [ ] Locations vary (customer addresses, same-day emergency vs. scheduled)
- [ ] Engineer names (Marcus Northfield + sub-contractors)
- [ ] Status shows: pending, confirmed, completed, cancelled, awaiting-parts

### Design & Responsive
- [ ] Calendar/list readable at 1280px–1440px
- [ ] Date/time columns have sufficient width
- [ ] Status badges use semantic colors
- [ ] Hover state clear

### Navigation & Scope
- [ ] Click booking to show customer details (optional for MVP)
- [ ] Link to Customer page
- [ ] All data is fake
- [ ] No calendar API integration

### Build & Quality
- [ ] `npm run build` passes
- [ ] No console errors

---

## Phase 6: Customers Page (`/customers`)

### Product Completeness
- [ ] List of all customers (paginated, 10 per page or scrollable)
- [ ] Columns: name, phone, address, last service, total spend, last 12 months value, status
- [ ] Search by name/phone/address
- [ ] Sort by: recent, value, status
- [ ] Quick action: schedule service, send reminder, request review
- [ ] At least 20+ demo customers

### Fake Data
- [ ] Customer names, phone numbers, addresses are realistic UK examples
- [ ] Last service dates vary (recent + old)
- [ ] Total spend ranges from £300–£5,000+
- [ ] Status: active, inactive, lead, dormant
- [ ] Mix of one-time customers + repeat regulars

### Design & Responsive
- [ ] Table readable at 1280px–1440px
- [ ] Columns well-spaced (no forced wrapping)
- [ ] Row hover state clear
- [ ] Sort indicators visible

### Navigation & Scope
- [ ] Click customer to show full history (optional for MVP)
- [ ] Link to bookings/messages
- [ ] All data is fake
- [ ] No CRM API

### Build & Quality
- [ ] `npm run build` passes
- [ ] No console errors

---

## Phase 7: Follow-Ups Page (`/follow-ups`)

### Product Completeness
- [ ] Grouped by urgency: CRITICAL (red, now), URGENT (yellow, same day), Due Soon (blue, 1-3 days)
- [ ] Each shows: description, customer name, due time, job value, owner
- [ ] At least 8+ follow-ups (3 overdue, 3 due today, 2 due soon)
- [ ] Focus on callback urgency and critical follow-ups
- [ ] Quick actions: mark done, call customer, snooze

### Fake Data
- [ ] Follow-up descriptions: call to confirm, send quote, collect payment, annual service reminder, replacement part arrived
- [ ] Dates are realistic (overdue = past time, today = current time, soon = 1-7 days)
- [ ] Linked to real customers from demo data
- [ ] Priority indicators (critical, high, medium, low)

### Design & Responsive
- [ ] Urgency grouping visually clear
- [ ] Color coding matches design spec (red/yellow/blue)
- [ ] Text readable at 1280px–1440px
- [ ] Urgency badges prominent

### Navigation & Scope
- [ ] Click follow-up to see linked lead/conversation (optional)
- [ ] All data is fake
- [ ] No task management API

### Build & Quality
- [ ] `npm run build` passes
- [ ] No console errors

---

## Phase 8: Reviews Page (`/reviews`)

### Product Completeness
- [ ] Pending review requests listed
- [ ] Completed reviews + testimonials shown (with stars + comment)
- [ ] "Request Review" button for past jobs
- [ ] Show: customer name, service, date completed, review status
- [ ] At least 5 pending + 3 completed + 2 testimonials

### Fake Data
- [ ] Request dates align with completed job dates
- [ ] Testimonials are plausible (50–100 words) for home-services (e.g., "Fixed my boiler quickly, very professional")
- [ ] Star ratings (4-5 stars for good, 3 stars for average)
- [ ] Status: pending, requested, completed, declined
- [ ] Request method: WhatsApp, SMS, email

### Design & Responsive
- [ ] Pending and completed sections visually separated
- [ ] Testimonials readable with good spacing
- [ ] Cards readable at 1280px–1440px

### Navigation & Scope
- [ ] Link to customer who gave review
- [ ] All data is fake
- [ ] No review platform integration

### Build & Quality
- [ ] `npm run build` passes
- [ ] No console errors

---

## Phase 9: Activity Log Page (`/activity-log`)

### Product Completeness
- [ ] Timeline of all actions
- [ ] Columns: timestamp, action, actor, customer/job name, details
- [ ] Filter by: action type, date range, actor (optional for MVP)
- [ ] Download as CSV option (optional for MVP)
- [ ] At least 30+ demo events

### Fake Data
- [ ] Events span across time range (past month)
- [ ] Action types: lead_created, message_received, booking_confirmed, followup_marked_done, call_logged, payment_collected, review_requested
- [ ] Actors: "marcus@northfield.co.uk", "sarah@northfield.co.uk"
- [ ] Details contextual (e.g., "Customer: Amelia Ward, Service: Emergency Boiler Repair, Urgency: Critical")

### Design & Responsive
- [ ] Timeline/list readable at 1280px–1440px
- [ ] Columns well-spaced
- [ ] Timestamp easy to read
- [ ] Action labels clear

### Navigation & Scope
- [ ] Can click to link to related lead/booking (optional)
- [ ] All data is fake
- [ ] No backend logging API

### Build & Quality
- [ ] `npm run build` passes
- [ ] No console errors

---

## Phase 10: Error Log Page (`/error-log`)

### Product Completeness
- [ ] List of warnings/errors
- [ ] Columns: severity, message, timestamp, linked job/customer, resolved status
- [ ] Color-coded by severity (green=info, yellow=warning, red=error, black=critical)
- [ ] At least 3-4 critical warnings, 5-6 low-priority warnings
- [ ] Focus on: unanswered voicemails, overdue callbacks, overdue follow-ups, payment delays
- [ ] Quick actions: mark resolved, snooze

### Fake Data
- [ ] Error messages are realistic (unanswered voicemail, overdue callback, missed follow-up, payment due)
- [ ] Severity levels vary (critical: 4 hours without callback; error: 24 hours; warning: < 48 hours)
- [ ] Timestamps recent (last week)
- [ ] Resolved status shown (some done, some pending)

### Design & Responsive
- [ ] Severity color-coding clear (critical highlighted top)
- [ ] Critical items prominent (top of list)
- [ ] Text readable at 1280px–1440px

### Navigation & Scope
- [ ] Click error to show linked object (optional)
- [ ] All data is fake
- [ ] No error tracking API

### Build & Quality
- [ ] `npm run build` passes
- [ ] No console errors

---

## Phase 11: Settings Page (`/settings`)

### Product Completeness
- [ ] User profile section (name, email, phone, timezone)
- [ ] Notification preferences (alerts for unanswered calls, overdue follow-ups)
- [ ] Service categories list (for job tagging)
- [ ] Business hours (for callback scheduling)
- [ ] Team members view (read-only in demo)
- [ ] At least 7 service categories, 2 team members

### Fake Data
- [ ] Profile: Marcus Northfield, marcus@northfield.co.uk, +44 121 555 0200, UK/London
- [ ] Service categories: Emergency Boiler Repair, Plumbing Leak Repair, Drain Clearance, Electrical Fault Inspection, Thermostat Installation, Annual Boiler Servicing, Maintenance Plans
- [ ] Business hours: Mon-Fri 8am-6pm, Sat 9am-5pm, Sun Emergency Only
- [ ] Team members: Marcus Northfield (owner), Sarah (coordinator)

### Design & Responsive
- [ ] Sections clearly labeled
- [ ] Form fields readable at 1280px–1440px
- [ ] No actual form submission (demo only)
- [ ] Read-only status clear for team section

### Navigation & Scope
- [ ] No actual settings save (demo only)
- [ ] All data is fake
- [ ] No backend API

### Build & Quality
- [ ] `npm run build` passes
- [ ] No console errors

---

## System-Wide Checks

### Navigation
- [ ] Sidebar navigation visible on all pages
- [ ] Active route highlighted
- [ ] All 11 primary routes accessible
- [ ] Secondary `/sandbox-*` routes not in main nav (or separate section)
- [ ] No duplicate navigation items

### Brand & Design System
- [ ] All pages use Bee-Aura dark theme
- [ ] Text colors: primary (`neutral-100`), secondary (`neutral-400`)
- [ ] All background colors from spec (`neutral-black`, `neutral-950`, `neutral-900`)
- [ ] All button styles consistent (size, padding, hover)
- [ ] All badges use semantic colors correctly
- [ ] Tables/lists have consistent styling
- [ ] No hardcoded color values (all tokens)

### Responsive Laptop Layout (1280px–1440px)
- [ ] All pages readable at 1280px–1440px
- [ ] No single-column layouts
- [ ] Sidebar visible on all pages
- [ ] Cards minimum 280px wide
- [ ] No text wrapping to one word per line
- [ ] Multi-column layouts comfortable
- [ ] No horizontal scrolling at normal laptop widths

### Fake Data Only
- [ ] No database imports
- [ ] No API service imports (openai, stripe, supabase, twilio)
- [ ] No environment variables for credentials
- [ ] All data from mock utilities
- [ ] No network requests (except optional mock/dev)
- [ ] No real customer data

### Build & Quality
- [ ] `npm run build` passes (all pages)
- [ ] TypeScript errors = 0
- [ ] No console errors (dev mode)
- [ ] No unused imports
- [ ] Components are reusable and small

### External Services
- [ ] No Supabase
- [ ] No Stripe
- [ ] No Twilio/WhatsApp
- [ ] No OpenAI
- [ ] No email API
- [ ] No calendar API
- [ ] No integrations

---

## Sign-Off

**Ready for launch when:**
- [ ] All 11 pages complete
- [ ] System-wide checks pass
- [ ] Build passes
- [ ] Responsive at 1280px–1440px
- [ ] No external services
- [ ] All data is fake
- [ ] Navigation works end-to-end
- [ ] Haydn approves

---

## Notes
- This is a demo/sandbox environment for **Northfield Home Services** (UK home-services company)
- All data resets on page reload (no persistence)
- No real business operations using this system yet
- Owner: Marcus Northfield, Team: Marcus + Sarah
- Services: Emergency boiler repair, plumbing, drainage, electrical, thermostat, servicing, maintenance plans
- Future phases will add real data, real database, and integrations
