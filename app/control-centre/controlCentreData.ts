export {
  demoBusiness,
  recoveryCases,
  recoveryMetrics,
  recoveryPillars,
  recoveryPlaybooks,
  recoveryVerticals,
  weeklyReview,
} from "../recovery/recoveryData";

export const controlNav = [
  { href: "/control-centre", label: "Risk board", small: "at risk now" },
  { href: "/control-centre/overview", label: "Case map", small: "system spine" },
  { href: "/control-centre/reports", label: "Weekly review", small: "surfaced and held" },
  { href: "/control-centre/proof", label: "Proof", small: "what happened" },
  { href: "/control-centre/system", label: "System fix", small: "gaps and blocks" },
  { href: "/control-centre/settings", label: "Guardrails", small: "owner rules" },
];
