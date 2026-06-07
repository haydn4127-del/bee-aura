"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/leads", label: "Leads" },
  { href: "/messages", label: "Messages" },
  { href: "/bookings", label: "Bookings" },
  { href: "/customers", label: "Customers" },
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
          <p className="brand-subtitle">AI Automation System</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive ? "active" : ""}`}>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-status">
        <div className="status-chip">All Systems Operational</div>
        <p>Uptime: <strong>99.9%</strong></p>
      </div>
    </aside>
  );
}
