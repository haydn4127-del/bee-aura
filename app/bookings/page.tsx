"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type BookingStatus = "Completed" | "In Progress" | "Pending" | "Confirmed";
type BookingService =
  | "Boiler Service"
  | "Bathroom Renovation"
  | "Plumbing Repair"
  | "Roof Inspection"
  | "Drain Clearance"
  | "Boiler Repair"
  | "Bathroom Leak"
  | "Blocked Drain"
  | "Annual Boiler Service";
type ServiceFilter = "All Services" | BookingService;

type Booking = {
  id: string;
  dateBox: string;
  time: string;
  service: BookingService;
  serviceType: string;
  customer: string;
  slug: string;
  email: string;
  phone: string;
  address: string;
  engineer: string;
  status: BookingStatus;
  value: string;
  notes: string;
};

const initialBookings: Booking[] = [
  {
    id: "BKG-1001",
    dateBox: "MAY 19 MON",
    time: "09:00 AM – 10:00 AM",
    service: "Boiler Service",
    serviceType: "Boiler Service",
    customer: "Tom Wilson",
    slug: "tom-wilson",
    email: "tom.wilson@example.com",
    phone: "07891 882 014",
    address: "Solihull, Birmingham",
    engineer: "Adam H.",
    status: "Completed",
    value: "£95",
    notes: "Annual boiler service completed. Reminder and confirmation sent by email.",
  },
  {
    id: "BKG-1002",
    dateBox: "MAY 19 MON",
    time: "11:30 AM – 12:30 PM",
    service: "Bathroom Renovation",
    serviceType: "Bathroom Renovation",
    customer: "Sarah Johnson",
    slug: "sarah-johnson",
    email: "sarah.johnson@example.com",
    phone: "07944 203 118",
    address: "Moseley, Birmingham",
    engineer: "Lucy C.",
    status: "In Progress",
    value: "£420",
    notes: "Customer came through WhatsApp. Keep updates clear and confirm next visit.",
  },
  {
    id: "BKG-1003",
    dateBox: "MAY 19 MON",
    time: "01:00 PM – 02:00 PM",
    service: "Plumbing Repair",
    serviceType: "Plumbing Repair",
    customer: "Emma Davis",
    slug: "emma-davis",
    email: "emma.davis@example.com",
    phone: "07720 339 901",
    address: "Edgbaston, Birmingham",
    engineer: "John D.",
    status: "Pending",
    value: "£180",
    notes: "Waiting for photo of leak before confirming engineer arrival.",
  },
  {
    id: "BKG-1004",
    dateBox: "MAY 19 MON",
    time: "03:00 PM – 04:00 PM",
    service: "Roof Inspection",
    serviceType: "Roof Inspection",
    customer: "David Clarke",
    slug: "david-clarke",
    email: "david.c@example.com",
    phone: "07888 223 344",
    address: "Sutton Coldfield, Birmingham",
    engineer: "Mike T.",
    status: "Confirmed",
    value: "£150",
    notes: "Inspection booked from lead follow-up. Customer asked for quote after visit.",
  },
  {
    id: "BKG-1005",
    dateBox: "MAY 19 MON",
    time: "04:30 PM – 05:30 PM",
    service: "Drain Clearance",
    serviceType: "Drain Clearance",
    customer: "Ben Morris",
    slug: "ben-morris",
    email: "ben.m@example.com",
    phone: "07700 998 877",
    address: "Harborne, Birmingham",
    engineer: "James B.",
    status: "Confirmed",
    value: "£220",
    notes: "Recovered missed call. High chance of booking loss if customer is not updated.",
  },
  {
    id: "BKG-1006",
    dateBox: "MAY 19 MON",
    time: "05:45 PM – 06:30 PM",
    service: "Boiler Repair",
    serviceType: "Boiler Service",
    customer: "Amelia Ward",
    slug: "amelia-ward",
    email: "amelia.ward@example.com",
    phone: "07911 220 044",
    address: "Bournville, Birmingham",
    engineer: "John D.",
    status: "Pending",
    value: "£420",
    notes: "Emergency boiler repair request. Confirm access and same-day engineer availability.",
  },
  {
    id: "BKG-1007",
    dateBox: "MAY 20 TUE",
    time: "09:30 AM – 10:30 AM",
    service: "Bathroom Leak",
    serviceType: "Plumbing Repair",
    customer: "Daniel Khan",
    slug: "daniel-khan",
    email: "daniel.khan@example.com",
    phone: "07822 334 455",
    address: "Hall Green, Birmingham",
    engineer: "Lucy C.",
    status: "Confirmed",
    value: "£650",
    notes: "Bathroom leak inspection booked from website enquiry. Customer asked for quote after visit.",
  },
  {
    id: "BKG-1008",
    dateBox: "MAY 20 TUE",
    time: "12:00 PM – 01:00 PM",
    service: "Blocked Drain",
    serviceType: "Drain Clearance",
    customer: "Lucas Green",
    slug: "lucas-green",
    email: "lucas.green@example.com",
    phone: "07544 556 677",
    address: "Erdington, Birmingham",
    engineer: "James B.",
    status: "Confirmed",
    value: "£280",
    notes: "Facebook enquiry converted from quote into booked drain clearance.",
  },

  {
    id: "BKG-1009",
    dateBox: "MAY 20 TUE",
    time: "02:30 PM – 03:15 PM",
    service: "Annual Boiler Service",
    serviceType: "Boiler Service",
    customer: "Priya Shah",
    slug: "priya-shah",
    email: "priya.shah@example.com",
    phone: "07733 445 566",
    address: "Sutton Coldfield, Birmingham",
    engineer: "Adam H.",
    status: "Pending",
    value: "£140",
    notes: "Annual service enquiry. Send checklist and confirm appointment window.",
  },
  {
    id: "BKG-1010",
    dateBox: "MAY 20 TUE",
    time: "04:00 PM – 05:00 PM",
    service: "Drain Clearance",
    serviceType: "Drain Clearance",
    customer: "Lucas Green",
    slug: "lucas-green",
    email: "lucas.green@example.com",
    phone: "07544 556 677",
    address: "Erdington, Birmingham",
    engineer: "James B.",
    status: "Confirmed",
    value: "£280",
    notes: "Facebook enquiry converted from quote into booked drain clearance.",
  },
];

const serviceOptions: ServiceFilter[] = [
  "All Services",
  "Boiler Service",
  "Bathroom Renovation",
  "Plumbing Repair",
  "Roof Inspection",
  "Drain Clearance",
];

function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

function customerRecordHref(booking: Booking) {
  const realCustomerRecords = new Set(["tom-wilson", "sarah-johnson", "emma-davis"]);

  if (realCustomerRecords.has(booking.slug)) {
    return `/customers/${booking.slug}`;
  }

  return `/customers?search=${encodeURIComponent(booking.customer)}`;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [selectedId, setSelectedId] = useState(initialBookings[1].id);
  const [serviceFilter, setServiceFilter] = useState<ServiceFilter>("All Services");
  const [searchText, setSearchText] = useState("");
  const [showAllBookings, setShowAllBookings] = useState(false);
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [notice, setNotice] = useState("Bookings command centre ready.");

  const [form, setForm] = useState({
    customer: "",
    service: "Boiler Service" as BookingService,
    time: "",
    phone: "",
    email: "",
    address: "",
    value: "",
  });

  const filteredBookings = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesService =
        serviceFilter === "All Services" ||
        booking.service === serviceFilter ||
        booking.serviceType === serviceFilter;

      const matchesSearch =
        !query ||
        booking.customer.toLowerCase().includes(query) ||
        booking.service.toLowerCase().includes(query) ||
        booking.phone.toLowerCase().includes(query) ||
        booking.email.toLowerCase().includes(query) ||
        booking.address.toLowerCase().includes(query) ||
        booking.status.toLowerCase().includes(query) ||
        booking.engineer.toLowerCase().includes(query);

      return matchesService && matchesSearch;
    });
  }, [bookings, searchText, serviceFilter]);

  const visibleBookings = showAllBookings ? filteredBookings : filteredBookings.slice(0, 9);
  const selected = bookings.find((booking) => booking.id === selectedId) ?? filteredBookings[0] ?? bookings[0];

  function updateForm(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function openCreatePanel() {
    setShowCreatePanel(true);
    window.setTimeout(() => {
      document.getElementById("bkV2-create")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  function createBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.customer.trim() || !form.time.trim()) {
      setNotice("Add a customer and time slot before creating a booking.");
      return;
    }

    const newBooking: Booking = {
      id: `BKG-${Date.now().toString().slice(-5)}`,
      dateBox: "MAY 20 TUE",
      time: form.time.trim(),
      service: form.service,
      serviceType: form.service,
      customer: form.customer.trim(),
      slug: slugify(form.customer.trim()),
      email: form.email.trim() || "customer@example.com",
      phone: form.phone.trim() || "07--- --- ---",
      address: form.address.trim() || "Birmingham, UK",
      engineer: "John D.",
      status: "Pending",
      value: form.value.trim() || "£0",
      notes: "Demo booking created from the booking form. Confirm details before owner approval.",
    };

    setBookings((current) => [newBooking, ...current]);
    setSelectedId(newBooking.id);
    setForm({
      customer: "",
      service: "Boiler Service",
      time: "",
      phone: "",
      email: "",
      address: "",
      value: "",
    });
    setShowCreatePanel(false);
    setNotice(`Created demo booking for ${newBooking.customer}.`);
  }

  function confirmSelectedBooking() {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === selected.id ? { ...booking, status: "Confirmed" } : booking,
      ),
    );
    setNotice(`${selected.customer}'s booking marked as confirmed.`);
  }

  return (
    <main className="bkV2-page">
      <header className="bkV2-header">
        <div className="bkV2-title">
          <h1>Bookings</h1>
          <p>Manage appointments, schedules and customer visits in one place.</p>
        </div>

        <div className="bkV2-actions">
          <button type="button" onClick={openCreatePanel} className="bkV2-primary">
            + Add Booking
          </button>

          <label className="bkV2-select">
            <span>⚒</span>
            <select value={serviceFilter} onChange={(event) => setServiceFilter(event.target.value as ServiceFilter)}>
              {serviceOptions.map((service) => (
                <option key={service}>{service}</option>
              ))}
            </select>
          </label>

          <label className="bkV2-search">
            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search bookings..."
              aria-label="Search bookings"
            />
          </label>

          <Link href="/settings" className="bkV2-owner">
            <span>JD</span>
            <strong>John D.<small>Owner</small></strong>
          </Link>
        </div>
      </header>

      {showCreatePanel ? (
        <section id="bkV2-create" className="bkV2-create">
          <div>
            <p>Create booking</p>
            <h2>Add a new appointment</h2>
            <span>Demo only. This creates a temporary booking in the page.</span>
          </div>

          <form onSubmit={createBooking}>
            <label>Customer<input value={form.customer} onChange={(event) => updateForm("customer", event.target.value)} placeholder="Customer name" /></label>
            <label>
              Service
              <select value={form.service} onChange={(event) => updateForm("service", event.target.value)}>
                <option>Boiler Service</option>
                <option>Bathroom Renovation</option>
                <option>Plumbing Repair</option>
                <option>Roof Inspection</option>
                <option>Drain Clearance</option>
              </select>
            </label>
            <label>Time slot<input value={form.time} onChange={(event) => updateForm("time", event.target.value)} placeholder="Tomorrow, 10:00 AM – 11:00 AM" /></label>
            <label>Phone<input value={form.phone} onChange={(event) => updateForm("phone", event.target.value)} placeholder="07..." /></label>
            <label>Email<input value={form.email} onChange={(event) => updateForm("email", event.target.value)} placeholder="customer@example.com" /></label>
            <label>Address<input value={form.address} onChange={(event) => updateForm("address", event.target.value)} placeholder="Birmingham, UK" /></label>
            <label>Value<input value={form.value} onChange={(event) => updateForm("value", event.target.value)} placeholder="£250" /></label>

            <div className="bkV2-createActions">
              <button type="button" onClick={() => setShowCreatePanel(false)}>Cancel</button>
              <button type="submit">Create Booking</button>
            </div>
          </form>
        </section>
      ) : null}

      <section className="bkV2-stats">
        <article><span>BK</span><p>Today’s Bookings</p><strong>5</strong><small>↑ 25% vs yesterday</small></article>
        <article><span>CF</span><p>Confirmed</p><strong>18</strong><small>↑ 12% vs yesterday</small></article>
        <article><span>PD</span><p>Pending</p><strong>7</strong><small>↓ 8% vs yesterday</small></article>
        <article><span>£</span><p>Revenue Booked</p><strong>£4,280</strong><small>↑ 16% vs yesterday</small></article>
      </section>

      <section className="bkV2-grid">
        <section className="bkV2-card bkV2-upcoming">
          <div className="bkV2-cardHeader">
            <div>
              <p>Schedule control</p>
              <h2>Upcoming Bookings</h2>
            </div>
            <span>{filteredBookings.length} shown</span>
          </div>

          <div className="bkV2-tableHead">
            <span>Date & Time</span>
            <span>Booking</span>
            <span>Customer</span>
            <span>Status</span>
          </div>

          <div className="bkV2-list">
            {visibleBookings.map((booking) => (
              <button
                type="button"
                key={booking.id}
                onClick={() => {
                  setSelectedId(booking.id);
                  setNotice(`Selected ${booking.customer}'s ${booking.service.toLowerCase()} booking.`);
                }}
                className={`bkV2-row ${selected.id === booking.id ? "isSelected" : ""}`}
              >
                <span className="bkV2-date">
                  <strong>{booking.dateBox.split(" ")[0]}</strong>
                  <em>{booking.dateBox.split(" ")[1]}</em>
                  <small>{booking.dateBox.split(" ")[2]}</small>
                </span>

                <span>
                  <strong>{booking.service}</strong>
                  <small>{booking.serviceType}</small>
                </span>

                <span>
                  <strong>{booking.customer}</strong>
                  <small>{booking.email}</small>
                </span>

                <b className={`bkV2-status ${slugify(booking.status)}`}>{booking.status}</b>
              </button>
            ))}
          </div>

          <button type="button" onClick={() => setShowAllBookings((current) => !current)} className="bkV2-linkButton">
            {showAllBookings ? "Show fewer bookings ↑" : "View all bookings →"}
          </button>
        </section>

        <aside className="bkV2-side">
          <section className="bkV2-card bkV2-schedule">
            <div className="bkV2-cardHeader">
              <div>
                <p>Today</p>
                <h2>Today’s Schedule</h2>
              </div>
              <span>Monday, 19 May</span>
            </div>

            <div className="bkV2-timeline">
              {visibleBookings.slice(0, 6).map((booking) => (
                <button
                  key={`${booking.id}-timeline`}
                  type="button"
                  onClick={() => {
                    setSelectedId(booking.id);
                    setNotice(`Selected ${booking.customer}'s schedule slot.`);
                  }}
                  className={`bkV2-timeRow ${selected.id === booking.id ? "isSelected" : ""}`}
                >
                  <strong>{booking.time.split("–")[0].trim()}</strong>
                  <span>
                    <b>{booking.service}</b>
                    <small>{booking.customer}</small>
                  </span>
                  <em className={`bkV2-status ${slugify(booking.status)}`}>{booking.status}</em>
                </button>
              ))}
            </div>
          </section>

          <section className="bkV2-card bkV2-summary">
            <div className="bkV2-cardHeader">
              <div>
                <p>Booking health</p>
                <h2>Booking Summary</h2>
              </div>
              <span>This Month</span>
            </div>

            <div className="bkV2-healthBars">
              <div>
                <span><i className="blue" /> Confirmed</span>
                <strong>42 · 70%</strong>
                <b><em style={{ width: "70%" }} /></b>
              </div>
              <div>
                <span><i className="gold" /> Pending</span>
                <strong>12 · 20%</strong>
                <b><em style={{ width: "20%" }} /></b>
              </div>
              <div>
                <span><i className="muted" /> Cancelled</span>
                <strong>6 · 10%</strong>
                <b><em style={{ width: "10%" }} /></b>
              </div>
            </div>

            <div className="bkV2-summaryStats">
              <span><strong>92%</strong><small>attendance rate</small></span>
              <span><strong>£4.2k</strong><small>booked value</small></span>
            </div>
          </section>
        </aside>

        <section className="bkV2-card bkV2-details">
          <div className="bkV2-cardHeader">
            <div>
              <p>Selected booking</p>
              <h2>Booking Details</h2>
            </div>
            <span>{selected.id}</span>
          </div>

          <div className="bkV2-customer">
            <span>{selected.customer.split(" ").map((part) => part[0]).join("")}</span>

            <div>
              <strong>{selected.customer}</strong>
              <small>{selected.phone}</small>
              <small>{selected.email}</small>
            </div>

            <Link href={customerRecordHref(selected)}>View CRM →</Link>
          </div>

          <div className="bkV2-detailGrid">
            <p><span>Service type</span><strong>{selected.service}</strong></p>
            <p><span>Engineer assigned</span><strong>{selected.engineer}</strong></p>
            <p><span>Time slot</span><strong>{selected.time}</strong></p>
            <p><span>Address</span><strong>{selected.address}</strong></p>
            <p><span>Payment</span><strong>{selected.value} · {selected.status}</strong></p>
          </div>

          <p className="bkV2-note">{selected.notes}</p>
          <p className="bkV2-notice">{notice}</p>

          <div className="bkV2-detailActions">
            <button type="button" onClick={confirmSelectedBooking}>Confirm Booking</button>
            <Link href={`/messages?search=${encodeURIComponent(selected.customer)}`}>Message Customer</Link>
          </div>
        </section>

        <section className="bkV2-card bkV2-aura">
          <Link href="/messages" className="bkV2-auraBot">
            <img src="/brand/source/aura-assistant-transparent.png" alt="Aura Assistant" />
          </Link>

          <div>
            <p>Bee-Aura booking assistant</p>
            <h2>Keep every appointment moving.</h2>
            <span>Aura watches booking risk, pending confirmations and customer messages so the owner can keep the calendar under control.</span>
          </div>

          <Link href="/messages" className="bkV2-auraButton">Review booking messages →</Link>
        </section>
      </section>
    </main>
  );
}
