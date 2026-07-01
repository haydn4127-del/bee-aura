"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  detail: string;
};

const defaultNav: NavItem[] = [
  { href: "/", label: "Choose Demo", detail: "Solo / Team / Control" },
  { href: "/solo", label: "Solo Demo", detail: "one-owner AI" },
  { href: "/team", label: "Team Demo", detail: "shared work" },
  { href: "/control-centre", label: "Control Centre", detail: "full command" },
];

const soloNav: NavItem[] = [
  { href: "/solo", label: "Solo Home", detail: "owner demo" },
  { href: "/solo/today", label: "Today", detail: "do first" },
  { href: "/solo/inbox", label: "Inbox", detail: "reply/call back" },
  { href: "/solo/jobs", label: "Jobs", detail: "follow-ups" },
  { href: "/solo/customers", label: "Customers", detail: "simple records" },
  { href: "/team", label: "Team Demo", detail: "shared work" },
];

const teamNav: NavItem[] = [
  { href: "/team", label: "Team Home", detail: "team demo" },
  { href: "/team/queue", label: "Shared Queue", detail: "all work" },
  { href: "/team/assignments", label: "Assignments", detail: "who owns it" },
  { href: "/team/approvals", label: "Approvals", detail: "owner decisions" },
  { href: "/team/customers", label: "Customers", detail: "team context" },
  { href: "/control-centre", label: "Control Centre", detail: "full command" },
];

const controlNav: NavItem[] = [
  { href: "/control-centre", label: "Control Home", detail: "premium demo" },
  { href: "/control-centre/overview", label: "Overview", detail: "business watch" },
  { href: "/control-centre/reports", label: "Reports", detail: "AI summary" },
  { href: "/control-centre/proof", label: "Proof", detail: "reviews / proof" },
  { href: "/control-centre/system", label: "System", detail: "history / fixing" },
  { href: "/control-centre/settings", label: "Settings", detail: "admin control" },
];

function getNav(pathname: string) {
  if (pathname.startsWith("/solo")) {
    return soloNav;
  }

  if (pathname.startsWith("/team")) {
    return teamNav;
  }

  if (pathname.startsWith("/control-centre")) {
    return controlNav;
  }

  return defaultNav;
}

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href;
}

export default function Sidebar() {
  const pathname = usePathname();
  const navItems = getNav(pathname);

  return (
    <aside className="sidebar sidebar-premium">
      <div className="sidebar-brand sidebar-brand-premium">
        <img src="/brand/source/bee-aura-symbol.svg" alt="" className="brand-image-mark" />
        <div>
          <p className="brand-label">BEE-AURA AI SYSTEMS</p>
          <p className="brand-subtitle">Lead Recovery OS</p>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Bee-Aura demo navigation">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-link sidebar-link-simplified ${isActive(pathname, item.href) ? "active" : ""}`}
          >
            <span>{item.label}</span>
            <small>{item.detail}</small>
          </Link>
        ))}
      </nav>

      <div className="sidebar-status sidebar-control-card sidebar-control-card-bot">
        <div className="sidebar-control-top">
          <img
            src="/brand/source/aura-assistant-transparent.png"
            alt="Aura Assistant"
            className="sidebar-control-bot-image"
          />

          <div className="sidebar-control-copy">
            <p className="status-title">AURA AI BRAIN</p>
            <p className="status-text">
              One Bee-Aura brain powers Solo, Team and Control Centre. AI drafts, prioritises and explains; owners approve risky actions.
            </p>
            <p className="status-note">AI-first, owner-controlled</p>
          </div>
        </div>
      </div>

      <div className="sidebar-status sidebar-admin-depth">
        <p className="status-title">Demo paths</p>
        <p className="status-text">Each package has its own pages, actions and depth.</p>

        <div className="sidebar-admin-links">
          <Link href="/solo">Solo</Link>
          <Link href="/team">Team</Link>
          <Link href="/control-centre">Control</Link>
          <Link href="/">Choose</Link>
        </div>
      </div>
    </aside>
  );
}
