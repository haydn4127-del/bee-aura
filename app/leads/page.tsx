"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type LeadStatus = "New" | "Contacted" | "Quote Sent" | "Follow-Up" | "Referral";
type LeadUrgency = "Critical" | "High" | "Medium" | "Normal";
type LeadSource = "Google" | "Website" | "WhatsApp" | "Referral" | "Facebook";
type LeadFilter = "All" | "New" | "Contacted" | "Quote Sent";
type SourceFilter = "All Channels" | LeadSource;
type SortMode = "newest" | "oldest" | "name";

type Lead = {
  name: string;
  slug: string;
  enquiry: string;
  contact: string;
  source: LeadSource;
  status: LeadStatus;
  urgency: LeadUrgency;
  date: string;
  dateKey: number;
  value: string;
  lastActivity: string;
  nextFollowUp: string;
  owner: string;
};

const initialLeads: Lead[] = [
  { name: "Tom Wilson", slug: "tom-wilson", enquiry: "Boiler repair", contact: "07912 345678", source: "Google", status: "New", urgency: "High", date: "19 May 2025", dateKey: 20250519, value: "£450", lastActivity: "2m ago", nextFollowUp: "Tomorrow, 10:00 AM", owner: "John D." },
  { name: "Sarah Johnson", slug: "sarah-johnson", enquiry: "Plumbing leak", contact: "07845 678912", source: "WhatsApp", status: "Contacted", urgency: "Medium", date: "18 May 2025", dateKey: 20250518, value: "£320", lastActivity: "15m ago", nextFollowUp: "Today, 2:00 PM", owner: "John D." },
  { name: "Emma Davis", slug: "emma-davis", enquiry: "Bathroom renovation", contact: "07955 789123", source: "Referral", status: "Quote Sent", urgency: "High", date: "18 May 2025", dateKey: 20250518, value: "£6,200", lastActivity: "1h ago", nextFollowUp: "Tomorrow, 11:00 AM", owner: "Lucy C." },
  { name: "Mike Thompson", slug: "mike-thompson", enquiry: "Electrical fault", contact: "07798 123456", source: "Google", status: "Follow-Up", urgency: "Critical", date: "17 May 2025", dateKey: 20250517, value: "£180", lastActivity: "2h ago", nextFollowUp: "Today, 4:00 PM", owner: "Adam H." },
  { name: "James Brown", slug: "james-brown", enquiry: "Drain clearance", contact: "07534 567890", source: "Facebook", status: "New", urgency: "High", date: "17 May 2025", dateKey: 20250517, value: "£220", lastActivity: "3h ago", nextFollowUp: "Tomorrow, 9:30 AM", owner: "John D." },
  { name: "Olivia Smith", slug: "olivia-smith", enquiry: "Thermostat install", contact: "07766 445566", source: "Website", status: "Contacted", urgency: "Normal", date: "16 May 2025", dateKey: 20250516, value: "£210", lastActivity: "5h ago", nextFollowUp: "Tomorrow, 1:00 PM", owner: "Lucy C." },
  { name: "David Clarke", slug: "david-clarke", enquiry: "Roof repair", contact: "07888 223344", source: "Referral", status: "Referral", urgency: "Medium", date: "16 May 2025", dateKey: 20250516, value: "£1,850", lastActivity: "1d ago", nextFollowUp: "—", owner: "John D." },
  { name: "Charlotte Lee", slug: "charlotte-lee", enquiry: "Boiler service", contact: "07890 112233", source: "Google", status: "Referral", urgency: "Normal", date: "15 May 2025", dateKey: 20250515, value: "£120", lastActivity: "2d ago", nextFollowUp: "—", owner: "Adam H." },
  { name: "Ben Morris", slug: "ben-morris", enquiry: "Bathroom leak", contact: "07700 998877", source: "Website", status: "Follow-Up", urgency: "High", date: "15 May 2025", dateKey: 20250515, value: "£250", lastActivity: "2d ago", nextFollowUp: "Today, 11:00 AM", owner: "Lucy C." },
  { name: "Amelia Ward", slug: "amelia-ward", enquiry: "Emergency boiler repair", contact: "07911 220044", source: "Google", status: "New", urgency: "Critical", date: "15 May 2025", dateKey: 20250515, value: "£420", lastActivity: "2d ago", nextFollowUp: "Today, 3:30 PM", owner: "John D." },
  { name: "Daniel Khan", slug: "daniel-khan", enquiry: "Bathroom leak", contact: "07822 334455", source: "Website", status: "Contacted", urgency: "High", date: "14 May 2025", dateKey: 20250514, value: "£650", lastActivity: "3d ago", nextFollowUp: "Tomorrow, 9:00 AM", owner: "Lucy C." },
  { name: "Priya Shah", slug: "priya-shah", enquiry: "Annual boiler service", contact: "07733 445566", source: "Referral", status: "Follow-Up", urgency: "Medium", date: "14 May 2025", dateKey: 20250514, value: "£140", lastActivity: "3d ago", nextFollowUp: "Today, 5:00 PM", owner: "Adam H." },
  { name: "Lucas Green", slug: "lucas-green", enquiry: "Blocked drain", contact: "07544 556677", source: "Facebook", status: "Quote Sent", urgency: "High", date: "13 May 2025", dateKey: 20250513, value: "£280", lastActivity: "4d ago", nextFollowUp: "Tomorrow, 12:00 PM", owner: "John D." },
];

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function classSlug(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

function customerRoute(lead: Lead) {
  return `/customers/${lead.slug}`;
}

function statusRoute(status: LeadStatus) {
  if (status === "Follow-Up") return "/follow-ups";
  if (status === "Quote Sent") return "/bookings";
  if (status === "Referral") return "/customers";
  return "/messages";
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [activeFilter, setActiveFilter] = useState<LeadFilter>("All");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("All Channels");
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [searchText, setSearchText] = useState("");
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [form, setForm] = useState({
    name: "",
    enquiry: "",
    contact: "",
    source: "Website" as LeadSource,
    urgency: "High" as LeadUrgency,
    value: "",
  });

  const visibleLeads = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    const filtered = leads.filter((lead) => {
      const matchesStatus = activeFilter === "All" || lead.status === activeFilter;
      const matchesSource = sourceFilter === "All Channels" || lead.source === sourceFilter;
      const matchesSearch =
        !query ||
        lead.name.toLowerCase().includes(query) ||
        lead.enquiry.toLowerCase().includes(query) ||
        lead.contact.toLowerCase().includes(query) ||
        lead.source.toLowerCase().includes(query) ||
        lead.status.toLowerCase().includes(query) ||
        lead.urgency.toLowerCase().includes(query) ||
        lead.owner.toLowerCase().includes(query);

      return matchesStatus && matchesSource && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      if (sortMode === "name") return a.name.localeCompare(b.name);
      if (sortMode === "oldest") return a.dateKey - b.dateKey;
      return b.dateKey - a.dateKey;
    });
  }, [activeFilter, leads, searchText, sortMode, sourceFilter]);

  function updateForm(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function addLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.enquiry.trim() || !form.contact.trim()) {
      return;
    }

    setLeads((current) => [
      {
        name: form.name.trim(),
        slug: slugify(form.name),
        enquiry: form.enquiry.trim(),
        contact: form.contact.trim(),
        source: form.source,
        status: "New",
        urgency: form.urgency,
        date: "Today",
        dateKey: 20250520,
        value: form.value.trim() || "£0",
        lastActivity: "Just now",
        nextFollowUp: "Today, 4:00 PM",
        owner: "John D.",
      },
      ...current,
    ]);

    setForm({
      name: "",
      enquiry: "",
      contact: "",
      source: "Website",
      urgency: "High",
      value: "",
    });

    setActiveFilter("All");
    setSourceFilter("All Channels");
    setSearchText("");
    setSortMode("newest");
    setIsAddingLead(false);
  }

  return (
    <main className="leads-clean-page">
      <header className="leads-clean-header">
        <div>
          <h1>Leads</h1>
          <p>Manage, track and convert every enquiry in one place.</p>
        </div>

        <div className="leads-clean-controls">
          <button className="lc-add" type="button" onClick={() => setIsAddingLead(true)}>
            <span>＋</span> Add Lead
          </button>

          <label className="lc-control">
            <span>≡</span>
            <select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value as SourceFilter)}>
              <option>All Channels</option>
              <option>Google</option>
              <option>Website</option>
              <option>WhatsApp</option>
              <option>Referral</option>
              <option>Facebook</option>
            </select>
          </label>

          <label className="lc-search">
            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search leads..."
              aria-label="Search leads"
            />
            <strong>⌕</strong>
          </label>

          <Link href="/settings" className="baLeadTopUser" aria-label="Open owner settings">
            <span className="baLeadTopDot">JD</span>
            <span className="baLeadTopCopy">
              <strong>John D.</strong>
              <small>Owner</small>
            </span>
            <span className="baLeadTopArrow">⌄</span>
          </Link>
        </div>
      </header>

      {isAddingLead ? (
        <section className="lc-create">
          <div>
            <h2>Add new lead</h2>
            <p>Demo only. This creates a temporary lead in the table.</p>
          </div>

          <form onSubmit={addLead}>
            <label>Name<input value={form.name} onChange={(event) => updateForm("name", event.target.value)} placeholder="Customer name" /></label>
            <label>Enquiry<input value={form.enquiry} onChange={(event) => updateForm("enquiry", event.target.value)} placeholder="Service needed" /></label>
            <label>Contact<input value={form.contact} onChange={(event) => updateForm("contact", event.target.value)} placeholder="Phone number" /></label>

            <label>
              Source
              <select value={form.source} onChange={(event) => updateForm("source", event.target.value as LeadSource)}>
                <option>Website</option>
                <option>Google</option>
                <option>WhatsApp</option>
                <option>Facebook</option>
                <option>Referral</option>
              </select>
            </label>

            <label>
              Urgency
              <select value={form.urgency} onChange={(event) => updateForm("urgency", event.target.value as LeadUrgency)}>
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Normal</option>
              </select>
            </label>

            <label>Value<input value={form.value} onChange={(event) => updateForm("value", event.target.value)} placeholder="£450" /></label>

            <div className="lc-create-actions">
              <button type="button" onClick={() => setIsAddingLead(false)}>Cancel</button>
              <button type="submit">Create Lead</button>
            </div>
          </form>
        </section>
      ) : null}

      <section className="leads-clean-card">
        <div className="lc-toolbar">
          <div className="lc-tabs">
            {(["All", "New", "Contacted", "Quote Sent"] as LeadFilter[]).map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? "active" : ""}
                type="button"
                onClick={() => setActiveFilter(filter)}
              >
                {filter} {filter !== "All" ? <span>{leads.filter((lead) => lead.status === filter).length}</span> : null}
              </button>
            ))}
          </div>

          <label className="lc-sort">
            <span>↕ Sort:</span>
            <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)}>
              <option value="newest">Newest to oldest</option>
              <option value="oldest">Oldest to newest</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
        </div>

        <div className="lc-table-wrap">
          <table className="lc-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Enquiry</th>
                <th>Contact</th>
                <th>Source</th>
                <th>Status</th>
                <th>Urgency</th>
                <th>Date</th>
                <th>Value</th>
                <th>Last Activity</th>
                <th>Next Follow-Up</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleLeads.map((lead) => (
                <tr key={`${lead.name}-${lead.contact}`}>
                  <td><Link className="lc-link strong" href={customerRoute(lead)}>{lead.name}</Link></td>
                  <td><Link className="lc-link" href="/bookings">{lead.enquiry}</Link></td>
                  <td><Link className="lc-link muted" href={customerRoute(lead)}>☎ {lead.contact}</Link></td>
                  <td><Link href="/leads" className={`lc-source lc-source-${classSlug(lead.source)}`}>{lead.source}</Link></td>
                  <td><Link href={statusRoute(lead.status)} className={`lc-status lc-status-${classSlug(lead.status)}`}>{lead.status}</Link></td>
                  <td><Link href="/follow-ups" className={`lc-urgency lc-urgency-${classSlug(lead.urgency)}`}>{lead.urgency}</Link></td>
                  <td>{lead.date}</td>
                  <td><Link className="lc-link value" href="/dashboard">{lead.value}</Link></td>
                  <td><Link className="lc-link muted" href="/activity-log">{lead.lastActivity}</Link></td>
                  <td><Link className="lc-link muted" href="/follow-ups">{lead.nextFollowUp}</Link></td>
                  <td>
                    <div className="lc-actions">
                      <Link href="/messages">☏</Link>
                      <Link href={customerRoute(lead)}>✎</Link>
                      <Link href="/bookings">＋</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lc-insights">
          <article>
            <strong>Urgent lead focus</strong>
            <span>{leads.filter((lead) => lead.urgency === "Critical").length} critical leads need action</span>
          </article>
          <article>
            <strong>Quotes to chase</strong>
            <span>{leads.filter((lead) => lead.status === "Quote Sent").length} quotes are waiting on replies</span>
          </article>
          <article>
            <strong>Follow-up discipline</strong>
            <span>{leads.filter((lead) => lead.status === "Follow-Up").length} leads need follow-up</span>
          </article>
        </div>

        <footer className="lc-footer">
          <div className="lc-footer-top">
            <p>Showing 1 to {visibleLeads.length} of {leads.length} demo leads</p>

            <div className="lc-pagination">
              <Link href="/leads">‹</Link>
              <Link className="active" href="/leads">1</Link>
              <Link href="/leads">2</Link>
              <Link href="/leads">3</Link>
              <Link href="/leads">4</Link>
              <Link href="/leads">5</Link>
              <span>...</span>
              <Link href="/leads">24</Link>
              <Link href="/leads">›</Link>
            </div>
          </div>

          <div className="lc-footer-body">
            <Link href="/messages" className="lc-bot-panel" aria-label="Open AI lead suggestions">
              <img
                src="/brand/source/aura-assistant-transparent.png"
                alt="Aura Assistant"
              />
            </Link>

            <aside className="lc-outcomes-card">
              <div className="lc-outcomes-copy">
                <p className="lc-kicker">Lead outcomes</p>
                <h3>Conversion snapshot</h3>
                <p>
                  A clean view of won versus lost enquiries for the current demo period.
                </p>

                <div className="lc-outcome-stats">
                  <span><strong>72</strong><small>won leads</small></span>
                  <span><strong>32</strong><small>lost leads</small></span>
                  <span><strong>69%</strong><small>win rate</small></span>
                </div>
              </div>

              <Link href="/dashboard" className="lc-donut" aria-label="Open dashboard">
                <span className="lc-donut-ring" />
                <strong>104<small>Total</small></strong>
              </Link>
            </aside>
          </div>
        </footer>
      </section>
    </main>
  );
}
