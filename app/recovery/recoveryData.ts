export type RecoveryTone = "red" | "amber" | "blue" | "green" | "purple";

export type RecoveryCase = {
  slug: string;
  customer: string;
  business: string;
  vertical: string;
  channel: string;
  age: string;
  title: string;
  message: string;
  status: string;
  owner: string;
  role: "Owner decision" | "Admin move" | "Engineer check" | "Recovery work" | "Proof gap";
  tone: RecoveryTone;
  riskLabels: string[];
  memory: string[];
  missingInfo: string[];
  nextMove: string;
  ownerDecision: string;
  proof: string[];
  playbook: string;
  outcome: string;
};

export type RecoveryPlaybook = {
  slug: string;
  title: string;
  label: string;
  tone: RecoveryTone;
  trigger: string;
  why: string;
  safeMove: string;
  ownerRule: string;
  proofEvent: string;
  blockedWording: string;
  safeWording: string;
};

export type RecoveryVertical = {
  title: string;
  status: string;
  summary: string;
  fit: string;
};

export const demoBusiness = {
  name: "Northfield Heating & Boiler Care",
  wedge: "Plumbing and heating",
  owner: "Martin Shaw",
  coordinator: "Emma Price",
  engineers: ["Dan West", "Aamir Khan", "Lee Morgan", "Chloe Briggs"],
  serviceArea: "Birmingham, Solihull, Sutton Coldfield and Tamworth",
  systemLine:
    "The first wedge is plumbing and heating, but the system is built from reusable recovery-control objects that can expand across service businesses.",
};

export const recoveryCases: RecoveryCase[] = [
  {
    slug: "priya-desai",
    customer: "Priya Desai",
    business: "Northfield Heating & Boiler Care",
    vertical: "Plumbing and heating",
    channel: "Web form",
    age: "8 min old",
    title: "Tenant has no hot water and asks for today plus rough cost",
    message:
      "Boiler’s stopped at our tenant’s flat in Selly Oak. No hot water. Can someone come today? Rough cost?",
    status: "Waiting owner approval",
    owner: "Martin Shaw",
    role: "Owner decision",
    tone: "red",
    riskLabels: ["Same-day risk", "Rough-cost request", "Landlord / tenant", "Waiting owner approval"],
    memory: [
      "Returning landlord customer",
      "Tenant access not confirmed",
      "No fault code yet",
      "Timing and price wording must stay cautious",
    ],
    missingInfo: ["Fault code", "Exact address", "Access contact", "Whether heating is also affected"],
    nextMove:
      "Ask for missing details, hold timing and price wording, then let Martin approve the cautious reply.",
    ownerDecision:
      "Martin reviews same-day and rough-cost wording before Emma replies.",
    proof: [
      "08:14 enquiry received",
      "08:15 same-day, price and landlord risk detected",
      "08:16 safe draft prepared",
      "08:17 owner approval requested",
    ],
    playbook: "same-day-promise-check",
    outcome: "Draft held before customer-facing wording leaves the business.",
  },
  {
    slug: "jason-pollard",
    customer: "Jason Pollard",
    business: "Northfield Heating & Boiler Care",
    vertical: "Plumbing and heating",
    channel: "Missed call + voicemail",
    age: "17 min old",
    title: "Missed boiler-service call needs a callback owner",
    message:
      "Need a boiler service and maybe a quick check before exchange on a house purchase. Call me back.",
    status: "Needs callback",
    owner: "Emma Price",
    role: "Admin move",
    tone: "green",
    riskLabels: ["Missed callback", "Warm service lead", "Missing scope"],
    memory: ["New customer", "House purchase context", "Deadline unknown", "Callback is safer than a long text"],
    missingInfo: ["Postcode", "Deadline", "Service or inspection scope"],
    nextMove:
      "Assign Emma, call back and use a short qualification checklist before creating any job request.",
    ownerDecision:
      "No owner approval needed unless timing or price is promised.",
    proof: ["Missed call logged", "Voicemail transcribed", "Callback owner assigned"],
    playbook: "missed-callback-recovery",
    outcome: "Warm lead gets an owner before it cools.",
  },
  {
    slug: "linda-barker",
    customer: "Linda Barker",
    business: "Northfield Heating & Boiler Care",
    vertical: "Plumbing and heating",
    channel: "SMS",
    age: "31 min old",
    title: "Exact-price boiler repair question needs careful wording",
    message: "My Vaillant is showing F28. Is this a common fix and how much will it cost exactly?",
    status: "Price wording held",
    owner: "Martin Shaw",
    role: "Owner decision",
    tone: "amber",
    riskLabels: ["Exact-price risk", "Needs diagnosis", "Owner approval"],
    memory: ["Existing service customer", "Last annual service 11 months ago", "Fault code alone is not enough"],
    missingInfo: ["Boiler age", "Symptoms", "Whether reset attempted", "Access details"],
    nextMove:
      "Explain that exact repair cost depends on diagnosis, parts and access. Offer a diagnosis-first path.",
    ownerDecision:
      "Martin approves any fixed-price or rough-cost wording.",
    proof: ["Price risk detected", "Draft held", "Owner review requested"],
    playbook: "exact-price-risk-check",
    outcome: "Customer gets a safe path without a guessed repair price.",
  },
  {
    slug: "adam-webb",
    customer: "Adam Webb",
    business: "Northfield Heating & Boiler Care",
    vertical: "Plumbing and heating",
    channel: "WhatsApp + voicemail",
    age: "2 channels",
    title: "Duplicate WhatsApp and voicemail paused before two replies go out",
    message:
      "WhatsApp says no hot water. Voicemail says he tried calling as well. Same mobile number.",
    status: "Duplicate paused",
    owner: "Emma Price",
    role: "Admin move",
    tone: "purple",
    riskLabels: ["Duplicate contact", "One owner needed", "Same-day pressure"],
    memory: ["Same phone on both messages", "Urgent wording", "No assigned owner yet"],
    missingInfo: ["Exact address", "Boiler details", "Whether a reply already went out"],
    nextMove:
      "Merge the case, assign Emma, suppress the second draft and call before sending a written promise.",
    ownerDecision:
      "No approval needed for the call. Approval needed if timing is promised.",
    proof: ["Duplicate detected", "Second draft paused", "Case owner set"],
    playbook: "duplicate-reply-shield",
    outcome: "One customer, one owner, one safe reply.",
  },
  {
    slug: "caroline-hughes",
    customer: "Caroline Hughes",
    business: "Northfield Heating & Boiler Care",
    vertical: "Plumbing and heating",
    channel: "Email quote",
    age: "19 days",
    title: "Boiler replacement quote is cooling",
    message:
      "Replacement quote has had no reply for 19 days. No owner has checked whether the customer needs help choosing an option.",
    status: "Cooling quote",
    owner: "Martin Shaw",
    role: "Recovery work",
    tone: "blue",
    riskLabels: ["Cooling quote", "Follow-up due", "No discount pressure"],
    memory: ["Site survey completed", "Customer asked to think", "Quote not lost yet"],
    missingInfo: ["Whether timing, budget or option choice is the blocker"],
    nextMove:
      "Prepare a careful follow-up asking whether timing, budget or option choice is holding the decision.",
    ownerDecision:
      "No owner approval unless discount or availability promise is added.",
    proof: ["Quote age surfaced", "Follow-up prepared", "Outcome still open"],
    playbook: "cooling-quote-recovery",
    outcome: "Cooling quote gets a careful recovery move before it disappears.",
  },
  {
    slug: "peter-long",
    customer: "Peter Long",
    business: "Northfield Heating & Boiler Care",
    vertical: "Plumbing and heating",
    channel: "Email",
    age: "Today",
    title: "Complaint reply held until engineer notes are attached",
    message:
      "You were here Tuesday and the boiler is still losing pressure. I’m not happy.",
    status: "Escalated",
    owner: "Martin Shaw",
    role: "Proof gap",
    tone: "red",
    riskLabels: ["Complaint risk", "Needs engineer fact check", "Do not send yet"],
    memory: ["Recent visit", "Engineer note missing", "Blame and refund wording must be held"],
    missingInfo: ["Engineer note", "Previous promise", "Current pressure reading"],
    nextMove:
      "Ask engineer for notes, escalate to Martin and send only a neutral acknowledgement if needed.",
    ownerDecision:
      "Owner approves any blame, refund, guarantee or callback wording.",
    proof: ["Complaint received", "Engineer note requested", "Draft held"],
    playbook: "complaint-escalation",
    outcome: "Complaint is handled with evidence, not guesswork.",
  },
  {
    slug: "pavilion-dental-rooms",
    customer: "Pavilion Dental Rooms",
    business: "Northfield Heating & Boiler Care",
    vertical: "Plumbing and heating",
    channel: "Email",
    age: "Waiting",
    title: "Safety wording needs engineer fact check",
    message:
      "Can you confirm if the appliance is safe to keep using until next week?",
    status: "Waiting engineer",
    owner: "Dan West",
    role: "Engineer check",
    tone: "red",
    riskLabels: ["Gas-safety wording", "Needs engineer fact check", "Do not send yet"],
    memory: ["Commercial customer", "Prior service notes exist", "Office should not guess safety wording"],
    missingInfo: ["Engineer fact check", "Exact symptoms", "Last job note"],
    nextMove:
      "Ask Dan to check the facts before any safety wording leaves the business.",
    ownerDecision:
      "Qualified review required before safety wording is released.",
    proof: ["Safety wording flagged", "Draft blocked", "Fact check requested"],
    playbook: "gas-safety-wording-check",
    outcome: "Safety wording stays held until the right person checks it.",
  },
  {
    slug: "hannah-cole",
    customer: "Hannah Cole",
    business: "Northfield Heating & Boiler Care",
    vertical: "Plumbing and heating",
    channel: "Closed job",
    age: "Job closed",
    title: "Completed job ready for review check",
    message:
      "Job is complete and no complaint is open. Review request is prepared only after the proof check passes.",
    status: "Safe to send",
    owner: "Emma Price",
    role: "Recovery work",
    tone: "green",
    riskLabels: ["Review readiness", "Proof checked", "Safe to send"],
    memory: ["Payment received", "No complaint open", "Positive close note"],
    missingInfo: ["None"],
    nextMove:
      "Prepare review ask only if complaint and callback checks stay clear.",
    ownerDecision:
      "No approval needed unless the review ask includes incentive or marketing language.",
    proof: ["Job closed", "Complaint check passed", "Review-ready surfaced"],
    playbook: "review-readiness-check",
    outcome: "Review request waits until the case is actually safe.",
  },
];

export const recoveryPlaybooks: RecoveryPlaybook[] = [
  {
    slug: "same-day-promise-check",
    title: "Same-day promise check",
    label: "Timing guardrail",
    tone: "red",
    trigger: "Customer asks for today, exact time or urgent attendance.",
    why: "The team can acknowledge urgency, but should not promise a slot before availability, access and job detail are checked.",
    safeMove: "Gather missing details and use cautious availability wording.",
    ownerRule: "Owner approves exact attendance promises.",
    proofEvent: "Same-day wording reviewed before release.",
    blockedWording: "Yes, we can definitely get there today.",
    safeWording: "We’re checking the fastest safe option and will confirm availability once the details are clear.",
  },
  {
    slug: "exact-price-risk-check",
    title: "Exact-price risk check",
    label: "Price guardrail",
    tone: "amber",
    trigger: "Customer asks for exact repair cost before diagnosis.",
    why: "Fault code, symptoms or customer description rarely prove the final repair cost.",
    safeMove: "Explain diagnosis-first pricing and ask for missing details.",
    ownerRule: "Owner approves fixed-price or rough-cost wording.",
    proofEvent: "Price wording checked and either approved, edited or held.",
    blockedWording: "It will only cost £X.",
    safeWording: "We do not want to misquote before diagnosis. Cost depends on the fault, parts and access.",
  },
  {
    slug: "gas-safety-wording-check",
    title: "Gas-safety wording check",
    label: "Safety guardrail",
    tone: "red",
    trigger: "Customer asks whether an appliance is safe to keep using.",
    why: "Office guesses can create serious safety and trust risk.",
    safeMove: "Hold the draft and request qualified engineer fact check.",
    ownerRule: "Qualified review required before safety wording leaves the business.",
    proofEvent: "Safety wording held and fact check requested.",
    blockedWording: "It should be safe to keep using.",
    safeWording: "A qualified engineer needs to assess the details before we confirm safety guidance.",
  },
  {
    slug: "landlord-tenant-responsibility-check",
    title: "Landlord / tenant responsibility check",
    label: "Responsibility guardrail",
    tone: "purple",
    trigger: "Customer asks who authorises, pays or is responsible.",
    why: "Responsibility can be unclear before diagnosis and account confirmation.",
    safeMove: "Clarify who is instructing work, who provides access and who approves cost.",
    ownerRule: "Owner approves responsibility or blame wording.",
    proofEvent: "Responsibility check recorded before reply.",
    blockedWording: "The tenant caused this, so they pay.",
    safeWording: "We need diagnosis and account confirmation before saying who should authorise or pay.",
  },
  {
    slug: "duplicate-reply-shield",
    title: "Duplicate Reply Shield",
    label: "Team guardrail",
    tone: "purple",
    trigger: "Same customer contacts through two or more channels.",
    why: "Two replies can create crossed wires, duplicate promises or confused ownership.",
    safeMove: "Merge the case, set one owner and pause extra drafts.",
    ownerRule: "One owner per active enquiry.",
    proofEvent: "Duplicate detected and second reply paused.",
    blockedWording: "Two separate replies from two teammates.",
    safeWording: "One case. One owner. One safe reply.",
  },
  {
    slug: "missed-callback-recovery",
    title: "Missed callback recovery",
    label: "Callback playbook",
    tone: "green",
    trigger: "Missed call, voicemail or warm call-back request.",
    why: "A missed call can cool quickly if nobody owns it.",
    safeMove: "Assign callback owner and use a short qualification checklist.",
    ownerRule: "Approval is not needed unless timing or price is promised.",
    proofEvent: "Callback task created and owner assigned.",
    blockedWording: "Long written promise before speaking to the customer.",
    safeWording: "Call first, then send a short confirmation if needed.",
  },
  {
    slug: "request-missing-details",
    title: "Request missing details",
    label: "Missing-info playbook",
    tone: "blue",
    trigger: "Key information is absent before a safe reply or handoff.",
    why: "Missing facts create bad promises and poor engineer handover.",
    safeMove: "Ask only the minimum useful questions.",
    ownerRule: "No owner approval if the request stays neutral.",
    proofEvent: "Missing details requested before commitment.",
    blockedWording: "Booking or price promise before the missing facts are known.",
    safeWording: "Please confirm the fault code, access contact, postcode and whether heating is also affected.",
  },
  {
    slug: "engineer-fact-check-request",
    title: "Engineer fact-check request",
    label: "Engineer playbook",
    tone: "blue",
    trigger: "Technical, post-job or safety-sensitive reply needs engineer context.",
    why: "Admin should not guess technical facts.",
    safeMove: "Assign an engineer fact check and hold the draft.",
    ownerRule: "Engineer provides facts; owner approves commercial promises.",
    proofEvent: "Fact check requested before reply.",
    blockedWording: "Office guess sent as fact.",
    safeWording: "We’re checking the job notes with the engineer before replying.",
  },
  {
    slug: "cooling-quote-recovery",
    title: "Cooling quote recovery",
    label: "Quote recovery",
    tone: "blue",
    trigger: "Quote has had no reply after the agreed threshold.",
    why: "A quote can be recovered before it is lost, but follow-up should not sound desperate or discount-led.",
    safeMove: "Send a careful follow-up asking what is blocking the decision.",
    ownerRule: "Owner approval only if discount, timing or pricing promise appears.",
    proofEvent: "Cooling quote surfaced and follow-up prepared.",
    blockedWording: "Aggressive discount or pressure copy.",
    safeWording: "Just checking whether timing, budget or option choice is the blocker.",
  },
  {
    slug: "complaint-escalation",
    title: "Complaint escalation",
    label: "Complaint playbook",
    tone: "red",
    trigger: "Customer is unhappy or prior work may be disputed.",
    why: "Defensive replies, blame or refund promises can make the issue worse.",
    safeMove: "Escalate, gather engineer notes and use neutral acknowledgement.",
    ownerRule: "Owner approves blame, refund, guarantee or callback wording.",
    proofEvent: "Complaint escalated and customer-facing draft held.",
    blockedWording: "That was not our fault.",
    safeWording: "We’re reviewing the previous visit and job notes so we can confirm the right next step.",
  },
  {
    slug: "review-readiness-check",
    title: "Review readiness check",
    label: "Review playbook",
    tone: "green",
    trigger: "Completed job may be ready for a review ask.",
    why: "Review requests should not go out while a complaint or callback is still open.",
    safeMove: "Check complaint, callback and payment state first.",
    ownerRule: "Marketing or incentive wording requires review.",
    proofEvent: "Review readiness checked before request.",
    blockedWording: "Please leave us a review while an issue is unresolved.",
    safeWording: "Review request prepared only after proof and complaint checks pass.",
  },
  {
    slug: "proof-gap-fix",
    title: "Proof gap fix",
    label: "Proof playbook",
    tone: "amber",
    trigger: "A case is missing message, decision, owner, action or outcome evidence.",
    why: "A recovery system only earns trust if the proof is visible.",
    safeMove: "Add the missing proof event before closing the case.",
    ownerRule: "Risky cases cannot be marked recovered without minimum proof.",
    proofEvent: "Proof gap fixed before close.",
    blockedWording: "Case closed with no decision trail.",
    safeWording: "Message, risk, decision and action are recorded before close.",
  },
];

export const recoveryVerticals: RecoveryVertical[] = [
  {
    title: "Plumbing and heating",
    status: "First wedge",
    summary: "Urgent, vague and risky enquiries around timing, price, landlord context and gas-safety wording.",
    fit: "Live demo and first pilot focus.",
  },
  {
    title: "Pest control",
    status: "Second wedge",
    summary: "Safety, pets, children, guarantees, landlord context and repeat treatment expectations.",
    fit: "Strong next vertical once the control loop is proven.",
  },
  {
    title: "Electrical contractors",
    status: "Later wedge",
    summary: "Certification, compliance wording, appointment promises and estimate follow-up.",
    fit: "Good when playbooks and proof are working.",
  },
  {
    title: "Property maintenance",
    status: "Long-term wedge",
    summary: "Tenant issues, landlord responsibility, contractor handover, audit trail and complaint proof.",
    fit: "Large opportunity, but more complex.",
  },
];

export const recoveryPillars = [
  {
    title: "Enquiry at Risk",
    label: "Core object",
    detail: "The live customer situation that needs the next safe move.",
    proof: "Priya appears because timing, price and landlord context are risky.",
    tone: "red" as RecoveryTone,
  },
  {
    title: "Customer Memory",
    label: "Safe context",
    detail: "Only the customer context needed to reply safely.",
    proof: "Landlord, property, history and channel context stay visible.",
    tone: "blue" as RecoveryTone,
  },
  {
    title: "Next Move",
    label: "Safe action",
    detail: "The safest thing to do now, not every possible workflow.",
    proof: "Missing details are requested before any timing or price promise.",
    tone: "green" as RecoveryTone,
  },
  {
    title: "Owner Approval",
    label: "Human hold",
    detail: "Risky wording is prepared but held before it leaves the business.",
    proof: "Martin reviews same-day and exact-price wording.",
    tone: "amber" as RecoveryTone,
  },
  {
    title: "Proof Timeline",
    label: "Proof",
    detail: "The record of message, risk, decision and action.",
    proof: "Every hold, approval, call and duplicate is recorded.",
    tone: "blue" as RecoveryTone,
  },
  {
    title: "Guardrails",
    label: "Owner rules",
    detail: "Plain-English rules that decide what can be prepared and what must wait.",
    proof: "Same-day, exact-price and gas-safety rules are active.",
    tone: "purple" as RecoveryTone,
  },
];

export const recoveryMetrics = [
  { label: "At risk now", value: "6", detail: "need safe next move", tone: "red" as RecoveryTone },
  { label: "Waiting approval", value: "4", detail: "held before send", tone: "amber" as RecoveryTone },
  { label: "Duplicate contacts", value: "1", detail: "reply paused", tone: "purple" as RecoveryTone },
  { label: "Proof gaps", value: "2", detail: "need evidence", tone: "blue" as RecoveryTone },
];

export const weeklyReview = [
  { title: "Surfaced", value: "12", detail: "enquiries became visible recovery cases" },
  { title: "Held", value: "5", detail: "drafts blocked before risky wording left" },
  { title: "Recovered", value: "3", detail: "cooling or duplicate cases moved forward" },
  { title: "Proofed", value: "18", detail: "events added to proof timelines" },
];

export const caseBySlug = Object.fromEntries(
  recoveryCases.map((item) => [item.slug, item])
) as Record<string, RecoveryCase>;

export const playbookBySlug = Object.fromEntries(
  recoveryPlaybooks.map((item) => [item.slug, item])
) as Record<string, RecoveryPlaybook>;

export const ownerDecisionCases = recoveryCases.filter((item) => item.role === "Owner decision");
export const adminMoveCases = recoveryCases.filter((item) => item.role === "Admin move");
export const engineerCheckCases = recoveryCases.filter((item) => item.role === "Engineer check");
export const recoveryWorkCases = recoveryCases.filter((item) => item.role === "Recovery work");
export const proofGapCases = recoveryCases.filter((item) => item.role === "Proof gap");
