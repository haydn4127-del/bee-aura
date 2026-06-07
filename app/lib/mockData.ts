/**
 * Bee-Aura Mock Data
 * Central source of truth for all fake demo data
 * Business: Northfield Home Services, Birmingham UK
 * Owner: Marcus Northfield
 */

// ============================================================================
// TYPES
// ============================================================================

export interface Business {
  name: string;
  owner: string;
  coordinator: string;
  contact: string;
  location: string;
  timezone: string;
  services: string[];
}

export interface Lead {
  id: string;
  name: string;
  contact: string;
  service: string;
  source: string;
  status: "new" | "contacted" | "qualified" | "quoted" | "negotiating" | "lost";
  priority: "high" | "medium" | "low";
  value: number;
  lastContact: string; // ISO date
  action: string;
  notes?: string;
}

export interface Conversation {
  id: string;
  name: string;
  channel: "WhatsApp" | "SMS" | "Email" | "Phone";
  latest: string;
  urgency: "critical" | "high" | "medium" | "low";
  status: "awaiting-reply" | "replied" | "completed" | "pending-quote";
  aiAction: string;
  time: string; // relative time like "2 hours ago"
  unread: boolean;
}

export interface Booking {
  id: string;
  name: string;
  service: string;
  date: string; // ISO date
  time: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  confirmation: string; // "sms", "email", "phone", "none"
  action: string;
  value: number;
}

export interface Customer {
  id: string;
  name: string;
  contact: string;
  service: string;
  value: number;
  lastInteraction: string; // ISO date
  action: string;
  jobs: number;
}

export interface FollowUp {
  id: string;
  name: string;
  task: string;
  dueDate: string; // ISO date
  daysOverdue: number;
  priority: "critical" | "high" | "medium" | "low";
  type: "callback" | "quote-follow" | "booking-confirm" | "payment" | "review";
  lastContact: string; // ISO date
}

export interface Review {
  id: string;
  name: string;
  service: string;
  date: string; // ISO date
  rating: number; // 1-5
  text: string;
  status: "pending" | "published";
  source: "google" | "trustpilot" | "website";
}

export interface ActivityEvent {
  id: string;
  type: "lead-created" | "message-received" | "booking-confirmed" | "quote-sent" | "review-published" | "follow-up-completed" | "payment-received";
  description: string;
  timestamp: string; // ISO date
  user: string; // "System" or name
  detail: string;
}

export interface ErrorEvent {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string; // ISO date
  status: "active" | "resolved";
  action?: string;
}

export interface DashboardSummary {
  openLeads: number;
  hotLeads: number;
  messages: number;
  followUpsDue: number;
  bookingsToday: number;
  reviewsReady: number;
  pipelineValue: number;
  automatedDrafts: number;
}

// ============================================================================
// BUSINESS INFO
// ============================================================================

export const mockBusiness: Business = {
  name: "Northfield Home Services",
  owner: "Marcus Northfield",
  coordinator: "Sarah",
  contact: "+44 121 555 0200",
  location: "Birmingham, UK",
  timezone: "GMT",
  services: [
    "Emergency boiler repair",
    "Plumbing leak repair",
    "Drain clearance",
    "Electrical fault inspection",
    "Thermostat installation",
    "Annual boiler servicing",
    "Maintenance plans",
  ],
};

// ============================================================================
// LEADS
// ============================================================================

export const mockLeads: Lead[] = [
  {
    id: "lead-001",
    name: "Amelia Ward",
    contact: "+44 121 555 1001",
    service: "Emergency boiler repair",
    source: "Google Ads",
    status: "qualified",
    priority: "high",
    value: 450,
    lastContact: "2026-06-07T09:30:00Z",
    action: "Send quote for 3-hour emergency callout",
    notes: "Boiler stopped responding, heating off, urgent",
  },
  {
    id: "lead-002",
    name: "Daniel Khan",
    contact: "+44 121 555 1002",
    service: "Plumbing leak repair",
    source: "Trustpilot referral",
    status: "contacted",
    priority: "high",
    value: 280,
    lastContact: "2026-06-06T14:15:00Z",
    action: "Call to confirm appointment",
    notes: "Kitchen sink leak, downstairs cupboard affected",
  },
  {
    id: "lead-003",
    name: "Priya Shah",
    contact: "+44 121 555 1003",
    service: "Annual boiler servicing",
    source: "Maintenance plan signup",
    status: "quoted",
    priority: "medium",
    value: 150,
    lastContact: "2026-06-05T11:00:00Z",
    action: "Follow up on quote acceptance",
  },
  {
    id: "lead-004",
    name: "Lucas Green",
    contact: "+44 121 555 1004",
    service: "Drain clearance",
    source: "Facebook",
    status: "new",
    priority: "high",
    value: 220,
    lastContact: "2026-06-07T16:45:00Z",
    action: "Initial contact required",
    notes: "Bathroom shower backing up, recurring issue",
  },
  {
    id: "lead-005",
    name: "Eleanor Price",
    contact: "+44 121 555 1005",
    service: "Thermostat installation",
    source: "Website form",
    status: "contacted",
    priority: "medium",
    value: 320,
    lastContact: "2026-06-06T10:20:00Z",
    action: "Send smart thermostat options",
  },
  {
    id: "lead-006",
    name: "Ben Carter",
    contact: "+44 121 555 1006",
    service: "Electrical fault inspection",
    source: "Direct phone",
    status: "negotiating",
    priority: "high",
    value: 380,
    lastContact: "2026-06-07T13:30:00Z",
    action: "Negotiate inspection fee and timeline",
    notes: "Intermittent lighting fault, safety concern",
  },
  {
    id: "lead-007",
    name: "Jade Wilson",
    contact: "+44 121 555 1007",
    service: "Emergency boiler repair",
    source: "Google Ads",
    status: "lost",
    priority: "high",
    value: 500,
    lastContact: "2026-06-04T15:00:00Z",
    action: "Send re-engagement offer",
    notes: "Called competitor, price sensitivity",
  },
  {
    id: "lead-008",
    name: "Michael Osei",
    contact: "+44 121 555 1008",
    service: "Maintenance plans",
    source: "Referral from Amelia Ward",
    status: "qualified",
    priority: "medium",
    value: 600,
    lastContact: "2026-06-07T11:15:00Z",
    action: "Explain maintenance plan benefits",
  },
  {
    id: "lead-009",
    name: "Sophie Turner",
    contact: "+44 121 555 1009",
    service: "Plumbing leak repair",
    source: "Local directory",
    status: "quoted",
    priority: "medium",
    value: 310,
    lastContact: "2026-06-05T09:45:00Z",
    action: "Check quote acceptance",
  },
  {
    id: "lead-010",
    name: "Oliver Hayes",
    contact: "+44 121 555 1010",
    service: "Annual boiler servicing",
    source: "Repeat customer re-contact",
    status: "qualified",
    priority: "low",
    value: 150,
    lastContact: "2026-06-07T08:00:00Z",
    action: "Confirm booking slot",
  },
];

// ============================================================================
// CONVERSATIONS / MESSAGES
// ============================================================================

export const mockConversations: Conversation[] = [
  {
    id: "conv-001",
    name: "Amelia Ward",
    channel: "WhatsApp",
    latest: "Can you come today? Boiler completely off, no heat",
    urgency: "critical",
    status: "awaiting-reply",
    aiAction: "Propose emergency 2-hour slot, confirm access",
    time: "2 minutes ago",
    unread: true,
  },
  {
    id: "conv-002",
    name: "Daniel Khan",
    channel: "SMS",
    latest: "What's the cost for the emergency callout?",
    urgency: "high",
    status: "awaiting-reply",
    aiAction: "Send quote, mention 3-hour response time",
    time: "18 minutes ago",
    unread: true,
  },
  {
    id: "conv-003",
    name: "Priya Shah",
    channel: "Email",
    latest: "Do you cover the overflow pipe too? Re: Annual Boiler Service",
    urgency: "medium",
    status: "replied",
    aiAction: "Clarify service scope, upsell overflow inspection",
    time: "3 hours ago",
    unread: false,
  },
  {
    id: "conv-004",
    name: "Eleanor Price",
    channel: "WhatsApp",
    latest: "How long does installation usually take?",
    urgency: "low",
    status: "awaiting-reply",
    aiAction: "Send installation timeline and photos",
    time: "yesterday",
    unread: true,
  },
  {
    id: "conv-005",
    name: "Ben Carter",
    channel: "Phone",
    latest: "Last call: Can you do Friday afternoon? (voicemail)",
    urgency: "high",
    status: "pending-quote",
    aiAction: "Call back immediately, confirm Friday slot",
    time: "1 hour ago",
    unread: false,
  },
  {
    id: "conv-006",
    name: "Lucas Green",
    channel: "Facebook",
    latest: "Just saw your 5-star reviews. Can you help with shower backup?",
    urgency: "medium",
    status: "awaiting-reply",
    aiAction: "Send initial contact, propose site visit",
    time: "3 hours ago",
    unread: true,
  },
  {
    id: "conv-007",
    name: "Jade Wilson",
    channel: "Email",
    latest: "Thanks for the quote, but we're going with another company",
    urgency: "low",
    status: "completed",
    aiAction: "Send discount re-engagement offer",
    time: "2 days ago",
    unread: false,
  },
  {
    id: "conv-008",
    name: "Michael Osei",
    channel: "WhatsApp",
    latest: "Can maintenance plans include emergency callouts?",
    urgency: "medium",
    status: "awaiting-reply",
    aiAction: "Explain plan tiers with emergency coverage",
    time: "4 hours ago",
    unread: true,
  },
];

// ============================================================================
// BOOKINGS
// ============================================================================

export const mockBookings: Booking[] = [
  {
    id: "book-001",
    name: "Amelia Ward",
    service: "Emergency boiler repair",
    date: "2026-06-07",
    time: "14:00",
    status: "confirmed",
    confirmation: "sms",
    action: "Engineer dispatch confirmed",
    value: 450,
  },
  {
    id: "book-002",
    name: "Daniel Khan",
    service: "Plumbing leak repair",
    date: "2026-06-08",
    time: "10:30",
    status: "pending",
    confirmation: "none",
    action: "Awaiting customer confirmation",
    value: 280,
  },
  {
    id: "book-003",
    name: "Eleanor Price",
    service: "Thermostat installation",
    date: "2026-06-10",
    time: "14:00",
    status: "confirmed",
    confirmation: "email",
    action: "Installation scheduled, parts in stock",
    value: 320,
  },
  {
    id: "book-004",
    name: "Sophie Turner",
    service: "Plumbing leak repair",
    date: "2026-06-09",
    time: "09:00",
    status: "confirmed",
    confirmation: "phone",
    action: "Customer confirmed, materials ready",
    value: 310,
  },
  {
    id: "book-005",
    name: "Ben Carter",
    service: "Electrical fault inspection",
    date: "2026-06-13",
    time: "15:30",
    status: "confirmed",
    confirmation: "email",
    action: "Safety inspection booked",
    value: 180,
  },
  {
    id: "book-006",
    name: "Oliver Hayes",
    service: "Annual boiler servicing",
    date: "2026-06-16",
    time: "11:00",
    status: "pending",
    confirmation: "none",
    action: "Send booking confirmation reminder",
    value: 150,
  },
];

// ============================================================================
// CUSTOMERS
// ============================================================================

export const mockCustomers: Customer[] = [
  {
    id: "cust-001",
    name: "Amelia Ward",
    contact: "+44 121 555 1001",
    service: "Emergency boiler repair",
    value: 1250,
    lastInteraction: "2026-06-07T14:00:00Z",
    action: "Maintenance plan upsell",
    jobs: 3,
  },
  {
    id: "cust-002",
    name: "Daniel Khan",
    contact: "+44 121 555 1002",
    service: "Plumbing repairs",
    value: 890,
    lastInteraction: "2026-06-08T10:30:00Z",
    action: "Request review after completion",
    jobs: 2,
  },
  {
    id: "cust-003",
    name: "Priya Shah",
    contact: "+44 121 555 1003",
    service: "Annual servicing",
    value: 450,
    lastInteraction: "2026-06-05T11:00:00Z",
    action: "Convert to maintenance plan",
    jobs: 1,
  },
  {
    id: "cust-004",
    name: "Eleanor Price",
    contact: "+44 121 555 1005",
    service: "Thermostat installation",
    value: 720,
    lastInteraction: "2026-06-10T14:00:00Z",
    action: "Send smart home tips",
    jobs: 2,
  },
  {
    id: "cust-005",
    name: "Ben Carter",
    contact: "+44 121 555 1006",
    service: "Electrical inspection",
    value: 1100,
    lastInteraction: "2026-06-13T15:30:00Z",
    action: "Schedule follow-up inspection",
    jobs: 2,
  },
  {
    id: "cust-006",
    name: "Jade Wilson",
    contact: "+44 121 555 1007",
    service: "Boiler repair",
    value: 450,
    lastInteraction: "2026-06-04T15:00:00Z",
    action: "Win-back discount offer",
    jobs: 1,
  },
  {
    id: "cust-007",
    name: "Sophie Turner",
    contact: "+44 121 555 1009",
    service: "Plumbing",
    value: 640,
    lastInteraction: "2026-06-09T09:00:00Z",
    action: "Request review after job",
    jobs: 2,
  },
  {
    id: "cust-008",
    name: "Oliver Hayes",
    contact: "+44 121 555 1010",
    service: "Maintenance plans",
    value: 2300,
    lastInteraction: "2026-06-16T11:00:00Z",
    action: "Renew annual maintenance plan",
    jobs: 8,
  },
];

// ============================================================================
// FOLLOW-UPS
// ============================================================================

export const mockFollowUps: FollowUp[] = [
  {
    id: "followup-001",
    name: "Amelia Ward",
    task: "Post-repair feedback call",
    dueDate: "2026-06-08T16:00:00Z",
    daysOverdue: 0,
    priority: "high",
    type: "callback",
    lastContact: "2026-06-07T14:00:00Z",
  },
  {
    id: "followup-002",
    name: "Daniel Khan",
    task: "Confirm booking time, send engineer details",
    dueDate: "2026-06-07T17:00:00Z",
    daysOverdue: 0,
    priority: "critical",
    type: "booking-confirm",
    lastContact: "2026-06-07T11:20:00Z",
  },
  {
    id: "followup-003",
    name: "Priya Shah",
    task: "Respond to email question about overflow pipe",
    dueDate: "2026-06-07T18:00:00Z",
    daysOverdue: 0,
    priority: "medium",
    type: "quote-follow",
    lastContact: "2026-06-05T11:00:00Z",
  },
  {
    id: "followup-004",
    name: "Lucas Green",
    task: "Send drainage assessment proposal",
    dueDate: "2026-06-08T09:00:00Z",
    daysOverdue: 0,
    priority: "high",
    type: "callback",
    lastContact: "2026-06-07T12:30:00Z",
  },
  {
    id: "followup-005",
    name: "Eleanor Price",
    task: "Send thermostat installation photos and timeline",
    dueDate: "2026-06-08T10:00:00Z",
    daysOverdue: 0,
    priority: "medium",
    type: "quote-follow",
    lastContact: "2026-06-07T08:15:00Z",
  },
  {
    id: "followup-006",
    name: "Ben Carter",
    task: "Call to confirm Friday afternoon slot",
    dueDate: "2026-06-07T17:30:00Z",
    daysOverdue: 0,
    priority: "critical",
    type: "booking-confirm",
    lastContact: "2026-06-07T15:45:00Z",
  },
  {
    id: "followup-007",
    name: "Sophie Turner",
    task: "Request 5-star Google review after completion",
    dueDate: "2026-06-10T16:00:00Z",
    daysOverdue: 0,
    priority: "medium",
    type: "review",
    lastContact: "2026-06-09T09:00:00Z",
  },
  {
    id: "followup-008",
    name: "Oliver Hayes",
    task: "Send maintenance plan renewal reminder",
    dueDate: "2026-06-16T14:00:00Z",
    daysOverdue: 0,
    priority: "low",
    type: "callback",
    lastContact: "2026-06-16T11:00:00Z",
  },
  {
    id: "followup-009",
    name: "Jade Wilson",
    task: "Send 10% discount re-engagement offer",
    dueDate: "2026-06-06T10:00:00Z",
    daysOverdue: 1,
    priority: "low",
    type: "callback",
    lastContact: "2026-06-04T15:00:00Z",
  },
];

// ============================================================================
// REVIEWS & TESTIMONIALS
// ============================================================================

export const mockReviews: Review[] = [
  {
    id: "review-001",
    name: "Michael Osei",
    service: "Emergency boiler repair (2025)",
    date: "2026-06-01T00:00:00Z",
    rating: 5,
    text: "Fantastic service. Engineer arrived within 2 hours, very professional. Boiler working perfectly now. Highly recommend!",
    status: "published",
    source: "google",
  },
  {
    id: "review-002",
    name: "Eleanor Price",
    service: "Thermostat installation (May 2026)",
    date: "2026-06-03T00:00:00Z",
    rating: 5,
    text: "Marcus explained everything clearly. Smart thermostat now working great. Saving on heating bills already. Great advice on usage too.",
    status: "pending",
    source: "trustpilot",
  },
  {
    id: "review-003",
    name: "Amelia Ward",
    service: "Emergency boiler repair (June 2026)",
    date: "2026-06-07T00:00:00Z",
    rating: 5,
    text: "Outstanding! Called at 2pm, engineer here by 4pm. Fixed immediately. Very impressed. Worth every penny.",
    status: "pending",
    source: "google",
  },
  {
    id: "review-004",
    name: "Ben Carter",
    service: "Electrical fault inspection (2025)",
    date: "2025-11-15T00:00:00Z",
    rating: 4,
    text: "Thorough inspection. Found the fault and explained the solution clearly. Professional service. Recommend.",
    status: "published",
    source: "google",
  },
  {
    id: "review-005",
    name: "Oliver Hayes",
    service: "Maintenance plans (ongoing)",
    date: "2026-05-20T00:00:00Z",
    rating: 5,
    text: "Been with them 3 years. Peace of mind knowing we're covered. Annual service is reliable and thorough. Will renew.",
    status: "published",
    source: "website",
  },
  {
    id: "review-006",
    name: "Priya Shah",
    service: "Annual boiler servicing (pending)",
    date: "2026-06-07T00:00:00Z",
    rating: 0,
    text: "",
    status: "pending",
    source: "google",
  },
  {
    id: "review-007",
    name: "Daniel Khan",
    service: "Plumbing leak repair (pending)",
    date: "2026-06-07T00:00:00Z",
    rating: 0,
    text: "",
    status: "pending",
    source: "google",
  },
  {
    id: "review-008",
    name: "Sophie Turner",
    service: "Plumbing repairs (pending)",
    date: "2026-06-07T00:00:00Z",
    rating: 0,
    text: "",
    status: "pending",
    source: "trustpilot",
  },
];

// ============================================================================
// ACTIVITY LOG
// ============================================================================

export const mockActivityLog: ActivityEvent[] = [
  {
    id: "activity-001",
    type: "message-received",
    description: "Critical: Boiler down, no heat",
    timestamp: "2026-06-07T16:45:00Z",
    user: "System",
    detail: "Amelia Ward (WhatsApp) — Emergency support triggered",
  },
  {
    id: "activity-002",
    type: "booking-confirmed",
    description: "Emergency callout booked",
    timestamp: "2026-06-07T16:50:00Z",
    user: "Marcus",
    detail: "Amelia Ward — 2-hour emergency slot confirmed for today 14:00",
  },
  {
    id: "activity-003",
    type: "message-received",
    description: "Quote request received",
    timestamp: "2026-06-07T11:20:00Z",
    user: "System",
    detail: "Daniel Khan (SMS) — Cost inquiry for plumbing leak repair",
  },
  {
    id: "activity-004",
    type: "quote-sent",
    description: "Quote sent",
    timestamp: "2026-06-07T11:35:00Z",
    user: "Marcus",
    detail: "Daniel Khan — £280 emergency callout quote, 3-hour response",
  },
  {
    id: "activity-005",
    type: "lead-created",
    description: "New lead from Facebook",
    timestamp: "2026-06-07T12:30:00Z",
    user: "System",
    detail: "Lucas Green — Drain clearance inquiry, shower backing up",
  },
  {
    id: "activity-006",
    type: "message-received",
    description: "Email question received",
    timestamp: "2026-06-05T11:00:00Z",
    user: "System",
    detail: "Priya Shah (Email) — Does annual service include overflow pipe?",
  },
  {
    id: "activity-007",
    type: "booking-confirmed",
    description: "Booking confirmed",
    timestamp: "2026-06-03T09:15:00Z",
    user: "System",
    detail: "Eleanor Price — Thermostat installation Tuesday 10 June 14:00",
  },
  {
    id: "activity-008",
    type: "quote-sent",
    description: "Maintenance plan proposal",
    timestamp: "2026-06-07T11:20:00Z",
    user: "Sarah",
    detail: "Michael Osei — Annual maintenance plan with emergency coverage £600",
  },
  {
    id: "activity-009",
    type: "review-published",
    description: "5-star review published",
    timestamp: "2026-06-01T10:00:00Z",
    user: "System",
    detail: "Michael Osei (Google) — Emergency boiler repair 5 stars published",
  },
  {
    id: "activity-010",
    type: "message-received",
    description: "Voicemail callback reminder",
    timestamp: "2026-06-07T15:45:00Z",
    user: "System",
    detail: "Ben Carter (Phone) — Friday afternoon appointment request (voicemail)",
  },
  {
    id: "activity-011",
    type: "booking-confirmed",
    description: "Plumbing booking confirmed",
    timestamp: "2026-06-05T14:20:00Z",
    user: "Sarah",
    detail: "Sophie Turner — Plumbing leak repair Sunday 9 June 09:00",
  },
  {
    id: "activity-012",
    type: "message-received",
    description: "Customer lost to competitor",
    timestamp: "2026-06-04T15:00:00Z",
    user: "System",
    detail: "Jade Wilson (Email) — Declined quote, chose another provider",
  },
  {
    id: "activity-013",
    type: "lead-created",
    description: "Referral lead received",
    timestamp: "2026-06-07T11:10:00Z",
    user: "Amelia Ward",
    detail: "Michael Osei — Referred for maintenance plan (from Amelia Ward)",
  },
];

// ============================================================================
// ERROR & WARNING LOG
// ============================================================================

export const mockErrorLog: ErrorEvent[] = [
  {
    id: "error-001",
    severity: "critical",
    title: "Quote response time exceeded",
    message: "Daniel Khan quote outstanding for 6+ hours — auto-follow-up triggered",
    timestamp: "2026-06-07T17:20:00Z",
    status: "active",
    action: "Call customer immediately",
  },
  {
    id: "error-002",
    severity: "critical",
    title: "Booking not confirmed",
    message: "Oliver Hayes maintenance plan booking still pending — confirm within 24 hours",
    timestamp: "2026-06-07T14:00:00Z",
    status: "active",
    action: "Send SMS reminder to customer",
  },
  {
    id: "error-003",
    severity: "warning",
    title: "Overdue follow-up",
    message: "Jade Wilson win-back offer not sent — 1 day overdue",
    timestamp: "2026-06-07T10:00:00Z",
    status: "active",
    action: "Send 10% discount re-engagement offer",
  },
  {
    id: "error-004",
    severity: "warning",
    title: "Message awaiting response",
    message: "Eleanor Price thermostat installation question — 8 hours without reply",
    timestamp: "2026-06-07T16:15:00Z",
    status: "active",
    action: "Send photos and installation details",
  },
  {
    id: "error-005",
    severity: "info",
    title: "Review published",
    message: "Michael Osei 5-star review now showing on Google",
    timestamp: "2026-06-01T10:00:00Z",
    status: "resolved",
  },
  {
    id: "error-006",
    severity: "warning",
    title: "Low inventory alert",
    message: "Smart thermostat models in stock: 2 units remaining",
    timestamp: "2026-06-06T09:30:00Z",
    status: "resolved",
    action: "Reorder ASAP",
  },
];

// ============================================================================
// DASHBOARD SUMMARY
// ============================================================================

export const mockDashboardSummary: DashboardSummary = {
  openLeads: 127,
  hotLeads: 38,
  messages: 21,
  followUpsDue: 14,
  bookingsToday: 9,
  reviewsReady: 11,
  pipelineValue: 18400,
  automatedDrafts: 8,
};

// ============================================================================
// EXPORT HELPER FUNCTIONS
// ============================================================================

export function getMockLeads(): Lead[] {
  return mockLeads;
}

export function getMockConversations(): Conversation[] {
  return mockConversations;
}

export function getMockBookings(): Booking[] {
  return mockBookings;
}

export function getMockCustomers(): Customer[] {
  return mockCustomers;
}

export function getMockFollowUps(): FollowUp[] {
  return mockFollowUps;
}

export function getMockReviews(): Review[] {
  return mockReviews;
}

export function getMockActivityLog(): ActivityEvent[] {
  return mockActivityLog;
}

export function getMockErrorLog(): ErrorEvent[] {
  return mockErrorLog;
}

export function getMockBusiness(): Business {
  return mockBusiness;
}

export function getMockDashboardSummary(): DashboardSummary {
  return mockDashboardSummary;
}
