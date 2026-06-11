"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const kpis = [
  {
    href: "/leads",
    icon: "LC",
    label: "Leads Captured",
    value: "482",
    change: "+10%",
    detail: "vs last 7 days",
    tone: "blue",
  },
  {
    href: "/messages",
    icon: "RT",
    label: "Avg. Response Time",
    value: "2m 48s",
    change: "21% faster",
    detail: "vs last 7 days",
    tone: "blue",
  },
  {
    href: "/bookings",
    icon: "BK",
    label: "Bookings Today",
    value: "14",
    change: "+27%",
    detail: "vs yesterday",
    tone: "purple",
  },
  {
    href: "/leads",
    icon: "£",
    label: "Pipeline Value",
    value: "£84,350",
    change: "▲ 17%",
    detail: "vs last 7 days",
    tone: "green",
  },
  {
    href: "/follow-ups",
    icon: "FU",
    label: "Follow-Ups Due",
    value: "23",
    change: "+15%",
    detail: "vs yesterday",
    tone: "gold",
  },
];

const liveActivity = [
  {
    icon: "NL",
    title: "New lead captured",
    detail: "John Smith • Boiler Insulation",
    time: "Just now",
    href: "/leads",
    tone: "blue",
  },
  {
    icon: "BK",
    title: "New booking confirmed",
    detail: "Emily Davis • Bathroom Renovation",
    time: "2m ago",
    href: "/bookings",
    tone: "purple",
  },
  {
    icon: "FU",
    title: "Follow-up completed",
    detail: "Paul Davies • Quote Follow-Up",
    time: "2m ago",
    href: "/follow-ups",
    tone: "gold",
  },
  {
    icon: "RV",
    title: "New review received",
    detail: "5★ from Sarah T.",
    time: "12m ago",
    href: "/reviews",
    tone: "green",
  },
];

const inbox = [
  ["Emily Davis", "Bathroom renovation enquiry", "2m ago", "2"],
  ["John Smith", "Boiler Installation", "5m ago", "1"],
  ["Sarah Roberts", "Kitchen Fitting – Availability", "15m ago", ""],
  ["Tom Brown", "Plumbing Issue – Urgent", "22m ago", ""],
  ["Michael Walker", "Roof Repair – Callback", "30m ago", ""],
];

const newLeads = [
  ["JS", "John Smith", "Boiler Installation", "Just now", "2"],
  ["ED", "Emily Davis", "Bathroom Renovation", "2m ago", ""],
  ["MW", "Michael Walker", "Roof Repair", "5m ago", ""],
  ["SR", "Sarah Roberts", "Kitchen Fitting", "8m ago", ""],
  ["TB", "Tom Brown", "Plumbing Issue", "12m ago", ""],
];

const bookings = [
  ["09:00", "James Wilson", "Boiler Installation", "Confirmed"],
  ["11:30", "Emily Davis", "Bathroom Renovation", "Confirmed"],
  ["13:00", "Tom Brown", "Plumbing Repair", "In Progress"],
  ["15:00", "Sarah Roberts", "Kitchen Fitting", "Confirmed"],
  ["17:00", "Michael Walker", "Roof Inspection", "Scheduled"],
];

const followUps = [
  ["AH", "Alice Hughes", "Boiler Service Enquiry", "Overdue"],
  ["PD", "Paul Davies", "Quote Follow-Up", "Today"],
  ["LC", "Lucy Clarke", "Bathroom Renovation", "Today"],
  ["RG", "Robert Green", "Roof Repair", "Tomorrow"],
  ["NH", "Natalie Hall", "Kitchen Fitting", "Tomorrow"],
];

function Sparkline({ tone = "blue" }: { tone?: "blue" | "gold" | "green" | "purple" }) {
  return (
    <svg className={`command-spark command-spark-${tone}`} viewBox="0 0 120 38" aria-hidden="true">
      <polyline points="4,30 18,24 32,26 46,20 60,18 74,12 88,16 104,9 116,11" />
    </svg>
  );
}

function KpiCard({
  href,
  icon,
  label,
  value,
  change,
  detail,
  tone,
}: {
  href: string;
  icon: string;
  label: string;
  value: string;
  change: string;
  detail: string;
  tone: "blue" | "gold" | "green" | "purple";
}) {
  return (
    <Link href={href} className={`command-kpi command-kpi-${tone}`}>
      <div className="command-kpi-icon">{icon}</div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span>
          {change} <small>{detail}</small>
        </span>
      </div>
    </Link>
  );
}

function Panel({
  title,
  badge,
  children,
  href,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <section className="command-panel">
      <div className="command-panel-header">
        <h2>{title}</h2>
        {href ? (
          <Link href={href}>{badge ?? "View all"} →</Link>
        ) : badge ? (
          <span>{badge}</span>
        ) : null}
      </div>
      {children}
    </section>
  );
}


function getDashboardSearchHref(searchText: string) {
  const clean = searchText.trim();
  const query = clean.toLowerCase();
  const encoded = encodeURIComponent(clean);

  if (!clean) return "/dashboard";

  if (
    query.includes("message") ||
    query.includes("inbox") ||
    query.includes("whatsapp") ||
    query.includes("facebook") ||
    query.includes("email") ||
    query.includes("reply")
  ) {
    return `/messages?search=${encoded}`;
  }

  if (
    query.includes("booking") ||
    query.includes("appointment") ||
    query.includes("job") ||
    query.includes("calendar") ||
    query.includes("emily") ||
    query.includes("bathroom")
  ) {
    return `/bookings?search=${encoded}`;
  }

  if (
    query.includes("customer") ||
    query.includes("client") ||
    query.includes("sarah johnson") ||
    query.includes("tom wilson") ||
    query.includes("emma davis")
  ) {
    return `/customers?search=${encoded}`;
  }

  if (
    query.includes("follow") ||
    query.includes("callback") ||
    query.includes("call back") ||
    query.includes("alice") ||
    query.includes("paul")
  ) {
    return `/follow-ups?search=${encoded}`;
  }

  if (
    query.includes("review") ||
    query.includes("rating") ||
    query.includes("feedback")
  ) {
    return `/reviews?search=${encoded}`;
  }

  if (
    query.includes("activity") ||
    query.includes("audit") ||
    query.includes("log")
  ) {
    return `/activity-log?search=${encoded}`;
  }

  if (
    query.includes("error") ||
    query.includes("failed") ||
    query.includes("issue")
  ) {
    return `/error-log?search=${encoded}`;
  }

  return `/leads?search=${encoded}`;
}

export default function DashboardPage() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  function handleDashboardSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(getDashboardSearchHref(searchText));
  }

  return (
    <main className="command-dashboard command-dashboard-polish-v1">
      <header className="command-topbar">
        <Link href="/settings" className="command-business-select">
          <span>⌂</span>
          Northfield Home Services
          <small>⌄</small>
        </Link>

        <div className="command-date-select">
          <span>▣</span>
          10 May – 16 May 2025
          <small>⌄</small>
        </div>

        <form className="command-search dashboard-search-active" onSubmit={handleDashboardSearch}>
          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search leads, customers, bookings..."
            aria-label="Search Bee-Aura dashboard"
          />
          <button type="submit">Search</button>
        </form>

        <div className="command-user">
          <span className="command-bell"><strong>4</strong></span>
          <span className="command-avatar">JC</span>
          <div>
            <strong>James Carter</strong>
            <small>Owner</small>
          </div>
          <span>⌄</span>
        </div>
      </header>

      <section className="command-dashboard-grid">
        <Panel title="Live Activity" badge="● Live" href="/activity-log">
          <div className="command-activity-list">
            {liveActivity.map((item) => (
              <Link href={item.href} className="command-activity-item" key={item.title}>
                <span className={`command-round-icon command-round-${item.tone}`}>{item.icon}</span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.detail}</small>
                </span>
                <em>{item.time}</em>
              </Link>
            ))}
          </div>
        </Panel>

        <div className="command-kpi-row">
          {kpis.map((kpi) => (
            <KpiCard
              key={kpi.label}
              href={kpi.href}
              icon={kpi.icon}
              label={kpi.label}
              value={kpi.value}
              change={kpi.change}
              detail={kpi.detail}
              tone={kpi.tone as "blue" | "gold" | "green" | "purple"}
            />
          ))}
        </div>

        <Panel title="Lead Recovery Trend" badge="Last 7 Days">
          <div className="command-chart-legend">
            <span><i className="blue" /> New enquiries</span>
            <span><i className="green" /> Recovered follow-ups</span>
          </div>

          <svg className="command-line-chart command-pro-line-chart" viewBox="0 0 620 260" aria-label="Lead recovery trend chart">
            <defs>
              <linearGradient id="dashboardLeadArea" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(46, 167, 255, 0.25)" />
                <stop offset="100%" stopColor="rgba(46, 167, 255, 0.02)" />
              </linearGradient>
            </defs>

            <line x1="58" y1="32" x2="58" y2="210" className="dash-axis" />
            <line x1="58" y1="210" x2="590" y2="210" className="dash-axis" />

            <line x1="58" y1="54" x2="590" y2="54" className="dash-grid" />
            <line x1="58" y1="92" x2="590" y2="92" className="dash-grid" />
            <line x1="58" y1="130" x2="590" y2="130" className="dash-grid" />
            <line x1="58" y1="168" x2="590" y2="168" className="dash-grid" />

            <text x="22" y="58" className="dash-axis-label">90</text>
            <text x="22" y="96" className="dash-axis-label">70</text>
            <text x="22" y="134" className="dash-axis-label">50</text>
            <text x="22" y="172" className="dash-axis-label">30</text>

            <path
              d="M76 178 L144 138 L212 128 L280 136 L348 104 L416 72 L484 64 L568 42 L568 210 L76 210 Z"
              fill="url(#dashboardLeadArea)"
            />

            <polyline
              points="76,178 144,138 212,128 280,136 348,104 416,72 484,64 568,42"
              className="dash-line-primary"
            />

            <polyline
              points="76,196 144,166 212,152 280,132 348,136 416,102 484,78 568,66"
              className="dash-line-secondary"
            />

            <circle cx="568" cy="42" r="5" className="dash-dot-primary" />
            <circle cx="568" cy="66" r="5" className="dash-dot-secondary" />

            <text x="72" y="236" className="dash-x-label">Mon</text>
            <text x="140" y="236" className="dash-x-label">Tue</text>
            <text x="208" y="236" className="dash-x-label">Wed</text>
            <text x="276" y="236" className="dash-x-label">Thu</text>
            <text x="344" y="236" className="dash-x-label">Fri</text>
            <text x="412" y="236" className="dash-x-label">Sat</text>
            <text x="480" y="236" className="dash-x-label">Sun</text>
          </svg>
        </Panel>

        <Panel title="Booking Performance" badge="Last 7 Days">
          <div className="command-chart-legend">
            <span><i className="gold" /> Confirmed bookings</span>
            <span><i className="blue" /> Revenue trend</span>
          </div>

          <svg className="command-bar-chart command-pro-bar-chart" viewBox="0 0 620 260" aria-label="Booking performance chart">
            <line x1="58" y1="32" x2="58" y2="210" className="dash-axis" />
            <line x1="58" y1="210" x2="590" y2="210" className="dash-axis" />

            <line x1="58" y1="54" x2="590" y2="54" className="dash-grid" />
            <line x1="58" y1="92" x2="590" y2="92" className="dash-grid" />
            <line x1="58" y1="130" x2="590" y2="130" className="dash-grid" />
            <line x1="58" y1="168" x2="590" y2="168" className="dash-grid" />

            <text x="28" y="58" className="dash-axis-label">20</text>
            <text x="28" y="96" className="dash-axis-label">15</text>
            <text x="28" y="134" className="dash-axis-label">10</text>
            <text x="34" y="172" className="dash-axis-label">5</text>

            <rect x="86" y="112" width="34" height="98" rx="8" className="dash-bar-blue" />
            <rect x="154" y="132" width="34" height="78" rx="8" className="dash-bar-blue-muted" />
            <rect x="222" y="78" width="34" height="132" rx="8" className="dash-bar-gold" />
            <rect x="290" y="120" width="34" height="90" rx="8" className="dash-bar-blue-muted" />
            <rect x="358" y="84" width="34" height="126" rx="8" className="dash-bar-blue" />
            <rect x="426" y="96" width="34" height="114" rx="8" className="dash-bar-gold-muted" />
            <rect x="494" y="148" width="34" height="62" rx="8" className="dash-bar-blue-muted" />

            <polyline
              points="103,146 171,158 239,112 307,142 375,96 443,66 511,88"
              className="dash-line-secondary"
            />

            <circle cx="443" cy="66" r="5" className="dash-dot-secondary" />

            <text x="82" y="236" className="dash-x-label">Mon</text>
            <text x="150" y="236" className="dash-x-label">Tue</text>
            <text x="218" y="236" className="dash-x-label">Wed</text>
            <text x="286" y="236" className="dash-x-label">Thu</text>
            <text x="354" y="236" className="dash-x-label">Fri</text>
            <text x="422" y="236" className="dash-x-label">Sat</text>
            <text x="490" y="236" className="dash-x-label">Sun</text>
          </svg>
        </Panel>

        <Panel title="Smart Inbox" badge="12 Unread" href="/messages">
          <div className="command-list">
            {inbox.map(([name, detail, time, count]) => (
              <Link href="/messages" className="command-list-row" key={name}>
                <span className="command-face">{name.split(" ").map((part) => part[0]).join("")}</span>
                <span>
                  <strong>{name}</strong>
                  <small>{detail}</small>
                </span>
                <em>{time}</em>
                {count ? <b>{count}</b> : null}
              </Link>
            ))}
          </div>
        </Panel>

        <Panel title="New Leads" badge="View all" href="/leads">
          <div className="command-list">
            {newLeads.map(([initials, name, detail, time, count]) => (
              <Link href="/leads" className="command-list-row" key={name}>
                <span className="command-initials">{initials}</span>
                <span>
                  <strong>{name} <small className="command-tag">New</small></strong>
                  <small>{detail}</small>
                </span>
                <em>{time}</em>
                {count ? <b>{count}</b> : null}
              </Link>
            ))}
          </div>
        </Panel>

        <Panel title="Today's Bookings" badge="14" href="/bookings">
          <div className="command-schedule">
            {bookings.map(([time, name, detail, status]) => (
              <Link href="/bookings" className="command-schedule-row" key={`${time}-${name}`}>
                <strong>{time}</strong>
                <span>
                  <b>{name}</b>
                  <small>{detail}</small>
                </span>
                <em className={`command-status command-status-${status.toLowerCase().replace(" ", "-")}`}>{status}</em>
              </Link>
            ))}
          </div>
        </Panel>

        <Panel title="Follow-Up Queue" badge="8 Due" href="/follow-ups">
          <div className="command-list">
            {followUps.map(([initials, name, detail, status]) => (
              <Link href="/follow-ups" className="command-list-row" key={name}>
                <span className="command-initials">{initials}</span>
                <span>
                  <strong>{name}</strong>
                  <small>{detail}</small>
                </span>
                <em className={`command-due command-due-${status.toLowerCase()}`}>{status}</em>
              </Link>
            ))}
          </div>
        </Panel>

        <section className="command-assistant command-assistant-pro">
          <div className="command-assistant-visual">
            <img
              src="/brand/source/aura-assistant-transparent.png"
              alt="Aura Assistant"
              className="command-assistant-image"
            />
          </div>

          <div className="command-assistant-content">
            <p className="command-assistant-kicker">Aura Assistant</p>
            <h2>Your next best actions are ready.</h2>
            <p>
              Bee-Aura has spotted the jobs, replies and follow-ups that need
              attention first, so the owner can stay in control without checking
              every page manually.
            </p>

            <div className="command-assistant-insights">
              <div>
                <strong>14</strong>
                <span>new leads waiting</span>
              </div>
              <div>
                <strong>8</strong>
                <span>follow-ups due</span>
              </div>
              <div>
                <strong>2m 48s</strong>
                <span>average response</span>
              </div>
            </div>

            <ul className="command-assistant-actions">
              <li>Call back Alice Hughes before the boiler enquiry goes cold.</li>
              <li>Confirm today’s 15:00 kitchen fitting appointment.</li>
              <li>Send review request to Sarah T. after the completed job.</li>
            </ul>

            <Link href="/follow-ups">Review Priority Tasks</Link>
          </div>
        </section>
      </section>
    </main>
  );
}
