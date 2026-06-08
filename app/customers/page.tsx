"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type CustomerType = "Active" | "Repeat" | "VIP" | "New" | "Inactive";

type Customer = {
  id: string;
  name: string;
  slug: string;
  initials: string;
  contact: string;
  area: string;
  type: CustomerType;
  lastService: string;
  totalSpend: string;
  lastActivity: string;
  nextBooking: string;
  satisfaction: number;
  owner: string;
  service: string;
};

const startingCustomers: Customer[] = [
  {
    id: "CUS-1001",
    name: "Tom Wilson",
    slug: "tom-wilson",
    initials: "TW",
    contact: "07912 345678",
    area: "Birmingham",
    type: "Active",
    lastService: "24 May 2025",
    totalSpend: "£1,245",
    lastActivity: "2h ago",
    nextBooking: "29 May 2025",
    satisfaction: 5,
    owner: "John D.",
    service: "Boiler service",
  },
  {
    id: "CUS-1002",
    name: "Sarah Johnson",
    slug: "sarah-johnson",
    initials: "SJ",
    contact: "07845 678912",
    area: "Solihull",
    type: "Repeat",
    lastService: "22 May 2025",
    totalSpend: "£895",
    lastActivity: "15m ago",
    nextBooking: "22 May 2025",
    satisfaction: 4.5,
    owner: "John D.",
    service: "Emergency boiler repair",
  },
  {
    id: "CUS-1003",
    name: "Emma Davis",
    slug: "emma-davis",
    initials: "ED",
    contact: "07955 789123",
    area: "Dudley",
    type: "VIP",
    lastService: "18 Jun 2025",
    totalSpend: "£6,200",
    lastActivity: "1h ago",
    nextBooking: "18 Jun 2025",
    satisfaction: 5,
    owner: "Lucy C.",
    service: "Plumbing leak repair",
  },
  {
    id: "CUS-1004",
    name: "Mike Thompson",
    slug: "mike-thompson",
    initials: "MT",
    contact: "07798 123456",
    area: "Sutton Coldfield",
    type: "Active",
    lastService: "27 May 2025",
    totalSpend: "£780",
    lastActivity: "2h ago",
    nextBooking: "27 May 2025",
    satisfaction: 4,
    owner: "Adam H.",
    service: "Electrical fault inspection",
  },
  {
    id: "CUS-1005",
    name: "James Brown",
    slug: "james-brown",
    initials: "JB",
    contact: "07534 567890",
    area: "Wolverhampton",
    type: "Repeat",
    lastService: "20 May 2025",
    totalSpend: "£640",
    lastActivity: "3h ago",
    nextBooking: "—",
    satisfaction: 4.5,
    owner: "John D.",
    service: "Drain clearance",
  },
  {
    id: "CUS-1006",
    name: "Olivia Smith",
    slug: "olivia-smith",
    initials: "OS",
    contact: "07766 445566",
    area: "Walsall",
    type: "New",
    lastService: "03 Jun 2025",
    totalSpend: "£210",
    lastActivity: "5h ago",
    nextBooking: "03 Jun 2025",
    satisfaction: 3.5,
    owner: "Lucy C.",
    service: "Thermostat installation",
  },
  {
    id: "CUS-1007",
    name: "David Clarke",
    slug: "david-clarke",
    initials: "DC",
    contact: "07888 223344",
    area: "Birmingham",
    type: "VIP",
    lastService: "30 May 2025",
    totalSpend: "£1,850",
    lastActivity: "1d ago",
    nextBooking: "30 May 2025",
    satisfaction: 5,
    owner: "John D.",
    service: "Maintenance plan",
  },
  {
    id: "CUS-1008",
    name: "Charlotte Lee",
    slug: "charlotte-lee",
    initials: "CL",
    contact: "07990 112233",
    area: "Solihull",
    type: "Repeat",
    lastService: "24 Jun 2025",
    totalSpend: "£520",
    lastActivity: "2d ago",
    nextBooking: "24 Jun 2025",
    satisfaction: 4,
    owner: "Adam H.",
    service: "Boiler service",
  },
  {
    id: "CUS-1009",
    name: "Ben Morris",
    slug: "ben-morris",
    initials: "BM",
    contact: "07700 998877",
    area: "Dudley",
    type: "Inactive",
    lastService: "12 Apr 2025",
    totalSpend: "£250",
    lastActivity: "2d ago",
    nextBooking: "—",
    satisfaction: 3,
    owner: "Lucy C.",
    service: "Drain clearance",
  },
];

const customerTabs: Array<"All" | CustomerType> = ["All", "Active", "Repeat", "VIP", "New", "Inactive"];

const statCards = [
  { icon: "👥", label: "Repeat Customers", value: "128", change: "↑ 18% vs last 30 days", tone: "blue" },
  { icon: "☆", label: "VIP Customers", value: "22", change: "↑ 12% vs last 30 days", tone: "gold" },
  { icon: "▣", label: "Avg Spend", value: "£412", change: "↑ 9% vs last 30 days", tone: "cyan" },
  { icon: "↻", label: "Returning Rate", value: "68%", change: "↑ 11% vs last 30 days", tone: "gold" },
];

function typeClass(type: CustomerType) {
  return type.toLowerCase();
}

function renderStars(score: number) {
  const fullStars = Math.floor(score);
  const hasHalf = score % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return `${"★".repeat(fullStars)}${hasHalf ? "☆" : ""}${"☆".repeat(emptyStars)}`;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(startingCustomers);
  const [activeTab, setActiveTab] = useState<"All" | CustomerType>("All");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("Customer command centre ready.");

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return customers.filter((customer) => {
      const tabMatch = activeTab === "All" || customer.type === activeTab;
      const searchMatch =
        query.length === 0 ||
        customer.name.toLowerCase().includes(query) ||
        customer.area.toLowerCase().includes(query) ||
        customer.contact.toLowerCase().includes(query) ||
        customer.service.toLowerCase().includes(query) ||
        customer.type.toLowerCase().includes(query);

      return tabMatch && searchMatch;
    });
  }, [activeTab, customers, search]);

  const counts = useMemo(() => {
    return customers.reduce(
      (total, customer) => {
        total.all += 1;
        total[customer.type] += 1;
        return total;
      },
      { all: 0, Active: 0, Repeat: 0, VIP: 0, New: 0, Inactive: 0 } as Record<
        "all" | CustomerType,
        number
      >,
    );
  }, [customers]);

  function addDemoCustomer() {
    const nextNumber = customers.length + 1;

    const newCustomer: Customer = {
      id: `CUS-DEMO-${Date.now()}`,
      name: `New Demo Customer ${nextNumber}`,
      slug: "tom-wilson",
      initials: "NC",
      contact: "07--- --- ---",
      area: "Birmingham",
      type: "New",
      lastService: "Not booked yet",
      totalSpend: "£0",
      lastActivity: "Just now",
      nextBooking: "Needs follow-up",
      satisfaction: 0,
      owner: "John D.",
      service: "New enquiry",
    };

    setCustomers((current) => [newCustomer, ...current]);
    setActiveTab("All");
    setNotice("New demo customer added to the top of the table.");
  }

  return (
    <main className="customerRef-page">
      <header className="customerRef-topbar">
        <div>
          <h1>Customers</h1>
          <p>Manage customer relationships and grow repeat business.</p>
        </div>

        <div className="customerRef-actions">
          <button type="button" onClick={addDemoCustomer} className="customerRef-addButton">
            ＋ Add Customer
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("All");
              setSearch("");
              setNotice("All channel/customer filters cleared.");
            }}
            className="customerRef-darkButton"
          >
            ▽ All Channels⌄
          </button>
          <label className="customerRef-search">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search customers..."
            />
            <span>⌕</span>
          </label>
          <Link href="/settings" className="customerRef-owner">
            <span>JD</span>
            <strong>John D.</strong>
            <small>Owner</small>
          </Link>
        </div>
      </header>

      <section className="customerRef-stats">
        {statCards.map((card) => (
          <article key={card.label} className={`customerRef-stat customerRef-stat-${card.tone}`}>
            <span className="customerRef-statIcon">{card.icon}</span>
            <div>
              <strong>{card.value}</strong>
              <p>{card.label}</p>
              <small>{card.change}</small>
            </div>
          </article>
        ))}
      </section>

      <section className="customerRef-card">
        <div className="customerRef-tabsRow">
          <div className="customerRef-tabs">
            {customerTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  setNotice(`${tab} customers selected.`);
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
            onClick={() => setNotice("Customer table sorted by last activity.")}
            className="customerRef-sort"
          >
            ↕ Sort: Last Activity⌄
          </button>
        </div>

        <div className="customerRef-tableWrap">
          <table className="customerRef-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Area</th>
                <th>Customer Type</th>
                <th>Last Service</th>
                <th>Total Spend</th>
                <th>Last Activity</th>
                <th>Next Booking</th>
                <th>Satisfaction</th>
                <th>Owner</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <Link href={`/customers/${customer.slug}`} className="customerRef-name">
                      <span>{customer.initials}</span>
                      <strong>{customer.name}</strong>
                    </Link>
                  </td>
                  <td>
                    <Link href="/messages" className="customerRef-link">
                      ☎ {customer.contact}
                    </Link>
                  </td>
                  <td>{customer.area}</td>
                  <td>
                    <span className={`customerRef-type type-${typeClass(customer.type)}`}>
                      {customer.type}
                    </span>
                  </td>
                  <td>{customer.lastService}</td>
                  <td className="customerRef-spend">{customer.totalSpend}</td>
                  <td>{customer.lastActivity}</td>
                  <td>{customer.nextBooking}</td>
                  <td>
                    <span className="customerRef-stars">{renderStars(customer.satisfaction)}</span>
                  </td>
                  <td>
                    <Link href="/settings" className="customerRef-ownerMini">
                      <span>{customer.owner.slice(0, 2)}</span>
                      {customer.owner}
                    </Link>
                  </td>
                  <td>
                    <div className="customerRef-rowActions">
                      <Link href="/messages">☰</Link>
                      <Link href="/bookings">▣</Link>
                      <button
                        type="button"
                        onClick={() => setNotice(`${customer.name} actions opened.`)}
                      >
                        ⋮
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCustomers.length === 0 ? (
            <div className="customerRef-empty">
              <strong>No customers found.</strong>
              <p>Clear the search or switch back to All customers.</p>
            </div>
          ) : null}
        </div>

        <footer className="customerRef-footer">
          <p>Showing 1 to {filteredCustomers.length} of 128 customers</p>

          <div className="customerRef-pagination">
            <button type="button" onClick={() => setNotice("Previous page selected.")}>‹</button>
            <button type="button" className="active" onClick={() => setNotice("Page 1 selected.")}>1</button>
            <button type="button" onClick={() => setNotice("Page 2 selected.")}>2</button>
            <button type="button" onClick={() => setNotice("Page 3 selected.")}>3</button>
            <button type="button" onClick={() => setNotice("Page 4 selected.")}>4</button>
            <button type="button" onClick={() => setNotice("Page 5 selected.")}>5</button>
            <span>...</span>
            <button type="button" onClick={() => setNotice("Page 15 selected.")}>15</button>
            <button type="button" onClick={() => setNotice("Next page selected.")}>›</button>
          </div>

          <aside className="customerRef-types">
            <div>
              <h3>Customer Types</h3>
              <small>ⓘ</small>
            </div>

            <div className="customerRef-typeStats">
              <p><span className="active" /> Active <strong>46% (59)</strong></p>
              <p><span className="vip" /> VIP <strong>17% (22)</strong></p>
              <p><span className="repeat" /> Repeat <strong>33% (42)</strong></p>
              <p><span className="new" /> New <strong>4% (5)</strong></p>
            </div>

            <div className="customerRef-donut">
              <strong>128</strong>
              <span>Total</span>
            </div>
          </aside>
        </footer>

        <div className="customerRef-notice">{notice}</div>
      </section>
    </main>
  );
}
