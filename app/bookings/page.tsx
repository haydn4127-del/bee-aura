"use client";

import Link from "next/link";
import { useState } from "react";

type BookingStatus = "Completed" | "In Progress" | "Pending" | "Confirmed";
type Booking = {
  id: string;
  dateBox: string;
  time: string;
  service: string;
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

const bookings: Booking[] = [
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
];

const statCards = [
  { icon: "🗓", label: "Today's Bookings", value: "5", change: "↑ 25% vs yesterday", tone: "blue" },
  { icon: "✓", label: "Confirmed", value: "18", change: "↑ 12% vs yesterday", tone: "green" },
  { icon: "⏱", label: "Pending", value: "7", change: "↓ 8% vs yesterday", tone: "gold" },
  { icon: "£", label: "Revenue Booked", value: "£4,280", change: "↑ 16% vs yesterday", tone: "purple" },
];

const quickActions = [
  { title: "New Booking", detail: "Create a new booking", icon: "🗓", href: "/messages", tone: "blue" },
  { title: "Manage Calendar", detail: "View availability", icon: "🟪", href: "/bookings", tone: "purple" },
  { title: "Services", detail: "Manage services", icon: "🛠", href: "/settings", tone: "cyan" },
  { title: "Customers", detail: "View customers", icon: "👥", href: "/customers", tone: "blue" },
];

function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export default function BookingsPage() {
  const [selectedId, setSelectedId] = useState(bookings[1].id);
  const selected = bookings.find((booking) => booking.id === selectedId) ?? bookings[0];

  return (
    <main className="bookingRef-page">
      <header className="bookingRef-topbar">
        <div>
          <h1>Bookings</h1>
          <p>Manage appointments, schedules and customer visits in one place.</p>
        </div>

        <div className="bookingRef-actions">
          <Link href="/messages" className="bookingRef-addButton">＋ Add Booking</Link>
          <Link href="/bookings" className="bookingRef-darkButton">🛠 All Services⌄</Link>
          <Link href="/leads" className="bookingRef-search">Search bookings...</Link>
          <Link href="/settings" className="bookingRef-owner">
            <span>JD</span>
            <strong>John D.</strong>
            <small>Owner</small>
          </Link>
        </div>
      </header>

      <section className="bookingRef-stats">
        {statCards.map((card) => (
          <article key={card.label} className={`bookingRef-stat bookingRef-stat-${card.tone}`}>
            <span className="bookingRef-statIcon">{card.icon}</span>
            <div>
              <p>{card.label}</p>
              <strong>{card.value}</strong>
              <small>{card.change}</small>
            </div>
          </article>
        ))}
      </section>

      <section className="bookingRef-grid">
        <section className="bookingRef-panel bookingRef-upcoming">
          <div className="bookingRef-panelHeader">
            <h2>Upcoming Bookings</h2>
          </div>

          <div className="bookingRef-table">
            <div className="bookingRef-tableHead">
              <span>Date & Time</span>
              <span>Booking</span>
              <span>Customer</span>
              <span>Status</span>
              <span></span>
            </div>

            {bookings.map((booking) => (
              <button
                type="button"
                key={booking.id}
                onClick={() => setSelectedId(booking.id)}
                className={`bookingRef-tableRow ${selected.id === booking.id ? "isSelected" : ""}`}
              >
                <span className="bookingRef-dateCell">
                  <strong>{booking.dateBox.split(" ")[0]}</strong>
                  <em>{booking.dateBox.split(" ")[1]}</em>
                  <small>{booking.dateBox.split(" ")[2]}</small>
                </span>

                <span className="bookingRef-bookingCell">
                  <strong>{booking.service}</strong>
                  <small>● {booking.serviceType}</small>
                </span>

                <span className="bookingRef-customerCell">
                  <strong>{booking.customer}</strong>
                  <small>{booking.email}</small>
                </span>

                <span className={`bookingRef-status status-${slugify(booking.status)}`}>
                  {booking.status}
                </span>

                <span className="bookingRef-arrow">›</span>
              </button>
            ))}
          </div>

          <Link href="/bookings" className="bookingRef-viewAll">View all bookings →</Link>
        </section>

        <aside className="bookingRef-panel bookingRef-schedule">
          <div className="bookingRef-panelHeader split">
            <h2>Today&apos;s Schedule</h2>
            <span>Monday, 19 May</span>
          </div>

          <div className="bookingRef-timeline">
            {bookings.map((booking) => (
              <button
                key={`${booking.id}-timeline`}
                type="button"
                onClick={() => setSelectedId(booking.id)}
                className={`bookingRef-timeItem ${selected.id === booking.id ? "isSelected" : ""}`}
              >
                <span>{booking.time.split("–")[0].trim()}</span>
                <div>
                  <strong>{booking.service}</strong>
                  <small>{booking.customer}</small>
                </div>
                <em className={`bookingRef-status status-${slugify(booking.status)}`}>
                  {booking.status}
                </em>
              </button>
            ))}
          </div>

          <Link href="/bookings" className="bookingRef-scheduleLink">View today&apos;s schedule →</Link>
        </aside>

        <aside className="bookingRef-panel bookingRef-summary">
          <div className="bookingRef-panelHeader split">
            <h2>Booking Summary</h2>
            <span>This Month⌄</span>
          </div>

          <div className="bookingRef-summaryBody">
            <div className="bookingRef-donut" aria-label="Fake booking summary chart">
              <strong>60</strong>
              <span>Total</span>
            </div>

            <div className="bookingRef-legend">
              <p><span className="green" /> Confirmed <strong>42 (70%)</strong></p>
              <p><span className="gold" /> Pending <strong>12 (20%)</strong></p>
              <p><span className="red" /> Cancelled <strong>6 (10%)</strong></p>
            </div>
          </div>
        </aside>

        <section className="bookingRef-panel bookingRef-details">
          <div className="bookingRef-panelHeader split">
            <h2>Booking Details</h2>
            <span>{selected.id}</span>
          </div>

          <div className="bookingRef-detailCustomer">
            <span>
              {selected.customer
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </span>
            <div>
              <strong>{selected.customer}</strong>
              <small>{selected.phone}</small>
              <small>{selected.email}</small>
            </div>
            <Link href={`/customers/${selected.slug}`}>View CRM →</Link>
          </div>

          <div className="bookingRef-detailList">
            <p><span>Service type</span><strong>{selected.service}</strong></p>
            <p><span>Engineer assigned</span><strong>{selected.engineer}</strong></p>
            <p><span>Time slot</span><strong>{selected.time}</strong></p>
            <p><span>Address</span><strong>{selected.address}</strong></p>
            <p><span>Payment</span><strong>{selected.value} · {selected.status}</strong></p>
          </div>

          <p className="bookingRef-note">{selected.notes}</p>

          <div className="bookingRef-detailActions">
            <Link href="/bookings" className="bookingRef-addButton">Confirm Booking</Link>
            <Link href="/messages" className="bookingRef-darkButton">Message Customer</Link>
          </div>
        </section>

        <section className="bookingRef-panel bookingRef-quickActions">
          <div className="bookingRef-panelHeader">
            <h2>Quick Actions</h2>
          </div>

          <div className="bookingRef-actionGrid">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href} className={`bookingRef-action bookingRef-action-${action.tone}`}>
                <span>{action.icon}</span>
                <div>
                  <strong>{action.title}</strong>
                  <small>{action.detail}</small>
                </div>
                <em>→</em>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
