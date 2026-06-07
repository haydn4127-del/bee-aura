import Link from "next/link";

const kpis = [
  {
    href: "/leads",
    icon: "👥",
    label: "Leads Captured",
    value: "482",
    change: "▲ 10%",
    detail: "vs last 7 days",
    tone: "blue",
  },
  {
    href: "/messages",
    icon: "💬",
    label: "Avg. Response Time",
    value: "2m 48s",
    change: "▼ 21%",
    detail: "vs last 7 days",
    tone: "blue",
  },
  {
    href: "/bookings",
    icon: "📅",
    label: "Bookings Today",
    value: "14",
    change: "▲ 27%",
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
    icon: "⏱",
    label: "Follow-Ups Due",
    value: "23",
    change: "▲ 15%",
    detail: "vs yesterday",
    tone: "gold",
  },
];

const liveActivity = [
  {
    icon: "👥",
    title: "New lead captured",
    detail: "John Smith • Boiler Insulation",
    time: "Just now",
    href: "/leads",
    tone: "blue",
  },
  {
    icon: "📅",
    title: "New booking confirmed",
    detail: "Emily Davis • Bathroom Renovation",
    time: "2m ago",
    href: "/bookings",
    tone: "purple",
  },
  {
    icon: "✓",
    title: "Follow-up completed",
    detail: "Paul Davies • Quote Follow-Up",
    time: "2m ago",
    href: "/follow-ups",
    tone: "gold",
  },
  {
    icon: "☆",
    title: "New review received",
    detail: "5★ from Sarah T.",
    time: "12m ago",
    href: "/reviews",
    tone: "green",
  },
];

const inbox = [
  ["Emily Davis", "Bathroom Renovation Enquiry", "2m ago", "2"],
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

export default function DashboardPage() {
  return (
    <main className="command-dashboard">
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

        <Link href="/leads" className="command-search">
          🔍 Search leads, customers, bookings...
        </Link>

        <div className="command-user">
          <span className="command-bell">🔔<strong>4</strong></span>
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

        <Panel title="Leads & Pipeline Trend" badge="Last 7 Days">
          <div className="command-chart-legend">
            <span><i className="blue" /> Leads Captured</span>
            <span><i className="green" /> Pipeline Value (£)</span>
          </div>
          <svg className="command-line-chart" viewBox="0 0 620 260" aria-label="Fake leads and pipeline trend">
            <g className="command-grid-lines">
              <line x1="44" y1="40" x2="600" y2="40" />
              <line x1="44" y1="90" x2="600" y2="90" />
              <line x1="44" y1="140" x2="600" y2="140" />
              <line x1="44" y1="190" x2="600" y2="190" />
              <line x1="44" y1="230" x2="600" y2="230" />
            </g>
            <polyline className="line-blue" points="44,190 120,145 196,132 272,136 348,110 424,76 500,66 580,48" />
            <polyline className="line-green" points="44,215 120,178 196,164 272,136 348,140 424,104 500,74 580,65" />
            <circle cx="580" cy="48" r="5" className="dot-blue" />
            <circle cx="580" cy="65" r="5" className="dot-green" />
          </svg>
        </Panel>

        <Panel title="Booking Performance" badge="Last 7 Days">
          <div className="command-chart-legend">
            <span><i className="blue" /> Bookings</span>
            <span><i className="green" /> Revenue (£)</span>
          </div>
          <div className="command-bar-chart">
            {[17, 14, 20, 11, 20, 18, 9].map((height, index) => (
              <span key={index} style={{ height: `${height * 7}px` }} />
            ))}
            <svg viewBox="0 0 340 170" aria-hidden="true">
              <polyline points="5,100 58,112 110,78 165,101 220,70 276,45 335,62" />
            </svg>
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

        <section className="command-assistant">
          <h2>Bee-Aura AI Assistant</h2>
          <div className="command-bot">
            <span className="bot-antenna left" />
            <span className="bot-antenna right" />
            <span className="bot-head">
              <i />
              <i />
            </span>
            <span className="bot-body" />
            <span className="bot-wing left" />
            <span className="bot-wing right" />
          </div>
          <h3>Everything looks buzzing!</h3>
          <p>You have <strong>14</strong> new leads and <strong>8</strong> follow-ups due.</p>
          <Link href="/follow-ups">View My Tasks</Link>
        </section>
      </section>
    </main>
  );
}
