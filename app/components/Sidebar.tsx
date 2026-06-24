"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/dashboard",
    label: "Today",
    detail: "Daily action queue",
    matches: ["/", "/dashboard"],
  },
  {
    href: "/messages",
    label: "Inbox",
    detail: "Leads + replies",
    matches: ["/messages", "/leads"],
  },
  {
    href: "/bookings",
    label: "Jobs",
    detail: "Bookings + follow-ups",
    matches: ["/bookings", "/follow-ups"],
  },
  {
    href: "/customers",
    label: "Customers",
    detail: "People + records",
    matches: ["/customers"],
  },
  {
    href: "/settings",
    label: "More / Admin",
    detail: "Reviews, logs, settings",
    matches: ["/reviews", "/activity-log", "/error-log", "/settings"],
  },
];

function isActiveRoute(pathname: string, matches: readonly string[]) {
  return matches.some((match) => {
    if (match === "/") {
      return pathname === "/";
    }

    return pathname === match || pathname.startsWith(`${match}/`);
  });
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar sidebar-premium">
      <div className="sidebar-brand sidebar-brand-premium">
        <img src="/brand/source/bee-aura-symbol.svg" alt="" className="brand-image-mark" />
        <div>
          <p className="brand-label">BEE-AURA AI SYSTEMS</p>
          <p className="brand-subtitle">Lead Recovery OS</p>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Bee-Aura simplified navigation">
        {navItems.map((item) => {
          const isActive = isActiveRoute(pathname, item.matches);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link sidebar-link-simplified ${isActive ? "active" : ""}`}
            >
              <span>{item.label}</span>
              <small>{item.detail}</small>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-status sidebar-control-card sidebar-control-card-bot">
        <div className="sidebar-control-top">
          <img
            src="/brand/source/aura-assistant-transparent.png"
            alt="Aura Assistant"
            className="sidebar-control-bot-image"
          />

          <div className="sidebar-control-copy">
            <p className="status-title">AURA WATCH</p>
            <p className="status-text">
              Aura watches Today, Inbox and Jobs for missed replies, urgent leads, follow-ups and owner approvals.
            </p>
            <p className="status-note">Owner approval stays visible</p>
          </div>
        </div>
      </div>

      <div className="sidebar-status sidebar-admin-depth">
        <p className="status-title">More / Admin</p>
        <p className="status-text">Deeper proof and system control stay available without crowding the daily view.</p>

        <div className="sidebar-admin-links">
          <Link href="/reviews">Reviews</Link>
          <Link href="/activity-log">System history</Link>
          <Link href="/error-log">Needs fixing</Link>
          <Link href="/settings">Settings</Link>
        </div>
      </div>

      <div className="sidebar-status">
        <p className="status-title">Demo status</p>
        <p className="status-text">Interactive sample-data demo.</p>
        <p className="status-note">No live data connected</p>
      </div>
    </aside>
  );
}
