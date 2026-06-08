"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type FollowStatus = "Due Today" | "Overdue" | "Scheduled" | "Completed" | "Waiting";
type Priority = "High" | "Medium" | "Low";
type Channel = "Call" | "SMS" | "Email" | "WhatsApp";

type FollowUp = {
  id: string;
  customer: string;
  slug: string;
  initials: string;
  service: string;
  task: string;
  note: string;
  channel: Channel;
  priority: Priority;
  dueTime: string;
  dueDetail: string;
  owner: string;
  status: FollowStatus;
};

const startingFollowUps: FollowUp[] = [
  {
    id: "FU-1001",
    customer: "Tom Wilson",
    slug: "tom-wilson",
    initials: "TW",
    service: "Boiler Repair",
    task: "Quote Follow-Up",
    note: "Sent quote yesterday",
    channel: "Call",
    priority: "High",
    dueTime: "Today, 10:00 AM",
    dueDetail: "in 45m",
    owner: "John D.",
    status: "Due Today",
  },
  {
    id: "FU-1002",
    customer: "Sarah Johnson",
    slug: "sarah-johnson",
    initials: "SJ",
    service: "Plumbing Leak",
    task: "Missed Call Callback",
    note: "Called this morning",
    channel: "Call",
    priority: "High",
    dueTime: "Today, 11:00 AM",
    dueDetail: "in 1h 45m",
    owner: "John D.",
    status: "Due Today",
  },
  {
    id: "FU-1003",
    customer: "Emma Davis",
    slug: "emma-davis",
    initials: "ED",
    service: "Bathroom Renovation",
    task: "Booking Reminder",
    note: "Booking tomorrow 11 AM",
    channel: "SMS",
    priority: "Medium",
    dueTime: "Today, 2:00 PM",
    dueDetail: "in 4h 45m",
    owner: "Lucy C.",
    status: "Due Today",
  },
  {
    id: "FU-1004",
    customer: "Mike Thompson",
    slug: "mike-thompson",
    initials: "MT",
    service: "Electrical Fault",
    task: "Quote Follow-Up",
    note: "Sent quote 3 days ago",
    channel: "Email",
    priority: "High",
    dueTime: "Yesterday, 4:00 PM",
    dueDetail: "18h overdue",
    owner: "Adam H.",
    status: "Overdue",
  },
  {
    id: "FU-1005",
    customer: "James Brown",
    slug: "james-brown",
    initials: "JB",
    service: "Drain Cleaning",
    task: "Invoice Reminder",
    note: "Invoice sent 7 days ago",
    channel: "Email",
    priority: "Medium",
    dueTime: "Yesterday, 10:00 PM",
    dueDetail: "10h overdue",
    owner: "John D.",
    status: "Overdue",
  },
  {
    id: "FU-1006",
    customer: "Olivia Smith",
    slug: "olivia-smith",
    initials: "OS",
    service: "Thermostat Install",
    task: "Parts Update",
    note: "Waiting on thermostat",
    channel: "WhatsApp",
    priority: "Low",
    dueTime: "Tomorrow, 9:00 AM",
    dueDetail: "in 22h",
    owner: "Lucy C.",
    status: "Scheduled",
  },
  {
    id: "FU-1007",
    customer: "David Carter",
    slug: "david-carter",
    initials: "DC",
    service: "Roof Repair",
    task: "Review Request",
    note: "Job completed 2 days ago",
    channel: "SMS",
    priority: "Low",
    dueTime: "Tomorrow, 3:00 PM",
    dueDetail: "in 1d 16h",
    owner: "Adam H.",
    status: "Scheduled",
  },
  {
    id: "FU-1008",
    customer: "Charlotte Lee",
    slug: "charlotte-lee",
    initials: "CL",
    service: "Boiler Service",
    task: "Booking Confirmation",
    note: "Service on May 22",
    channel: "WhatsApp",
    priority: "Low",
    dueTime: "May 22, 9:00 AM",
    dueDetail: "in 3d",
    owner: "John D.",
    status: "Scheduled",
  },
  {
    id: "FU-1009",
    customer: "Ben Morris",
    slug: "ben-morris",
    initials: "BM",
    service: "Bathroom Leak",
    task: "Callback Completed",
    note: "Spoke with customer",
    channel: "Call",
    priority: "Low",
    dueTime: "May 18, 11:00 AM",
    dueDetail: "",
    owner: "Lucy C.",
    status: "Completed",
  },
  {
    id: "FU-1010",
    customer: "Tina Shaw",
    slug: "tina-shaw",
    initials: "TS",
    service: "Heating Check",
    task: "Awaiting Customer Reply",
    note: "Sent message",
    channel: "WhatsApp",
    priority: "Low",
    dueTime: "—",
    dueDetail: "",
    owner: "Adam H.",
    status: "Waiting",
  },
];

const statCards = [
  { icon: "▣", label: "Due Today", value: "18", change: "↓ 10% vs yesterday", tone: "gold" },
  { icon: "◷", label: "Overdue", value: "7", change: "↓ 22% vs yesterday", tone: "red" },
  { icon: "◷", label: "Scheduled", value: "36", change: "↑ 15% vs yesterday", tone: "blue" },
  { icon: "✓", label: "Completed", value: "52", change: "↑ 18% vs yesterday", tone: "green" },
];

const tabs: Array<"All" | FollowStatus> = ["All", "Due Today", "Overdue", "Scheduled", "Completed"];

const priorities = [
  { number: 1, customer: "Tom Wilson", task: "Quote Follow-Up", channel: "Call", time: "10:00 AM" },
  { number: 2, customer: "Sarah Johnson", task: "Missed Call Callback", channel: "Call", time: "11:00 AM" },
  { number: 3, customer: "Emma Davis", task: "Booking Reminder", channel: "SMS", time: "2:00 PM" },
  { number: 4, customer: "Mike Thompson", task: "Quote Follow-Up", channel: "Email", time: "Yesterday" },
];

const reminders = [
  { date: "May 21", customer: "Olivia Smith", task: "Parts Update", channel: "WhatsApp", time: "9:00 AM" },
  { date: "May 22", customer: "Charlotte Lee", task: "Booking Confirmation", channel: "WhatsApp", time: "9:00 AM" },
  { date: "May 22", customer: "David Carter", task: "Review Request", channel: "SMS", time: "3:00 PM" },
  { date: "May 23", customer: "James Brown", task: "Invoice Reminder", channel: "Email", time: "10:00 AM" },
];

function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

function channelIcon(channel: Channel | string) {
  if (channel === "Call") return "☎";
  if (channel === "SMS") return "☵";
  if (channel === "Email") return "✉";
  if (channel === "WhatsApp") return "◉";
  return "•";
}

export default function FollowUpsPage() {
  const [followUps, setFollowUps] = useState(startingFollowUps);
  const [activeTab, setActiveTab] = useState<"All" | FollowStatus>("All");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("Follow-up command centre ready.");

  const counts = useMemo(() => {
    return followUps.reduce(
      (total, item) => {
        total.all += 1;
        total[item.status] += 1;
        return total;
      },
      {
        all: 0,
        "Due Today": 0,
        Overdue: 0,
        Scheduled: 0,
        Completed: 0,
        Waiting: 0,
      } as Record<"all" | FollowStatus, number>,
    );
  }, [followUps]);

  const filteredFollowUps = useMemo(() => {
    const query = search.trim().toLowerCase();

    return followUps.filter((item) => {
      const tabMatch = activeTab === "All" || item.status === activeTab;
      const searchMatch =
        query.length === 0 ||
        item.customer.toLowerCase().includes(query) ||
        item.service.toLowerCase().includes(query) ||
        item.task.toLowerCase().includes(query) ||
        item.channel.toLowerCase().includes(query) ||
        item.priority.toLowerCase().includes(query);

      return tabMatch && searchMatch;
    });
  }, [activeTab, followUps, search]);

  function addFollowUp() {
    const demo: FollowUp = {
      id: `FU-DEMO-${Date.now()}`,
      customer: "New Demo Customer",
      slug: "tom-wilson",
      initials: "NC",
      service: "New Enquiry",
      task: "New Follow-Up",
      note: "Created from demo button",
      channel: "Call",
      priority: "Medium",
      dueTime: "Today, 5:00 PM",
      dueDetail: "demo",
      owner: "John D.",
      status: "Due Today",
    };

    setFollowUps((current) => [demo, ...current]);
    setActiveTab("All");
    setNotice("New demo follow-up added to the table.");
  }

  function markCompleted(id: string) {
    setFollowUps((current) =>
      current.map((item) => (item.id === id ? { ...item, status: "Completed" } : item)),
    );
    setNotice("Follow-up marked completed.");
  }

  return (
    <main className="followRef-page">
      <header className="followRef-topbar">
        <div>
          <h1>Follow-Ups</h1>
          <p>Track callbacks, quote chases and reminders in one place.</p>
        </div>

        <div className="followRef-actions">
          <button type="button" onClick={addFollowUp} className="followRef-addButton">
            ＋ New Follow-Up
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("All");
              setSearch("");
              setNotice("Follow-up filters cleared.");
            }}
            className="followRef-darkButton"
          >
            ▽ All Channels⌄
          </button>
          <label className="followRef-search">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search follow-ups..."
            />
            <span>⌕</span>
          </label>
          <Link href="/settings" className="followRef-owner">
            <span>JD</span>
            <strong>John D.</strong>
            <small>Owner</small>
          </Link>
        </div>
      </header>

      <section className="followRef-stats">
        {statCards.map((card) => (
          <article key={card.label} className={`followRef-stat followRef-stat-${card.tone}`}>
            <span className="followRef-statIcon">{card.icon}</span>
            <div>
              <p>{card.label}</p>
              <strong>{card.value}</strong>
              <small>{card.change}</small>
            </div>
          </article>
        ))}
      </section>

      <section className="followRef-grid">
        <section className="followRef-card followRef-mainTable">
          <div className="followRef-tabsRow">
            <div className="followRef-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab);
                    setNotice(`${tab} follow-ups selected.`);
                  }}
                  className={activeTab === tab ? "active" : ""}
                >
                  {tab}
                  <span>{tab === "All" ? counts.all : counts[tab]}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setNotice("Follow-ups sorted by due soonest.")}
              className="followRef-sort"
            >
              ↕ Sort: Due Soonest⌄
            </button>
          </div>

          <div className="followRef-tableWrap">
            <table className="followRef-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Task</th>
                  <th>Channel</th>
                  <th>Priority</th>
                  <th>Due Time</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredFollowUps.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <Link href={`/customers/${item.slug}`} className="followRef-customer">
                        <span>{item.initials}</span>
                        <div>
                          <strong>{item.customer}</strong>
                          <small>{item.service}</small>
                        </div>
                      </Link>
                    </td>
                    <td>
                      <strong className="followRef-task">{item.task}</strong>
                      <small>{item.note}</small>
                    </td>
                    <td>
                      <Link href="/messages" className="followRef-channel">
                        {channelIcon(item.channel)} {item.channel}
                      </Link>
                    </td>
                    <td>
                      <span className={`followRef-priority priority-${slugify(item.priority)}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td>
                      <strong className="followRef-due">{item.dueTime}</strong>
                      {item.dueDetail ? <small>{item.dueDetail}</small> : null}
                    </td>
                    <td>
                      <Link href="/settings" className="followRef-ownerMini">
                        ♙ {item.owner}
                      </Link>
                    </td>
                    <td>
                      <span className={`followRef-status status-${slugify(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="followRef-rowActions">
                        <button type="button" onClick={() => markCompleted(item.id)}>↗</button>
                        <button type="button" onClick={() => setNotice(`${item.customer} actions opened.`)}>⋮</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <footer className="followRef-footer">
            <p>Showing 1 to {filteredFollowUps.length} of 86 follow-ups</p>

            <div className="followRef-pagination">
              <button type="button" onClick={() => setNotice("Previous page selected.")}>‹</button>
              <button type="button" className="active" onClick={() => setNotice("Page 1 selected.")}>1</button>
              <button type="button" onClick={() => setNotice("Page 2 selected.")}>2</button>
              <button type="button" onClick={() => setNotice("Page 3 selected.")}>3</button>
              <button type="button" onClick={() => setNotice("Page 4 selected.")}>4</button>
              <button type="button" onClick={() => setNotice("Page 5 selected.")}>5</button>
              <span>...</span>
              <button type="button" onClick={() => setNotice("Page 9 selected.")}>9</button>
              <button type="button" onClick={() => setNotice("Next page selected.")}>›</button>
            </div>
          </footer>

          <div className="followRef-notice">{notice}</div>
        </section>

        <aside className="followRef-sideStack">
          <section className="followRef-card followRef-priorities">
            <div className="followRef-panelHeader">
              <h2>◎ Today&apos;s Priorities</h2>
              <Link href="/follow-ups">View all</Link>
            </div>

            <div className="followRef-priorityList">
              {priorities.map((item) => (
                <Link href="/messages" key={`${item.number}-${item.customer}`} className="followRef-priorityItem">
                  <span>{item.number}</span>
                  <div>
                    <strong>{item.customer}</strong>
                    <small>{item.task}</small>
                  </div>
                  <em>{channelIcon(item.channel)}</em>
                  <b>{item.time}</b>
                </Link>
              ))}
            </div>
          </section>

          <section className="followRef-card followRef-reminders">
            <div className="followRef-panelHeader">
              <h2>▣ Upcoming Reminders</h2>
              <Link href="/bookings">View all</Link>
            </div>

            <div className="followRef-reminderList">
              {reminders.map((item) => (
                <Link href="/messages" key={`${item.date}-${item.customer}`} className="followRef-reminderItem">
                  <span>{item.date}</span>
                  <div>
                    <strong>{item.customer}</strong>
                    <small>{item.task}</small>
                  </div>
                  <em>{channelIcon(item.channel)}</em>
                  <b>{item.time}</b>
                </Link>
              ))}
            </div>
          </section>

          <section className="followRef-card followRef-outcomes">
            <div className="followRef-panelHeader">
              <h2>Follow-Up Outcomes</h2>
              <span>This Month⌄</span>
            </div>

            <div className="followRef-outcomeList">
              <p><span className="green">✓</span> Completed <strong>52 (43%)</strong></p>
              <p><span className="blue">▣</span> Scheduled <strong>36 (30%)</strong></p>
              <p><span className="red">◷</span> Overdue <strong>7 (6%)</strong></p>
              <p><span className="gold">⌛</span> Waiting <strong>25 (21%)</strong></p>
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
