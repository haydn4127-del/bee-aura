export type ControlTone = "gold" | "blue" | "green" | "amber" | "red";

export type ControlDeepThought = {
  label: string;
  title: string;
  lead: string;
  ownerPlain: string;
  aiWork: string[];
  nextAction: string;
  href: string;
  tone: ControlTone;
};

export const controlNav = [
  { href: "/control-centre", label: "Command", kicker: "today" },
  { href: "/control-centre/overview", label: "Overview", kicker: "whole business" },
  { href: "/control-centre/reports", label: "Reports", kicker: "AI signals" },
  { href: "/control-centre/proof", label: "Proof", kicker: "what happened" },
  { href: "/control-centre/system", label: "System", kicker: "risks and fixes" },
  { href: "/control-centre/settings", label: "Settings", kicker: "owner rules" },
];

export const controlDeepThinking = {
  command: {
    label: "Aura thinking",
    title: "Aura reads the day before the owner has to.",
    lead:
      "The Control Centre is not another place to check. It is the place where Aura compresses the whole day into a few owner decisions.",
    ownerPlain:
      "You should not need to open five pages to know what matters. Aura has already grouped the warm work, held the risky replies and brought the next decisions to the front.",
    aiWork: [
      "Ranks fresh enquiries by age, source and likely cooling risk.",
      "Separates safe team work from owner-only decisions.",
      "Finds proof that useful work happened, not just activity.",
      "Turns scattered signals into the next few actions.",
    ],
    nextAction: "Open overview",
    href: "/control-centre/overview",
    tone: "blue" as ControlTone,
  },
  overview: {
    label: "AI business read",
    title: "Aura turns the whole business into protect, fix and improve.",
    lead:
      "Overview should feel like the owner has walked into the control room after Aura has already done the reading.",
    ownerPlain:
      "This page answers three questions fast: what needs protecting, what needs fixing and what is getting better.",
    aiWork: [
      "Groups live customer work into clear business buckets.",
      "Shows small gaps before they become owner headaches.",
      "Connects today’s tasks to proof, reports and settings.",
      "Keeps the owner focused on decisions, not digging.",
    ],
    nextAction: "View reports",
    href: "/control-centre/reports",
    tone: "gold" as ControlTone,
  },
  reports: {
    label: "AI report logic",
    title: "Reports explain why a signal matters, not just what number moved.",
    lead:
      "The owner does not need a wall of charts. They need plain-English judgement from Aura.",
    ownerPlain:
      "Each report should say what changed, why Aura thinks it matters and what to open next.",
    aiWork: [
      "Turns response speed, follow-ups and approval safety into readable signals.",
      "Highlights where warm work may cool down.",
      "Links every signal to a next action or proof source.",
      "Keeps reports useful without making the owner become an analyst.",
    ],
    nextAction: "View proof pack",
    href: "/control-centre/proof",
    tone: "blue" as ControlTone,
  },
  proof: {
    label: "AI proof trail",
    title: "Proof shows what Aura prepared, protected, paused and why.",
    lead:
      "Trust comes from evidence. Aura should make invisible protection visible.",
    ownerPlain:
      "This page proves that replies were held, follow-ups were prepared, review asks were queued and duplicate replies were stopped before they reached a customer.",
    aiWork: [
      "Stores the reason behind each held or prepared action.",
      "Shows the safety trail behind owner approvals.",
      "Turns daily AI decisions into a simple timeline.",
      "Helps the owner trust Aura without blind faith.",
    ],
    nextAction: "Check system",
    href: "/control-centre/system",
    tone: "green" as ControlTone,
  },
  system: {
    label: "AI system watch",
    title: "Aura watches the rules as closely as it watches the leads.",
    lead:
      "The system page is where Aura says: this is safe, this needs attention, and this rule should be tightened.",
    ownerPlain:
      "The owner should see which settings protect the business and which small fixes make the whole setup calmer.",
    aiWork: [
      "Flags gaps in business hours, permissions and reply rules.",
      "Lets safe discovery continue while holding commitments until approval is clear.",
      "Shows fixes before they become customer-facing problems.",
      "Checks the guardrails behind the AI brain.",
    ],
    nextAction: "Open settings",
    href: "/control-centre/settings",
    tone: "amber" as ControlTone,
  },
  settings: {
    label: "Owner guardrails",
    title: "The owner sets the edges. Aura works inside them.",
    lead:
      "Settings should not feel like a technical cupboard. They are the owner’s safety rules for the AI brain.",
    ownerPlain:
      "Aura can handle safe discovery replies once the rules are enabled. The owner approves anything that makes a promise.",
    aiWork: [
      "Keeps quotes, bookings, payments and complaints approval-led.",
      "Lets the team prepare useful work without taking risky decisions.",
      "Keeps the reply tone friendly, clear and service-business neutral.",
      "Makes AI powerful without letting it run wild in tiny boots.",
    ],
    nextAction: "Check proof pack",
    href: "/control-centre/proof",
    tone: "gold" as ControlTone,
  },
};

export const commandStats = [
  {
    label: "Warm work ranked",
    value: "14",
    detail: "Aura compared age, source and urgency so the owner sees what may cool first.",
    tone: "gold" as ControlTone,
  },
  {
    label: "Commitments held safely",
    value: "5",
    detail: "Aura kept simple discovery moving, then held anything that makes a promise.",
    tone: "amber" as ControlTone,
  },
  {
    label: "AI follow-ups prepared",
    value: "9",
    detail: "Quiet customers have friendly nudges ready, with context attached.",
    tone: "blue" as ControlTone,
  },
  {
    label: "Proof points captured",
    value: "23",
    detail: "Aura saved the evidence behind prepared, approved and paused work.",
    tone: "green" as ControlTone,
  },
];

export const commandFocus = [
  {
    title: "Aura ranked today’s owner decisions",
    label: "Owner decision",
    detail:
      "The AI read fresh enquiries, missed calls and follow-ups, then pulled forward the few choices that should not wait.",
    action: "Open overview",
    href: "/control-centre/overview",
    tone: "amber" as ControlTone,
  },
  {
    title: "Proof pack explains what Aura already protected",
    label: "Business proof",
    detail:
      "Held replies, follow-up nudges, review asks and duplicate warnings are grouped into one evidence trail.",
    action: "View proof pack",
    href: "/control-centre/proof",
    tone: "green" as ControlTone,
  },
  {
    title: "Two guardrails need tightening",
    label: "Needs fixing",
    detail:
      "Aura found a permissions note and business-hours setting that should be clearer before the team relies on them.",
    action: "Review system",
    href: "/control-centre/system",
    tone: "red" as ControlTone,
  },
];

export const systemPulse = [
  {
    label: "Aura summary",
    value: "Healthy, with two commitment checks",
    detail: "Aura can handle safe discovery, while commitments still wait for approval.",
    tone: "blue" as ControlTone,
  },
  {
    label: "Biggest risk",
    value: "Slow callbacks",
    detail: "Phone leads cooled faster than message leads. Aura has pushed them up the decision list.",
    tone: "amber" as ControlTone,
  },
  {
    label: "Best lift",
    value: "Review asks",
    detail: "Aura is spotting completed work and preparing review requests more consistently.",
    tone: "green" as ControlTone,
  },
];

export const overviewPanels = [
  {
    title: "What Aura is protecting",
    detail: "The live things owners care about today.",
    tone: "gold" as ControlTone,
    items: [
      "Warm enquiries that should not sit untouched.",
      "Draft replies that include promises or sensitive details.",
      "Quiet customers who need a friendly nudge.",
      "Team actions that should wait for owner approval.",
    ],
  },
  {
    title: "What needs fixing",
    detail: "Small gaps before they become a bigger wobble.",
    tone: "red" as ControlTone,
    items: [
      "Saturday business hours need confirming.",
      "One permission note needs clearer owner language.",
      "A review ask should sound warmer.",
      "Two old follow-ups need reviving or closing.",
    ],
  },
  {
    title: "What is improving",
    detail: "The useful lift Aura found this week.",
    tone: "green" as ControlTone,
    items: [
      "Fresh replies are being prepared faster.",
      "Owner checks are catching promises before sending.",
      "Team context is easier to understand.",
      "Completed jobs are turning into better review asks.",
    ],
  },
];

export const reportCards = [
  {
    title: "Lead response intelligence",
    label: "AI priority score",
    score: 74,
    detail: "Aura thinks most warm enquiries are still recoverable, but callbacks need faster owner attention.",
    action: "See proof",
    href: "/control-centre/proof",
    tone: "gold" as ControlTone,
  },
  {
    title: "Follow-up recovery",
    label: "Quiet customer signal",
    score: 68,
    detail: "Aura found quiet customers and prepared nudges before they disappeared into the day.",
    action: "Open system history",
    href: "/control-centre/system",
    tone: "blue" as ControlTone,
  },
  {
    title: "Owner approval safety",
    label: "Safety signal",
    score: 91,
    detail: "Sensitive replies are being held instead of sent blindly. The AI is useful, but still leashed.",
    action: "Review settings",
    href: "/control-centre/settings",
    tone: "green" as ControlTone,
  },
  {
    title: "Opportunity value risk",
    label: "Value signal",
    score: 52,
    detail: "A few older enquiries need a decision: revive, close or assign before they cool further.",
    action: "Open overview",
    href: "/control-centre/overview",
    tone: "amber" as ControlTone,
  },
];

export const proofItems = [
  {
    title: "Owner approval log",
    label: "Safety proof",
    detail: "Shows which commitment replies were drafted, why they were held and who still needs to approve them.",
    status: "5 held safely",
    tone: "amber" as ControlTone,
  },
  {
    title: "Follow-up trail",
    label: "Recovery proof",
    detail: "Shows the quiet customers Aura found, the nudge prepared and the next owner action.",
    status: "9 prepared",
    tone: "blue" as ControlTone,
  },
  {
    title: "Review request record",
    label: "Reputation proof",
    detail: "Shows when Aura spotted completed work and prepared a clean review ask.",
    status: "6 ready",
    tone: "green" as ControlTone,
  },
  {
    title: "Duplicate reply guard",
    label: "Team proof",
    detail: "Shows when Aura stopped two people from replying to the same customer.",
    status: "2 paused",
    tone: "red" as ControlTone,
  },
];

export const proofTimeline = [
  {
    time: "09:12",
    title: "Aura grouped three fresh enquiries",
    detail: "AI ranked the warmest work so the owner can choose the first move.",
    tone: "gold" as ControlTone,
  },
  {
    time: "10:28",
    title: "Promise detected in a drafted reply",
    detail: "Aura held the reply because it included a commitment that needs approval.",
    tone: "amber" as ControlTone,
  },
  {
    time: "12:04",
    title: "Quiet customer follow-up prepared",
    detail: "A friendly nudge is ready, with the customer context attached.",
    tone: "blue" as ControlTone,
  },
  {
    time: "15:37",
    title: "Duplicate reply paused",
    detail: "Two team drafts were open at once. Aura held the second one.",
    tone: "red" as ControlTone,
  },
];

export const systemEvents = [
  {
    title: "Safe sending rule active",
    label: "Owner approval",
    detail: "Quotes, payments, bookings, availability promises and sensitive replies stay held until the owner says yes.",
    tone: "green" as ControlTone,
  },
  {
    title: "Saturday hours need checking",
    label: "Needs fixing",
    detail: "Aura will keep this visible so availability is not accidentally promised.",
    tone: "amber" as ControlTone,
  },
  {
    title: "Review ask wording needs a refresh",
    label: "Improve next",
    detail: "The current review ask works, but Aura thinks it could sound warmer and clearer.",
    tone: "blue" as ControlTone,
  },
  {
    title: "Duplicate reply protection active",
    label: "Team safety",
    detail: "Aura is watching for double replies in the shared inbox.",
    tone: "green" as ControlTone,
  },
];

export const fixList = [
  {
    title: "Confirm Saturday business hours",
    detail: "Prevents accidental availability promises.",
    href: "/control-centre/settings",
    action: "Open settings",
    tone: "amber" as ControlTone,
  },
  {
    title: "Add approval note for coordinator replies",
    detail: "Makes it clearer when a prepared reply needs owner review.",
    href: "/control-centre/settings",
    action: "Review permissions",
    tone: "red" as ControlTone,
  },
  {
    title: "Refresh review ask wording",
    detail: "Keep it friendly, simple and service-business neutral.",
    href: "/control-centre/proof",
    action: "View proof",
    tone: "blue" as ControlTone,
  },
];

export const settingsSections = [
  {
    title: "Owner approval rules",
    label: "Safety",
    detail: "Aura prepares the useful bits, but sensitive replies stay held.",
    points: [
      "Quotes require approval.",
      "Booking promises require approval.",
      "Payment questions require approval.",
      "Complaints and cancellations require approval.",
    ],
    tone: "gold" as ControlTone,
  },
  {
    title: "Team access rules",
    label: "Access",
    detail: "The team can prepare work without taking over owner decisions.",
    points: [
      "Coordinator can assign work.",
      "Team member can prepare handovers.",
      "Owner approves sensitive replies.",
      "Admin can view proof and reports.",
    ],
    tone: "blue" as ControlTone,
  },
  {
    title: "Aura behaviour rules",
    label: "Brand voice",
    detail: "Keep AI replies warm, clear and owner-controlled.",
    points: [
      "Friendly first.",
      "No risky promises.",
      "No pressure wording.",
      "Clear next step.",
    ],
    tone: "green" as ControlTone,
  },
];

export const conversationRules = [
  {
    title: "Safe discovery replies",
    label: "Aura can handle",
    detail: "Aura can greet, ask useful questions, collect details and keep a vague enquiry moving.",
    points: [
      "Ask what the customer needs.",
      "Ask for location, photos or preferred timing.",
      "Confirm the message was received.",
      "No price, booking, refund or promise included.",
    ],
    tone: "blue" as ControlTone,
  },
  {
    title: "Commitment replies",
    label: "Owner approval",
    detail: "Anything that commits the business waits for the owner or approved manager.",
    points: [
      "Prices and quotes.",
      "Booking confirmations.",
      "Availability promises.",
      "Payment, complaint, refund or cancellation replies.",
    ],
    tone: "gold" as ControlTone,
  },
  {
    title: "Held or escalated",
    label: "Safety hold",
    detail: "Aura pauses anything unclear, risky, angry or sensitive before it reaches the customer.",
    points: [
      "Complaint or bad-review risk.",
      "Conflicting team replies.",
      "Unclear commitment request.",
      "Low-confidence or sensitive wording.",
    ],
    tone: "red" as ControlTone,
  },
];

export const permissionRows = [
  {
    role: "Owner",
    can: "Approve replies, view proof, change settings",
    guardrail: "Full control",
    tone: "gold" as ControlTone,
  },
  {
    role: "Coordinator",
    can: "Assign work, prepare replies, view customer context",
    guardrail: "Cannot approve sensitive sends",
    tone: "blue" as ControlTone,
  },
  {
    role: "Team member",
    can: "Read handovers, prepare notes, mark work ready",
    guardrail: "Owner checks stay locked",
    tone: "green" as ControlTone,
  },
];
