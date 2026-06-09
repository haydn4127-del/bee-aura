import Link from "next/link";

const featureCards = [
  {
    title: "Lead Capture",
    body: "Capture enquiries from calls, forms, messages and more before competitors get there.",
    icon: "☎",
    accent: "gold",
  },
  {
    title: "Smart Inbox",
    body: "Keep every message, enquiry and customer conversation organised in one place.",
    icon: "💬",
    accent: "blue",
  },
  {
    title: "Booking Support",
    body: "Manage appointments, confirmations and job updates with less admin.",
    icon: "📅",
    accent: "purple",
  },
  {
    title: "Follow-Up Queue",
    body: "Stay on top of warm leads and stop opportunities going cold.",
    icon: "✅",
    accent: "green",
  },
];

const previewStats = [
  ["Leads Captured", "482", "▲ 10%"],
  ["Response Time", "2m 48s", "▼ 21%"],
  ["Bookings Today", "14", "▲ 27%"],
  ["Pipeline Value", "£84,350", "▲ 17%"],
];

export default function Home() {
  return (
    <main className="landing-page">
      <nav className="landing-nav">
        <Link href="/" className="landing-brand">
          <img src="/brand/bee-aura-mark.svg" alt="" className="landing-brand-image-mark" />
          <span>
            Bee-Aura <strong>AI</strong>
          </span>
        </Link>

        <div className="landing-nav-links">
          <Link href="/dashboard">Dashboard</Link>
          <a href="#platform">Platform</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
        </div>

        <div className="landing-nav-actions">
          <Link href="/settings" className="landing-button landing-button-ghost">
            Login
          </Link>
          <Link href="/dashboard" className="landing-button landing-button-primary">
            Book a Demo
          </Link>
        </div>
      </nav>

      <section className="landing-hero" id="platform">
        <div className="landing-hero-copy">
          <p className="landing-eyebrow">Lead Recovery OS for UK service businesses</p>
          <h1>Turn More Enquiries Into Booked Jobs</h1>
          <h2>Lead Capture. Faster Replies. More Revenue.</h2>
          <p className="landing-hero-text">
            Bee-Aura AI helps UK service businesses capture leads, manage messages,
            support bookings, follow up faster and stay in control — all from one
            smart operating system.
          </p>

          <div className="landing-hero-actions">
            <Link href="/dashboard" className="landing-button landing-button-primary landing-button-large">
              ▶ View Demo
            </Link>
            <a href="#how-it-works" className="landing-button landing-button-outline landing-button-large">
              ▶ How It Works
            </a>
          </div>

          <div className="landing-trust-row">
            <span>♙ Owner Controlled</span>
            <span>◎ UK Focused</span>
            <span>◇ Audit Ready</span>
          </div>
        </div>

        <div className="landing-hero-visual">
          <img src="/brand/aura-assistant-visual.svg" alt="Bee-Aura assistant visual" className="landing-assistant-image landing-assistant-image-small" />

          <div className="landing-dashboard-preview">
            <aside className="preview-sidebar">
              <div className="preview-brand"><img src="/brand/bee-aura-mark.svg" alt="" className="preview-brand-image" /> Bee-Aura AI</div>
              <span className="active">Overview</span>
              <span>Leads</span>
              <span>Conversations</span>
              <span>Bookings</span>
              <span>Follow-Ups</span>
              <span>Reports</span>
              <span>Settings</span>
            </aside>

            <section className="preview-content">
              <div className="preview-topbar">
                <div>
                  <p>Overview</p>
                  <strong>Northfield Home Services</strong>
                </div>
                <span>10 May – 16 May 2025 ▾</span>
              </div>

              <div className="preview-stat-grid">
                {previewStats.map(([label, value, change]) => (
                  <div className="preview-stat" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                    <small>{change} vs last 7 days</small>
                  </div>
                ))}
              </div>

              <div className="preview-chart-grid">
                <div className="preview-chart-card">
                  <div className="chart-card-header">
                    <span>Leads Captured</span>
                    <strong>482</strong>
                  </div>
                  <svg viewBox="0 0 280 130" role="img" aria-label="Fake leads chart">
                    <polyline points="5,104 42,72 78,88 116,56 150,62 190,38 228,45 275,18" />
                  </svg>
                </div>

                <div className="preview-chart-card">
                  <div className="chart-card-header">
                    <span>Pipeline Value</span>
                    <strong>£84,350</strong>
                  </div>
                  <svg viewBox="0 0 280 130" role="img" aria-label="Fake pipeline chart">
                    <polyline points="5,108 44,92 80,68 116,75 150,54 190,45 228,22 275,34" />
                  </svg>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="landing-features" id="features">
        {featureCards.map((feature) => (
          <article className={`landing-feature landing-feature-${feature.accent}`} key={feature.title}>
            <div className="landing-feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <span className="feature-line" />
          </article>
        ))}
      </section>

      <section className="landing-how" id="how-it-works">
        <p className="landing-eyebrow">How it works</p>
        <h2>Simple. Fast. Effective.</h2>

        <div className="landing-steps">
          <div className="landing-step">
            <span>1</span>
            <strong>Capture</strong>
            <p>New leads come in from calls, forms and messages.</p>
          </div>

          <div className="landing-step">
            <span>2</span>
            <strong>Organise</strong>
            <p>Bee-Aura keeps conversations, bookings and follow-ups tidy.</p>
          </div>

          <div className="landing-step">
            <span>3</span>
            <strong>Convert & Grow</strong>
            <p>Respond faster, recover more leads and win more jobs.</p>
          </div>
        </div>
      </section>

      <section className="landing-system-panel" id="about">
        <div>
          <h2>The AI Operating System for Service Businesses</h2>
          <h3>Capture More Leads. Respond Faster. Stay in Control.</h3>
          <p>
            Bee-Aura AI brings lead capture, messaging, bookings, follow-ups and
            business visibility into one modern platform.
          </p>

          <div className="landing-hero-actions">
            <Link href="/dashboard" className="landing-button landing-button-primary">
              📅 Book a Demo
            </Link>
            <Link href="/leads" className="landing-button landing-button-outline">
              ▣ See Platform
            </Link>
          </div>
        </div>

        <img src="/brand/aura-assistant-visual.svg" alt="Bee-Aura assistant visual" className="landing-assistant-image landing-assistant-image-large" />
      </section>

      <section className="landing-bottom-strip">
        <Link href="/leads">Leads</Link>
        <Link href="/messages">Messages</Link>
        <Link href="/bookings">Bookings</Link>
        <Link href="/follow-ups">Follow-Ups</Link>
        <Link href="/reviews">Reviews</Link>
        <Link href="/dashboard">Reporting</Link>
      </section>
    </main>
  );
}
