"use client";


import styles from "./bookings-layout-lock.module.css";
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
    address: "Salford, Greater Manchester",
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
    address: "Didsbury, Manchester",
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
    address: "Stockport, Greater Manchester",
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
    address: "Stockport, Greater Manchester",
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
    address: "Chorlton, Manchester",
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
    address: "Prestwich, Greater Manchester",
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
    address: "Altrincham, Greater Manchester",
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
    address: "Salford, Greater Manchester",
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
    address: "Stockport, Greater Manchester",
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
    address: "Salford, Greater Manchester",
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


const bookingPagePerformanceData = [
  { day: "Mon", bookedHeight: 48, valueHeight: 42, x: 78 },
  { day: "Tue", bookedHeight: 38, valueHeight: 22, x: 168 },
  { day: "Wed", bookedHeight: 86, valueHeight: 64, x: 258 },
  { day: "Thu", bookedHeight: 62, valueHeight: 48, x: 348 },
  { day: "Fri", bookedHeight: 92, valueHeight: 76, x: 438 },
  { day: "Sat", bookedHeight: 112, valueHeight: 105, x: 528 },
  { day: "Sun", bookedHeight: 78, valueHeight: 92, x: 618 },
];

const bookingPageBookedLine = "78,132 168,142 258,88 348,118 438,76 528,54 618,96";
const bookingPageValueLine = "78,146 168,152 258,112 348,124 438,88 528,66 618,80";

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
      address: form.address.trim() || "Manchester, UK",
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
    <main className={`${styles.bookingsLock} bkV2-page`}>
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

      <section id="calendar" className="bkV2-calendar" aria-label="Booking calendar">
        <div className="bkV2-calendarIntro">
          <p>Booking calendar</p>
          <h2>Owner-safe schedule for the week.</h2>
          <span>Jobs, reminders and booking risks are grouped into a simple calendar strip before the detail view.</span>
        </div>

        <div className="bkV2-calendarDays">
          <Link href="/bookings?search=Tom%20Wilson" className="bkV2-calendarDay isActive">
            <span>Mon</span>
            <strong>19</strong>
            <small>6 jobs</small>
            <em>Next: 09:00</em>
          </Link>

          <Link href="/bookings?search=Daniel%20Khan" className="bkV2-calendarDay">
            <span>Tue</span>
            <strong>20</strong>
            <small>3 jobs</small>
            <em>2 pending</em>
          </Link>

          <Link href="/follow-ups?search=Charlotte%20Lee" className="bkV2-calendarDay warning">
            <span>Wed</span>
            <strong>21</strong>
            <small>4 reminders</small>
            <em>Needs follow-up</em>
          </Link>

          <Link href="/reviews?search=Olivia%20Smith" className="bkV2-calendarDay">
            <span>Thu</span>
            <strong>22</strong>
            <small>2 reviews</small>
            <em>Proof pack</em>
          </Link>

          <Link href="/bookings" className="bkV2-calendarDay">
            <span>Fri</span>
            <strong>23</strong>
            <small>5 jobs</small>
            <em>Open diary</em>
          </Link>
        </div>
      </section>


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
            <label>Address<input value={form.address} onChange={(event) => updateForm("address", event.target.value)} placeholder="Manchester, UK" /></label>
            <label>Value<input value={form.value} onChange={(event) => updateForm("value", event.target.value)} placeholder="£250" /></label>

            <div className="bkV2-createActions">
              <button type="button" onClick={() => setShowCreatePanel(false)}>Cancel</button>
              <button type="submit">Create Booking</button>
            </div>
          </form>
        </section>
      ) : null}

      <section className="bkV2-stats">
        <article>
          <span>BK</span>
          <div className="bkV2-statBody">
            <p>Today’s Bookings</p>
            <strong>5</strong>
            <small>↑ 25% vs yesterday</small>
          </div>
        </article>

        <article>
          <span>CF</span>
          <div className="bkV2-statBody">
            <p>Confirmed</p>
            <strong>18</strong>
            <small>↑ 12% vs yesterday</small>
          </div>
        </article>

        <article>
          <span>PD</span>
          <div className="bkV2-statBody">
            <p>Pending</p>
            <strong>7</strong>
            <small>↓ 8% vs yesterday</small>
          </div>
        </article>

        <article>
          <span>£</span>
          <div className="bkV2-statBody">
            <p>Revenue Booked</p>
            <strong>£4,280</strong>
            <small>↑ 16% vs yesterday</small>
          </div>
        </article>
      </section>

      <section className="bkV2-grid">
        <div className="bkV2-mainColumn">
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
        </div>

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

          <section className="bkV2-bookingPerformancePanel">
            <div className="bkV2-performanceHeader baBkgGraphTop">
              <div className="baBkgGraphCopy">
                <p className="bkV2-sectionEyebrow baBkgGraphKicker">Booking Performance</p>
                <p className="baBkgGraphTitle">Booking Performance</p>
              </div>
              <span className="baBkgGraphRange">Last 7 Days</span>
            </div>

            <div className="bkV2-performanceLegend">
              <span><i className="booked" /> Booked jobs</span>
              <span><i className="value" /> Estimated value</span>
            </div>

            <div className="bkV2-performanceChart" aria-label="Booking performance chart for the last 7 days">
              <svg viewBox="0 0 700 240" role="img">
                <defs>
                  <linearGradient id="bookingBarGold" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ffd24a" stopOpacity="0.82" />
                    <stop offset="100%" stopColor="#ffd24a" stopOpacity="0.16" />
                  </linearGradient>
                  <linearGradient id="bookingBarBlue" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2dc4ff" stopOpacity="0.82" />
                    <stop offset="100%" stopColor="#2dc4ff" stopOpacity="0.16" />
                  </linearGradient>
                </defs>

                <g className="bkV2-chartGrid">
                  <line x1="54" y1="44" x2="660" y2="44" />
                  <line x1="54" y1="80" x2="660" y2="80" />
                  <line x1="54" y1="116" x2="660" y2="116" />
                  <line x1="54" y1="152" x2="660" y2="152" />
                  <line x1="54" y1="188" x2="660" y2="188" />
                </g>

                <g className="bkV2-axisLabels">
                  <text x="8" y="48">£5k</text>
                  <text x="8" y="120">£3k</text>
                  <text x="8" y="190">£1k</text>
                </g>

                {bookingPagePerformanceData.map((item) => (
                  <g key={item.day}>
                    <rect
                      className="goldBar"
                      x={item.x - 18}
                      y={188 - item.bookedHeight}
                      width="16"
                      height={item.bookedHeight}
                      rx="7"
                    />
                    <rect
                      className="blueBar"
                      x={item.x + 8}
                      y={188 - item.valueHeight}
                      width="16"
                      height={item.valueHeight}
                      rx="7"
                    />
                    <text className="dayLabel" x={item.x - 10} y="222">{item.day}</text>
                  </g>
                ))}

                <polyline className="bookedLine" points={bookingPageBookedLine} />
                <polyline className="valueLine" points={bookingPageValueLine} />

                {bookingPagePerformanceData.map((item) => (
                  <g key={`${item.day}-points`}>
                    <circle className="bookedPoint" cx={item.x} cy={bookingPageBookedLine.split(" ")[bookingPagePerformanceData.indexOf(item)].split(",")[1]} r="4" />
                    <circle className="valuePoint" cx={item.x} cy={bookingPageValueLine.split(" ")[bookingPagePerformanceData.indexOf(item)].split(",")[1]} r="4" />
                  </g>
                ))}
              </svg>
            </div>

            <div className="bkV2-performanceStats">
              <div>
                <strong>82</strong>
                <span>jobs booked</span>
              </div>
              <div>
                <strong>£18.4k</strong>
                <span>estimated value</span>
              </div>
              <div>
                <strong>14</strong>
                <span>today</span>
              </div>
            </div>
          </section>
        </aside>
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
    </main>
  );
}
