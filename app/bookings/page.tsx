import Panel from "../components/Panel";

export default function BookingsPage() {
  return (
    <div className="page page-section">
      <section className="page-header-block">
        <div>
          <p className="eyebrow">Appointment control</p>
          <h1>See upcoming bookings and keep your calendar full.</h1>
        </div>
      </section>

      <section className="dashboard-grid bookings-grid">
        <Panel title="Upcoming bookings" subtitle="Today and tomorrow">
          <div className="booking-list">
            {[
              { time: "09:00", client: "Emma Hill", type: "Strategy Review" },
              { time: "11:30", client: "Leo Park", type: "Consultation" },
              { time: "14:00", client: "Nina James", type: "Onboarding" },
            ].map((booking) => (
              <div key={booking.time} className="booking-row">
                <div>
                  <p className="booking-time">{booking.time}</p>
                  <p className="booking-client">{booking.client}</p>
                </div>
                <span>{booking.type}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Booking momentum" subtitle="Conversion and fulfilment trends">
          <div className="booking-summary">
            <div>
              <p>Confirmed this week</p>
              <strong>24</strong>
            </div>
            <div>
              <p>Average fill rate</p>
              <strong>83%</strong>
            </div>
          </div>
        </Panel>
      </section>
    </div>
  );
}
