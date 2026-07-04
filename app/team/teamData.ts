export type TeamTone = "fresh" | "owner" | "handover" | "followup" | "duplicate";

export type TeamItem = {
  slug: string;
  lane: string;
  title: string;
  customer: string;
  source: string;
  age: string;
  priority: string;
  detail: string;
  owner: string;
  ownerRole: string;
  auraMove: string;
  teamNote: string;
  action: string;
  href: string;
  customerHref: string;
  needsOwnerCheck: boolean;
  tone: TeamTone;
};

export type TeamLane = {
  lane: string;
  count: string;
  summary: string;
  items: TeamItem[];
};

export type TeamAction = {
  slug: string;
  label: string;
  title: string;
  customer: string;
  summary: string;
  auraPrepared: string[];
  teamSteps: string[];
  ownerLine: string;
  result: string;
  backHref: string;
  customerHref: string;
};

export type TeamCustomer = {
  slug: string;
  initials: string;
  name: string;
  status: string;
  owner: string;
  lastTouch: string;
  detail: string;
  nextAction: string;
  actionHref: string;
  caution: string;
  teamContext: string[];
};

export const teamStats = [
  { label: "Unassigned", value: "2", detail: "need a person" },
  { label: "With team", value: "2", detail: "being handled" },
  { label: "Owner checks", value: "2", detail: "waiting safely" },
  { label: "Handovers", value: "3", detail: "ready to pass on" },
];

export const teamLanes: TeamLane[] = [
  {
    lane: "Unassigned",
    count: "2",
    summary: "Fresh work waiting for a clear owner.",
    items: [
      {
        slug: "assign-facebook-enquiry",
        lane: "Unassigned",
        title: "Facebook enquiry needs an owner",
        customer: "Maya Collins",
        source: "Facebook",
        age: "8 min old",
        priority: "Fresh lead",
        detail: "Aura spotted a new enquiry with no owner. Give it a person before it cools.",
        owner: "Suggested: Sarah",
        ownerRole: "Coordinator",
        auraMove: "Suggested Sarah because she is handling social enquiries today.",
        teamNote: "Needs first reply and a clear owner.",
        action: "Assign owner",
        href: "/team/action/assign-facebook-enquiry",
        customerHref: "/team/customers/maya-collins",
        needsOwnerCheck: false,
        tone: "fresh",
      },
      {
        slug: "escalate-missed-call",
        lane: "Unassigned",
        title: "Missed call needs a decision",
        customer: "Daniel Reed",
        source: "Phone",
        age: "14 min old",
        priority: "Needs decision",
        detail: "Fresh missed call. Aura prepared the callback note, but the owner decides the next move.",
        owner: "Unassigned",
        ownerRole: "Owner",
        auraMove: "Pulled the call into the shared board and marked it for a quick decision.",
        teamNote: "Escalate before the lead gets cold.",
        action: "Escalate",
        href: "/team/action/escalate-missed-call",
        customerHref: "/team/customers/daniel-reed",
        needsOwnerCheck: true,
        tone: "owner",
      },
    ],
  },
  {
    lane: "With team",
    count: "2",
    summary: "Work the team can keep moving today.",
    items: [
      {
        slug: "open-handover-note",
        lane: "With team",
        title: "Job handover note ready",
        customer: "Amelia Brooks",
        source: "Customer note",
        age: "31 min old",
        priority: "Handover",
        detail: "Aura summarised the useful bits so the next person is not guessing.",
        owner: "Marcus",
        ownerRole: "Team member",
        auraMove: "Condensed the latest notes into a short handover.",
        teamNote: "Ready for the next person to pick up.",
        action: "Open handover",
        href: "/team/action/open-handover-note",
        customerHref: "/team/customers/amelia-brooks",
        needsOwnerCheck: false,
        tone: "handover",
      },
      {
        slug: "check-follow-up-owner",
        lane: "With team",
        title: "Follow-up waiting on coordinator",
        customer: "Mr Patel",
        source: "Follow-up",
        age: "Today",
        priority: "Gentle nudge",
        detail: "The customer has gone quiet. Aura prepared a friendly nudge for the team.",
        owner: "Leah",
        ownerRole: "Coordinator",
        auraMove: "Found the quiet conversation and drafted a polite nudge.",
        teamNote: "Review before sending. Bring owner in if it becomes sensitive.",
        action: "Review nudge",
        href: "/team/action/check-follow-up-owner",
        customerHref: "/team/customers/mr-patel",
        needsOwnerCheck: false,
        tone: "followup",
      },
    ],
  },
  {
    lane: "Owner checks",
    count: "2",
    summary: "Prepared by the team, held for approval.",
    items: [
      {
        slug: "review-owner-approval",
        lane: "Owner checks",
        title: "Reply needs owner approval",
        customer: "Emily Davis",
        source: "Draft reply",
        age: "Ready now",
        priority: "Owner approval",
        detail: "Aura drafted the reply, but this one includes a promise. Owner checks it first.",
        owner: "John D",
        ownerRole: "Owner",
        auraMove: "Held the reply because it includes a commitment.",
        teamNote: "Prepared, not sent.",
        action: "Review approval",
        href: "/team/action/review-owner-approval",
        customerHref: "/team/customers/emily-davis",
        needsOwnerCheck: true,
        tone: "owner",
      },
      {
        slug: "resolve-duplicate-reply",
        lane: "Owner checks",
        title: "Duplicate reply warning",
        customer: "Tom Wilson",
        source: "Shared inbox",
        age: "2 drafts",
        priority: "Avoid double reply",
        detail: "Two people may reply to the same customer. Aura paused the second draft.",
        owner: "John D",
        ownerRole: "Owner",
        auraMove: "Spotted the double-up and held the second reply.",
        teamNote: "Choose one person to answer.",
        action: "Fix duplicate",
        href: "/team/action/resolve-duplicate-reply",
        customerHref: "/team/customers/tom-wilson",
        needsOwnerCheck: true,
        tone: "duplicate",
      },
    ],
  },
];

export const teamItems: TeamItem[] = teamLanes.reduce<TeamItem[]>((items, lane) => {
  items.push(...lane.items);
  return items;
}, []);

export const teamActions: TeamAction[] = [
  {
    slug: "assign-facebook-enquiry",
    label: "Assignment",
    title: "Assign Facebook enquiry",
    customer: "Maya Collins",
    summary: "Aura found a fresh enquiry with no owner. Team mode makes sure it does not float around unseen.",
    auraPrepared: [
      "Moved the enquiry into the shared queue.",
      "Suggested an owner based on today’s team cover.",
      "Prepared a short handover note.",
      "Kept quotes and sensitive details out of the reply.",
    ],
    teamSteps: [
      "Confirm or change the suggested owner.",
      "Add a short note if the team needs context.",
      "Keep it visible until the customer gets a reply.",
    ],
    ownerLine: "The team can assign ownership. Anything sensitive still waits for approval.",
    result: "Someone owns it. The customer is not left waiting.",
    backHref: "/team/assignments",
    customerHref: "/team/customers/maya-collins",
  },
  {
    slug: "escalate-missed-call",
    label: "Escalation",
    title: "Escalate missed call",
    customer: "Daniel Reed",
    summary: "Aura spotted a fresh missed call and prepared the callback note before the lead cools.",
    auraPrepared: [
      "Flagged the missed call as time-sensitive.",
      "Prepared a short callback note.",
      "Kept it visible for the owner.",
      "Left any promise or price decision for approval.",
    ],
    teamSteps: [
      "Escalate to the owner.",
      "Add context if the team knows more.",
      "Mark the callback handled once it is done.",
    ],
    ownerLine: "Owner decides whether to call back now or pass it to the team.",
    result: "Fast team response without sensitive decisions being rushed.",
    backHref: "/team/queue",
    customerHref: "/team/customers/daniel-reed",
  },
  {
    slug: "open-handover-note",
    label: "Handover",
    title: "Open handover note",
    customer: "Amelia Brooks",
    summary: "Aura prepared the useful bits so the next person can pick up the job without chasing context.",
    auraPrepared: [
      "Summarised the latest customer note.",
      "Pulled the next step into one place.",
      "Removed extra noise.",
      "Kept the handover short enough to actually read.",
    ],
    teamSteps: [
      "Read the handover.",
      "Confirm the next step.",
      "Mark it ready for the team member.",
    ],
    ownerLine: "Team can take this forward because it is context, not a customer promise.",
    result: "Less guessing. Fewer repeat questions. Better handover.",
    backHref: "/team/queue",
    customerHref: "/team/customers/amelia-brooks",
  },
  {
    slug: "check-follow-up-owner",
    label: "Follow-up",
    title: "Review follow-up",
    customer: "Mr Patel",
    summary: "Aura found a quiet customer follow-up and prepared a friendly nudge for the team.",
    auraPrepared: [
      "Found the quiet follow-up.",
      "Prepared a friendly nudge.",
      "Linked it to the customer context.",
      "Kept it visible in the shared queue.",
    ],
    teamSteps: [
      "Review the nudge.",
      "Send or assign it.",
      "Bring the owner in if the reply becomes sensitive.",
    ],
    ownerLine: "Team and Aura can handle safe discovery. Owner joins if a promise, complaint, booking or price comes up.",
    result: "The follow-up stays warm instead of vanishing into the day.",
    backHref: "/team/queue",
    customerHref: "/team/customers/mr-patel",
  },
  {
    slug: "review-owner-approval",
    label: "Owner check",
    title: "Review owner approval",
    customer: "Emily Davis",
    summary: "Aura drafted the reply, but it includes a promise. Team mode keeps it waiting for owner approval.",
    auraPrepared: [
      "Drafted the reply.",
      "Detected a promise in the wording.",
      "Stopped it from being treated as a normal reply.",
      "Moved it to owner checks.",
    ],
    teamSteps: [
      "Owner reviews the promise.",
      "Edit if needed.",
      "Approve only if the business can honour it.",
    ],
    ownerLine: "Owner approval required before this customer reply goes out.",
    result: "The team can prepare work without accidentally over-promising.",
    backHref: "/team/approvals",
    customerHref: "/team/customers/emily-davis",
  },
  {
    slug: "resolve-duplicate-reply",
    label: "Duplicate warning",
    title: "Fix duplicate reply warning",
    customer: "Tom Wilson",
    summary: "Aura spotted two people preparing replies to the same customer. Better to catch it before Tom gets two different answers.",
    auraPrepared: [
      "Detected two draft replies.",
      "Paused the second draft.",
      "Flagged the customer conversation.",
      "Kept the team from doubling up.",
    ],
    teamSteps: [
      "Choose who owns the reply.",
      "Remove the duplicate draft.",
      "Send one clear response.",
    ],
    ownerLine: "Owner or lead coordinator chooses the single reply before anything sends.",
    result: "One customer. One clear reply. No awkward double message.",
    backHref: "/team/approvals",
    customerHref: "/team/customers/tom-wilson",
  },
];

export const teamCustomers: TeamCustomer[] = [
  {
    slug: "maya-collins",
    initials: "MC",
    name: "Maya Collins",
    status: "Unassigned enquiry",
    owner: "Suggested: Sarah",
    lastTouch: "Facebook enquiry · 8 min ago",
    detail: "Fresh social enquiry needs someone to take ownership.",
    nextAction: "Assign and reply",
    actionHref: "/team/action/assign-facebook-enquiry",
    caution: "No quote or booking promise has been sent.",
    teamContext: [
      "Asked about availability for this week.",
      "No one has replied yet.",
      "Aura suggests a warm first response and owner assignment.",
    ],
  },
  {
    slug: "daniel-reed",
    initials: "DR",
    name: "Daniel Reed",
    status: "Owner callback",
    owner: "John D",
    lastTouch: "Missed call · 14 min ago",
    detail: "Fresh missed call needs a quick owner decision.",
    nextAction: "Escalate callback",
    actionHref: "/team/action/escalate-missed-call",
    caution: "Callback note is prepared. Owner still chooses the response.",
    teamContext: [
      "Called once and did not leave enough detail.",
      "Lead is still warm.",
      "Aura kept this out of the normal queue so it gets seen.",
    ],
  },
  {
    slug: "amelia-brooks",
    initials: "AB",
    name: "Amelia Brooks",
    status: "Handover ready",
    owner: "Marcus",
    lastTouch: "Customer note · 31 min ago",
    detail: "Customer context is ready for the next team member.",
    nextAction: "Open handover",
    actionHref: "/team/action/open-handover-note",
    caution: "Handover only. No customer promise needed here.",
    teamContext: [
      "Latest note has been summarised.",
      "Next step is clear for the team.",
      "Aura removed the back-and-forth so the handover is quick to read.",
    ],
  },
  {
    slug: "mr-patel",
    initials: "MP",
    name: "Mr Patel",
    status: "Follow-up waiting",
    owner: "Leah",
    lastTouch: "Quiet follow-up · Today",
    detail: "Quiet opportunity needs a friendly nudge.",
    nextAction: "Review follow-up",
    actionHref: "/team/action/check-follow-up-owner",
    caution: "Friendly nudge is safe to review. Bring owner in if the reply changes.",
    teamContext: [
      "Customer has gone quiet.",
      "Aura prepared a short follow-up.",
      "Team can keep it warm without chasing too hard.",
    ],
  },
  {
    slug: "emily-davis",
    initials: "ED",
    name: "Emily Davis",
    status: "Owner approval",
    owner: "John D",
    lastTouch: "Draft reply · Ready now",
    detail: "Reply includes a promise, so it waits for owner approval.",
    nextAction: "Review approval",
    actionHref: "/team/action/review-owner-approval",
    caution: "Nothing sends until the owner approves.",
    teamContext: [
      "Aura drafted the response.",
      "The reply includes a commitment.",
      "Team prepared it, owner controls the final yes.",
    ],
  },
  {
    slug: "tom-wilson",
    initials: "TW",
    name: "Tom Wilson",
    status: "Duplicate reply warning",
    owner: "John D",
    lastTouch: "Two draft replies · Now",
    detail: "Two people may reply to the same customer. Aura paused the second draft.",
    nextAction: "Fix duplicate",
    actionHref: "/team/action/resolve-duplicate-reply",
    caution: "Choose one reply before anything goes out.",
    teamContext: [
      "Two draft replies were open at once.",
      "Aura paused the second one.",
      "Customer should receive one clear answer, not a duet.",
    ],
  },
];

export function getTeamAction(slug: string) {
  return teamActions.find((action) => action.slug === slug);
}

export function getTeamCustomer(slug: string) {
  return teamCustomers.find((customer) => customer.slug === slug);
}
