# Bee-Aura AI / Lead Recovery OS — Product Bible

## Product Positioning

**Not a chatbot. Not a CRM. A service-business operating dashboard.**

Bee-Aura AI is purpose-built for service professionals (coaches, therapists, consultants, freelancers) who struggle with:
- Leads that slip through the cracks
- Conversations buried across channels
- Forgotten follow-ups
- No visibility into business pipeline
- Customers asking "why didn't you follow up?"

**Bee-Aura solves this by being ruthlessly focused**: See everything. Follow up on everything. Never lose a lead again.

---

## Product Vision

### What It Does (in 5 seconds)
- Shows all leads in one place
- Displays every conversation thread
- Highlights who needs follow-up
- Confirms booked appointments
- Tracks what stage each customer is at
- Surfaces warnings (missed follow-ups, errors)
- Keeps the owner in control

### What It Is NOT
- A chatbot interface
- A CRM for enterprises
- A calendar app
- A messaging platform
- A marketing automation tool
- A sales training system

### Core Belief
**The owner is the system of record.** Bee-Aura shows the owner everything they need to make decisions, not automated recommendations. The owner decides; Bee-Aura enforces follow-up.

---

## Navigation Map

### Dashboard Hub
- **Route**: `/`
- **Purpose**: Home overview
- **Shows**: Welcome message, quick stats, recent activity, next actions
- **Answers in 5 sec**: "What's happening today?"

### Dashboard Analytics
- **Route**: `/dashboard`
- **Purpose**: KPI snapshot
- **Shows**: Leads this month, conversion rate, overdue follow-ups, new customers
- **Answers in 5 sec**: "Am I on track this month?"

### Lead Pipeline
- **Route**: `/leads`
- **Purpose**: Recover missing leads, manage pipeline
- **Shows**: All leads grouped by stage (contacted, interested, proposal, won, lost), time since contact, next action
- **Answers in 5 sec**: "Who is at risk of being dropped?"

### Messages & Conversations
- **Route**: `/messages`
- **Purpose**: Conversation management
- **Shows**: All conversation threads, last message date, unread status, linked to lead
- **Answers in 5 sec**: "What conversations need my attention?"

### Bookings & Appointments
- **Route**: `/bookings`
- **Purpose**: Confirmed appointments
- **Shows**: Calendar view (or list), client name, time, service type, confirmation status
- **Answers in 5 sec**: "What am I booked to do today?"

### Customers
- **Route**: `/customers`
- **Purpose**: Customer relationship view
- **Shows**: All customers, lifetime value, last contact, current status, linked leads/messages
- **Answers in 5 sec**: "Who are my best customers? Who haven't I talked to?"

### Follow-Ups (Enforcement)
- **Route**: `/follow-ups`
- **Purpose**: Overdue follow-ups dashboard
- **Shows**: All due/overdue follow-ups, urgency indicator, linked lead, action type
- **Answers in 5 sec**: "What am I behind on?"

### Reviews & Testimonials
- **Route**: `/reviews`
- **Purpose**: Review request management
- **Shows**: Pending review requests, completed reviews, testimonials, request templates
- **Answers in 5 sec**: "Who should I ask for a review?"

### Activity Log (Audit Trail)
- **Route**: `/activity-log`
- **Purpose**: System event history
- **Shows**: All actions (lead created, message sent, booking confirmed, follow-up marked done), timestamp, user
- **Answers in 5 sec**: "What happened and when?"

### Error Log (Warnings)
- **Route**: `/error-log`
- **Purpose**: System health and failures
- **Shows**: Errors, warnings, missed follow-ups, sync failures, data inconsistencies
- **Answers in 5 sec**: "Is anything broken? What needs my attention?"

### Settings
- **Route**: `/settings`
- **Purpose**: Configuration
- **Shows**: User profile, notification preferences, service categories, team members, integrations
- **Answers in 5 sec**: "How do I configure the system for my business?"

---

## Fake Business Definition (Demo Data)

### Company Profile
**Northfield Home Services**
- Owner: Marcus Northfield
- Service: Emergency plumbing, heating, electrical, and drainage
- Location: Birmingham, UK (serves 15-mile radius)
- Team: Marcus (owner/lead engineer) + Sarah (coordinator/admin)
- Monthly target: 25 new leads, 12 bookings, 100% callback within 4 hours

### Service Offerings
1. **Emergency Boiler Repair** — Call-out service (hourly + parts)
2. **Plumbing Leak Repair** — Same-day or emergency (fixed + hourly)
3. **Drain Clearance** — Blocked drain specialist (fixed price)
4. **Electrical Fault Inspection** — Safety inspection + quote (diagnostic fee)
5. **Thermostat Installation** — Smart controls installation (parts + labour)
6. **Annual Boiler Servicing** — Maintenance plan (seasonal bookings)
7. **Maintenance Plans** — Recurring quarterly visits (subscription billing)

### Lead Sources
- Emergency (911 calls, urgent voicemail)
- Google/Yelp search
- Facebook / local ads
- Past customer referral
- Website inquiry form
- WhatsApp direct message

---

## Fake Data Model

### Lead Object
```
{
  id: "lead_001",
  name: "Amelia Ward",
  email: "amelia@example.com",
  phone: "+44 121 555 0147",
  address: "42 Riverside Drive, Birmingham B15 2QE",
  source: "emergency_call",
  dateCreated: "2026-06-07T09:15:00Z",
  lastContactDate: "2026-06-07T09:30:00Z",
  stage: "contacted",        // contacted, interested, proposal, won, lost, abandoned
  service: "Emergency Boiler Repair",
  jobValue: "£180–£450",
  urgency: "critical",       // critical, high, normal, low
  nextAction: "Call to confirm engineer visit",
  nextActionDue: "2026-06-07T10:00:00Z",
  status: "active",          // active, inactive, on-hold, waiting-parts, waiting-payment
  messages: 1,               // linked conversation count
  followUps: 1               // pending follow-ups
}
```

### Conversation Object
```
{
  id: "conv_001",
  leadId: "lead_001",
  subject: "Emergency boiler breakdown — 42 Riverside",
  channel: "phone_voicemail",  // phone_voicemail, whatsapp, sms, email, facebook
  participants: ["+44 121 555 0147", "+44 121 555 0200"],
  messages: [
    {
      id: "msg_001",
      from: "+44 121 555 0147",
      to: "+44 121 555 0200",
      date: "2026-06-07T09:15:00Z",
      content: "Hi Marcus, my boiler's stopped working. Can you help? Please call back.",
      unread: true
    }
  ],
  lastMessageDate: "2026-06-07T09:15:00Z",
  unreadCount: 1,
  status: "active"
}
```

### Booking Object
```
{
  id: "booking_001",
  customerId: "customer_001",
  leadId: "lead_001",
  serviceType: "Emergency Boiler Repair",
  date: "2026-06-07",
  time: "11:30",
  duration: 120,
  location: "42 Riverside Drive, Birmingham B15 2QE",
  status: "confirmed",        // pending, confirmed, completed, cancelled, awaiting-parts
  clientName: "Amelia Ward",
  clientPhone: "+44 121 555 0147",
  estimatedValue: "£350",
  engineer: "Marcus Northfield",
  notes: "Boiler won't fire. Check ignition & controls. May need parts.",
  remindSent: true
}
```

### Customer Object
```
{
  id: "customer_001",
  name: "Amelia Ward",
  email: "amelia@example.com",
  phone: "+44 121 555 0147",
  address: "42 Riverside Drive, Birmingham B15 2QE",
  joinDate: "2026-05-01",
  status: "active",           // active, inactive, lead
  totalBookings: 4,
  lastBookingDate: "2026-06-07",
  lifetimeValue: "£1,200",
  linkedLeads: ["lead_001"],
  linkedConversations: ["conv_001"],
  notes: "Regular maintenance customer. Pays on invoice. Friendly."
}
```

### Follow-Up Object
```
{
  id: "followup_001",
  type: "call_to_confirm",    // call_to_confirm, send_quote, collect_payment, annual_service_reminder, replacement_part_arrived
  linkedLeadId: "lead_001",
  linkedCustomerId: "customer_001",
  description: "Call Amelia Ward to confirm engineer arrival time",
  dueDate: "2026-06-07T10:00:00Z",
  status: "overdue",          // pending, done, skipped, overdue
  createdDate: "2026-06-07T09:30:00Z",
  completedDate: null,
  owner: "marcus@northfield.co.uk",
  priority: "critical"        // critical, high, medium, low
}
```

### Review Request Object
```
{
  id: "review_001",
  customerId: "customer_001",
  serviceName: "Emergency Boiler Repair - June 2026",
  dateCompleted: "2026-06-07",
  status: "pending",          // pending, requested, completed, declined
  requestDate: "2026-06-08",
  requestMethod: "whatsapp",  // email, sms, whatsapp, phone
  templateUsed: "Service Review",
  reviewContent: null,
  reviewRating: null
}
```

### Activity Log Entry
```
{
  id: "activity_001",
  timestamp: "2026-06-07T09:30:00Z",
  action: "lead_created",     // lead_created, message_received, booking_confirmed, followup_marked_done, call_logged, etc.
  actor: "marcus@northfield.co.uk",
  targetId: "lead_001",
  targetType: "lead",
  details: {
    leadName: "Amelia Ward",
    source: "emergency_call",
    service: "Emergency Boiler Repair",
    priority: "critical"
  },
  severity: "info"            // info, warning, error
}
```

### Error Log Entry
```
{
  id: "error_001",
  timestamp: "2026-06-07T10:15:00Z",
  type: "missed_followup",    // missed_followup, unanswered_voicemail, data_sync_failure, integration_error
  severity: "critical",       // info, warning, error, critical
  message: "URGENT: Follow-up overdue by 15 min — Call Amelia Ward to confirm engineer visit (lead: critical)",
  linkedId: "followup_001",
  linkedType: "follow-up",
  resolved: false,
  resolutionDate: null
}
```

---

## Lead Lifecycle

### Stage Flow
1. **Contacted** — Initial outreach made, awaiting response
2. **Interested** — Lead has engaged, exploring options
3. **Proposal** — Proposal sent or in discussion
4. **Won** → Converts to Customer, creates Booking
5. **Lost** — Explicitly rejected
6. **Abandoned** — No contact for 30+ days

### Parallel Workflows
- **Messages** run alongside lead stage (can contact at any stage)
- **Follow-Ups** track required actions (email, call, send proposal)
- **Bookings** happen when lead moves to "Won" or when customer books directly

### Safety Net: Error Log
If a follow-up is overdue by 2+ days, it shows in Error Log. If 5+ overdue, it's **critical**.

---

## Page Interconnections

```
HOME (/home)
├─ Quick KPI overview
├─ Recent leads added
├─ Overdue follow-ups
└─ Next actions

  ↓ Click "View Pipeline"

LEADS (/leads)
├─ All leads by stage
├─ Click lead name → shows:
│  ├─ Messages (/messages filtered to this lead)
│  ├─ Follow-ups (/follow-ups filtered to this lead)
│  └─ Activity (/activity-log filtered to this lead)
└─ Mark as Won → creates Booking + Customer

  ↓ Click "View Messages"

MESSAGES (/messages)
├─ All conversation threads
├─ Click thread → full conversation view
└─ Link to Lead or Customer

  ↓ Click "View Bookings"

BOOKINGS (/bookings)
├─ Calendar/list view
├─ Click booking → Customer details + related Lead
└─ Mark as Completed → trigger Review Request

  ↓ Click "View Customers"

CUSTOMERS (/customers)
├─ All customers (past + active)
├─ Click customer → full history:
│  ├─ Linked leads
│  ├─ Conversation history
│  ├─ Bookings
│  └─ Reviews
└─ Trigger follow-up action

  ↓ Overdue follow-up?

FOLLOW-UPS (/follow-ups)
├─ Grouped by urgency
├─ Mark as Done
└─ Linked to Lead + Customer

  ↓ Review needed?

REVIEWS (/reviews)
├─ Send review request
├─ Track response
└─ Display testimonial

ACTIVITY LOG (/activity-log)
├─ All system events
└─ Filter by type, date, actor

ERROR LOG (/error-log)
├─ Overdue follow-ups
├─ Data inconsistencies
└─ System warnings

SETTINGS (/settings)
├─ Profile
├─ Preferences
└─ Team management
```

---

## Success Criteria per Page

### Home (/)
- Greets owner by name (Marcus Northfield)
- Shows 3-5 key stats (calls today, urgent leads, pending follow-ups, revenue today, jobs booked)
- Lists next 3 actions due NOW (critical: follow-ups, callbacks, messages needing reply)
- Shows recent activity (last 5 events: calls logged, bookings confirmed, reviews requested)
- Links to deeper pages

### Dashboard (/dashboard)
- KPI cards: New leads (week), conversion rate (%), callback rate < 4 hours (%), average job value (£), customer satisfaction (%), repeat customer rate (%)
- Trends (week vs. previous week)
- Top lead sources (emergency calls, Google, Facebook, referral, website)
- Lead urgency breakdown (critical emergencies, high-value jobs, scheduled services)
- No more than 8 visual elements

### Leads (/leads)
- Leads grouped by stage (Emergency/Urgent, Interested, Awaiting Quote, Booked, Completed, Won't Proceed)
- Each lead shows: name, phone, address, service needed, urgency, time since contact, next action, status
- Filter by source, urgency, date range
- Quick actions: call customer, send quote, create follow-up, mark as booked

### Messages (/messages)
- All conversation threads
- Sort by: urgency (unanswered voicemail first), date, channel (phone, WhatsApp, SMS, email, Facebook)
- Preview of last message
- Unread badge count (voicemails especially)
- Quick reply / archive / mark resolved options

### Bookings (/bookings)
- Calendar view (preferred) or list with date/time columns
- Show: customer name, service, date, time, location, engineer assigned, status
- Next 7 days highlighted
- Emergency/same-day jobs at top
- Quick actions: reschedule, send reminder, mark complete, collect payment

### Customers (/customers)
- List of all customers (paginated)
- Columns: name, phone, address, last service, total spend, last 12 months value, status
- Search by name/phone/address
- Sort by: recent, value, status
- Quick action: schedule service, send reminder, request review

### Follow-Ups (/follow-ups)
- Grouped by urgency: CRITICAL (red, now), URGENT (yellow, same day), Due Soon (blue, 1-3 days)
- Each shows: description, customer name, due time, job value, owner
- Quick actions: mark done, call customer, snooze

### Reviews (/reviews)
- Pending requests (after completed job)
- Completed reviews + testimonials (show stars + comment)
- "Request Review" button for past jobs
- Show: customer name, service, date completed, review status

### Activity Log (/activity-log)
- Timeline of all actions
- Columns: timestamp, action, actor, customer/job name, details
- Filter by: action type, date range, actor
- Download as CSV option

### Error Log (/error-log)
- List of warnings/errors
- Columns: severity, message, timestamp, linked job/customer, resolved status
- Color-coded by severity (green=info, yellow=warning, red=error, black=critical)
- Focus on: unanswered voicemails, overdue callbacks, overdue follow-ups, payment delays
- Mark resolved / snooze options

### Settings (/settings)
- User profile (name, email, phone, timezone)
- Notification preferences (alerts for unanswered calls, overdue follow-ups)
- Service categories list (for job tagging)
- Team members (read-only in demo)
- Business hours (for callback scheduling)

---

## Fake Data Density

Every page should have **realistic demo data** that shows the product is real and working:

- **Home**: 8+ demo stats (calls today, urgent leads, overdue follow-ups, revenue, etc.), 5 recent activities
- **Dashboard**: 6 KPI cards with trend arrows (new leads, conversion rate, callbacks < 4hr, avg job value, customer satisfaction, repeat rate)
- **Leads**: 15+ leads across 5 stages (emergency calls, website enquiries, past referrals, Facebook leads)
- **Messages**: 10+ conversation threads (voicemails, WhatsApp, SMS, email, Facebook messages)
- **Bookings**: 7 upcoming bookings + 5 past bookings (emergency repairs, scheduled service, maintenance visits)
- **Customers**: 20+ customers (active regulars, new, inactive, repeat clients)
- **Follow-Ups**: 8 pending (3 overdue, 3 due today, 2 due soon) — focus on callback urgency
- **Reviews**: 5 pending, 3 completed, 2 testimonials
- **Activity Log**: 30+ recent events (calls logged, leads created, bookings confirmed, payments collected, reviews requested)
- **Error Log**: 3-4 critical warnings (missed callbacks, overdue follow-ups), 5-6 low-priority warnings

**Demo Customer Names** (UK-based):
- Amelia Ward — emergency boiler repair — missed call — critical
- Daniel Khan — bathroom leak — website form — high value
- Priya Shah — annual boiler service — follow-up due
- Lucas Green — blocked drain — booking tomorrow
- Eleanor Price — thermostat install — review ready
- Ben Carter — maintenance plan — returning customer
- Jade Wilson — electrical fault inspection — message needs reply
- Michael Osei — leak diagnostics — voicemail lead
- Sophie Bennett — emergency call-out — already booked
- Tom Hughes — winter servicing — seasonal customer

No empty states—every page shows realistic data that demonstrates an active, busy home-services business.

---

## Data Ownership

All data is **hardcoded or generated at runtime**. No:
- Database calls
- API requests
- Local storage persistence (data resets on page reload)
- Environment variables
- Credentials

Every data fetch is a mock/fake. Every component reads from a fake data hook or utility.

---

## Next Steps

1. Verify all routes exist and link correctly
2. Implement each page with fake data
3. Ensure responsive layout at 1440px
4. Apply design tokens from `BEE-AURA-UI-SPEC.md`
5. Test navigation flow end-to-end
6. Verify `npm run build` passes
