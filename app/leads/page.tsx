"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type LeadStatus = "New" | "Contacted" | "Quote Sent" | "Follow-Up" | "Referral";
type LeadUrgency = "Critical" | "High" | "Medium" | "Normal";
type LeadFilter = "All" | "New" | "Contacted" | "Quote Sent";
type SortMode = "newest" | "oldest" | "name";

type Lead = {
  name: string;
  slug: string;
  enquiry: string;
  contact: string;
  source: "Google" | "Website" | "Referral" | "Facebook";
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
  { name: "Sarah Johnson", slug: "sarah-johnson", enquiry: "Plumbing leak", contact: "07845 678912", source: "Website", status: "Contacted", urgency: "Medium", date: "18 May 2025", dateKey: 20250518, value: "£320", lastActivity: "15m ago", nextFollowUp: "Today, 2:00 PM", owner: "John D." },
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

function statusRoute(status: LeadStatus) {
  if (status === "Follow-Up") return "/follow-ups";
  if (status === "Quote Sent") return "/bookings";
  if (status === "Referral") return "/customers";
  return "/messages";
}

function customerRoute(lead: Lead) {
  return `/customers/${lead.slug}`;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [activeFilter, setActiveFilter] = useState<LeadFilter>("All");
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [form, setForm] = useState({
    name: "",
    enquiry: "",
    contact: "",
    source: "Website" as Lead["source"],
    urgency: "High" as LeadUrgency,
    value: "",
  });

  const visibleLeads = useMemo(() => {
    const filtered = activeFilter === "All"
      ? leads
      : leads.filter((lead) => lead.status === activeFilter);

    return [...filtered].sort((a, b) => {
      if (sortMode === "name") return a.name.localeCompare(b.name);
      if (sortMode === "oldest") return a.dateKey - b.dateKey;
      return b.dateKey - a.dateKey;
    });
  }, [activeFilter, leads, sortMode]);

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
    setSortMode("newest");
    setIsAddingLead(false);
  }

  return (
    <main className="leads-final-page">
      <header className="leads-final-header">
        <div>
          <h1>Leads</h1>
          <p>Manage, track and convert every enquiry in one place.</p>
        </div>

        <div className="leads-final-controls">
          <button className="lf-add" type="button" onClick={() => setIsAddingLead(true)}>
            <span>＋</span> Add Lead
          </button>

          <Link href="/messages" className="lf-control">⌯ All Channels⌄</Link>

          <Link href="/leads" className="lf-search">
            <span>Search leads...</span>
            <strong>⌕</strong>
          </Link>

          <Link href="/settings" className="lf-owner">
            <span>JD</span>
            <b>John D.<small>Owner</small></b>
            <em>⌄</em>
          </Link>
        </div>
      </header>

      {isAddingLead ? (
        <section className="lf-create">
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
              <select value={form.source} onChange={(event) => updateForm("source", event.target.value as Lead["source"])}>
                <option>Website</option>
                <option>Google</option>
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

            <div className="lf-create-actions">
              <button type="button" onClick={() => setIsAddingLead(false)}>Cancel</button>
              <button type="submit">Create Lead</button>
            </div>
          </form>
        </section>
      ) : null}

      <section className="leads-final-card">
        <div className="lf-toolbar">
          <div className="lf-tabs">
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

          <label className="lf-sort">
            <span>↕ Sort:</span>
            <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)}>
              <option value="newest">Newest to oldest</option>
              <option value="oldest">Oldest to newest</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
        </div>

        <div className="lf-table-wrap">
          <table className="lf-table">
            <colgroup>
              <col className="lf-col-name" />
              <col className="lf-col-enquiry" />
              <col className="lf-col-contact" />
              <col className="lf-col-source" />
              <col className="lf-col-status" />
              <col className="lf-col-urgency" />
              <col className="lf-col-date" />
              <col className="lf-col-value" />
              <col className="lf-col-activity" />
              <col className="lf-col-follow" />
              <col className="lf-col-owner" />
              <col className="lf-col-actions" />
            </colgroup>

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
                <th>Owner</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleLeads.map((lead) => (
                <tr key={`${lead.name}-${lead.contact}`}>
                  <td><Link className="lf-link strong" href={customerRoute(lead)}>{lead.name}</Link></td>
                  <td><Link className="lf-link" href="/bookings">{lead.enquiry}</Link></td>
                  <td><Link className="lf-link muted" href={customerRoute(lead)}>☎ {lead.contact}</Link></td>
                  <td><Link href="/leads" className={`lf-source lf-source-${classSlug(lead.source)}`}>{lead.source}</Link></td>
                  <td><Link href={statusRoute(lead.status)} className={`lf-status lf-status-${classSlug(lead.status)}`}>{lead.status}</Link></td>
                  <td><Link href="/follow-ups" className={`lf-urgency lf-urgency-${classSlug(lead.urgency)}`}>{lead.urgency}</Link></td>
                  <td>{lead.date}</td>
                  <td><Link className="lf-link value" href="/dashboard">{lead.value}</Link></td>
                  <td><Link className="lf-link muted" href="/activity-log">{lead.lastActivity}</Link></td>
                  <td><Link className="lf-link muted" href="/follow-ups">{lead.nextFollowUp}</Link></td>
                  <td><Link className="lf-link muted" href="/settings">{lead.owner}</Link></td>
                  <td>
                    <div className="lf-actions">
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

        <div className="lf-bottom-fill">
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

        <footer className="lf-footer">
          <p>Showing 1 to {visibleLeads.length} of 208 leads</p>

          <div className="lf-pagination">
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

          <aside className="lf-outcomes">
            <div>
              <h3>Lead Outcomes</h3>
              <p><span className="lf-dot blue" /> Won <b>72 (69%)</b></p>
              <p><span className="lf-dot gold" /> Lost <b>32 (31%)</b></p>
            </div>
            <Link href="/dashboard" className="lf-donut">
              <span>104<small>Total</small></span>
            </Link>
          </aside>
        </footer>
      </section>
    </main>
  );
}
