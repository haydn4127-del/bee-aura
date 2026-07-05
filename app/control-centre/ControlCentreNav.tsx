import Link from "next/link";
import styles from "../recovery/recovery.module.css";

export const controlNav = [
  { href: "/control-centre", label: "Risk board", small: "at risk now" },
  { href: "/control-centre/overview", label: "Case map", small: "system spine" },
  { href: "/control-centre/reports", label: "Weekly review", small: "surfaced and held" },
  { href: "/control-centre/proof", label: "Proof", small: "what happened" },
  { href: "/control-centre/system", label: "System fix", small: "gaps and blocks" },
  { href: "/control-centre/settings", label: "Guardrails", small: "owner rules" },
];

export function ControlCentreNav({ active }: { active: string }) {
  return (
    <nav className={styles.nav} aria-label="Recovery Control navigation">
      {controlNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={active === item.href ? "page" : undefined}
        >
          <strong>{item.label}</strong>
          <small>{item.small}</small>
        </Link>
      ))}
    </nav>
  );
}
