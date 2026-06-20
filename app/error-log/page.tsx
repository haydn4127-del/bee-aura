"use client";

import Link from "next/link";
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

const systems = ["All systems", "WhatsApp", "Call Tracking", "Bookings", "Payments", "Email", "Bee-Aura AI"];

const statusTabs: Array<"All" | Status> = ["All", "Open", "Investigating", "Retrying", "Resolved"];
const severityTabs: Array<"All" | Severity> = ["All", "Critical", "High", "Medium", "Low"];

const recoveryPriority = [
  {
    label: "Lead risk",
    value: "15",
    detail: "New enquiries or missed messages that could lose revenue.",
    tone: "danger",
    width: "38%",
  },
  {
    label: "Booking delay",
    value: "28",
    detail: "Calendar, confirmation or callback journeys running late.",
    tone: "warning",
    width: "68%",
  },
  {
    label: "Follow-up drag",
    value: "22",
    detail: "Quote chases, review requests and reminders affected.",
    tone: "blue",
    width: "52%",
  },
  {
    label: "Ops warning",
    value: "9",
    detail: "Small faults recorded before they become customer-facing.",
    tone: "neutral",
    width: "30%",
  },
];

const recoveryControls = [
  {
    title: "Linked record finder",
    detail: "Find the affected lead, customer, booking or payment.",
  },
  {
    title: "Safe fallback draft",
    detail: "Prepare a human-approved reply when automation fails.",
  },
  {
    title: "Customer impact label",
    detail: "Show whether the fault affects speed, trust or revenue.",
  },
  {
    title: "Manual override path",
    detail: "Keep the owner in control when automatic recovery is risky.",
  },
  {
    title: "Audit-ready note",
    detail: "Record what happened and what action was taken.",
  },
];

function token(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function toneForStatus(status: string) {
  if (status === "Open") return "danger";
  if (status === "Investigating") return "warning";
  if (status === "Retrying") return "blue";
  if (status === "Resolved") return "success";
  return "neutral";
}

function toneForSeverity(severity: string) {
  if (severity === "Critical") return "danger";
  if (severity === "High") return "warning";
  if (severity === "Medium") return "blue";
  if (severity === "Low") return "success";
  return "neutral";
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

  const openErrors = errors.filter((item) => item.status !== "Resolved").length;
  const criticalErrors = errors.filter((item) => item.severity === "Critical").length;
  const resolvedToday = errors.filter((item) => item.status === "Resolved").length + 27;

  function scrollToSelected() {
    window.setTimeout(() => {
      document.getElementById("selected-error")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  }

  function openError(item: ErrorItem, message = "Incident opened") {
    setSelectedId(item.id);
    setNotice(`${message}: ${item.title}.`);
    scrollToSelected();
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

  const kpis = [
    {
      label: "Open Errors",
      value: String(openErrors),
      icon: "ERR",
      tone: "blue",
      helper: "Needs owner visibility",
      action: () => applyStatusFilter("Open"),
    },
    {
      label: "Critical Alerts",
      value: String(criticalErrors),
      icon: "CRIT",
      tone: "danger",
      helper: "Customer risk first",
      action: () => applySeverityFilter("Critical"),
    },
    {
      label: "Recovered Today",
      value: String(resolvedToday),
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
    <main className={styles.errorPage}>
      <section className={styles.heroPanel}>
        <div className={styles.heroTop}>
          <div className={styles.titleBlock}>
            <p className={styles.kicker}>BEE-AURA INCIDENT CONTROL</p>
            <h1>Error Log</h1>
            <p>Track failures, affected customers and owner-safe recovery actions before problems become lost revenue.</p>
          </div>

          <div className={styles.headerActions}>
            <button
              className={styles.primaryButton}
              type="button"
              onClick={() => setNotice("Demo export prepared. No real error data exported.")}
            >
              Export Errors
            </button>

            <select
              className={styles.selectControl}
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

            <label className={styles.searchBox}>
              <input
                value={search}
                placeholder="Search errors..."
                onChange={(event) => {
                  setSearch(event.target.value);
                  setNotice(event.target.value ? `Searching for "${event.target.value}".` : "Search cleared.");
                }}
              />
            </label>

            <button
              type="button"
              className={styles.ownerButton}
              onClick={() => setNotice("Owner profile opened for John D. Demo action only.")}
            >
              <span>JD</span>
              <div>
                <strong>John D</strong>
                <small>Owner</small>
              </div>
            </button>
          </div>
        </div>

        <div className={styles.kpiGrid}>
          {kpis.map((card) => (
            <button key={card.label} className={styles.kpiCard} data-tone={card.tone} type="button" onClick={card.action}>
              <span>{card.icon}</span>
              <div>
                <p>{card.label}</p>
                <strong>{card.value}</strong>
                <small>{card.helper}</small>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="baFlowStrip baFlowStrip--errors" aria-label="Turn system issues into clear recovery steps.">
        <div className="baFlowIntro">
          <p>Recovery action path</p>
          <h2>Turn system issues into clear recovery steps.</h2>
          <span>Each incident shows the affected customer risk, the owner-safe action and the audit trail.</span>
        </div>

        <div className="baFlowCards">
          <button
            type="button"
            className={`baFlowCard ${styles.flowButton}`}
            onClick={() => applyStatusFilter("Open")}
          >
            <span>Open</span>
            <strong>Review open errors</strong>
            <small>Customer-impacting risks need owner visibility first.</small>
            <em>Open queue</em>
          </button>

          <Link href="/customers/sarah-johnson" className="baFlowCard">
            <span>Linked</span>
            <strong>Find linked record</strong>
            <small>Connect the error to the affected customer or booking.</small>
            <em>Open record</em>
          </Link>

          <Link href="/activity-log" className="baFlowCard">
            <span>Proof</span>
            <strong>Record recovery</strong>
            <small>Every recovery action should be visible in the audit trail.</small>
            <em>Open audit</em>
          </Link>
        </div>
      </section>

      <div className={styles.notice}>{notice}</div>

      <section className={styles.mainGrid}>
        <section className={styles.queuePanel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.kicker}>LIVE ERROR QUEUE</p>
              <h2>
                Incident queue <span>{filtered.length}</span>
              </h2>
              <p>Clean incident list with source, owner, risk and recovery action.</p>
            </div>

            <button type="button" onClick={resetFilters}>
              View all errors
            </button>
          </div>

          <div className={styles.filterDeck}>
            <div>
              <p>Status filters</p>
              <div className={styles.filterButtons}>
                {statusTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    data-tone={toneForStatus(tab)}
                    className={`${styles.filterButton} ${tab === statusFilter ? styles.activeFilter : ""}`}
                    onClick={() => applyStatusFilter(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p>Severity filters</p>
              <div className={styles.filterButtons}>
                {severityTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    data-tone={toneForSeverity(tab)}
                    className={`${styles.filterButton} ${tab === severityFilter ? styles.activeFilter : ""}`}
                    onClick={() => applySeverityFilter(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.errorTable}>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Incident</th>
                  <th>Source</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Owner</th>
                  <th>ETA</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className={item.id === selected.id ? styles.activeRow : ""}
                    onClick={() => openError(item)}
                  >
                    <td>{item.time}</td>
                    <td>
                      <strong>{item.title}</strong>
                      <small>{item.impact}</small>
                    </td>
                    <td>
                      <span className={styles.sourceChip} data-source={token(item.source)}>
                        {item.source}
                      </span>
                    </td>
                    <td>
                      <span className={styles.severityChip} data-severity={token(item.severity)}>
                        {item.severity}
                      </span>
                    </td>
                    <td>
                      <span className={styles.statusChip} data-status={token(item.status)}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <span className={styles.ownerMini}>{item.owner}</span>
                    </td>
                    <td>{item.eta}</td>
                    <td>
                      <div className={styles.rowActions}>
                        <button
                          type="button"
                          data-action="view"
                          onClick={(event) => {
                            event.stopPropagation();
                            openError(item, "Incident viewed");
                          }}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          data-action="resolve"
                          onClick={(event) => {
                            event.stopPropagation();
                            updateStatus(item, "Resolved");
                          }}
                        >
                          Resolve
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className={styles.emptyState}>
                <strong>No incidents found.</strong>
                <span>Clear filters or search another system.</span>
              </div>
            )}
          </div>
        </section>

        <aside id="selected-error" className={styles.selectedPanel}>
          <p className={styles.kicker}>SELECTED INCIDENT</p>
          <h2>{selected.title}</h2>
          <p>{selected.impact}</p>

          <div className={styles.selectedGrid}>
            <article>
              <strong>{selected.time}</strong>
              <span>Date / Time</span>
            </article>
            <article>
              <strong>{selected.source}</strong>
              <span>Source</span>
            </article>
            <article>
              <strong>{selected.severity}</strong>
              <span>Severity</span>
            </article>
            <article>
              <strong>{selected.status}</strong>
              <span>Status</span>
            </article>
            <article>
              <strong>{selected.owner}</strong>
              <span>Owner</span>
            </article>
            <article>
              <strong>{selected.eta}</strong>
              <span>ETA</span>
            </article>
          </div>

          <div className={styles.recoveryStep}>
            <span>Suggested recovery step</span>
            <strong>{selected.recoveryAction}</strong>
          </div>

          <div className={styles.selectedActions}>
            <button
              type="button"
              data-kind="retry"
              onClick={() => setNotice(`Retry route prepared for ${selected.title}. Demo action only.`)}
            >
              Prepare Retry
            </button>
            <button type="button" data-kind="resolved" onClick={() => updateStatus(selected, "Resolved")}>
              Mark Resolved
            </button>
            <button
              type="button"
              data-kind="report"
              onClick={() => setNotice(`${selected.title} added to incident report. Demo action only.`)}
            >
              Add to Incident Report
            </button>
          </div>
        </aside>
      </section>

      <section className={styles.recoveryGrid}>
        <article className={styles.recoveryPanel}>
          <div className={styles.panelTitle}>
            <div>
              <p className={styles.kicker}>RECOVERY PRIORITY</p>
              <h3>Business impact first.</h3>
            </div>
          </div>

          <div className={styles.priorityList}>
            {recoveryPriority.map((item) => (
              <button
                key={item.label}
                type="button"
                data-tone={item.tone}
                onClick={() => setNotice(`${item.label} recovery lane opened. Demo action only.`)}
              >
                <span>
                  <strong>{item.label}</strong>
                  <em>{item.value}</em>
                </span>
                <small>{item.detail}</small>
                <i>
                  <b style={{ width: item.width }} />
                </i>
              </button>
            ))}
          </div>
        </article>

        <article className={styles.recoveryPanel}>
          <div className={styles.panelTitle}>
            <div>
              <p className={styles.kicker}>OWNER RECOVERY QUEUE</p>
              <h3>What the owner needs next.</h3>
            </div>
            <button type="button" onClick={() => setNotice("Owner recovery queue opened. Demo action only.")}>
              View all
            </button>
          </div>

          <div className={styles.ownerQueue}>
            {errors.slice(0, 4).map((item) => (
              <button key={item.id} type="button" onClick={() => openError(item, "Recovery queue opened")}>
                <span>{item.owner}</span>
                <strong>{item.title}</strong>
                <em>{item.eta}</em>
              </button>
            ))}
          </div>
        </article>

        <article className={styles.recoveryPanel}>
          <div className={styles.panelTitle}>
            <div>
              <p className={styles.kicker}>RECOVERY CONTROLS</p>
              <h3>No silent fixes.</h3>
            </div>
          </div>

          <div className={styles.controlList}>
            {recoveryControls.map((control) => (
              <button
                key={control.title}
                type="button"
                onClick={() => setNotice(`${control.title} opened. Demo action only.`)}
              >
                <strong>{control.title}</strong>
                <span>{control.detail}</span>
                <em>Ready</em>
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className={styles.auraBar}>
        <div className={styles.auraImage}>
          <img src="/brand/source/aura-assistant-transparent.png" alt="Aura recovery assistant" />
        </div>

        <div className={styles.auraCopy}>
          <p className={styles.kicker}>AURA RECOVERY CONTROL</p>
          <h2>Aura turns failed system events into clear business recovery actions.</h2>
          <p>
            Bee-Aura links each fault to the affected record, explains the business impact and prepares the safest next action for owner review.
          </p>

          <div className={styles.auraChips}>
            <button type="button" onClick={() => setNotice("Linked record finder opened. Demo action only.")}>
              Find linked record
            </button>
            <button type="button" onClick={() => setNotice("Recovery step draft opened. Demo action only.")}>
              Draft recovery step
            </button>
            <button type="button" onClick={() => setNotice("Business impact view opened. Demo action only.")}>
              Show business impact
            </button>
          </div>
        </div>
      </section>

      <p className={styles.footerNote}>
        Demo safety: fake data only, local UI actions only, no database, no Supabase, no Stripe, no Twilio, no OpenAI API, no deployment, and no real customer data.
      </p>
    </main>
  );
}
