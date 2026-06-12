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
    href: "/leads?search=John%20Smith%20Boiler%20Installation",
    tone: "blue",
  },
  {
    icon: "BK",
    title: "New booking confirmed",
    detail: "Emily Davis • Bathroom Renovation",
    time: "2m ago",
    href: "/bookings?search=Emily%20Davis%20Bathroom%20Renovation",
    tone: "purple",
  },
  {
    icon: "FU",
    title: "Follow-up completed",
    detail: "Paul Davies • Quote Follow-Up",
    time: "2m ago",
    href: "/follow-ups?search=Paul%20Davies%20Quote%20Follow-Up",
    tone: "gold",
  },
  {
    icon: "RV",
    title: "New review received",
    detail: "5★ from Sarah T.",
    time: "12m ago",
    href: "/reviews?search=Sarah%20T%205%20star",
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
          <div className="command-chart-legend graph-pro-legend">
            <span><i className="blue" /> New enquiries</span>
            <span><i className="green" /> Recovered follow-ups</span>
          </div>

          <Link href="/leads" className="dashboard-chart-link dashboard-leads-chart-link" aria-label="Open leads page">
            <svg
              className="command-line-chart command-pro-line-chart lead-graph-pro-6a"
            viewBox="0 0 720 280"
            aria-label="Lead recovery trend chart"
          >
            <defs>
              <linearGradient id="leadGraphBlue6a" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(46, 167, 255, 0.14)" />
                <stop offset="100%" stopColor="rgba(46, 167, 255, 0)" />
              </linearGradient>
              <linearGradient id="leadGraphGreen6a" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(212, 175, 55, 0.12)" />
                <stop offset="100%" stopColor="rgba(212, 175, 55, 0)" />
              </linearGradient>
            </defs>

            <rect x="0" y="0" width="720" height="280" rx="22" className="pro-chart-bg" />

            <line x1="68" y1="42" x2="68" y2="218" className="pro-axis" />
            <line x1="68" y1="218" x2="666" y2="218" className="pro-axis" />

            <line x1="68" y1="70" x2="666" y2="70" className="pro-grid" />
            <line x1="68" y1="108" x2="666" y2="108" className="pro-grid" />
            <line x1="68" y1="146" x2="666" y2="146" className="pro-grid" />
            <line x1="68" y1="184" x2="666" y2="184" className="pro-grid" />

            <text x="30" y="74" className="pro-label">90</text>
            <text x="30" y="112" className="pro-label">70</text>
            <text x="30" y="150" className="pro-label">50</text>
            <text x="30" y="188" className="pro-label">30</text>

            <g className="pro-bar-layer pro-bar-layer-blue" aria-hidden="true">
              <rect x="96" y="190" width="16" height="28" rx="5" />
              <rect x="188" y="168" width="16" height="50" rx="5" />
              <rect x="280" y="158" width="16" height="60" rx="5" />
              <rect x="372" y="170" width="16" height="48" rx="5" />
              <rect x="464" y="132" width="16" height="86" rx="5" />
              <rect x="556" y="104" width="16" height="114" rx="5" />
              <rect x="648" y="88" width="16" height="130" rx="5" />
            </g>

            <g className="pro-bar-layer pro-bar-layer-gold" aria-hidden="true">
              <rect x="116" y="202" width="10" height="16" rx="4" />
              <rect x="208" y="184" width="10" height="34" rx="4" />
              <rect x="300" y="172" width="10" height="46" rx="4" />
              <rect x="392" y="156" width="10" height="62" rx="4" />
              <rect x="484" y="154" width="10" height="64" rx="4" />
              <rect x="576" y="122" width="10" height="96" rx="4" />
              <rect x="668" y="106" width="10" height="112" rx="4" />
            </g>

            <path
              d="M86 198 L178 156 L270 146 L362 154 L454 112 L546 88 L638 70 L638 218 L86 218 Z"
              fill="url(#leadGraphBlue6a)"
            />
            <path
              d="M86 210 L178 178 L270 162 L362 144 L454 146 L546 104 L638 88 L638 218 L86 218 Z"
              fill="url(#leadGraphGreen6a)"
            />

            <path
              d="M86 198 L178 156 L270 146 L362 154 L454 112 L546 88 L638 70"
              className="pro-line-blue"
            />
            <path
              d="M86 210 L178 178 L270 162 L362 144 L454 146 L546 104 L638 88"
              className="pro-line-green"
            />

            <circle cx="638" cy="70" r="4" className="pro-dot-blue" />
            <circle cx="638" cy="88" r="4" className="pro-dot-green" />

            <text x="78" y="248" className="pro-x">Mon</text>
            <text x="170" y="248" className="pro-x">Tue</text>
            <text x="262" y="248" className="pro-x">Wed</text>
            <text x="354" y="248" className="pro-x">Thu</text>
            <text x="446" y="248" className="pro-x">Fri</text>
            <text x="538" y="248" className="pro-x">Sat</text>
            <text x="630" y="248" className="pro-x">Sun</text>
            </svg>
          </Link>
          <div className="graph-detail-row graph-detail-leads">
            <span><strong>482</strong> captured</span>
            <span><strong>71</strong> recovered</span>
            <span><strong>+10%</strong> week trend</span>
          </div>
        </Panel>

        <Panel title="Booking Performance" badge="Last 7 Days">
          <div className="command-chart-legend graph-pro-legend">
            <span><i className="gold" /> Booked jobs</span>
            <span><i className="blue" /> Estimated value</span>
          </div>

          <Link href="/bookings" className="dashboard-chart-link dashboard-bookings-chart-link" aria-label="Open bookings page">
            <svg
              className="command-bar-chart command-pro-bar-chart booking-graph-pro-6b"
              viewBox="0 0 720 280"
              aria-label="Booking performance trend chart"
            >
              <defs>
                <linearGradient id="bookingGraphGold6b" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(212, 175, 55, 0.13)" />
                  <stop offset="100%" stopColor="rgba(212, 175, 55, 0)" />
                </linearGradient>
                <linearGradient id="bookingGraphBlue6b" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(46, 167, 255, 0.12)" />
                  <stop offset="100%" stopColor="rgba(46, 167, 255, 0)" />
                </linearGradient>
              </defs>

              <rect x="0" y="0" width="720" height="280" rx="22" className="pro-chart-bg" />

              <line x1="68" y1="42" x2="68" y2="218" className="pro-axis" />
              <line x1="68" y1="218" x2="666" y2="218" className="pro-axis" />

              <line x1="68" y1="70" x2="666" y2="70" className="pro-grid" />
              <line x1="68" y1="108" x2="666" y2="108" className="pro-grid" />
              <line x1="68" y1="146" x2="666" y2="146" className="pro-grid" />
              <line x1="68" y1="184" x2="666" y2="184" className="pro-grid" />

              <text x="26" y="74" className="pro-label">£5k</text>
              <text x="26" y="112" className="pro-label">£4k</text>
              <text x="26" y="150" className="pro-label">£3k</text>
              <text x="26" y="188" className="pro-label">£2k</text>

              <g className="pro-bar-layer pro-bar-layer-gold" aria-hidden="true">
                <rect x="96" y="178" width="16" height="40" rx="5" />
                <rect x="188" y="188" width="16" height="30" rx="5" />
                <rect x="280" y="118" width="16" height="100" rx="5" />
                <rect x="372" y="154" width="16" height="64" rx="5" />
                <rect x="464" y="112" width="16" height="106" rx="5" />
                <rect x="556" y="92" width="16" height="126" rx="5" />
                <rect x="648" y="144" width="16" height="74" rx="5" />
              </g>

              <g className="pro-bar-layer pro-bar-layer-blue" aria-hidden="true">
                <rect x="116" y="198" width="10" height="20" rx="4" />
                <rect x="208" y="204" width="10" height="14" rx="4" />
                <rect x="300" y="166" width="10" height="52" rx="4" />
                <rect x="392" y="178" width="10" height="40" rx="4" />
                <rect x="484" y="138" width="10" height="80" rx="4" />
                <rect x="576" y="96" width="10" height="122" rx="4" />
                <rect x="668" y="118" width="10" height="100" rx="4" />
              </g>

              <path
                d="M86 178 L178 188 L270 112 L362 154 L454 104 L546 82 L638 136 L638 218 L86 218 Z"
                fill="url(#bookingGraphGold6b)"
              />
              <path
                d="M86 198 L178 204 L270 166 L362 178 L454 138 L546 96 L638 118 L638 218 L86 218 Z"
                fill="url(#bookingGraphBlue6b)"
              />

              <path
                d="M86 178 L178 188 L270 112 L362 154 L454 104 L546 82 L638 136"
                className="pro-line-gold"
              />
              <path
                d="M86 198 L178 204 L270 166 L362 178 L454 138 L546 96 L638 118"
                className="pro-line-blue"
              />

              <circle cx="638" cy="136" r="4" className="pro-dot-gold" />
              <circle cx="638" cy="118" r="4" className="pro-dot-blue" />

              <text x="78" y="248" className="pro-x">Mon</text>
              <text x="170" y="248" className="pro-x">Tue</text>
              <text x="262" y="248" className="pro-x">Wed</text>
              <text x="354" y="248" className="pro-x">Thu</text>
              <text x="446" y="248" className="pro-x">Fri</text>
              <text x="538" y="248" className="pro-x">Sat</text>
              <text x="630" y="248" className="pro-x">Sun</text>
            </svg>
          </Link>
          <div className="graph-detail-row graph-detail-bookings">
            <span><strong>82</strong> jobs booked</span>
            <span><strong>£18.4k</strong> estimated value</span>
            <span><strong>14</strong> today</span>
          </div>
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
