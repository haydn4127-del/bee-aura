"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type Channel = "WhatsApp" | "Email" | "SMS" | "Web Chat" | "Facebook";
type Filter = "All" | "Unread" | "Assigned" | "Starred";

type Conversation = {
  id: string;
  initials: string;
  name: string;
  phone: string;
  email: string;
  channel: Channel;
  enquiry: string;
  latest: string;
  time: string;
  unread: number;
  assignedTo: string;
  leadStatus: string;
  starred?: boolean;
  booking: string;
  followUp: string;
  value: string;
};

type Message = {
  from: "customer" | "owner";
  body: string;
  time: string;
};

const conversations: Conversation[] = [
  {
    id: "tom-wilson",
    initials: "TW",
    name: "Tom Wilson",
    phone: "+44 7912 345678",
    email: "tom.wilson@gmail.com",
    channel: "WhatsApp",
    enquiry: "Boiler Repair",
    latest: "Hi, I need help with a boiler issue...",
    time: "2m ago",
    unread: 2,
    assignedTo: "John D.",
    leadStatus: "New Lead",
    starred: true,
    booking: "Tomorrow, 10:00 AM · Boiler Repair · Inspection",
    followUp: "Send quote follow-up · 20 May 2025, 11:00 AM",
    value: "£450",
  },
  {
    id: "sarah-johnson",
    initials: "SJ",
    name: "Sarah Johnson",
    phone: "+44 7845 678912",
    email: "sarah.johnson@gmail.com",
    channel: "Email",
    enquiry: "Plumbing Leak",
    latest: "Re: Plumbing leak at my kitchen",
    time: "15m ago",
    unread: 1,
    assignedTo: "John D.",
    leadStatus: "Contacted",
    booking: "No booking yet",
    followUp: "Call back today, 2:00 PM",
    value: "£320",
  },
  {
    id: "emma-davis",
    initials: "ED",
    name: "Emma Davis",
    phone: "+44 7955 789123",
    email: "emma.davis@gmail.com",
    channel: "SMS",
    enquiry: "Bathroom Renovation",
    latest: "Is tomorrow 11am still available?",
    time: "1h ago",
    unread: 1,
    assignedTo: "Lucy C.",
    leadStatus: "Quote Sent",
    starred: true,
    booking: "Tomorrow, 11:00 AM · Bathroom Renovation · Quote review",
    followUp: "Quote follow-up tomorrow, 11:00 AM",
    value: "£6,200",
  },
  {
    id: "mike-thompson",
    initials: "MT",
    name: "Mike Thompson",
    phone: "+44 7798 123456",
    email: "mike.thompson@gmail.com",
    channel: "Web Chat",
    enquiry: "Electrical Fault",
    latest: "Can you provide a quote?",
    time: "2h ago",
    unread: 0,
    assignedTo: "Adam H.",
    leadStatus: "Follow-Up",
    booking: "No booking yet",
    followUp: "Today, 4:00 PM",
    value: "£180",
  },
  {
    id: "james-brown",
    initials: "JB",
    name: "James Brown",
    phone: "+44 7534 567890",
    email: "james.brown@gmail.com",
    channel: "Facebook",
    enquiry: "Drain Clearance",
    latest: "Do you service heat pumps?",
    time: "3h ago",
    unread: 0,
    assignedTo: "John D.",
    leadStatus: "New Lead",
    booking: "No booking yet",
    followUp: "Tomorrow, 9:30 AM",
    value: "£220",
  },
  {
    id: "olivia-smith",
    initials: "OS",
    name: "Olivia Smith",
    phone: "+44 7766 445566",
    email: "olivia.smith@gmail.com",
    channel: "WhatsApp",
    enquiry: "Thermostat Install",
    latest: "Thank you! That works.",
    time: "5h ago",
    unread: 0,
    assignedTo: "Lucy C.",
    leadStatus: "Contacted",
    booking: "Tomorrow, 1:00 PM · Thermostat Install",
    followUp: "Confirm tomorrow morning",
    value: "£210",
  },
];

const conversationMessages: Record<string, Message[]> = {
  "tom-wilson": [
    { from: "customer", body: "Hi, I need help with a boiler issue. It's not heating up properly.", time: "10:21 AM" },
    { from: "owner", body: "Hi Tom, thanks for reaching out. We can help with that. Is the boiler making any unusual noises or showing an error code?", time: "10:23 AM" },
    { from: "customer", body: "Yes, it's making a banging noise when the heating kicks in.", time: "10:24 AM" },
    { from: "owner", body: "Thanks. That could be a pressure or pump issue. We can arrange an engineer visit and check it safely.", time: "10:26 AM" },
    { from: "customer", body: "Yes please, tomorrow morning would be great.", time: "10:27 AM" },
  ],
  "sarah-johnson": [
    { from: "customer", body: "Hi, I have a plumbing leak under the kitchen sink.", time: "09:14 AM" },
    { from: "owner", body: "Hi Sarah, we can help. Is the leak active right now or only when the tap is running?", time: "09:16 AM" },
    { from: "customer", body: "It is dripping constantly now.", time: "09:18 AM" },
  ],
  "emma-davis": [
    { from: "customer", body: "Is tomorrow 11am still available for the bathroom renovation quote?", time: "08:44 AM" },
    { from: "owner", body: "Yes, 11am is still available. I can book that in for you now.", time: "08:47 AM" },
  ],
  "mike-thompson": [
    { from: "customer", body: "Can you provide a quote for an electrical fault inspection?", time: "08:02 AM" },
    { from: "owner", body: "Yes, we can help. Is it affecting lights, sockets, or the consumer unit?", time: "08:04 AM" },
    { from: "customer", body: "Mainly sockets in the kitchen.", time: "08:05 AM" },
  ],
  "james-brown": [
    { from: "customer", body: "Do you service heat pumps?", time: "Yesterday" },
    { from: "owner", body: "We mainly handle boilers, plumbing, drainage and electrical inspections. I can still check if we can help with your setup.", time: "Yesterday" },
  ],
  "olivia-smith": [
    { from: "customer", body: "Thank you! That works.", time: "5h ago" },
    { from: "owner", body: "Great, we will keep the appointment booked and send a reminder before arrival.", time: "5h ago" },
  ],
};

const kpis = [
  { title: "Unread Messages", value: "24", detail: "↗ 12% vs yesterday", icon: "☰" },
  { title: "Open Conversations", value: "18", detail: "↗ 8% vs yesterday", icon: "👥" },
  { title: "Avg Response Time", value: "2m 48s", detail: "↘ 73% vs yesterday", icon: "◷" },
  { title: "Channels Active", value: "5 / 5", detail: "● All channels connected", icon: "⌘" },
];

function channelClass(channel: Channel) {
  return channel.toLowerCase().replace(" ", "-");
}

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState("tom-wilson");
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [channelFilter, setChannelFilter] = useState<"All" | Channel>("All");
  const [searchText, setSearchText] = useState("");
  const [draft, setDraft] = useState("");
  const [notice, setNotice] = useState("Ready to help with the selected conversation.");
  const [sentMessagesById, setSentMessagesById] = useState<Record<string, Message[]>>({});

  const selected = conversations.find((conversation) => conversation.id === selectedId) ?? conversations[0];

  const selectedMessages = [
    ...(conversationMessages[selected.id] ?? conversationMessages["tom-wilson"]),
    ...(sentMessagesById[selected.id] ?? []),
  ];

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      const matchesTab =
        activeFilter === "All" ||
        (activeFilter === "Unread" && conversation.unread > 0) ||
        (activeFilter === "Assigned" && conversation.assignedTo === "John D.") ||
        (activeFilter === "Starred" && conversation.starred);

      const matchesChannel = channelFilter === "All" || conversation.channel === channelFilter;

      const haystack = `${conversation.name} ${conversation.latest} ${conversation.enquiry} ${conversation.channel}`.toLowerCase();
      const matchesSearch = haystack.includes(searchText.toLowerCase());

      return matchesTab && matchesChannel && matchesSearch;
    });
  }, [activeFilter, channelFilter, searchText]);

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!draft.trim()) return;

    setSentMessagesById((current) => ({
      ...current,
      [selected.id]: [
        ...(current[selected.id] ?? []),
        {
          from: "owner",
          body: draft.trim(),
          time: "Just now",
        },
      ],
    }));

    setNotice(`Message drafted/sent in demo for ${selected.name}.`);
    setDraft("");
  }

  function suggestedReply() {
    setDraft(
      `Hi ${selected.name.split(" ")[0]}, thanks for your message. We can help with your ${selected.enquiry.toLowerCase()}. I can arrange the next available visit and keep you updated here.`
    );
    setNotice("AI suggested reply added to the message box.");
  }

  return (
    <main className="messages-pro-page">
      <header className="messages-pro-header">
        <div>
          <h1>Messages</h1>
          <p>Manage WhatsApp, email, SMS and web chat conversations in one place.</p>
        </div>

        <div className="messages-pro-controls">
          <button className="msg-new-button" type="button" onClick={suggestedReply}>
            <span>＋</span> New Message
          </button>

          <select
            className="msg-filter-button"
            value={channelFilter}
            onChange={(event) => setChannelFilter(event.target.value as "All" | Channel)}
          >
            <option>All</option>
            <option>WhatsApp</option>
            <option>Email</option>
            <option>SMS</option>
            <option>Web Chat</option>
            <option>Facebook</option>
          </select>

          <label className="msg-search-box">
            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search messages..."
            />
            <strong>⌕</strong>
          </label>

          <Link href="/settings" className="msg-owner-card">
            <span>JD</span>
            <b>John D.<small>Owner</small></b>
            <em>⌄</em>
          </Link>
        </div>
      </header>

      <section className="messages-kpi-grid">
        {kpis.map((kpi) => (
          <Link href="/activity-log" className="messages-kpi" key={kpi.title}>
            <span>{kpi.icon}</span>
            <div>
              <p>{kpi.title}</p>
              <strong>{kpi.value}</strong>
              <small>{kpi.detail}</small>
            </div>
          </Link>
        ))}
      </section>

      <section className="messages-workspace messages-bottom-layout">
        <aside className="messages-list-card">
          <div className="msg-tabs">
            {(["All", "Unread", "Assigned", "Starred"] as Filter[]).map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "active" : ""}
                onClick={() => setActiveFilter(filter)}
              >
                {filter} {filter === "Unread" ? <span>24</span> : null}
              </button>
            ))}
          </div>

          <div className="msg-conversation-list">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                className={`msg-conversation ${conversation.id === selectedId ? "active" : ""}`}
                onClick={() => {
                  setSelectedId(conversation.id);
                  setNotice(`Viewing ${conversation.name}'s conversation.`);
                }}
              >
                <span className="msg-avatar">{conversation.initials}</span>

                <span className="msg-conversation-main">
                  <strong>{conversation.name}</strong>
                  <small>{conversation.latest}</small>
                </span>

                <span className={`msg-channel msg-channel-${channelClass(conversation.channel)}`}>
                  {conversation.channel}
                </span>

                <em>{conversation.time}</em>

                {conversation.unread ? <b>{conversation.unread}</b> : null}
              </button>
            ))}
          </div>

          <Link href="/messages" className="msg-view-all">
            View all conversations →
          </Link>
        </aside>

        <section className="messages-chat-card">
          <header className="msg-chat-header">
            <div>
              <span className="msg-avatar large">{selected.initials}</span>
              <div>
                <h2>{selected.name}</h2>
                <p>{selected.phone}</p>
              </div>
              <span className={`msg-channel msg-channel-${channelClass(selected.channel)}`}>
                {selected.channel}
              </span>
            </div>

            <nav>
              <button type="button" onClick={() => setNotice(`Demo call action opened for ${selected.name}.`)}>☎ Call</button>
              <button type="button" onClick={() => setNotice(`${selected.name}'s conversation archived in demo.`)}>▣ Archive</button>
              <button type="button" onClick={() => setNotice(`${selected.name} assigned to John D. in demo.`)}>♙ Assign</button>
              <button type="button" onClick={() => setNotice("More actions opened in demo.")}>⋮</button>
            </nav>
          </header>

          <div className="msg-chat-body">
            <span className="msg-day-pill">Today</span>

            {selectedMessages.map((message, index) => (
              <article className={`msg-bubble msg-bubble-${message.from}`} key={`${message.time}-${index}`}>
                <p>{message.body}</p>
                <small>{message.time}{message.from === "owner" ? " ✓✓" : ""}</small>
              </article>
            ))}
          </div>

          <form className="msg-composer" onSubmit={sendMessage}>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type your message..."
            />

            <button type="button" onClick={() => setNotice("Attachment option opened in demo.")}>📎</button>
            <button type="button" onClick={suggestedReply}>Templates</button>
            <button type="button" onClick={() => setDraft((current) => `${current} 😊`)}>☺</button>
            <button type="button" onClick={() => setNotice("Extra message tools opened in demo.")}>＋</button>
            <button type="submit" className="msg-send">➤</button>
          </form>
        </section>
      </section>

      <section className="messages-bottom-panels">
        <article className="msg-context-card">
          <div className="msg-context-header">
            <h2>Contact Details</h2>
            <button type="button" onClick={() => setNotice("Contact menu opened in demo.")}>⋮</button>
          </div>

          <div className="msg-contact-top">
            <span className="msg-avatar xl">{selected.initials}</span>
            <div>
              <h3>{selected.name} ⭐</h3>
              <p>{selected.phone}</p>
              <p>{selected.email}</p>
            </div>
          </div>

          <dl className="msg-detail-list">
            <div><dt>Enquiry</dt><dd>{selected.enquiry}</dd></div>
            <div><dt>Status</dt><dd><span>{selected.leadStatus}</span></dd></div>
            <div><dt>Value</dt><dd>{selected.value}</dd></div>
          </dl>

          <div className="msg-context-actions">
            <Link href={`/customers/${selected.id}`}>View Profile</Link>
            <Link href={`/customers/${selected.id}`}>Edit Contact</Link>
          </div>
        </article>

        <article className="msg-context-card small">
          <h2>Upcoming Booking</h2>
          <p>{selected.booking}</p>
          <Link href="/bookings">Open Booking</Link>
        </article>

        <article className="msg-context-card small">
          <h2>Follow-Up Due</h2>
          <p>{selected.followUp}</p>
          <button type="button" onClick={() => setNotice(`Follow-up snoozed for ${selected.name} in demo.`)}>Snooze</button>
        </article>

        <article className="msg-context-card small">
          <h2>Recent Activity</h2>
          <ul>
            <li><span>{selected.channel} received</span><b>2m ago</b></li>
            <li><span>Profile viewed</span><b>1h ago</b></li>
            <li><span>Lead updated</span><b>2h ago</b></li>
          </ul>
        </article>

        <article className="msg-context-card small">
          <h2>AI Suggestions</h2>
          <button type="button" onClick={suggestedReply}>Suggested reply <span>Draft</span></button>
          <Link href="/bookings">Book inspection <span>Create</span></Link>
          <button type="button" onClick={() => setDraft(`Hi ${selected.name.split(" ")[0]}, just following up on your ${selected.enquiry.toLowerCase()}. Would you like us to book this in?`)}>
            Send follow-up <span>Draft</span>
          </button>
        </article>
      </section>

      <p className="messages-demo-notice">{notice}</p>
    </main>
  );
}
