"use client";

import { useMemo, useState } from "react";
import styles from "./followups.module.css";

type Status = "Due Today" | "Overdue" | "Scheduled" | "Completed";
type Tab = "All" | Status;
type Channel = "All Channels" | "Call" | "WhatsApp" | "SMS" | "Email";
type Priority = "High" | "Medium" | "Low";
type SortMode = "Due Soonest" | "Priority" | "Customer" | "Status";

type FollowUp = {
  id: string;
  initials: string;
  customer: string;
  job: string;
  task: string;
  detail: string;
  channel: Exclude<Channel, "All Channels">;
  priority: Priority;
  status: Status;
  dueLabel: string;
  dueSub: string;
  dueRank: number;
  value: number;
  ownerNote: string;
};

const followUps: FollowUp[] = [
  {
    id: "tom-wilson",
    initials: "TW",
    customer: "Tom Wilson",
    job: "Boiler repair",
    task: "Quote Follow-Up",
    detail: "Sent quote yesterday",
    channel: "Call",
    priority: "High",
    status: "Due Today",
    dueLabel: "Today, 10:00",
    dueSub: "in 45m",
    dueRank: 1,
    value: 450,
    ownerNote: "Quote is warm. Call before the lead goes cold.",
  },
  {
    id: "sarah-johnson",
    initials: "SJ",
    customer: "Sarah Johnson",
    job: "Plumbing leak",
    task: "Missed Call Callback",
    detail: "Called this morning",
    channel: "Call",
    priority: "High",
    status: "Due Today",
    dueLabel: "Today, 11:00",
    dueSub: "in 1h 45m",
    dueRank: 2,
    value: 320,
    ownerNote: "Emergency-style lead. Confirm availability quickly.",
  },
  {
    id: "emma-davis",
    initials: "ED",
    customer: "Emma Davis",
    job: "Bathroom renovation",
    task: "Booking Reminder",
    detail: "Booking tomorrow 11 AM",
    channel: "SMS",
    priority: "Medium",
    status: "Due Today",
    dueLabel: "Today, 2:00 PM",
    dueSub: "in 4h 45m",
    dueRank: 3,
    value: 6200,
    ownerNote: "Reminder prevents no-show and protects high-value booking.",
  },
  {
    id: "mike-thompson",
    initials: "MT",
    customer: "Mike Thompson",
    job: "Electrical fault",
    task: "Quote Follow-Up",
    detail: "Sent quote 3 days ago",
    channel: "Email",
    priority: "High",
    status: "Overdue",
    dueLabel: "Yesterday, 4:00 PM",
    dueSub: "18h overdue",
    dueRank: 4,
    value: 180,
    ownerNote: "Overdue quote. Needs quick owner-approved nudge.",
  },
  {
    id: "james-brown",
    initials: "JB",
    customer: "James Brown",
    job: "Drain cleaning",
    task: "Invoice Reminder",
    detail: "Invoice sent 7 days ago",
    channel: "Email",
    priority: "Medium",
    status: "Overdue",
    dueLabel: "Yesterday, 10:00 AM",
    dueSub: "10h overdue",
    dueRank: 5,
    value: 220,
    ownerNote: "Payment reminder should stay polite and professional.",
  },
  {
    id: "olivia-smith",
    initials: "OS",
    customer: "Olivia Smith",
    job: "Thermostat install",
    task: "Parts Update",
    detail: "Waiting on thermostat",
    channel: "WhatsApp",
    priority: "Low",
    status: "Scheduled",
    dueLabel: "Tomorrow, 9:00 AM",
    dueSub: "in 22h",
    dueRank: 6,
    value: 210,
    ownerNote: "Keep customer updated before they chase.",
  },
  {
    id: "david-carter",
    initials: "DC",
    customer: "David Carter",
    job: "Roof repair",
    task: "Review Request",
    detail: "Job completed 2 days ago",
    channel: "SMS",
    priority: "Low",
    status: "Scheduled",
    dueLabel: "Tomorrow, 3:00 PM",
    dueSub: "in 1d 16h",
    dueRank: 7,
    value: 1850,
    ownerNote: "Good review candidate. Owner approval required.",
  },
  {
    id: "charlotte-lee",
    initials: "CL",
    customer: "Charlotte Lee",
    job: "Boiler service",
    task: "Booking Confirmation",
    detail: "Service on May 22",
    channel: "WhatsApp",
    priority: "Low",
    status: "Scheduled",
    dueLabel: "May 22, 9:00 AM",
    dueSub: "in 3d",
    dueRank: 8,
    value: 120,
    ownerNote: "Confirmation message protects the diary.",
  },
  {
    id: "ben-morris",
    initials: "BM",
    customer: "Ben Morris",
    job: "Bathroom leak",
    task: "Callback Completed",
    detail: "Spoke with customer",
    channel: "Call",
    priority: "Low",
    status: "Completed",
    dueLabel: "May 18, 11:00",
    dueSub: "completed",
    dueRank: 99,
    value: 250,
    ownerNote: "Completed follow-up. No action needed.",
  },
  {
    id: "tina-shaw",
    initials: "TS",
    customer: "Tina Shaw",
    job: "Heating check",
    task: "Awaiting Customer Reply",
    detail: "Sent message",
    channel: "WhatsApp",
    priority: "Low",
    status: "Completed",
    dueLabel: "—",
    dueSub: "closed",
    dueRank: 100,
    value: 0,
    ownerNote: "Closed until customer replies.",
  },
];

const tabs: Tab[] = ["All", "Due Today", "Overdue", "Scheduled", "Completed"];
const channels: Channel[] = ["All Channels", "Call", "WhatsApp", "SMS", "Email"];
const sortModes: SortMode[] = ["Due Soonest", "Priority", "Customer", "Status"];

const priorityRank: Record<Priority, number> = {
  High: 1,
  Medium: 2,
  Low: 3,
};

const statusClass: Record<Status, string> = {
  "Due Today": styles.statusDue,
  Overdue: styles.statusOverdue,
  Scheduled: styles.statusScheduled,
  Completed: styles.statusCompleted,
};

const priorityClass: Record<Priority, string> = {
  High: styles.priorityHigh,
  Medium: styles.priorityMedium,
  Low: styles.priorityLow,
};

export default function FollowUpsPage() {
  const [selectedTab, setSelectedTab] = useState<Tab>("All");
  const [channel, setChannel] = useState<Channel>("All Channels");
  const [sortMode, setSortMode] = useState<SortMode>("Due Soonest");
  const [searchText, setSearchText] = useState("");
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp>(followUps[0]);
  const [newPanelOpen, setNewPanelOpen] = useState(false);
  const [ownerOpen, setOwnerOpen] = useState(false);
  const [notice, setNotice] = useState("Follow-up command centre ready.");

  const counts = useMemo(() => {
    return tabs.reduce((acc, tab) => {
      acc[tab] = tab === "All" ? followUps.length : followUps.filter((item) => item.status === tab).length;
      return acc;
    }, {} as Record<Tab, number>);
  }, []);

  const filtered = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    const result = followUps.filter((item) => {
      const matchesTab = selectedTab === "All" || item.status === selectedTab;
      const matchesChannel = channel === "All Channels" || item.channel === channel;
      const text = [
        item.customer,
        item.job,
        item.task,
        item.detail,
        item.channel,
        item.priority,
        item.status,
        item.dueLabel,
        item.ownerNote,
      ].join(" ").toLowerCase();

      return matchesTab && matchesChannel && (!query || text.includes(query));
    });

    return [...result].sort((a, b) => {
      if (sortMode === "Priority") return priorityRank[a.priority] - priorityRank[b.priority];
      if (sortMode === "Customer") return a.customer.localeCompare(b.customer);
      if (sortMode === "Status") return a.status.localeCompare(b.status);
      return a.dueRank - b.dueRank;
    });
  }, [selectedTab, channel, sortMode, searchText]);

  function openTab(tab: Tab) {
    const matches =
      tab === "All"
        ? followUps
        : followUps.filter((item) => item.status === tab);

    setSelectedTab(tab);
    setSearchText("");
    setChannel("All Channels");
    setSortMode("Due Soonest");
    setSelectedFollowUp(matches[0] ?? followUps[0]);

    setNotice(
      tab === "All"
        ? `All follow-ups opened. Showing ${followUps.length} demo records.`
        : `${tab} follow-ups opened. Showing ${matches.length} correct ${tab.toLowerCase()} record${
            matches.length === 1 ? "" : "s"
          }.`
    );

    window.setTimeout(() => {
      document
        .getElementById("follow-up-table")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  function openQuickView(type: Tab) {
    openTab(type);
    window.setTimeout(() => {
      document.getElementById("follow-up-table")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  function openFollowUp(item: FollowUp, action = "Follow-up record opened") {
    setSelectedFollowUp(item);
    setNotice(`${action}: ${item.customer}.`);
  }

  return (
    <main className={styles.followUpsPage}>
      <section className={styles.heroPanel}>
        <div className={styles.heroTop}>
          <div className={styles.titleBlock}>
            <p className={styles.kicker}>FOLLOW-UP COMMAND CENTRE</p>
            <h1>Follow-Ups</h1>
            <p>Track callbacks, quote chases, reminders and owner-approved next actions in one place.</p>
          </div>

          <div className={styles.topControls}>
            <button
              className={styles.primaryButton}
              type="button"
              onClick={() => {
                setNewPanelOpen(true);
                setOwnerOpen(false);
                setNotice("New Follow-Up panel opened. Demo-only action.");
              }}
            >
              + New Follow-Up
            </button>

            <label className={styles.controlShell}>
              <span>Channel</span>
              <select
                value={channel}
                onChange={(event) => {
                  setChannel(event.target.value as Channel);
                  setNotice(`Channel changed to ${event.target.value}.`);
                }}
              >
                {channels.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className={`${styles.controlShell} ${styles.searchShell}`}>
              <span>Search</span>
              <input
                value={searchText}
                onChange={(event) => {
                  setSearchText(event.target.value);
                  setNotice("Search is filtering follow-ups live.");
                }}
                placeholder="Search follow-ups..."
              />
            </label>

            <button
              className={styles.ownerChip}
              type="button"
              onClick={() => {
                setOwnerOpen(true);
                setNewPanelOpen(false);
                setNotice("Owner control profile opened.");
              }}
            >
              <span>JD</span>
              <strong>John D.</strong>
              <small>Owner</small>
            </button>
          </div>
        </div>

        <div className={styles.metricGrid}>
          <button className={styles.metricCard} type="button" onClick={() => openQuickView("Due Today")}>
            <span className={styles.metricIcon}>▣</span>
            <div>
              <p>Due today</p>
              <strong>18</strong>
              <small>↓ 10% vs yesterday</small>
            </div>
          </button>

          <button className={styles.metricCard} type="button" onClick={() => openQuickView("Overdue")}>
            <span className={styles.metricIcon}>◷</span>
            <div>
              <p>Overdue</p>
              <strong>7</strong>
              <small>↓ 22% vs yesterday</small>
            </div>
          </button>

          <button className={styles.metricCard} type="button" onClick={() => openQuickView("Scheduled")}>
            <span className={styles.metricIcon}>◴</span>
            <div>
              <p>Scheduled</p>
              <strong>36</strong>
              <small>↑ 15% vs yesterday</small>
            </div>
          </button>

          <button className={styles.metricCard} type="button" onClick={() => openQuickView("Completed")}>
            <span className={styles.metricIcon}>✓</span>
            <div>
              <p>Completed</p>
              <strong>52</strong>
              <small>↑ 18% vs yesterday</small>
            </div>
          </button>
        </div>
      </section>

      {newPanelOpen && (
        <section className={styles.actionPanel}>
          <div>
            <p className={styles.kicker}>DEMO ACTION</p>
            <h2>Create demo follow-up</h2>
            <p>This proves the action works locally. No backend, database, API or real customer data is touched.</p>
          </div>

          <div className={styles.demoForm}>
            <input placeholder="Customer name" />
            <input placeholder="Follow-up reason" />
            <select defaultValue="Call">
              <option>Call</option>
              <option>WhatsApp</option>
              <option>SMS</option>
              <option>Email</option>
            </select>
            <button
              className={styles.primaryButton}
              type="button"
              onClick={() => {
                setNewPanelOpen(false);
                setNotice("Demo follow-up saved locally. No database was touched.");
              }}
            >
              Save Demo Follow-Up
            </button>
          </div>
        </section>
      )}

      {ownerOpen && (
        <section className={styles.actionPanel}>
          <div>
            <p className={styles.kicker}>OWNER CONTROL</p>
            <h2>John D. follow-up control</h2>
            <p>Owner keeps control of overdue callbacks, VIP review requests and sensitive follow-up messages.</p>
          </div>

          <button
            className={styles.ghostButton}
            type="button"
            onClick={() => {
              setOwnerOpen(false);
              setNotice("Owner panel closed.");
            }}
          >
            Close owner panel
          </button>
        </section>
      )}

      <div className={styles.notice}>{notice}</div>

      <section className={styles.mainGrid}>
        <section id="follow-up-table" className={styles.tablePanel}>
          <div className={styles.tableHeader}>
            <div className={styles.tabs}>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`${styles.tabButton} ${selectedTab === tab ? styles.tabActive : ""}`}
                  onClick={() => openTab(tab)}
                >
                  {tab}
                  <span>{counts[tab]}</span>
                </button>
              ))}
            </div>

            <label className={styles.sortShell}>
              <span>Sort</span>
              <select
                value={sortMode}
                onChange={(event) => {
                  setSortMode(event.target.value as SortMode);
                  setNotice(`Follow-ups sorted by ${event.target.value}.`);
                }}
              >
                {sortModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.activeSegmentBar}>
            <div>
              <p className={styles.kicker}>ACTIVE FOLLOW-UP VIEW</p>
              <strong>
                {selectedTab === "All" ? "All follow-ups" : `${selectedTab} follow-ups`}
              </strong>
              <span>
                Showing {filtered.length} matching {filtered.length === 1 ? "record" : "records"} above the follow-up columns.
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedFollowUp(filtered[0] ?? followUps[0]);
                setNotice(
                  filtered[0]
                    ? `${filtered[0].customer} opened from the active ${selectedTab.toLowerCase()} view.`
                    : "No matching follow-up records in this view."
                );
              }}
            >
              Open first record
            </button>
          </div>

          <div className={styles.tableScroll}>
            <table className={styles.followUpTable}>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Task</th>
                  <th>Channel</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Due</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} onClick={() => openFollowUp(item)}>
                    <td>
                      <button className={styles.customerButton} type="button" onClick={() => openFollowUp(item)}>
                        <span>{item.initials}</span>
                        <strong>{item.customer}</strong>
                        <small>{item.job}</small>
                      </button>
                    </td>
                    <td>
                      <strong>{item.task}</strong>
                      <small>{item.detail}</small>
                    </td>
                    <td>{item.channel}</td>
                    <td>
                      <span className={`${styles.priorityChip} ${priorityClass[item.priority]}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.statusChip} ${statusClass[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <strong>{item.dueLabel}</strong>
                      <small>{item.dueSub}</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className={styles.emptyState}>
                <strong>No follow-ups found.</strong>
                <span>Clear filters or search another reminder.</span>
              </div>
            )}
          </div>

          <div className={styles.tableFooter}>
            <span>
              Showing {filtered.length} of {followUps.length} demo follow-ups
            </span>
            <div className={styles.pagination}>
              <span>Page 1 of 1</span>
            </div>
          </div>
        </section>

        <aside className={styles.sideRail}>
          <article className={styles.sideCard}>
            <div className={styles.sideTitle}>
              <h3>Today&apos;s Priorities</h3>
              <button type="button" onClick={() => openQuickView("Due Today")}>View all</button>
            </div>

            {followUps.slice(0, 4).map((item, index) => (
              <button
                key={item.id}
                className={styles.priorityRow}
                type="button"
                onClick={() => openFollowUp(item, "Priority opened")}
              >
                <span>{index + 1}</span>
                <strong>{item.customer}</strong>
                <small>{item.task}</small>
                <em>{item.dueLabel.replace("Today, ", "")}</em>
              </button>
            ))}
          </article>

          <article className={styles.sideCard}>
            <div className={styles.sideTitle}>
              <h3>Upcoming Reminders</h3>
              <button type="button" onClick={() => openQuickView("Scheduled")}>View all</button>
            </div>

            {followUps.filter((item) => item.status === "Scheduled").map((item) => (
              <button
                key={item.id}
                className={styles.reminderRow}
                type="button"
                onClick={() => openFollowUp(item, "Reminder opened")}
              >
                <span>{item.dueLabel.split(",")[0]}</span>
                <strong>{item.customer}</strong>
                <small>{item.task}</small>
                <em>{item.channel}</em>
              </button>
            ))}
          </article>

          <article className={styles.sideCard}>
            <div className={styles.sideTitle}>
              <h3>Follow-Up Outcomes</h3>
              <button type="button" onClick={() => setNotice("This month outcome filter opened. Demo action only.")}>This month</button>
            </div>

            <div className={styles.outcomeList}>
              <button type="button" onClick={() => openQuickView("Completed")}>
                <span>✓ Completed</span>
                <strong>52 (43%)</strong>
              </button>
              <button type="button" onClick={() => openQuickView("Scheduled")}>
                <span>▣ Scheduled</span>
                <strong>36 (30%)</strong>
              </button>
              <button type="button" onClick={() => openQuickView("Overdue")}>
                <span>◷ Overdue</span>
                <strong>7 (6%)</strong>
              </button>
              <button type="button" onClick={() => setNotice("Waiting follow-ups opened. Demo action only.")}>
                <span>⌛ Waiting</span>
                <strong>25 (21%)</strong>
              </button>
            </div>
          </article>
        </aside>
      </section>

      <section className={styles.selectedPanel}>
        <div>
          <p className={styles.kicker}>SELECTED FOLLOW-UP</p>
          <h2>{selectedFollowUp.customer}</h2>
          <p>{selectedFollowUp.ownerNote}</p>
        </div>

        <div className={styles.selectedGrid}>
          <article>
            <strong>{selectedFollowUp.task}</strong>
            <span>Task</span>
          </article>
          <article>
            <strong>{selectedFollowUp.channel}</strong>
            <span>Channel</span>
          </article>
          <article>
            <strong>{selectedFollowUp.priority}</strong>
            <span>Priority</span>
          </article>
          <article>
            <strong>{selectedFollowUp.dueLabel}</strong>
            <span>Due time</span>
          </article>
        </div>
      </section>

      <section className={styles.auraFollowUpPanel}>
        <div className={styles.auraImageBox}>
          <span>Aura</span>
          <img
            src="/brand/source/aura-assistant-transparent.png"
            alt="Aura AI follow-up assistant"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div>
          <p className={styles.kicker}>AURA FOLLOW-UP WATCH</p>
          <h3>Aura is watching overdue callbacks, quote chases, and customer reminders before they go cold.</h3>
          <p>
            Owner control stays on: nothing is sent automatically. Bee-Aura only highlights the next best follow-up action.
          </p>
        </div>
      </section>

      <p className={styles.safetyNote}>
        Demo only: fake data, local UI actions, no database, no Supabase, no Stripe, no Twilio, no OpenAI API and no real customer data.
      </p>
    </main>
  );
}
