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
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark">🐝</span>
        <div>
          <p className="brand-label">Bee-Aura AI</p>
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

      <div className="sidebar-status">
        <p className="status-title">System health</p>
        <p className="status-text">Demo system online.</p>
        <p className="status-note">Fake data only</p>
      </div>
    </aside>
  );
}
