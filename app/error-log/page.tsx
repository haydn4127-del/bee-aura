"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Severity = "Critical" | "High" | "Medium" | "Low";
type ErrorStatus = "Open" | "Investigating" | "Retrying" | "Resolved";
type ErrorSource =
  | "WhatsApp"
  | "Call Tracking"
  | "Bookings"
  | "Payments"
  | "Email"
  | "Bee-Aura AI"
  | "Automations"
  | "Database";

type ErrorItem = {
  id: string;
  time: string;
  error: string;
  source: ErrorSource;
  severity: Severity;
  status: ErrorStatus;
  owner: string;
  eta: string;
  impact: string;
  retryCount: number;
  lastSeen: string;
  affectedArea: string;
};

const startingErrors: ErrorItem[] = [
  {
    id: "ERR-1001",
    time: "10:27 AM",
    error: "WhatsApp webhook failure",
    source: "WhatsApp",
    severity: "Critical",
    status: "Open",
    owner: "Sarah J.",
    eta: "15m",
    impact: "Multiple delivery failures reported",
    retryCount: 3,
    lastSeen: "2m ago",
    affectedArea: "Customer messages",
  },
  {
    id: "ERR-1002",
    time: "10:15 AM",
    error: "Missed call recovery timeout",
    source: "Call Tracking",
    severity: "High",
    status: "Investigating",
    owner: "Tom W.",
    eta: "30m",
    impact: "Callback workflow paused for one lead",
    retryCount: 2,
    lastSeen: "7m ago",
    affectedArea: "Missed call recovery",
  },
  {
    id: "ERR-1003",
    time: "10:02 AM",
    error: "Booking sync error",
    source: "Bookings",
    severity: "High",
    status: "Retrying",
    owner: "Emma D.",
    eta: "45m",
    impact: "One booking confirmation delayed",
    retryCount: 4,
    lastSeen: "12m ago",
    affectedArea: "Booking updates",
  },
  {
    id: "ERR-1004",
    time: "09:48 AM",
    error: "Payment event retry failed",
    source: "Payments",
    severity: "Critical",
    status: "Open",
    owner: "Michael T.",
    eta: "20m",
    impact: "Charges may not be syncing",
    retryCount: 5,
    lastSeen: "28m ago",
    affectedArea: "Billing events",
  },
  {
    id: "ERR-1005",
    time: "09:32 AM",
    error: "Email delivery failure",
    source: "Email",
    severity: "Medium",
    status: "Investigating",
    owner: "Lucy C.",
    eta: "40m",
    impact: "Review request delayed",
    retryCount: 1,
    lastSeen: "44m ago",
    affectedArea: "Outbound email",
  },
  {
    id: "ERR-1006",
    time: "09:18 AM",
    error: "AI reply generation failed",
    source: "Bee-Aura AI",
    severity: "High",
    status: "Retrying",
    owner: "Sarah J.",
    eta: "25m",
    impact: "High failure rate detected",
    retryCount: 3,
    lastSeen: "58m ago",
    affectedArea: "Suggested replies",
  },
  {
    id: "ERR-1007",
    time: "08:57 AM",
    error: "Follow-up automation delayed",
    source: "Automations",
    severity: "Low",
    status: "Investigating",
    owner: "Tom W.",
    eta: "60m",
    impact: "Some reminders running late",
    retryCount: 1,
    lastSeen: "1h ago",
    affectedArea: "Follow-up queue",
  },
  {
    id: "ERR-1008",
    time: "08:41 AM",
    error: "Customer data fetch timeout",
    source: "Database",
    severity: "Medium",
    status: "Resolved",
    owner: "System",
    eta: "Done",
    impact: "Temporary customer view delay",
    retryCount: 2,
    lastSeen: "Resolved",
    affectedArea: "Customer records",
  },
];

const statCards = [
  { icon: "⚠", label: "Open Errors", value: "18", change: "↑ 20% vs yesterday", tone: "red" },
  { icon: "🔔", label: "Critical Alerts", value: "4", change: "↑ 33% vs yesterday", tone: "red" },
  { icon: "✓", label: "Resolved Today", value: "27", change: "↑ 17% vs yesterday", tone: "green" },
  { icon: "♡", label: "System Health", value: "98.4%", change: "↑ 1.6% vs yesterday", tone: "blue" },
];

const criticalIncidents = [
  { time: "10:27 AM", title: "WhatsApp webhook failure", detail: "Multiple delivery failures reported", status: "Open" },
  { time: "09:48 AM", title: "Payment event retry failed", detail: "Charges may not be syncing", status: "Open" },
  { time: "09:05 AM", title: "AI reply generation failed", detail: "High failure rate detected", status: "Retrying" },
  { time: "08:22 AM", title: "Email service connectivity issue", detail: "Intermittent delivery failures", status: "Investigating" },
];

const resolutionQueue = [
  { owner: "Sarah J.", issue: "WhatsApp webhook failure", eta: "15m" },
  { owner: "Tom W.", issue: "Missed call recovery timeout", eta: "30m" },
  { owner: "Emma D.", issue: "Booking sync error", eta: "45m" },
  { owner: "Michael T.", issue: "Payment event retry failed", eta: "20m" },
];

const recentResolutions = [
  { time: "10:05 AM", issue: "Email delivery failure", source: "Email", owner: "Lucy C." },
  { time: "09:54 AM", issue: "Database connection timeout", source: "Database", owner: "System" },
  { time: "09:33 AM", issue: "Follow-up automation delayed", source: "Automations", owner: "Tom W." },
  { time: "09:21 AM", issue: "AI reply generation failed", source: "Bee-Aura AI", owner: "Sarah J." },
  { time: "08:58 AM", issue: "Webhook signature mismatch", source: "Integrations", owner: "Michael T." },
];

const preventionChecks = [
  "Webhook monitoring enabled",
  "Retry rules are active",
  "Owner alerts enabled",
  "Automated escalations enabled",
  "System health monitoring",
  "Error export available",
];

const systemFilters: Array<"All Systems" | ErrorSource> = [
  "All Systems",
  "WhatsApp",
  "Call Tracking",
  "Bookings",
  "Payments",
  "Email",
  "Bee-Aura AI",
  "Automations",
  "Database",
];

function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

function sourceIcon(source: ErrorSource) {
  if (source === "WhatsApp") return "◉";
  if (source === "Call Tracking") return "☎";
  if (source === "Bookings") return "▣";
  if (source === "Payments") return "▤";
  if (source === "Email") return "✉";
  if (source === "Bee-Aura AI") return "🤖";
  if (source === "Automations") return "↻";
  if (source === "Database") return "▤";
  return "!";
}

export default function ErrorLogPage() {
  const [errors, setErrors] = useState(startingErrors);
  const [activeFilter, setActiveFilter] = useState<"All Systems" | ErrorSource>("All Systems");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("Error log ready. Fake demo data only.");

  const filteredErrors = useMemo(() => {
    const query = search.trim().toLowerCase();

    return errors.filter((item) => {
      const filterMatch = activeFilter === "All Systems" || item.source === activeFilter;
      const searchMatch =
        query.length === 0 ||
        item.error.toLowerCase().includes(query) ||
        item.source.toLowerCase().includes(query) ||
        item.severity.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        item.owner.toLowerCase().includes(query) ||
        item.impact.toLowerCase().includes(query);

      return filterMatch && searchMatch;
    });
  }, [activeFilter, errors, search]);

  function updateStatus(id: string, status: ErrorStatus) {
    setErrors((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              lastSeen: status === "Resolved" ? "Resolved just now" : "Just now",
            }
          : item,
      ),
    );
    setNotice(`Error marked as ${status}.`);
  }

  return (
    <main className="errorRef-page">
      <header className="errorRef-topbar">
        <div>
          <h1>Error Log</h1>
          <p>Monitor system issues, failed automations and alerts in one place.</p>
        </div>

        <div className="errorRef-actions">
          <button
            type="button"
            onClick={() => setNotice("Demo export prepared. No real error data exported.")}
            className="errorRef-addButton"
          >
            ⇩ Export Errors
          </button>

          <select
            value={activeFilter}
            onChange={(event) => {
              setActiveFilter(event.target.value as "All Systems" | ErrorSource);
              setNotice(`${event.target.value} filter selected.`);
            }}
            className="errorRef-select"
          >
            {systemFilters.map((filter) => (
              <option key={filter}>{filter}</option>
            ))}
          </select>

          <label className="errorRef-search">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search errors..."
            />
            <span>⌕</span>
          </label>

          <Link href="/settings" className="errorRef-owner">
            <span>JD</span>
            <strong>John D.</strong>
            <small>Owner</small>
          </Link>
        </div>
      </header>

      <section className="errorRef-stats">
        {statCards.map((card) => (
          <article key={card.label} className={`errorRef-stat errorRef-stat-${card.tone}`}>
            <span className="errorRef-statIcon">{card.icon}</span>
            <div>
              <p>{card.label}</p>
              <strong>{card.value}</strong>
              <small>{card.change}</small>
            </div>
          </article>
        ))}
      </section>

      <section className="errorRef-grid">
        <section className="errorRef-card errorRef-queue">
          <div className="errorRef-panelHeader">
            <h2>Live Error Queue <span>{filteredErrors.length}</span></h2>
          </div>

          <div className="errorRef-tableWrap">
            <table className="errorRef-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Error</th>
                  <th>Source</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Owner</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredErrors.map((item) => (
                  <tr key={item.id}>
                    <td>{item.time}</td>
                    <td>
                      <div className="errorRef-errorCell">
                        <span className={`source-${slugify(item.source)}`}>{sourceIcon(item.source)}</span>
                        <div>
                          <strong>{item.error}</strong>
                          <small>{item.impact}</small>
                        </div>
                      </div>
                    </td>
                    <td>{item.source}</td>
                    <td>
                      <span className={`errorRef-severity severity-${slugify(item.severity)}`}>
                        {item.severity}
                      </span>
                    </td>
                    <td>
                      <span className={`errorRef-status status-${slugify(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <span className="errorRef-ownerMini">{item.owner}</span>
                    </td>
                    <td>
                      <div className="errorRef-rowActions">
                        <button type="button" onClick={() => setNotice(`${item.error}: ${item.affectedArea}. Retry count ${item.retryCount}.`)}>
                          ◉
                        </button>
                        <button type="button" onClick={() => updateStatus(item.id, item.status === "Resolved" ? "Investigating" : "Resolved")}>
                          ⋮
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredErrors.length === 0 ? (
              <div className="errorRef-empty">
                <strong>No errors found.</strong>
                <p>Clear search or switch back to All Systems.</p>
              </div>
            ) : null}
          </div>

          <Link href="/error-log" className="errorRef-viewAll">View all errors →</Link>
        </section>

        <aside className="errorRef-sideStack">
          <section className="errorRef-card errorRef-critical">
            <div className="errorRef-panelHeader">
              <h2>⚠ Critical Incidents <span>4</span></h2>
              <Link href="/error-log">View all →</Link>
            </div>

            <div className="errorRef-incidentList">
              {criticalIncidents.map((incident) => (
                <Link href="/error-log" key={`${incident.time}-${incident.title}`} className="errorRef-incident">
                  <span>{incident.time}</span>
                  <div>
                    <strong>{incident.title}</strong>
                    <small>{incident.detail}</small>
                  </div>
                  <em className={`errorRef-status status-${slugify(incident.status)}`}>{incident.status}</em>
                </Link>
              ))}
            </div>
          </section>

          <section className="errorRef-card errorRef-resolution">
            <div className="errorRef-panelHeader">
              <h2>♧ Resolution Queue <span>6</span></h2>
              <Link href="/error-log">View all →</Link>
            </div>

            <div className="errorRef-resolutionTable">
              <div>
                <span>Owner</span>
                <span>Issue</span>
                <span>ETA</span>
              </div>

              {resolutionQueue.map((item) => (
                <div key={`${item.owner}-${item.issue}`}>
                  <span>{item.owner}</span>
                  <strong>{item.issue}</strong>
                  <em>{item.eta}</em>
                </div>
              ))}
            </div>
          </section>

          <section className="errorRef-card errorRef-breakdown">
            <div className="errorRef-panelHeader">
              <h2>↯ Error Breakdown</h2>
              <span>This Week⌄</span>
            </div>

            <div className="errorRef-breakdownBody">
              <div className="errorRef-donut">
                <strong>78</strong>
                <span>Total Errors</span>
              </div>

              <div className="errorRef-legend">
                <p><span className="critical" /> Critical <strong>15 (19%)</strong></p>
                <p><span className="high" /> High <strong>28 (36%)</strong></p>
                <p><span className="medium" /> Medium <strong>22 (28%)</strong></p>
                <p><span className="low" /> Low <strong>9 (12%)</strong></p>
                <p><span className="info" /> Info <strong>4 (5%)</strong></p>
              </div>
            </div>

            <Link href="/dashboard" className="errorRef-viewAll">View full analytics →</Link>
          </section>
        </aside>

        <section className="errorRef-card errorRef-recent">
          <div className="errorRef-panelHeader">
            <h2>✓ Recent Resolutions <span>5</span></h2>
            <Link href="/activity-log">View all →</Link>
          </div>

          <div className="errorRef-recentTable">
            <div>
              <span>Time</span>
              <span>Resolved Issue</span>
              <span>Source</span>
              <span>Resolved By</span>
              <span></span>
            </div>

            {recentResolutions.map((item) => (
              <div key={`${item.time}-${item.issue}`}>
                <span>{item.time}</span>
                <strong>{item.issue}</strong>
                <span>{item.source}</span>
                <span>{item.owner}</span>
                <em>Resolved</em>
              </div>
            ))}
          </div>
        </section>

        <section className="errorRef-card errorRef-prevention">
          <div className="errorRef-panelHeader">
            <h2>▣ Prevention Checks <span>6</span></h2>
          </div>

          <div className="errorRef-checkList">
            {preventionChecks.map((check) => (
              <p key={check}>
                <span>✓</span>
                {check}
                <strong>{check === "Error export available" ? "Ready" : "Active"}</strong>
                <em>✓</em>
              </p>
            ))}
          </div>
        </section>
      </section>

      <div className="errorRef-notice">{notice}</div>
    </main>
  );
}
