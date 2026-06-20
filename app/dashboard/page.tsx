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
    tone: "blue",
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
    tone: "blue",
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

function Sparkline({ tone = "blue" }: { tone?: "blue" | "gold" | "green"  }) {
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
  tone: "blue" | "gold" | "green" ;
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
          Manchester Home Services
          <small>⌄</small>
        </Link>

        <Link
          href="/activity-log?search=10%20May%20to%2016%20May%202025"
          className="command-date-select"
          aria-label="Open activity log for 10 May to 16 May 2025"
        >
          <span>▣</span>
          10 May – 16 May 2025
          <small>⌄</small>
        </Link>

        <form className="command-search dashboard-search-active" onSubmit={handleDashboardSearch}>
          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search leads, customers, bookings..."
            aria-label="Search Bee-Aura dashboard"
          />
          <button type="submit">Search</button>
        </form>

        <Link href="/settings" className="command-user" aria-label="Open owner settings">
          <span className="command-avatar">JD</span>
          <div>
            <strong>John D</strong>
            <small>Owner</small>
          </div>
          <span>⌄</span>
        </Link>
      </header>

      <section className="command-calendar" aria-label="Owner calendar and next actions">
        <div className="command-calendar-copy">
          <p>Owner calendar</p>
          <h2>Today’s bookings, follow-ups and replies in one view.</h2>
          <span>
            A simple daily run sheet for the owner: see the next job, the next reply and the next follow-up without hunting through every page.
          </span>
        </div>

        <div className="command-calendar-events" aria-label="Today’s demo schedule">
          <Link href="/bookings?search=Tom%20Wilson" className="command-calendar-event booking">
            <time dateTime="2025-05-19T09:00">09:00</time>
            <span>
              <strong>Boiler service</strong>
              <small>Tom Wilson · confirmed visit</small>
            </span>
            <em>Open booking</em>
          </Link>

          <Link href="/bookings?search=Sarah%20Johnson" className="command-calendar-event booking">
            <time dateTime="2025-05-19T11:30">11:30</time>
            <span>
              <strong>Bathroom renovation</strong>
              <small>Sarah Johnson · confirm engineer ETA</small>
            </span>
            <em>Open job</em>
          </Link>

          <Link href="/messages?search=Sarah%20Johnson" className="command-calendar-event message">
            <time dateTime="2025-05-19T14:30">14:30</time>
            <span>
              <strong>Reply approval</strong>
              <small>Emergency boiler message waiting</small>
            </span>
            <em>Open inbox</em>
          </Link>

          <Link href="/follow-ups?search=Emma%20Davis" className="command-calendar-event follow">
            <time dateTime="2025-05-19T16:00">16:00</time>
            <span>
              <strong>Follow-up due</strong>
              <small>Emma Davis · booking reminder</small>
            </span>
            <em>Open task</em>
          </Link>
        </div>

        <div className="command-calendar-actions" aria-label="Calendar shortcuts">
          <Link href="/bookings">Booking calendar</Link>
          <Link href="/follow-ups">Follow-up queue</Link>
          <Link href="/messages">Inbox actions</Link>
        </div>
      </section>


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

          <div className="dashboard-live-detail-stack">
            <Link href="/messages?search=missed%20call" className="dashboard-live-detail-row recovered">
              <span>MC</span>
              <span className="dashboard-live-copy">
                <strong>Missed call recovered</strong>
                <small>Boiler enquiry turned into an inbox task.</small>
              </span>
              <em>4m ago</em>
            </Link>

            <Link href="/messages?search=drafted%20reply" className="dashboard-live-detail-row draft">
              <span>AI</span>
              <span className="dashboard-live-copy">
                <strong>Reply drafted for review</strong>
                <small>Suggested response waiting for owner approval.</small>
              </span>
              <em>7m ago</em>
            </Link>

            <Link href="/bookings?search=reminder" className="dashboard-live-detail-row booking">
              <span>RM</span>
              <span className="dashboard-live-copy">
                <strong>Booking reminder queued</strong>
                <small>15:00 kitchen fitting reminder ready.</small>
              </span>
              <em>9m ago</em>
            </Link>

            <Link href="/follow-ups?search=priority" className="dashboard-live-detail-row follow">
              <span>PR</span>
              <span className="dashboard-live-copy">
                <strong>Priority risk raised</strong>
                <small>Alice Hughes follow-up moved to high priority.</small>
              </span>
              <em>14m ago</em>
            </Link>
          </div>

          <div className="dashboard-live-snapshot">
            <span><strong>12</strong><small>events tracked</small></span>
            <span><strong>4</strong><small>need review</small></span>
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
              tone={kpi.tone as "blue" | "gold" | "green" }
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
                <stop offset="0%" stopColor="rgba(45, 196, 255, 0.14)" />
                <stop offset="100%" stopColor="rgba(45, 196, 255, 0)" />
              </linearGradient>
              <linearGradient id="leadGraphGreen6a" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 210, 74, 0.12)" />
                <stop offset="100%" stopColor="rgba(255, 210, 74, 0)" />
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
                  <stop offset="0%" stopColor="rgba(255, 210, 74, 0.13)" />
                  <stop offset="100%" stopColor="rgba(255, 210, 74, 0)" />
                </linearGradient>
                <linearGradient id="bookingGraphBlue6b" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(45, 196, 255, 0.12)" />
                  <stop offset="100%" stopColor="rgba(45, 196, 255, 0)" />
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

        <Panel title="Inbox" badge="12 Unread" href="/messages">
          <div className="dashboard-lower-panel dashboard-inbox-v2">
            <Link href="/messages?search=Emily%20Davis" className="dashboard-feature-row priority">
              <span className="dashboard-row-icon">ED</span>
              <span className="dashboard-row-copy">
                <small>WhatsApp • 2 minutes ago</small>
                <strong>Emily Davis</strong>
                <em>Bathroom renovation enquiry needs a fast reply before it cools down.</em>
              </span>
              <b>2</b>
            </Link>

            <Link href="/messages?search=John%20Smith" className="dashboard-simple-row">
              <span>John Smith</span>
              <em>Boiler install reply waiting</em>
              <b>5m</b>
            </Link>

            <Link href="/messages?search=Tom%20Brown" className="dashboard-simple-row">
              <span>Tom Brown</span>
              <em>Urgent plumbing message</em>
              <b>22m</b>
            </Link>

            <Link href="/messages?search=Michael%20Walker" className="dashboard-simple-row">
              <span>Michael Walker</span>
              <em>Roof repair callback request</em>
              <b>30m</b>
            </Link>
          </div>
        </Panel>

        <Panel title="New Leads" badge="View all" href="/leads">
          <div className="dashboard-lower-panel dashboard-leads-v2">
            <Link href="/leads?search=John%20Smith" className="dashboard-lead-card hot">
              <span>Hot</span>
              <span className="dashboard-row-copy">
                <strong>John Smith</strong>
                <em>Boiler installation • website form • ready to quote</em>
              </span>
              <b>£2.4k</b>
            </Link>

            <Link href="/leads?search=Emily%20Davis" className="dashboard-lead-card warm">
              <span>Warm</span>
              <span className="dashboard-row-copy">
                <strong>Emily Davis</strong>
                <em>Bathroom renovation • WhatsApp • wants availability</em>
              </span>
              <b>£6.8k</b>
            </Link>

            <Link href="/leads?search=Michael%20Walker" className="dashboard-lead-card review">
              <span>Review</span>
              <span className="dashboard-row-copy">
                <strong>Michael Walker</strong>
                <em>Roof repair • callback needed • quote not sent</em>
              </span>
              <b>£1.9k</b>
            </Link>
          </div>
        </Panel>

        <Panel title="Today's Bookings" badge="14" href="/bookings">
          <div className="dashboard-lower-panel dashboard-bookings-v2">
            <Link href="/bookings?search=James%20Wilson" className="dashboard-booking-row confirmed">
              <strong>09:00</strong>
              <span className="dashboard-row-copy">
                <b>James Wilson</b>
                <em>Boiler install • engineer confirmed</em>
              </span>
              <small>Confirmed</small>
            </Link>

            <Link href="/bookings?search=Emily%20Davis" className="dashboard-booking-row confirmed">
              <strong>11:30</strong>
              <span className="dashboard-row-copy">
                <b>Emily Davis</b>
                <em>Bathroom quote visit • customer confirmed</em>
              </span>
              <small>Confirmed</small>
            </Link>

            <Link href="/bookings?search=Tom%20Brown" className="dashboard-booking-row active">
              <strong>13:00</strong>
              <span className="dashboard-row-copy">
                <b>Tom Brown</b>
                <em>Plumbing repair • currently on site</em>
              </span>
              <small>In progress</small>
            </Link>

            <Link href="/bookings?search=Sarah%20Roberts" className="dashboard-booking-row waiting">
              <strong>15:00</strong>
              <span className="dashboard-row-copy">
                <b>Sarah Roberts</b>
                <em>Kitchen fitting • confirm ETA</em>
              </span>
              <small>Check</small>
            </Link>
          </div>
        </Panel>

        <Panel title="Follow-Up Queue" badge="8 Due" href="/follow-ups">
          <div className="dashboard-lower-panel dashboard-followups-v2">
            <Link href="/follow-ups?search=Alice%20Hughes" className="dashboard-followup-row critical">
              <span>High</span>
              <span className="dashboard-row-copy">
                <strong>Alice Hughes</strong>
                <em>Boiler service enquiry overdue. Call before the lead goes cold.</em>
              </span>
              <b>Call now</b>
            </Link>

            <Link href="/follow-ups?search=Paul%20Davies" className="dashboard-followup-row medium">
              <span>Med</span>
              <span className="dashboard-row-copy">
                <strong>Paul Davies</strong>
                <em>Quote follow-up due today. Decision likely after callback.</em>
              </span>
              <b>Today</b>
            </Link>

            <Link href="/follow-ups?search=Lucy%20Clarke" className="dashboard-followup-row medium">
              <span>Med</span>
              <span className="dashboard-row-copy">
                <strong>Lucy Clarke</strong>
                <em>Bathroom renovation reply needed. Keep momentum warm.</em>
              </span>
              <b>Today</b>
            </Link>

            <Link href="/follow-ups?search=Natalie%20Hall" className="dashboard-followup-row low">
              <span>Low</span>
              <span className="dashboard-row-copy">
                <strong>Natalie Hall</strong>
                <em>Kitchen fitting reminder scheduled for tomorrow morning.</em>
              </span>
              <b>Tomorrow</b>
            </Link>
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
