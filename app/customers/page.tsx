"use client";


import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./customers.module.css";

type CustomerType = "Active" | "Repeat" | "VIP" | "New" | "Inactive";
type CustomerTab = "All" | CustomerType;

type Channel =
  | "WhatsApp"
  | "Phone"
  | "Website"
  | "Email"
  | "Facebook"
  | "Instagram"
  | "SMS";

type ChannelFilter = "All Channels" | Channel;

type SortMode =
  | "Last Activity"
  | "Total Spend"
  | "Next Booking"
  | "Satisfaction"
  | "Name";

type Area =
  | "Manchester"
  | "Salford"
  | "Stockport"
  | "Bolton"
  | "Rochdale"
  | "Oldham";

type Customer = {
  id: string;
  initials: string;
  name: string;
  phone: string;
  area: Area;
  channel: Channel;
  customerType: CustomerType;
  lastService: string;
  lastServiceDate: string;
  totalSpend: number;
  lastActivity: string;
  lastActivityMinutes: number;
  nextBooking: string;
  nextBookingRank: number;
  satisfaction: number;
  risk: "Low" | "Medium" | "High";
  opportunity: string;
  notes: string;
};

const customerTypes: CustomerType[] = [
  "Active",
  "Repeat",
  "VIP",
  "New",
  "Inactive",
];

const tabs: CustomerTab[] = ["All", ...customerTypes];

const channels: ChannelFilter[] = [
  "All Channels",
  "WhatsApp",
  "Phone",
  "Website",
  "Email",
  "Facebook",
  "Instagram",
  "SMS",
];

const sortModes: SortMode[] = [
  "Last Activity",
  "Total Spend",
  "Next Booking",
  "Satisfaction",
  "Name",
];

const areas: Area[] = [
  "Manchester",
  "Salford",
  "Stockport",
  "Bolton",
  "Rochdale",
  "Oldham",
];

const initialCustomers: Customer[] = [
  {
    id: "sarah-johnson",
    initials: "SJ",
    name: "Sarah Johnson",
    phone: "07845 678912",
    area: "Salford",
    channel: "WhatsApp",
    customerType: "Repeat",
    lastService: "Boiler service",
    lastServiceDate: "22 May 2025",
    totalSpend: 895,
    lastActivity: "15m ago",
    lastActivityMinutes: 15,
    nextBooking: "22 May 2025",
    nextBookingRank: 1,
    satisfaction: 4,
    risk: "Low",
    opportunity: "Annual service reminder",
    notes: "Repeat customer. Strong chance of another booked service if followed up quickly.",
  },
  {
    id: "david-clarke",
    initials: "DC",
    name: "David Clarke",
    phone: "07888 223344",
    area: "Manchester",
    channel: "Phone",
    customerType: "VIP",
    lastService: "Emergency repair",
    lastServiceDate: "30 May 2025",
    totalSpend: 1850,
    lastActivity: "1d ago",
    lastActivityMinutes: 1440,
    nextBooking: "30 May 2025",
    nextBookingRank: 8,
    satisfaction: 5,
    risk: "Low",
    opportunity: "Owner-approved review request",
    notes: "High-value customer. Keep owner approval on pricing, call-backs, and review requests.",
  },
  {
    id: "emma-davis",
    initials: "ED",
    name: "Emma Davis",
    phone: "07955 789123",
    area: "Stockport",
    channel: "Website",
    customerType: "VIP",
    lastService: "Heating install",
    lastServiceDate: "18 Jun 2025",
    totalSpend: 6200,
    lastActivity: "1h ago",
    lastActivityMinutes: 60,
    nextBooking: "18 Jun 2025",
    nextBookingRank: 12,
    satisfaction: 5,
    risk: "Low",
    opportunity: "Case study candidate",
    notes: "Premium customer. Good example of high-value work captured through the website.",
  },
  {
    id: "charlotte-lee",
    initials: "CL",
    name: "Charlotte Lee",
    phone: "07990 112233",
    area: "Salford",
    channel: "Instagram",
    customerType: "Repeat",
    lastService: "Leak inspection",
    lastServiceDate: "24 Jun 2025",
    totalSpend: 520,
    lastActivity: "2d ago",
    lastActivityMinutes: 2880,
    nextBooking: "24 Jun 2025",
    nextBookingRank: 15,
    satisfaction: 4,
    risk: "Medium",
    opportunity: "Confirmation follow-up",
    notes: "Repeat enquiry from social. Needs a warm confirmation message before the booking.",
  },
  {
    id: "ben-morris",
    initials: "BM",
    name: "Ben Morris",
    phone: "07700 998877",
    area: "Stockport",
    channel: "SMS",
    customerType: "Inactive",
    lastService: "Radiator repair",
    lastServiceDate: "12 Apr 2025",
    totalSpend: 250,
    lastActivity: "2d ago",
    lastActivityMinutes: 2880,
    nextBooking: "No booking",
    nextBookingRank: 999,
    satisfaction: 3,
    risk: "High",
    opportunity: "Win-back message",
    notes: "Inactive customer. Good fit for a polite service check-in or seasonal reminder.",
  },
  {
    id: "tom-wilson",
    initials: "TW",
    name: "Tom Wilson",
    phone: "07912 345678",
    area: "Manchester",
    channel: "Email",
    customerType: "Active",
    lastService: "Kitchen plumbing",
    lastServiceDate: "24 May 2025",
    totalSpend: 1245,
    lastActivity: "2h ago",
    lastActivityMinutes: 120,
    nextBooking: "29 May 2025",
    nextBookingRank: 6,
    satisfaction: 5,
    risk: "Low",
    opportunity: "Booking reminder",
    notes: "Active customer with upcoming work. Keep reminders warm and professional.",
  },
  {
    id: "mike-thompson",
    initials: "MT",
    name: "Mike Thompson",
    phone: "07798 123456",
    area: "Bolton",
    channel: "Facebook",
    customerType: "Active",
    lastService: "Drainage check",
    lastServiceDate: "27 May 2025",
    totalSpend: 780,
    lastActivity: "2h ago",
    lastActivityMinutes: 130,
    nextBooking: "27 May 2025",
    nextBookingRank: 5,
    satisfaction: 4,
    risk: "Medium",
    opportunity: "Social lead nurture",
    notes: "Facebook lead now active. Shows how social messages can become booked jobs.",
  },
  {
    id: "james-brown",
    initials: "JB",
    name: "James Brown",
    phone: "07534 567890",
    area: "Rochdale",
    channel: "WhatsApp",
    customerType: "Repeat",
    lastService: "Tap replacement",
    lastServiceDate: "20 May 2025",
    totalSpend: 640,
    lastActivity: "3h ago",
    lastActivityMinutes: 180,
    nextBooking: "No booking",
    nextBookingRank: 999,
    satisfaction: 4,
    risk: "Medium",
    opportunity: "Review request queue",
    notes: "Repeat WhatsApp customer. Good candidate for owner-approved review request.",
  },
  {
    id: "olivia-smith",
    initials: "OS",
    name: "Olivia Smith",
    phone: "07766 445566",
    area: "Oldham",
    channel: "Website",
    customerType: "New",
    lastService: "New enquiry",
    lastServiceDate: "03 Jun 2025",
    totalSpend: 210,
    lastActivity: "5h ago",
    lastActivityMinutes: 300,
    nextBooking: "03 Jun 2025",
    nextBookingRank: 9,
    satisfaction: 3,
    risk: "Medium",
    opportunity: "First follow-up",
    notes: "New website customer. Needs fast first follow-up to avoid losing the lead.",
  },
];

const portfolioBreakdown = [
  {
    label: "Active",
    count: 58,
    percentage: 45,
    value: "£47.2k",
    note: "bookable customer base",
  },
  {
    label: "VIP",
    count: 22,
    percentage: 17,
    value: "£31.5k",
    note: "highest value customers",
  },
  {
    label: "Repeat",
    count: 36,
    percentage: 28,
    value: "£22.8k",
    note: "easy repeat-work wins",
  },
  {
    label: "New",
    count: 5,
    percentage: 4,
    value: "£1.1k",
    note: "needs fast nurture",
  },
  {
    label: "Inactive",
    count: 7,
    percentage: 6,
    value: "£3.4k",
    note: "win-back opportunity",
  },
];

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const typeStyles: Record<CustomerType, string> = {
  Active: styles.typeActive,
  Repeat: styles.typeRepeat,
  VIP: styles.typeVip,
  New: styles.typeNew,
  Inactive: styles.typeInactive,
};

const riskStyles: Record<Customer["risk"], string> = {
  Low: styles.riskLow,
  Medium: styles.riskMedium,
  High: styles.riskHigh,
};

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function makeInitials(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "DC"
  );
}

function makeStars(score: number) {
  const full = Math.max(0, Math.min(5, Math.round(score)));
  return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [selectedTab, setSelectedTab] = useState<CustomerTab>("All");
  const [channelFilter, setChannelFilter] =
    useState<ChannelFilter>("All Channels");
  const [sortMode, setSortMode] = useState<SortMode>("Last Activity");
  const [searchText, setSearchText] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    initialCustomers[0]
  );
  const [addPanelOpen, setAddPanelOpen] = useState(false);
  const [ownerPanelOpen, setOwnerPanelOpen] = useState(false);
  const [demoNotice, setDemoNotice] = useState(
    "Customers page ready: filters, search, sorting, customer records, and demo actions are active."
  );
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Manchester" as Area,
    channel: "WhatsApp" as Channel,
    customerType: "New" as CustomerType,
    notes: "",
  });

  const tabCounts = useMemo(() => {
    const counts = {} as Record<CustomerTab, number>;

    tabs.forEach((tab) => {
      counts[tab] =
        tab === "All"
          ? customers.length
          : customers.filter((customer) => customer.customerType === tab)
              .length;
    });

    return counts;
  }, [customers]);

  const filteredCustomers = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    const filtered = customers.filter((customer) => {
      const matchesTab =
        selectedTab === "All" || customer.customerType === selectedTab;

      const matchesChannel =
        channelFilter === "All Channels" || customer.channel === channelFilter;

      const searchable = [
        customer.name,
        customer.phone,
        customer.area,
        customer.channel,
        customer.customerType,
        customer.lastService,
        customer.opportunity,
        customer.notes,
        customer.risk,
      ]
        .join(" ")
        .toLowerCase();

      return matchesTab && matchesChannel && (!query || searchable.includes(query));
    });

    return [...filtered].sort((a, b) => {
      if (sortMode === "Total Spend") return b.totalSpend - a.totalSpend;
      if (sortMode === "Next Booking") return a.nextBookingRank - b.nextBookingRank;
      if (sortMode === "Satisfaction") return b.satisfaction - a.satisfaction;
      if (sortMode === "Name") return a.name.localeCompare(b.name);
      return a.lastActivityMinutes - b.lastActivityMinutes;
    });
  }, [customers, selectedTab, channelFilter, sortMode, searchText]);

  const visibleSpend = filteredCustomers.reduce(
    (total, customer) => total + customer.totalSpend,
    0
  );

  const hasFilters =
    selectedTab !== "All" ||
    channelFilter !== "All Channels" ||
    sortMode !== "Last Activity" ||
    searchText.trim().length > 0;

  function clearFilters() {
    setSelectedTab("All");
    setChannelFilter("All Channels");
    setSortMode("Last Activity");
    setSearchText("");
    setDemoNotice("Filters cleared. Showing the full demo customer list.");
  }

  function saveDemoCustomer() {
    const cleanName = form.name.trim();

    if (!cleanName) {
      setDemoNotice("Add a customer name before saving the demo customer.");
      return;
    }

    const newCustomer: Customer = {
      id: `demo-${Date.now()}`,
      initials: makeInitials(cleanName),
      name: cleanName,
      phone: form.phone.trim() || "Demo phone",
      area: form.area,
      channel: form.channel,
      customerType: form.customerType,
      lastService: "New demo customer",
      lastServiceDate: "Today",
      totalSpend: 0,
      lastActivity: "Just now",
      lastActivityMinutes: 0,
      nextBooking: "To arrange",
      nextBookingRank: 99,
      satisfaction: 0,
      risk: "Medium",
      opportunity: "Needs first follow-up",
      notes:
        form.notes.trim() ||
        "Demo-only customer added locally. No database, API, or real data was touched.",
    };

    setCustomers((current) => [newCustomer, ...current]);
    setSelectedCustomer(newCustomer);
    setSelectedTab("All");
    setAddPanelOpen(false);
    setDemoNotice(
      `${cleanName} was added to this local demo view only. No backend or database was touched.`
    );
    setForm({
      name: "",
      phone: "",
      area: "Manchester",
      channel: "WhatsApp",
      customerType: "New",
      notes: "",
    });
  }

  function openCustomerTab(tab: CustomerTab) {
    const matchingCustomers =
      tab === "All"
        ? customers
        : customers.filter((customer) => customer.customerType === tab);

    setSelectedTab(tab);
    setChannelFilter("All Channels");
    setSearchText("");
    setSortMode("Last Activity");
    setSelectedCustomer(matchingCustomers[0] ?? null);

    setDemoNotice(
      tab === "All"
        ? `All customers opened. Showing ${customers.length} demo customer records.`
        : `${tab} customers opened. Showing ${matchingCustomers.length} ${tab.toLowerCase()} customer record${
            matchingCustomers.length === 1 ? "" : "s"
          }.`
    );

    window.setTimeout(() => {
      document
        .getElementById("customer-results")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  function handleDemoAction(action: string, customer: Customer) {
    setSelectedCustomer(customer);
    setDemoNotice(`${action} opened for ${customer.name}. Demo action only.`);
  }

  return (
    <main className={styles.customersPage}>
<section className={styles.heroPanel}>
        <div className={styles.heroTop}>
          <div className={styles.titleBlock}>
            <p className={styles.kicker}>CUSTOMER COMMAND CENTRE</p>
            <h1>Customers</h1>
            <p>
              Manage repeat customers, VIP spend, customer history, and
              follow-up opportunities across Manchester and Greater Manchester.
            </p>
          </div>

          <div className={styles.headerTools}>
            <div className={styles.commandBar} aria-label="Customer command controls">
              <button
                className={styles.primaryButton}
                type="button"
                onClick={() => {
                  setAddPanelOpen(true);
                  setOwnerPanelOpen(false);
                  setDemoNotice("Add Customer panel opened. Demo-only local action.");
                }}
              >
                + Add Customer
              </button>

              <label className={styles.controlShell}>
                <span>Channel</span>
                <select
                  value={channelFilter}
                  onChange={(event) => {
                    setChannelFilter(event.target.value as ChannelFilter);
                    setDemoNotice(`Channel filter changed to ${event.target.value}.`);
                    window.setTimeout(() => {
                      document
                        .getElementById("customer-results")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 0);
                  }}
                >
                  {channels.map((channel) => (
                    <option key={channel} value={channel}>
                      {channel}
                    </option>
                  ))}
                </select>
              </label>

              <label className={`${styles.controlShell} ${styles.searchControl}`}>
                <span>Search</span>
                <input
                  value={searchText}
                  onChange={(event) => {
                    setSearchText(event.target.value);
                    setDemoNotice("Search is filtering the customer table live.");
                  }}
                  placeholder="Search customers..."
                />
              </label>

              <label className={styles.controlShell}>
                <span>Sort</span>
                <select
                  value={sortMode}
                  onChange={(event) => {
                    setSortMode(event.target.value as SortMode);
                    setDemoNotice(`Customer list sorted by ${event.target.value}.`);
                    window.setTimeout(() => {
                      document
                        .getElementById("customer-results")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 0);
                  }}
                >
                  {sortModes.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </label>

              <button
                className={styles.ownerChip}
                type="button"
                onClick={() => {
                  setOwnerPanelOpen(true);
                  setAddPanelOpen(false);
                  setDemoNotice("Owner profile opened. Demo-only control view.");
                }}
              >
                <span>JD</span>
                <strong>John D.</strong>
                <small>Owner</small>
              </button>
            </div>
</div>
        </div>

        <div className={styles.metricGrid}>
          <article className={styles.metricCard}>
            <span className={styles.metricIcon}>👥</span>
            <div>
              <strong>128</strong>
              <p>Customer records</p>
              <small>↑ 18% vs last 30 days</small>
            </div>
          </article>

          <article className={styles.metricCard}>
            <span className={styles.metricIcon}>★</span>
            <div>
              <strong>22</strong>
              <p>VIP customers</p>
              <small>£31.5k protected value</small>
            </div>
          </article>

          <article className={styles.metricCard}>
            <span className={styles.metricIcon}>£</span>
            <div>
              <strong>£412</strong>
              <p>Average spend</p>
              <small>↑ 9% vs last 30 days</small>
            </div>
          </article>

          <article className={styles.metricCard}>
            <span className={styles.metricIcon}>↻</span>
            <div>
              <strong>68%</strong>
              <p>Returning rate</p>
              <small>12 follow-ups ready</small>
            </div>
          </article>
        </div>
      </section>
<section className="baFlowStrip baFlowStrip--customers" aria-label="Know who to contact, book or recover next.">
        <div className="baFlowIntro">
          <p>Customer action path</p>
          <h2>Know who to contact, book or recover next.</h2>
          <span>Customer records should explain the next best move without making staff search through the table.</span>
        </div>

        <div className="baFlowCards">

          <Link href="/customers/sarah-johnson" className="baFlowCard">
            <span>Repeat</span>
            <strong>Open Sarah Johnson</strong>
            <small>Repeat customer with another booking opportunity.</small>
            <em>View record</em>
          </Link>

          <Link href="/bookings?search=Emma%20Davis" className="baFlowCard">
            <span>VIP</span>
            <strong>Book Emma Davis</strong>
            <small>High-value customer ready for owner-approved booking action.</small>
            <em>Open booking</em>
          </Link>

          <Link href="/follow-ups?search=Tom%20Wilson" className="baFlowCard">
            <span>Due</span>
            <strong>Follow up Tom Wilson</strong>
            <small>Warm lead needs a simple callback before it cools.</small>
            <em>Open task</em>
          </Link>
        </div>
      </section>


      {addPanelOpen && (
        <section className={styles.addPanel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.kicker}>DEMO ACTION</p>
              <h2>Add demo customer</h2>
              <p>
                This proves the action works in the sales demo. It does not
                create real customer data or touch a database.
              </p>
            </div>

            <button
              className={styles.ghostButton}
              type="button"
              onClick={() => {
                setAddPanelOpen(false);
                setDemoNotice("Add Customer panel closed.");
              }}
            >
              Close
            </button>
          </div>

          <div className={styles.formGrid}>
            <label>
              Customer name
              <input
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="Example: Mia Green"
              />
            </label>

            <label>
              Phone
              <input
                value={form.phone}
                onChange={(event) =>
                  setForm((current) => ({ ...current, phone: event.target.value }))
                }
                placeholder="Example: 07900 111222"
              />
            </label>

            <label>
              Area
              <select
                value={form.area}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    area: event.target.value as Area,
                  }))
                }
              >
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Channel
              <select
                value={form.channel}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    channel: event.target.value as Channel,
                  }))
                }
              >
                {channels
                  .filter((channel): channel is Channel => channel !== "All Channels")
                  .map((channel) => (
                    <option key={channel} value={channel}>
                      {channel}
                    </option>
                  ))}
              </select>
            </label>

            <label>
              Customer type
              <select
                value={form.customerType}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    customerType: event.target.value as CustomerType,
                  }))
                }
              >
                {customerTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.wideField}>
              Notes
              <textarea
                value={form.notes}
                onChange={(event) =>
                  setForm((current) => ({ ...current, notes: event.target.value }))
                }
                placeholder="Example: Wants a call-back tomorrow morning."
              />
            </label>
          </div>

          <div className={styles.formActions}>
            <button
              className={styles.ghostButton}
              type="button"
              onClick={() => {
                setAddPanelOpen(false);
                setDemoNotice("Demo customer creation cancelled.");
              }}
            >
              Cancel
            </button>

            <button
              className={styles.primaryButton}
              type="button"
              onClick={saveDemoCustomer}
            >
              Save Demo Customer
            </button>
          </div>
        </section>
      )}

      {ownerPanelOpen && (
        <section className={styles.ownerPanel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.kicker}>OWNER CONTROL</p>
              <h2>John D. profile</h2>
              <p>
                Demo owner profile for customer records, approval control, and
                customer follow-up oversight.
              </p>
            </div>

            <button
              className={styles.ghostButton}
              type="button"
              onClick={() => {
                setOwnerPanelOpen(false);
                setDemoNotice("Owner profile closed.");
              }}
            >
              Close profile
            </button>
          </div>

          <div className={styles.ownerGrid}>
            <article>
              <strong>Owner access</strong>
              <span>Can review customer records and follow-up actions.</span>
            </article>
            <article>
              <strong>Approval control</strong>
              <span>VIP reviews, sensitive replies, and win-back actions stay owner-approved.</span>
            </article>
            <article>
              <strong>Demo safety</strong>
              <span>Local fake data only. No real customer records are created.</span>
            </article>
          </div>
        </section>
      )}

      <div className={styles.demoNotice} role="status">
        {demoNotice}
      </div>

      <section id="customer-results" className={styles.tablePanel} data-customer-table-restored="true">
        <div className={styles.tableHeader}>
          <div>
            <p className={styles.kicker}>CUSTOMER RECORDS</p>
            <h2>Customer records</h2>
            <p>
              Showing {filteredCustomers.length} of {customers.length} demo customers.
            </p>
          </div>

          <button
            className={styles.clearButton}
            type="button"
            disabled={!hasFilters}
            onClick={clearFilters}
          >
            {hasFilters ? "Clear filters" : "Filters clear"}
          </button>
        </div>

        <div className={styles.tabs} aria-label="Customer record filters">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={[styles.tabButton, selectedTab === tab ? styles.tabActive : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => openCustomerTab(tab)}
            >
              {tab}
              <span>{tabCounts[tab]}</span>
            </button>
          ))}
        </div>

        {filteredCustomers.length > 0 ? (
          <>
            <div className={styles.tableScroll}>
              <table className={styles.customerTable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Area</th>
                    <th>Source</th>
                    <th>Type</th>
                    <th>Last service</th>
                    <th>Total spend</th>
                    <th>Last activity</th>
                    <th>Next booking</th>
                    <th>Satisfaction</th>
                    <th>Risk</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className={selectedCustomer?.id === customer.id ? styles.rowSelected : ""}
                    >
                      <td>
                        <Link
                          href={"/customers/" + customer.id}
                          className={styles.customerName}
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setDemoNotice(customer.name + " record opened.");
                          }}
                        >
                          <span>{customer.initials}</span>
                          <strong>{customer.name}</strong>
                          <small>{customer.opportunity}</small>
                        </Link>
                      </td>
                      <td>
                        {customer.phone}
                      </td>
                      <td>{customer.area}</td>
                      <td><span className={styles.sourceBadge} data-source={customer.channel.toLowerCase()}>{customer.channel}</span></td>
                      <td><span className={styles.typeBadge} data-type={customer.customerType.toLowerCase()}>{customer.customerType}</span></td>
                      <td>
                        <strong>{customer.lastServiceDate}</strong>
                        <small>{customer.lastService}</small>
                      </td>
                      <td>{formatCurrency(customer.totalSpend)}</td>
                      <td>{customer.lastActivity}</td>
                      <td>{customer.nextBooking}</td>
                      <td>{makeStars(customer.satisfaction)}</td>
                      <td><span className={styles.riskBadge} data-risk={customer.risk.toLowerCase()}>{customer.risk}</span></td>
                      <td>
                        <div className={styles.rowActions}>
                          <button
                            type="button"
                            onClick={() => handleDemoAction("Customer record", customer)}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDemoAction("Follow-up action", customer)}
                          >
                            Follow-up
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.tableFooter}>
              <div>
                <strong>Showing {filteredCustomers.length} of {customers.length} demo customers</strong>
                <span>{formatCurrency(visibleSpend)} visible customer value</span>
              </div>

              <div className={styles.pagination}>
                <button
                    type="button"
                    aria-label="Previous page"
                    onClick={() => window.alert("There is only one page of demo customers.")}
                  >
                    ‹
                  </button>
                <button
                    type="button"
                    className={styles.pageActive}
                    onClick={() => window.alert("Page 1 is already selected.")}
                  >
                    1
                  </button>
                <button
                    type="button"
                    aria-label="Next page"
                    onClick={() => window.alert("There is only one page of demo customers.")}
                  >
                    ›
                  </button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <strong>No customers found.</strong>
            <p>Clear filters or search again to show demo customer records.</p>
          </div>
        )}
      </section>

{selectedCustomer && (
        <section className={styles.recordPanel}>
          <div className={styles.recordHeader}>
            <div>
              <p className={styles.kicker}>SELECTED CUSTOMER RECORD</p>
              <h2>{selectedCustomer.name}</h2>
              <p>{selectedCustomer.notes}</p>
            </div>

            <button
              className={styles.ghostButton}
              type="button"
              onClick={() => {
                setSelectedCustomer(null);
                setDemoNotice("Customer record closed.");
              }}
            >
              Close record
            </button>
          </div>

          <div className={styles.recordGrid}>
            <article>
              <strong>{selectedCustomer.phone}</strong>
              <span>Phone number</span>
            </article>
            <article>
              <strong>{selectedCustomer.area}</strong>
              <span>Area</span>
            </article>
            <article>
              <strong>{selectedCustomer.channel}</strong>
              <span>Lead source</span>
            </article>
            <article>
              <strong>{formatCurrency(selectedCustomer.totalSpend)}</strong>
              <span>Total spend</span>
            </article>
            <article>
              <strong>{selectedCustomer.opportunity}</strong>
              <span>Next best action</span>
            </article>
            <article>
              <strong>{selectedCustomer.risk}</strong>
              <span>Follow-up risk</span>
            </article>
          </div>
        </section>
      )}

      <section className={styles.intelligencePanel}>
        <div className={styles.intelligenceHeader}>
          <div>
            <p className={styles.kicker}>CUSTOMER INTELLIGENCE</p>
            <h2>Customer Types</h2>
            <p>
              A sales-ready view of customer value, repeat-work potential, and
              follow-up priority.
            </p>
          </div>

          <span>128 total customer records</span>
        </div>

        <div className={styles.intelligenceGrid}>
          <div className={styles.breakdownPanel}>
            {portfolioBreakdown.map((segment) => (
              <article className={styles.breakdownRow} key={segment.label}>
                <div className={styles.breakdownLabel}>
                  <strong>{segment.label}</strong>
                  <span>
                    {segment.count} customers · {segment.percentage}%
                  </span>
                </div>

                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${segment.percentage}%` }}
                  />
                </div>

                <div className={styles.breakdownValue}>
                  <strong>{segment.value}</strong>
                  <span>{segment.note}</span>
                </div>
              </article>
            ))}
          </div>

          <aside className={styles.revenuePanel}>
            <p className={styles.kicker}>REVENUE USEFULNESS</p>
            <h3>What this proves to a business owner</h3>

            <ul>
              <li>Which customers are worth the most.</li>
              <li>Who is likely to book again.</li>
              <li>Who needs a reminder before the lead goes cold.</li>
              <li>Where VIPs and repeat customers came from.</li>
            </ul>
          </aside>
        </div>

        <div className={styles.insightCards}>
          <article>
            <strong>68%</strong>
            <span>returning rate</span>
          </article>
          <article>
            <strong>£412</strong>
            <span>average spend</span>
          </article>
          <article>
            <strong>£31.5k</strong>
            <span>VIP customer value</span>
          </article>
          <article>
            <strong>12</strong>
            <span>follow-up opportunities</span>
          </article>
        </div>
      </section>
<p className={styles.safetyNote}>
        Demo safety: fake data only, local UI actions only, no database, no
        Supabase, no Stripe, no Twilio, no OpenAI API, no deployment, and no
        real customer data.
      </p>
      <section className="baCustomerAura" aria-label="Bee-Aura Customer Watch">
        <div className="baCustomerAuraBot" aria-hidden="true">
          <img src="/brand/source/aura-assistant-transparent.png" alt="" />
        </div>

        <div className="baCustomerAuraCopy">
          <p>AURA CUSTOMER WATCH</p>
          <h2>Aura keeps customer records, VIP spend and follow-ups easy to act on.</h2>
          <span>
            Customer records show who to contact, who is ready to book and which warm opportunities need owner-approved follow-up.
          </span>

          <div className="baCustomerAuraActions">
            <Link href="/customers?filter=repeat">Review repeat customers</Link>
            <Link href="/bookings">Open booking calendar</Link>
            <Link href="/follow-ups">Open follow-up queue</Link>
          </div>
        </div>
      </section>

</main>
  );
}
