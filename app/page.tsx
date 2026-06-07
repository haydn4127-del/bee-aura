import Link from "next/link";
import Panel from "./components/Panel";

const quickLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/leads", label: "Leads" },
  { href: "/messages", label: "Messages" },
  { href: "/bookings", label: "Bookings" },
];

export default function Home() {
  return (
    <div className="page page-home">
      <section className="home-hero">
        <div className="hero-copy-block">
          <p className="eyebrow">Bee-Aura AI</p>
          <h1>Lead Recovery OS for service businesses</h1>
          <p className="hero-copy">
            Recover missed leads, manage conversations, book appointments, and follow up automatically from one smart dashboard.
          </p>
          <p className="hero-notice">Fake data only. No real integrations.</p>
          <div className="hero-actions">
            {quickLinks.map((item) => (
              <Link key={item.href} href={item.href} className="button button-secondary">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="hero-summary-cards">
            <div>
              <p>New leads today</p>
              <strong>127</strong>
            </div>
            <div>
              <p>Missed calls recovered</p>
              <strong>39</strong>
            </div>
            <div>
              <p>Bookings created</p>
              <strong>24</strong>
            </div>
            <div>
              <p>Reviews ready</p>
              <strong>11</strong>
            </div>
          </div>
        </div>

        <Panel className="hero-preview">
          <div className="preview-header">
            <div>
              <p className="eyebrow">Owner command centre</p>
              <strong className="preview-title">Today’s lead recovery snapshot</strong>
            </div>
            <span className="pill pill-tag">Demo</span>
          </div>
          <div className="preview-chart">
            <svg viewBox="0 0 620 300" aria-hidden="true">
              <defs>
                <linearGradient id="home-gold" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f5bc16" />
                  <stop offset="100%" stopColor="#ffd147" />
                </linearGradient>
                <linearGradient id="home-blue" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0a84ff" />
                  <stop offset="100%" stopColor="#29a8ff" />
                </linearGradient>
              </defs>
              <g stroke="rgba(255,255,255,0.12)" strokeWidth="1">
                <path d="M24 48 H596" />
                <path d="M24 96 H596" />
                <path d="M24 144 H596" />
                <path d="M24 192 H596" />
                <path d="M24 240 H596" />
              </g>
              <path
                d="M 30 220 C 110 192 180 176 260 154 C 325 138 370 142 430 120 C 480 104 530 98 586 72"
                fill="none"
                stroke="url(#home-gold)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M 30 240 C 110 212 180 196 260 180 C 325 166 370 170 430 150 C 480 136 530 130 586 108"
                fill="none"
                stroke="url(#home-blue)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="12 10"
              />
            </svg>
          </div>
          <div className="preview-summary">
            <div>
              <span>Lead recovery</span>
              <strong>91%</strong>
            </div>
            <div>
              <span>Response speed</span>
              <strong>5 min</strong>
            </div>
          </div>
        </Panel>
      </section>

      <section className="home-features">
        {[
          { title: "Automated intake", label: "Capture every missed inbound lead with AI triage." },
          { title: "Smart follow-up", label: "Keep hot prospects moving with timely nudges." },
          { title: "Booking assistant", label: "Keep the schedule full without manual tracking." },
          { title: "Owner dashboard", label: "See what needs attention first with one glance." },
        ].map((feature) => (
          <div key={feature.title} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
