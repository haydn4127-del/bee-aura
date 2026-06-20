"use client";


import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./activity-log.module.css";

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
  ownerNote: string;
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
    icon: "LC",
    ownerNote: "New lead captured and visible in the audit trail.",
  },
  {
    id: "ACT-1002",
    time: "10:04 AM",
    event: "AI Reply Drafted",
    details: "Drafted introductory response for Sarah Johnson.",
    category: "AI Action",
    actor: "Bee-Aura AI",
    status: "Completed",
    icon: "AI",
    ownerNote: "AI drafted only. Owner approval remains required before sending.",
  },
  {
    id: "ACT-1003",
    time: "10:03 AM",
    event: "Quote Sent",
    details: "Quote sent to Sarah Johnson for bathroom remodel.",
    category: "Quote",
    actor: "Michael T.",
    status: "Sent",
    icon: "QT",
    ownerNote: "Quote activity logged for proof and follow-up timing.",
  },
  {
    id: "ACT-1004",
    time: "09:48 AM",
    event: "Booking Confirmed",
    details: "Bathroom remodel consultation booked for May 15, 2025.",
    category: "Booking",
    actor: "Emma Davis",
    status: "Confirmed",
    icon: "BK",
    ownerNote: "Booking confirmation tracked against the customer journey.",
  },
  {
    id: "ACT-1005",
    time: "09:35 AM",
    event: "Missed Call Recovered",
    details: "Missed call from James Brown recovered and logged.",
    category: "Call Recovery",
    actor: "Bee-Aura AI",
    status: "Recovered",
    icon: "CR",
    ownerNote: "Recovered call flagged so the owner can see what was saved.",
  },
  {
    id: "ACT-1006",
    time: "09:15 AM",
    event: "Review Request Sent",
    details: "Review request sent to Olivia Smith after service completion.",
    category: "Review",
    actor: "Olivia Smith",
    status: "Sent",
    icon: "RV",
    ownerNote: "Review workflow visible for proof and reputation control.",
  },
  {
    id: "ACT-1007",
    time: "08:53 AM",
    event: "Follow-Up Completed",
    details: "Follow-up call completed with Lucy C. regarding estimate.",
    category: "Follow-Up",
    actor: "Tom Wilson",
    status: "Completed",
    icon: "FU",
    ownerNote: "Follow-up completion proves no opportunity was left hanging.",
  },
  {
    id: "ACT-1008",
    time: "08:32 AM",
    event: "Customer Replied",
    details: "Lucy C. replied to follow-up email about project details.",
    category: "Email",
    actor: "Lucy C.",
    status: "Replied",
    icon: "EM",
    ownerNote: "Customer reply logged and connected to the follow-up journey.",
  },
  {
    id: "ACT-1009",
    time: "08:00 AM",
    event: "AI Reply Drafted",
    details: "Drafted response to Lucy C.'s email about timeline and materials.",
    category: "AI Action",
    actor: "Bee-Aura AI",
    status: "Completed",
    icon: "AI",
    ownerNote: "AI work remains visible and owner-controlled.",
  },
  {
    id: "ACT-1010",
    time: "07:45 AM",
    event: "System Update",
    details: "Automation rule updated: Missed Call Recovery workflow.",
    category: "System",
    actor: "System",
    status: "Updated",
    icon: "SY",
    ownerNote: "System change logged so settings do not change silently.",
  },
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

const statCards = [
  { icon: "EV", label: "Events today", value: "126", change: "+18% vs yesterday" },
  { icon: "AI", label: "AI actions", value: "32", change: "drafts and summaries visible" },
  { icon: "AL", label: "System alerts", value: "6", change: "owner review ready" },
  { icon: "AU", label: "Audit checks", value: "100%", change: "fake-data demo trail" },
];

const highlights = [
  { activityId: "ACT-1004", time: "09:48 AM", title: "Booking confirmed", detail: "Emma Davis consultation" },
  { activityId: "ACT-1003", time: "10:03 AM", title: "Quote sent", detail: "Sarah Johnson renovation" },
  { activityId: "ACT-1005", time: "09:35 AM", title: "Missed call recovered", detail: "James Brown" },
  { activityId: "ACT-1006", time: "09:15 AM", title: "Review request sent", detail: "Olivia Smith" },
];

const auditChecks = [
  "Every action timestamped",
  "Owner changes tracked",
  "AI actions visible",
  "System alerts logged",
  "Export preview available",
];

function statusClass(status: ActivityStatus) {
  if (["Completed", "Confirmed", "Recovered"].includes(status)) return styles.statusGood;
  if (["Sent", "Updated", "Replied"].includes(status)) return styles.statusWarn;
  return styles.statusNew;
}

export default function ActivityLogPage() {
  const [activeFilter, setActiveFilter] = useState<"All Activity" | ActivityCategory>("All Activity");
  const [search, setSearch] = useState("");
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem>(activityItems[0]);
  const [auditOpen, setAuditOpen] = useState(false);
  const [notice, setNotice] = useState("Activity log ready. Every demo action is visible and timestamped.");

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return activityItems.filter((item) => {
      const matchesFilter = activeFilter === "All Activity" || item.category === activeFilter;
      const searchable = [
        item.event,
        item.details,
        item.category,
        item.actor,
        item.status,
        item.ownerNote,
      ].join(" ").toLowerCase();

      return matchesFilter && (!query || searchable.includes(query));
    });
  }, [activeFilter, search]);

  function scrollToSelected() {
    window.setTimeout(() => {
      document.getElementById("selected-activity")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  function openActivity(item: ActivityItem, action = "Audit event opened") {
    setSelectedActivity(item);
    setNotice(`${action}: ${item.event}. Selected audit event panel updated.`);
    scrollToSelected();
  }

  function openHighlight(activityId: string) {
    const match = activityItems.find((item) => item.id === activityId) ?? activityItems[0];
    openActivity(match, "Highlight opened");
  }

  function showAllActivity() {
    setActiveFilter("All Activity");
    setSearch("");
    setSelectedActivity(activityItems[0]);
    setNotice("All activity opened. Showing the full fake-data audit timeline.");
  }

  function openStatCard(label: string) {
    if (label === "AI actions") {
      setActiveFilter("AI Action");
      setSearch("");
      setSelectedActivity(activityItems.find((item) => item.category === "AI Action") ?? activityItems[0]);
      setNotice("AI actions opened. Timeline filtered to visible AI drafts and summaries.");
      return;
    }

    if (label === "System alerts") {
      setActiveFilter("System");
      setSearch("");
      setSelectedActivity(activityItems.find((item) => item.category === "System") ?? activityItems[0]);
      setNotice("System alerts opened. Timeline filtered to system updates and owner-review items.");
      return;
    }

    if (label === "Audit checks") {
      setAuditOpen(true);
      setSelectedActivity(activityItems[0]);
      setNotice("Audit checks opened. Owner control proof is visible on the page.");
      return;
    }

    showAllActivity();
  }

  return (
    <main className={styles.activityPage}>
<section className={styles.heroPanel}>
        <div className={styles.heroTop}>
          <div className={styles.titleBlock}>
            <p className={styles.kicker}>ACTIVITY COMMAND CENTRE</p>
            <h1>Activity Log</h1>
            <p>Track every lead, reply, booking, review, AI draft and system change in one owner-controlled audit trail.</p>
          </div>

          <div className={styles.commandBar}>
            <button
              className={styles.primaryButton}
              type="button"
              onClick={() => {
                setSelectedActivity(activityItems[0]);
                setNotice("Demo export prepared. No real data was exported. Latest event selected for preview.");
                scrollToSelected();
              }}
            >
              ⇩ Export Log
            </button>

            <select
              className={styles.selectControl}
              value={activeFilter}
              onChange={(event) => {
                setActiveFilter(event.target.value as "All Activity" | ActivityCategory);
                setNotice(`${event.target.value} filter selected. Timeline updated.`);
              }}
            >
              {filters.map((filter) => (
                <option key={filter}>{filter}</option>
              ))}
            </select>

            <label className={styles.searchBox} data-activity-search-top="true">
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setNotice("Search is filtering the activity timeline live.");
                }}
                placeholder="Search activity..."
              />
              <span>⌕</span>
            </label>

            <button
              className={styles.ownerButton}
              data-activity-owner-button="true"
              type="button"
              onClick={() => {
                setAuditOpen(true);
                setNotice("Owner audit controls opened. Demo-only information panel.");
              }}
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
          {statCards.map((card) => (
            <button
              key={card.label}
              type="button"
              className={styles.kpiCard}
              onClick={() => openStatCard(card.label)}
            >
              <span className={styles.kpiIcon}>{card.icon}</span>
              <div>
                <p>{card.label}</p>
                <strong>{card.value}</strong>
                <small>{card.change}</small>
              </div>
            </button>
          ))}
        </div>
      </section>
<section className="baFlowStrip baFlowStrip--activity" aria-label="Every action should prove what happened.">
        <div className="baFlowIntro">
          <p>Audit action path</p>
          <h2>Every action should prove what happened.</h2>
          <span>Owners need a simple trail of leads, replies, bookings, reviews and system changes.</span>
        </div>

        <div className="baFlowCards">

          <Link href="/activity-log" className="baFlowCard">
            <span>Now</span>
            <strong>Review latest events</strong>
            <small>See what changed and who triggered it.</small>
            <em>Open audit</em>
          </Link>

          <Link href="/error-log" className="baFlowCard">
            <span>Risk</span>
            <strong>Check system alerts</strong>
            <small>Recovery items should not hide in the background.</small>
            <em>Open errors</em>
          </Link>

          <Link href="/customers/sarah-johnson" className="baFlowCard">
            <span>Trail</span>
            <strong>Open customer trail</strong>
            <small>Connect the audit event to the customer record.</small>
            <em>Open customer</em>
          </Link>
        </div>
      </section>


      <div className={styles.notice}>{notice}</div>

      <section className={styles.mainGrid}>
        <section className={styles.logPanel}>
          <div className={styles.tableTop}>
            <div>
              <p className={styles.kicker}>LIVE AUDIT TIMELINE</p>
              <h2>{activeFilter === "All Activity" ? "All activity" : `${activeFilter} activity`}</h2>
              <p>Showing {filteredItems.length} of {activityItems.length} fake-data audit events.</p>
            </div>

            <button className={styles.ghostButton} type="button" onClick={showAllActivity}>
              View all events
            </button>
          </div>

          <div className={styles.tableScroll}>
            <table className={styles.activityTable}>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Event</th>
                  <th>Details</th>
                  <th>Category</th>
                  <th>Actor</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className={`${styles.activityRow} ${selectedActivity.id === item.id ? styles.activityRowActive : ""}`}
                    onClick={() => openActivity(item)}
                  >
                    <td><strong>{item.time}</strong></td>
                    <td>
                      <div className={styles.eventCell}>
                        <span className={styles.eventIcon}>{item.icon}</span>
                        <div>
                          <strong>{item.event}</strong>
                          <small>{item.id}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span>{item.details}</span>
                      <small>{item.ownerNote}</small>
                    </td>
                    <td><span className={styles.categoryChip}>{item.category}</span></td>
                    <td>{item.actor}</td>
                    <td><span className={`${styles.statusChip} ${statusClass(item.status)}`}>{item.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredItems.length === 0 && (
              <div className={styles.selectedPanel}>
                <p className={styles.kicker}>EMPTY STATE</p>
                <h2>No activity found.</h2>
                <p>Clear search or change the activity filter.</p>
              </div>
            )}
          </div>

          <div className={styles.auditSummaryStrip}>
            <button
              type="button"
              onClick={() => {
                setActiveFilter("AI Action");
                setSelectedActivity(activityItems.find((item) => item.category === "AI Action") ?? activityItems[0]);
                setNotice("AI audit trail opened. Showing visible AI drafts and owner-controlled actions.");
              }}
            >
              <strong>32</strong>
              <span>AI actions visible</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveFilter("Booking");
                setSelectedActivity(activityItems.find((item) => item.category === "Booking") ?? activityItems[0]);
                setNotice("Booking audit trail opened. Showing booking changes and confirmations.");
              }}
            >
              <strong>14</strong>
              <span>booking changes tracked</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveFilter("Review");
                setSelectedActivity(activityItems.find((item) => item.category === "Review") ?? activityItems[0]);
                setNotice("Review audit trail opened. Showing review request activity.");
              }}
            >
              <strong>100%</strong>
              <span>owner-control proof</span>
            </button>
          </div>
        </section>

        <aside className={styles.sideRail}>
          <section id="selected-activity" className={styles.selectedPanel}>
            <p className={styles.kicker}>SELECTED AUDIT EVENT</p>
            <h2>{selectedActivity.event}</h2>
            <p>{selectedActivity.details}</p>

            <div className={styles.selectedGrid}>
              <div><strong>Today, {selectedActivity.time}</strong><small>Date / Time</small></div>
              <div><strong>{selectedActivity.category}</strong><small>Category</small></div>
              <div><strong>{selectedActivity.actor}</strong><small>Actor</small></div>
              <div><strong>{selectedActivity.status}</strong><small>Status</small></div>
            </div>
          </section>

          <section className={styles.sidePanel}>
            <div className={styles.tableTop}>
              <div>
                <p className={styles.kicker}>TODAY'S HIGHLIGHTS</p>
                <h2>Priority events</h2>
              </div>
              <button className={styles.ghostButton} type="button" onClick={showAllActivity}>View all</button>
            </div>

            <div className={styles.sideList}>
              {highlights.map((item) => (
                <button
                  key={item.activityId}
                  className={styles.sideButton}
                  type="button"
                  onClick={() => openHighlight(item.activityId)}
                >
                  <span>{item.time}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className={styles.sidePanel}>
            <p className={styles.kicker}>AUDIT READY</p>
            <h2>Owner control proof</h2>

            <div className={styles.auditList}>
              {auditChecks.map((check) => (
                <p key={check}>
                  <span>✓</span>
                  {check}
                </p>
              ))}
            </div>

            <button
              className={styles.ghostButton}
              type="button"
              onClick={() => {
                setAuditOpen(!auditOpen);
                setNotice("Audit readiness explanation toggled. Demo-only information panel.");
              }}
            >
              Learn more about audit logs →
            </button>

            {auditOpen && (
              <div className={styles.auditExplain}>
                <strong>Audit log demo</strong>
                <span>Every lead, message, booking, review, AI action and system update can be shown before real automation is introduced.</span>
              </div>
            )}
          </section>
        </aside>
      </section>

      <section className={styles.auditAuraBar}>
        <div className={styles.auditAuraBot}>
          <img src="/brand/source/aura-assistant-transparent.png" alt="Aura activity log assistant" />
        </div>

        <div className={styles.auditAuraCopy}>
          <p className={styles.kicker}>AURA AUDIT WATCH</p>
          <h2>Aura is watching every lead, reply, booking, review and AI action so nothing happens silently.</h2>
          <p>Owner control stays on. Bee-Aura records the action trail first, then shows what changed, who triggered it and what needs attention.</p>

          <div className={styles.auditAuraChips}>
            <span>AI actions visible</span>
            <span>Owner changes tracked</span>
            <span>System alerts logged</span>
          </div>
        </div>
      </section>

      <p className={styles.footerNote}>
        Demo safety: fake data only, local UI actions only, no database, no Supabase, no Stripe, no Twilio, no OpenAI API, no deployment, and no real customer data.
      </p>
    </main>
  );
}
