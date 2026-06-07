import Link from "next/link";
import KpiCard from "./components/KpiCard";
import Panel from "./components/Panel";

export default function Home() {
  return (
    <div className="page page-home">
      <section className="home-hero">
        <div>
          <p className="eyebrow">Bee-Aura AI</p>
          <h1>AI automation system for service businesses</h1>
          <p className="hero-copy">
            Recover missed leads, manage conversations, book appointments, and follow up automatically from one smart dashboard.
          </p>
          <div className="hero-actions">
            <Link href="/dashboard" className="button button-primary">
              View Dashboard
            </Link>
            <Link href="/leads" className="button button-secondary">
              View Leads
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-metrics">
            <div>
              <span>New Leads</span>
              <strong>127</strong>
            </div>
            <div>
              <span>AI Calls Handled</span>
              <strong>89</strong>
            </div>
            <div>
              <span>Appointments Booked</span>
              <strong>24</strong>
            </div>
            <div>
              <span>Revenue Generated</span>
              <strong>£3,420</strong>
            </div>
            <div>
              <span>Active Clients</span>
              <strong>56</strong>
            </div>
          </div>
          <div className="hero-chart">
            <svg viewBox="0 0 600 240" aria-hidden="true">
              <defs>
                <linearGradient id="hero-line" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f9da5d" />
                  <stop offset="100%" stopColor="#4fc5ff" />
                </linearGradient>
              </defs>
              <path d="M 40 180 C 120 150 180 140 260 120 C 340 100 400 110 480 80 C 560 50 580 45 600 40" fill="none" stroke="url(#hero-line)" strokeWidth="6" strokeLinecap="round" />
              {[60, 140, 220, 300, 380, 460, 540].map((x, index) => (
                <circle key={x} cx={x} cy={180 - index * 16} r="6" fill="#f9da5d" />
              ))}
            </svg>
          </div>
        </div>
      </section>

      <section className="home-features">
        {[
          { title: "Lead Recovery", label: "Never miss a new inquiry." },
          { title: "AI Receptionist", label: "Capture and qualify leads instantly." },
          { title: "Follow-Up Engine", label: "Automate reminders and nurture sequences." },
          { title: "Appointment Control", label: "Keep your calendar full and organised." },
        ].map((feature) => (
          <div key={feature.title} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.label}</p>
          </div>
        ))}
      </section>

      <section className="home-summary-grid">
        <Panel title="Today’s Hive Summary" subtitle="A quick view of your AI operations">
          <div className="summary-grid">
            <div>
              <p>Automations live</p>
              <strong>12</strong>
            </div>
            <div>
              <p>Leads captured</p>
              <strong>127</strong>
            </div>
            <div>
              <p>Follow-ups queued</p>
              <strong>45</strong>
            </div>
          </div>
        </Panel>
      </section>
    </div>
  );
}
