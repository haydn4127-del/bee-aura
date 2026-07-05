import {
  adminMoveCases,
  engineerCheckCases,
  ownerDecisionCases,
  proofGapCases,
  recoveryWorkCases,
} from "../recovery/recoveryData";

export const teamLanes = [
  {
    lane: "Owner decisions",
    summary: "Held wording that must wait before it leaves the business.",
    count: ownerDecisionCases.length,
    items: ownerDecisionCases,
  },
  {
    lane: "Admin moves",
    summary: "Safe next moves the coordinator can move forward.",
    count: adminMoveCases.length,
    items: adminMoveCases,
  },
  {
    lane: "Engineer checks",
    summary: "Technical facts needed before customer wording is safe.",
    count: engineerCheckCases.length,
    items: engineerCheckCases,
  },
  {
    lane: "Recovery work",
    summary: "Cooling, review-ready or duplicated cases that still need control.",
    count: recoveryWorkCases.length,
    items: recoveryWorkCases,
  },
  {
    lane: "Proof gaps",
    summary: "Cases that cannot close until evidence is added.",
    count: proofGapCases.length,
    items: proofGapCases,
  },
];
