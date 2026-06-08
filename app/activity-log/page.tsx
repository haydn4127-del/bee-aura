"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ActivityCategory =
  | "Lead"
  | "AI Action"
  | "Quote"
  | "Booking"
  | "Call Recovery"
  | "Review"
  | "Follow-Up"
  | "Email"
  | "System";

type ActivityStatus =
  | "New"
  | "Completed"
  | "Sent"
  | "Confirmed"
  | "Recovered"
  | "Replied"
  | "Updated";

type ActivityItem = {
  id: string;
  time: string;
  event: string;
  details: string;
  category: ActivityCategory;
  actor: string;
  status: ActivityStatus;
  icon: string;
};

const activityItems: ActivityItem[] = [
  {
    id: "ACT-1001",
    time: "10:12 AM",
    event: "Lead Captured",
    details: "Sarah Johnson submitted a new bathroom remodel inquiry via website.",
    category: "Lead",
    actor: "Sarah Johnson",
    status: "New",
    icon: "👤",
  },
  {
    id: "ACT-1002",
    time: "10:04 AM",
    event: "AI Reply Drafted",
    details: "Drafted introductory response for Sarah Johnson.",
    category: "AI Action",
    actor: "Bee-Aura AI",
    status: "Completed",
    icon: "🤖",
  },
  {
    id: "ACT-1003",
    time: "10:03 AM",
    event: "Quote Sent",
    details: "Quote sent to Sarah Johnson for bathroom remodel.",
    category: "Quote",
    actor: "Michael T.",
    status: "Sent",
    icon: "▤",
  },
  {
    id: "ACT-1004",
    time: "09:48 AM",
    event: "Booking Confirmed",
    details: "Bathroom remodel consultation booked for May 15, 2025.",
    category: "Booking",
    actor: "Emma Davis",
    status: "Confirmed",
    icon: "▣",
  },
  {
    id: "ACT-1005",
    time: "09:35 AM",
    event: "Missed Call Recovered",
    details: "Missed call from James Brown recovered and logged.",
    category: "Call Recovery",
    actor: "Bee-Aura AI",
    status: "Recovered",
    icon: "☎",
  },
  {
    id: "ACT-1006",
    time: "09:15 AM",
    event: "Review Request Sent",
    details: "Review request sent to Olivia Smith after service completion.",
    category: "Review",
    actor: "Olivia Smith",
    status: "Sent",
    icon: "☆",
  },
  {
    id: "ACT-1007",
    time: "08:53 AM",
    event: "Follow-Up Completed",
    details: "Follow-up call completed with Lucy C. regarding estimate.",
    category: "Follow-Up",
    actor: "Tom Wilson",
    status: "Completed",
    icon: "✓",
  },
  {
    id: "ACT-1008",
    time: "08:32 AM",
    event: "Customer Replied",
    details: "Lucy C. replied to follow-up email about project details.",
    category: "Email",
    actor: "Lucy C.",
    status: "Replied",
    icon: "✉",
  },
  {
    id: "ACT-1009",
    time: "08:00 AM",
    event: "AI Reply Drafted",
    details: "Drafted response to Lucy C.'s email about timeline and materials.",
    category: "AI Action",
    actor: "Bee-Aura AI",
    status: "Completed",
    icon: "🤖",
  },
  {
    id: "ACT-1010",
    time: "07:45 AM",
    event: "System Update",
    details: "Automation rule updated: Missed Call Recovery workflow.",
    category: "System",
    actor: "System",
    status: "Updated",
    icon: "▣",
  },
];

const statCards = [
  { icon: "〽", label: "Events Today", value: "126", change: "↑ 18% vs yesterday", tone: "blue" },
  { icon: "🤖", label: "AI Actions", value: "32", change: "↑ 23% vs yesterday", tone: "purple" },
  { icon: "⚠", label: "System Alerts", value: "6", change: "↑ 25% vs yesterday", tone: "red" },
];

const highlights = [
  {
    time: "10:04 AM",
    title: "Booking confirmed for Emma Davis",
    detail: "Bathroom Remodel Consultation",
  },
  {
    time: "10:03 AM",
    title: "Quote sent to Sarah Johnson",
    detail: "Bathroom Renovation",
  },
  {
    time: "09:48 AM",
    title: "Missed call recovered",
    detail: "James Brown",
  },
  {
    time: "09:15 AM",
    title: "Review request sent to Olivia Smith",
    detail: "Bathroom Remodel",
  },
];

const auditChecks = [
  "Every action timestamped",
  "Owner changes tracked",
  "AI actions visible",
  "System alerts logged",
  "Export available",
];

const filters: Array<"All Activity" | ActivityCategory> = [
  "All Activity",
  "Lead",
  "AI Action",
  "Quote",
  "Booking",
  "Call Recovery",
  "Review",
  "Follow-Up",
  "Email",
  "System",
];

function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export default function ActivityLogPage() {
  const [activeFilter, setActiveFilter] = useState<"All Activity" | ActivityCategory>("All Activity");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("Activity log ready. Every demo action is visible and timestamped.");

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return activityItems.filter((item) => {
      const filterMatch = activeFilter === "All Activity" || item.category === activeFilter;
      const searchMatch =
        query.length === 0 ||
        item.event.toLowerCase().includes(query) ||
        item.details.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.actor.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query);

      return filterMatch && searchMatch;
    });
  }, [activeFilter, search]);

  return (
    <main className="activityRef-page">
      <header className="activityRef-topbar">
        <div>
          <h1>Activity Log</h1>
          <p>Track every action, update, and automated event in one clear timeline.</p>
        </div>

        <div className="activityRef-actions">
          <button
            type="button"
            onClick={() => setNotice("Demo export prepared. No real data exported.")}
            className="activityRef-addButton"
          >
            ⇩ Export Log
          </button>

          <select
            value={activeFilter}
            onChange={(event) => {
              setActiveFilter(event.target.value as "All Activity" | ActivityCategory);
              setNotice(`${event.target.value} filter selected.`);
            }}
            className="activityRef-select"
          >
            {filters.map((filter) => (
              <option key={filter}>{filter}</option>
            ))}
          </select>

          <label className="activityRef-search">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search activity..."
            />
            <span>⌕</span>
          </label>

          <Link href="/settings" className="activityRef-owner">
            <span>JD</span>
            <strong>John D.</strong>
            <small>Owner</small>
          </Link>
        </div>
      </header>

      <section className="activityRef-stats">
        {statCards.map((card) => (
          <article key={card.label} className={`activityRef-stat activityRef-stat-${card.tone}`}>
            <span className="activityRef-statIcon">{card.icon}</span>
            <div>
              <p>{card.label}</p>
              <strong>{card.value}</strong>
              <small>{card.change}</small>
            </div>
          </article>
        ))}
      </section>

      <section className="activityRef-grid">
        <section className="activityRef-card activityRef-logPanel">
          <div className="activityRef-tableHead">
            <span>Time</span>
            <span>Event</span>
            <span>Details</span>
            <span>Category</span>
            <span>Actor</span>
            <span>Status</span>
          </div>

          <div className="activityRef-timeline">
            {filteredItems.map((item) => (
              <article key={item.id} className="activityRef-row">
                <span className="activityRef-time">{item.time}</span>

                <div className="activityRef-event">
                  <span className={`activityRef-eventIcon category-${slugify(item.category)}`}>
                    {item.icon}
                  </span>
                  <strong>{item.event}</strong>
                </div>

                <p>{item.details}</p>

                <span className={`activityRef-category category-${slugify(item.category)}`}>
                  {item.category}
                </span>

                <span className="activityRef-actor">
                  {item.actor === "Bee-Aura AI" ? "🤖" : item.actor === "System" ? "⚙" : "♙"} {item.actor}
                </span>

                <span className={`activityRef-status status-${slugify(item.status)}`}>
                  ● {item.status}
                </span>
              </article>
            ))}

            {filteredItems.length === 0 ? (
              <div className="activityRef-empty">
                <strong>No activity found.</strong>
                <p>Clear the search or change the activity filter.</p>
              </div>
            ) : null}
          </div>
        </section>

        <aside className="activityRef-sideStack">
          <section className="activityRef-card activityRef-highlights">
            <div className="activityRef-panelHeader">
              <h2>☆ Today&apos;s Highlights</h2>
              <Link href="/activity-log">View all</Link>
            </div>

            <div className="activityRef-highlightList">
              {highlights.map((item) => (
                <Link href="/activity-log" key={`${item.time}-${item.title}`} className="activityRef-highlightItem">
                  <span>{item.time}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </div>
                </Link>
              ))}
            </div>

            <Link href="/activity-log" className="activityRef-viewLink">
              View all highlights →
            </Link>
          </section>

          <section className="activityRef-card activityRef-audit">
            <div className="activityRef-panelHeader">
              <h2>▣ Audit Ready</h2>
            </div>

            <div className="activityRef-auditList">
              {auditChecks.map((check) => (
                <p key={check}>
                  <span>✓</span>
                  {check}
                  <strong>✓</strong>
                </p>
              ))}
            </div>

            <Link href="/activity-log" className="activityRef-viewLink">
              Learn more about audit logs →
            </Link>
          </section>
        </aside>
      </section>

      <div className="activityRef-notice">{notice}</div>
    </main>
  );
}
