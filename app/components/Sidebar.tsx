import Link from "next/link";

const links = [
  { href: "/", label: "Home", small: "positioning" },
  { href: "/solo", label: "Solo", small: "one decision" },
  { href: "/solo/today", label: "Today", small: "risk queue" },
  { href: "/team", label: "Team", small: "handover" },
  { href: "/team/queue", label: "Queue", small: "ownership" },
  { href: "/control-centre", label: "Control", small: "risk board" },
  { href: "/control-centre/proof", label: "Proof", small: "timeline" },
  { href: "/control-centre/settings", label: "Guardrails", small: "owner rules" },
];

function SidebarComponent(_props: Record<string, unknown>) {
  return (
    <aside className="sidebar beeSidebar">
      <Link href="/" className="beeSidebarBrand">
        <img src="/brand/source/bee-aura-symbol.svg" alt="Bee-Aura mark" />
        <span>
          <strong>BEE-AURA AI SYSTEMS</strong>
          <small>RECOVERY CONTROL</small>
        </span>
      </Link>

      <nav className="beeSidebarNav">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <strong>{link.label}</strong>
            <small>{link.small}</small>
          </Link>
        ))}
      </nav>

      <section className="beeSidebarCard">
        <strong>Recovery Control</strong>
        <p>Risk labels, safe next move, owner approval and proof timeline.</p>
        <span>Simple first. Expand only through recovery, approval, handover and proof.</span>
      </section>
    </aside>
  );
}

export { SidebarComponent as Sidebar };
export default SidebarComponent;
