"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/leads", label: "Leads" },
  { href: "/messages", label: "Messages" },
  { href: "/bookings", label: "Bookings" },
  { href: "/customers", label: "Customers" },
  { href: "/follow-ups", label: "Follow-Ups" },
  { href: "/reviews", label: "Reviews" },
  { href: "/activity-log", label: "Activity Log" },
  { href: "/error-log", label: "Error Log" },
  { href: "/settings", label: "Settings" },
];

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

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive ? "active" : ""}`}
            >
              {item.label}
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
            <p className="status-title">AURA CONTROL</p>
            <p className="status-text">
              AI is watching replies, leads and follow-ups. Nothing is sent without
              owner approval.
            </p>
            <p className="status-note">Safe assist mode</p>
          </div>
        </div>
      </div>

      <div className="sidebar-status">
        <p className="status-title">System health</p>
        <p className="status-text">Demo system online.</p>
        <p className="status-note">Fake data only</p>
      </div>
    </aside>
  );
}
