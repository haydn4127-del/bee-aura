import Panel from "../components/Panel";

const bookings = [
  {
    name: "Emma Wilson",
    service: "Strategy Review",
    date: "Today",
    time: "10:00",
    status: "Confirmed",
    confirmation: "Sent",
    action: "Prepare agenda",
  },
  {
    name: "Olivia Martin",
    service: "Consultation",
    date: "Today",
    time: "13:30",
    status: "Pending",
    confirmation: "Awaiting",
    action: "Send reminder",
  },
  {
    name: "Peter Hughes",
    service: "Follow-up call",
    date: "Tomorrow",
    time: "09:00",
    status: "Confirmed",
    confirmation: "Sent",
    action: "Review notes",
  },
  {
    name: "Sophie Carter",
    service: "Onboarding",
    date: "Tomorrow",
    time: "14:30",
    status: "Pending",
    confirmation: "Awaiting",
    action: "Confirm details",
  },
];

export default function BookingsPage() {
  return (
    <div className="page page-section">
      <section className="page-header-block">
        <div>
          <p className="eyebrow">Bookings</p>
          <h1>Control appointments and confirmation status with ease.</h1>
          <p className="page-copy">A practical booking view for today’s schedule and upcoming requests.</p>
        </div>
      </section>

      <section className="panel full-width">
        <div className="panel-header">
          <div>
            <h2>Upcoming bookings</h2>
            <p>Today's appointments and next actions.</p>
          </div>
        </div>
        <div className="booking-list">
          <div className="message-row message-head">
            <div>Customer</div>
            <div>Service</div>
            <div>Date</div>
            <div>Time</div>
            <div>Status</div>
            <div>Confirmation</div>
            <div>Action</div>
          </div>
          {bookings.map((booking) => (
            <div key={`${booking.name}-${booking.time}`} className="message-row">
              <div>
                <p className="message-name">{booking.name}</p>
              </div>
              <div>{booking.service}</div>
              <div>{booking.date}</div>
              <div>{booking.time}</div>
              <div>{booking.status}</div>
              <div>{booking.confirmation}</div>
              <div>{booking.action}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
