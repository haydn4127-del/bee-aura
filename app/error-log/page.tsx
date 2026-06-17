"use client";

import { useMemo, useState } from "react";
import styles from "./error-log.module.css";

type Severity = "Critical" | "High" | "Medium" | "Low";
type Status = "Open" | "Investigating" | "Retrying" | "Resolved";

type ErrorItem = {
  id: string;
  time: string;
  title: string;
  source: string;
  severity: Severity;
  status: Status;
  owner: string;
  eta: string;
  impact: string;
  recoveryAction: string;
};

const errorsSeed: ErrorItem[] = [
  {
    id: "err-whatsapp",
    time: "10:27 AM",
    title: "WhatsApp webhook failure",
    source: "WhatsApp",
    severity: "Critical",
    status: "Open",
    owner: "Sarah J.",
    eta: "15m",
    impact: "A new WhatsApp enquiry may not reach the team quickly enough.",
    recoveryAction: "Retry the webhook, link the affected lead, and prepare an owner-safe reply route.",
  },
  {
    id: "err-call",
    time: "10:15 AM",
    title: "Missed call recovery timeout",
    source: "Call Tracking",
    severity: "High",
    status: "Investigating",
    owner: "Tom W.",
    eta: "30m",
    impact: "A missed caller could be waiting without a callback reminder.",
    recoveryAction: "Open the linked lead and prepare a callback recovery task.",
  },
  {
    id: "err-booking",
    time: "10:02 AM",
    title: "Booking sync error",
    source: "Bookings",
    severity: "High",
    status: "Retrying",
    owner: "Emma D.",
    eta: "45m",
    impact: "A customer could be waiting for a booking confirmation.",
    recoveryAction: "Retry sync, check the booking record, and alert the owner if confirmation is delayed.",
  },
  {
    id: "err-payment",
    time: "09:48 AM",
    title: "Payment event retry failed",
    source: "Payments",
    severity: "Critical",
    status: "Open",
    owner: "Michael T.",
    eta: "20m",
    impact: "Payment or billing status may be wrong inside the dashboard.",
    recoveryAction: "Hold automated assumptions and flag the payment for manual review.",
  },
  {
    id: "err-email",
    time: "09:32 AM",
    title: "Email delivery failure",
    source: "Email",
    severity: "Medium",
    status: "Investigating",
    owner: "Lucy C.",
    eta: "1h",
    impact: "A review request or follow-up email may not reach the customer.",
    recoveryAction: "Queue a resend and keep the request linked to the completed job.",
  },
  {
    id: "err-ai",
    time: "09:18 AM",
    title: "AI reply generation failed",
    source: "Bee-Aura AI",
    severity: "High",
    status: "Retrying",
    owner: "Sarah J.",
    eta: "25m",
    impact: "The owner may lose speed advantage on a hot enquiry.",
    recoveryAction: "Create a safe fallback reply draft and keep human approval required.",
  },
];

const systems = [
  "All systems",
  "WhatsApp",
  "Call Tracking",
  "Bookings",
  "Payments",
  "Email",
  "Bee-Aura AI",
];

const statusTabs: Array<"All" | Status> = [
  "All",
  "Open",
  "Investigating",
  "Retrying",
  "Resolved",
];

const severityTabs: Array<"All" | Severity> = [
  "All",
  "Critical",
  "High",
  "Medium",
  "Low",
];

const recoveryPriority = [
  {
    key: "lead",
    label: "Lead risk",
    value: "15",
    tone: "danger",
    description: "New enquiries or missed messages that could lose revenue.",
    width: "58%",
  },
  {
    key: "booking",
    label: "Booking delay",
    value: "28",
    tone: "warning",
    description: "Calendar, confirmation or callback journeys running late.",
    width: "88%",
  },
  {
    key: "followup",
    label: "Follow-up drag",
    value: "22",
    tone: "blue",
    description: "Quote chases, review requests and reminders affected.",
    width: "72%",
  },
  {
    key: "ops",
    label: "Ops warning",
    value: "9",
    tone: "neutral",
    description: "Small faults recorded before they become customer-facing.",
    width: "36%",
  },
];

function toneForStatus(status: string) {
  switch (status) {
    case "Open":
    case "Critical":
      return "danger";
    case "Investigating":
    case "High":
      return "warning";
    case "Retrying":
    case "Medium":
      return "blue";
    case "Resolved":
      return "success";
    default:
      return "neutral";
  }
}

export default function ErrorLogPage() {
  const [errors, setErrors] = useState(errorsSeed);
  const [selectedId, setSelectedId] = useState(errorsSeed[0].id);
  const [system, setSystem] = useState("All systems");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Status>("All");
  const [severityFilter, setSeverityFilter] = useState<"All" | Severity>("All");
  const [notice, setNotice] = useState("Error command centre ready. Demo actions only.");

  const selected = errors.find((item) => item.id === selectedId) ?? errors[0];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return errors.filter((item) => {
      const systemMatch = system === "All systems" || item.source === system;
      const statusMatch = statusFilter === "All" || item.status === statusFilter;
      const severityMatch = severityFilter === "All" || item.severity === severityFilter;
      const searchMatch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.severity.toLowerCase().includes(q) ||
        item.status.toLowerCase().includes(q) ||
        item.owner.toLowerCase().includes(q) ||
        item.impact.toLowerCase().includes(q);

      return systemMatch && statusMatch && severityMatch && searchMatch;
    });
  }, [errors, search, severityFilter, statusFilter, system]);

  function openError(item: ErrorItem, message = "Error opened") {
    setSelectedId(item.id);
    setNotice(`${message}: ${item.title}.`);
    setTimeout(() => {
      document.getElementById("selected-error")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  }

  function updateStatus(item: ErrorItem, status: Status) {
    setErrors((current) => current.map((error) => (error.id === item.id ? { ...error, status } : error)));
    setSelectedId(item.id);
    setNotice(`${item.title} marked as ${status}. Demo action only.`);
  }

  function applyStatusFilter(status: "All" | Status) {
    setStatusFilter(status);
    setNotice(status === "All" ? "All statuses visible." : `${status} status filter applied.`);
  }

  function applySeverityFilter(severity: "All" | Severity) {
    setSeverityFilter(severity);
    setNotice(severity === "All" ? "All severities visible." : `${severity} severity filter applied.`);
  }

  function resetFilters() {
    setSystem("All systems");
    setSearch("");
    setStatusFilter("All");
    setSeverityFilter("All");
    setSelectedId(errors[0].id);
    setNotice("All demo error records visible again.");
  }

  const openErrors = errors.filter((item) => item.status !== "Resolved").length;
  const criticalErrors = errors.filter((item) => item.severity === "Critical").length;
  const resolvedToday = errors.filter((item) => item.status === "Resolved").length + 27;

  const kpis = [
    {
      label: "Open Errors",
      value: openErrors,
      icon: "ERR",
      tone: "blue",
      helper: "Needs owner visibility",
      action: () => applyStatusFilter("Open"),
    },
    {
      label: "Critical Alerts",
      value: criticalErrors,
      icon: "CRIT",
      tone: "danger",
      helper: "Customer risk first",
      action: () => applySeverityFilter("Critical"),
    },
    {
      label: "Recovered Today",
      value: resolvedToday,
      icon: "REC",
      tone: "success",
      helper: "Recovery trail saved",
      action: () => applyStatusFilter("Resolved"),
    },
    {
      label: "System Health",
      value: "98.4%",
      icon: "SYS",
      tone: "blue",
      helper: "Demo monitor online",
      action: () => setNotice("System health opened. Demo action only."),
    },
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Bee-Aura Incident Control</p>
          <h1>Error Log</h1>
          <span>Track failures, affected customers and owner-safe recovery actions.</span>
        </div>

        <div className={styles.headerActions}>
          <button type="button" onClick={() => setNotice("Demo export prepared. No real data exported.")}>
            Export Errors
          </button>

          <select
            value={system}
            onChange={(event) => {
              setSystem(event.target.value);
              setNotice(`${event.target.value} filter applied.`);
            }}
          >
            {systems.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <input
            value={search}
            placeholder="Search errors..."
            onChange={(event) => {
              setSearch(event.target.value);
              setNotice(event.target.value ? `Searching for "${event.target.value}".` : "Search cleared.");
            }}
          />
          <button
            type="button"
            className={styles.ownerButton}
            onClick={() => setNotice("Owner profile opened for John D. Demo action only.")}
          >
            <span>JD</span>
            <div>
              <strong>John D.</strong>
              <small>Owner</small>
            </div>
          </button>
        </div>
      </header>

      <section className={styles.kpiGrid}>
        {kpis.map((item) => (
          <button key={item.label} type="button" className={`${styles.kpi} ${styles[item.tone]}`} onClick={item.action}>
            <span>{item.icon}</span>
            <div>
              <p>{item.label}</p>
              <strong>{item.value}</strong>
              <small>{item.helper}</small>
            </div>
          </button>
        ))}
      </section>

      <section className={styles.mainGrid}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h2>Live Error Queue <span>{filtered.length}</span></h2>
              <p>Clean incident list with owner, risk and recovery action.</p>
            </div>
            <button type="button" onClick={resetFilters}>View all errors</button>
          </div>

          <div className={styles.queueFilters}>
            <div className={styles.filterGroup}>
              <p>Status filters</p>
              <div className={styles.filterButtons}>
                {statusTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => applyStatusFilter(tab)}
                    className={`${styles.filterButton} ${tab === statusFilter ? styles.activeFilter : ""} ${styles[toneForStatus(tab)]}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <p>Severity filters</p>
              <div className={styles.filterButtons}>
                {severityTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => applySeverityFilter(tab)}
                    className={`${styles.filterButton} ${tab === severityFilter ? styles.activeFilter : ""} ${styles[toneForStatus(tab)]}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.errorList}>
            {filtered.map((item) => (
              <article key={item.id} className={item.id === selected.id ? `${styles.errorRow} ${styles.active}` : styles.errorRow}>
                <div className={styles.errorMain} onClick={() => openError(item)}>
                  <time>{item.time}</time>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.impact}</p>
                  </div>
                </div>

                <div className={styles.errorMeta}>
                  <button
                    type="button"
                    className={`${styles.metaButton} ${styles.neutral}`}
                    onClick={() => {
                      setSystem(item.source);
                      setNotice(`${item.source} source filter applied.`);
                    }}
                  >
                    {item.source}
                  </button>

                  <button
                    type="button"
                    className={`${styles.statusPill} ${styles[toneForStatus(item.severity)]}`}
                    onClick={() => applySeverityFilter(item.severity)}
                  >
                    {item.severity}
                  </button>

                  <button
                    type="button"
                    className={`${styles.statusPill} ${styles[toneForStatus(item.status)]}`}
                    onClick={() => applyStatusFilter(item.status)}
                  >
                    {item.status}
                  </button>

                  <button
                    type="button"
                    className={`${styles.metaButton} ${styles.neutral}`}
                    onClick={() => openError(item, `${item.owner} owner queue opened`)}
                  >
                    {item.owner}
                  </button>
                </div>

                <div className={styles.rowActions}>
                  <button type="button" className={styles.viewAction} onClick={() => openError(item, "View opened")}>
                    View
                  </button>

                  <button
                    type="button"
                    className={item.status === "Resolved" ? styles.reopenAction : styles.resolveAction}
                    onClick={() => updateStatus(item, item.status === "Resolved" ? "Open" : "Resolved")}
                  >
                    {item.status === "Resolved" ? "Reopen" : "Resolve"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="selected-error" className={styles.selectedPanel}>
          <div className={styles.selectedTop}>
            <p>Selected error record</p>
            <h2>{selected.title}</h2>
            <span>{selected.impact}</span>
          </div>

          <div className={styles.detailGrid}>
            <button type="button" onClick={() => setNotice(`Time detail opened for ${selected.title}.`)}><strong>Today, {selected.time}</strong><small>Date / Time</small></button>
            <button type="button" onClick={() => setSystem(selected.source)}><strong>{selected.source}</strong><small>Source</small></button>
            <button type="button" onClick={() => applySeverityFilter(selected.severity)}><strong>{selected.severity}</strong><small>Severity</small></button>
            <button type="button" onClick={() => applyStatusFilter(selected.status)}><strong>{selected.status}</strong><small>Status</small></button>
            <button type="button" onClick={() => setNotice(`${selected.owner} owner profile opened. Demo action only.`)}><strong>{selected.owner}</strong><small>Owner</small></button>
            <button type="button" onClick={() => setNotice(`ETA review opened for ${selected.title}.`)}><strong>{selected.eta}</strong><small>ETA</small></button>
          </div>

          <button type="button" className={styles.recoveryStep} onClick={() => setNotice(`Recovery plan opened for ${selected.title}.`)}>
            <span>Suggested recovery step</span>
            <strong>{selected.recoveryAction}</strong>
          </button>

          <div className={styles.selectedActions}>
            <button type="button" className={styles.warningAction} onClick={() => setNotice(`Retry prepared for ${selected.title}. Demo action only.`)}>Prepare Retry</button>
            <button type="button" className={styles.resolveAction} onClick={() => updateStatus(selected, "Resolved")}>Mark Resolved</button>
            <button type="button" className={styles.viewAction} onClick={() => setNotice(`${selected.title} added to the owner incident report. Demo action only.`)}>Add to Incident Report</button>
          </div>
        </section>
      </section>

      <section className={styles.lowerGrid}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h2>Recovery Priority</h2>
              <p>Business impact first. Technical detail second.</p>
            </div>
          </div>

          <div className={styles.priorityList}>
            {recoveryPriority.map((item) => (
              <button
                type="button"
                key={item.key}
                className={`${styles.priorityRow} ${styles[item.tone]}`}
                onClick={() => setNotice(`${item.label} opened. ${item.description}`)}
              >
                <div>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
                <p>{item.description}</p>
                <em><i style={{ width: item.width }} /></em>
              </button>
            ))}
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h2>Owner Recovery Queue <span>4</span></h2>
              <p>What the business needs to fix first.</p>
            </div>
            <button type="button" onClick={() => setNotice("Owner recovery queue opened. Demo action only.")}>View all</button>
          </div>

          <div className={styles.queueList}>
            {errors.slice(0, 4).map((item) => (
              <button key={item.id} type="button" onClick={() => openError(item, "Recovery queue item opened")}>
                <span>{item.owner}</span>
                <strong>{item.title}</strong>
                <em>{item.eta}</em>
              </button>
            ))}
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h2>Recovery Controls <span>5</span></h2>
              <p>Simple, owner-safe controls. No silent fixes.</p>
            </div>
          </div>

          <div className={styles.controlList}>
            {[
              ["Linked record finder", "Finds the affected lead, customer, booking or payment."],
              ["Safe fallback draft", "Prepares a human-approved reply when automation fails."],
              ["Customer impact label", "Shows whether the fault affects speed, trust or revenue."],
              ["Manual override path", "Keeps the owner in control when automatic recovery is risky."],
              ["Audit-ready note", "Records what happened and what action was taken."],
            ].map(([title, detail]) => (
              <button key={title} type="button" onClick={() => setNotice(`${title} opened. ${detail}`)}>
                <strong>{title}</strong>
                <span>{detail}</span>
                <em>Ready</em>
              </button>
            ))}
          </div>
        </section>
      </section>

      <section className={styles.auraPanel}>
        <img src="/brand/source/aura-assistant-transparent.png" alt="Aura assistant" />
        <div>
          <p>Aura Recovery Control</p>
          <h2>Aura turns failed system events into clear business recovery actions.</h2>
          <span>Bee-Aura links each fault to the affected record, explains the business impact, and prepares the safest next action for the owner to review.</span>
          <div>
            <button type="button" onClick={() => setNotice("Linked record opened. Demo action only.")}>Find linked record</button>
            <button type="button" onClick={() => setNotice("Owner-safe recovery step drafted. Demo action only.")}>Draft recovery step</button>
            <button type="button" onClick={() => setNotice("Business impact summary opened. Demo action only.")}>Show business impact</button>
          </div>
        </div>
      </section>

      <p className={styles.notice}>{notice}</p>
    </main>
  );
}
