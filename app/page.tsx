import Link from "next/link";

const featureCards = [
  {
    title: "Lead Capture",
    body: "Catch enquiries from calls, forms, website visits and messages before they slip away.",
    icon: "CAP",
    detail: "Instant visibility",
    accent: "gold",
  },
  {
    title: "Smart Inbox",
    body: "Give your team one clean place to manage replies, notes and customer next actions.",
    icon: "MSG",
    detail: "One controlled inbox",
    accent: "blue",
  },
  {
    title: "Booking Support",
    body: "Confirm jobs, organise appointments and keep the diary moving with less admin.",
    icon: "BKG",
    detail: "Cleaner job flow",
    accent: "purple",
  },
  {
    title: "Follow-Up Queue",
    body: "Surface warm opportunities so staff know exactly who to chase, when and why.",
    icon: "FUP",
    detail: "No lead left cold",
    accent: "green",
  },
];

const previewStats = [
  ["New Enquiries", "482", "+10% this week"],
  ["Avg. Response", "2m 48s", "21% faster"],
  ["Bookings Today", "14", "+27% vs yesterday"],
  ["Open Pipeline", "£84,350", "+17% this week"],
];

export default function Home() {
  return (
    <main className="landing-page landing-page-polish-v4">
      <nav className="landing-nav">
        <Link href="/" className="landing-brand">
          <img
            src="/brand/source/bee-aura-symbol.svg"
            alt="Bee-Aura logo"
            className="landing-brand-emblem"
          />
          <div className="landing-brand-text">
            <span className="landing-brand-title">BEE-AURA AI SYSTEMS</span>
            <span className="landing-brand-subline">Lead Recovery OS</span>
          </div>
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
          <p className="landing-eyebrow">AI lead control for UK service businesses</p>
          <h1>Turn More Enquiries Into Booked Jobs</h1>
          <h2 className="landing-hero-subheading">
            Stop missed leads. Speed up replies. Keep every opportunity moving.
          </h2>
          <div className="landing-hero-ai-brief">
            <img
              src="/brand/source/aura-assistant-transparent.png"
              alt="Aura assistant"
              className="landing-hero-ai-bot"
            />
            <div className="landing-hero-ai-copy">
              <span>Aura is watching the gaps</span>
              <p>
                BEE-AURA AI SYSTEMS gives service teams a clear operating layer for
                enquiries, replies, bookings and follow-ups — so owners can see what
                needs action before revenue disappears.
              </p>
            </div>
          </div>

          <div className="landing-hero-actions">
            <Link
              href="/dashboard"
              className="landing-button landing-button-primary landing-button-large"
            >
              View Demo
            </Link>
            <a
              href="#how-it-works"
              className="landing-button landing-button-outline landing-button-large"
            >
              How It Works
            </a>
          </div>

          <div className="landing-trust-row">
            <span>Owner-controlled workflows</span>
            <span>Built for UK service teams</span>
            <span>Clearer follow-up control</span>
          </div>
        </div>

        <div className="landing-hero-visual">
          <div className="landing-dashboard-preview">
            <aside className="preview-sidebar">
              <div className="preview-brand preview-brand-premium">
                <img
                  src="/brand/source/bee-aura-symbol.svg"
                  alt=""
                  className="preview-brand-image"
                />
                <div className="preview-brand-copy">
                  <strong>BEE-AURA</strong>
                  <small>AI SYSTEMS</small>
                </div>
              </div>
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
                  <p>Command view</p>
                  <strong>Northfield Home Services</strong>
                </div>

                <div className="preview-date-block">
                  <small>Demo Week</small>
                  <span>03 Jun – 09 Jun 2026</span>
                </div>
              </div>

              <div className="preview-stat-grid">
                {previewStats.map(([label, value, change]) => (
                  <div className="preview-stat" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                    <small>{change}</small>
                  </div>
                ))}
              </div>

              <div className="preview-chart-grid">
                <div className="preview-chart-card preview-chart-card-pro">
                  <div className="chart-card-header chart-card-header-pro">
                    <div>
                      <span>Enquiry trend</span>
                      <small>Last 7 days</small>
                    </div>
                    <strong>482</strong>
                  </div>

                  <div className="chart-legend">
                    <span><i className="legend-dot legend-blue" /> Leads</span>
                    <span><i className="legend-dot legend-green" /> Follow-up recovered</span>
                  </div>

                  <svg viewBox="0 0 320 180" role="img" aria-label="Demo enquiry trend chart">
                    <defs>
                      <linearGradient id="leadAreaFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(45, 196, 255, 0.26)" />
                        <stop offset="100%" stopColor="rgba(45, 196, 255, 0.02)" />
                      </linearGradient>
                    </defs>

                    <line x1="38" y1="28" x2="38" y2="138" stroke="rgba(148,163,184,0.18)" />
                    <line x1="38" y1="138" x2="302" y2="138" stroke="rgba(148,163,184,0.18)" />

                    <line x1="38" y1="38" x2="302" y2="38" stroke="rgba(148,163,184,0.08)" />
                    <line x1="38" y1="63" x2="302" y2="63" stroke="rgba(148,163,184,0.08)" />
                    <line x1="38" y1="88" x2="302" y2="88" stroke="rgba(148,163,184,0.08)" />
                    <line x1="38" y1="113" x2="302" y2="113" stroke="rgba(148,163,184,0.08)" />

                    <text x="10" y="42" className="chart-axis-label">90</text>
                    <text x="10" y="67" className="chart-axis-label">70</text>
                    <text x="10" y="92" className="chart-axis-label">50</text>
                    <text x="10" y="117" className="chart-axis-label">30</text>

                    <path
                      d="M50 118 L84 101 L118 104 L152 81 L186 84 L220 68 L254 70 L288 52 L288 138 L50 138 Z"
                      fill="url(#leadAreaFill)"
                    />
                    <polyline
                      points="50,118 84,101 118,104 152,81 186,84 220,68 254,70 288,52"
                      fill="none"
                      stroke="#2dc4ff"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="50,125 84,116 118,108 152,101 186,94 220,86 254,83 288,72"
                      fill="none"
                      stroke="#41e0b0"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <circle cx="288" cy="52" r="4.2" fill="#2dc4ff" />
                    <circle cx="288" cy="72" r="3.8" fill="#41e0b0" />

                    <text x="46" y="156" className="chart-x-label">Mon</text>
                    <text x="81" y="156" className="chart-x-label">Tue</text>
                    <text x="115" y="156" className="chart-x-label">Wed</text>
                    <text x="149" y="156" className="chart-x-label">Thu</text>
                    <text x="184" y="156" className="chart-x-label">Fri</text>
                    <text x="219" y="156" className="chart-x-label">Sat</text>
                    <text x="253" y="156" className="chart-x-label">Sun</text>
                  </svg>

                  <div className="preview-chart-foot">
                    <span>Captured demand rising</span>
                    <b>+18% vs prior week</b>
                  </div>
                </div>

                <div className="preview-chart-card preview-chart-card-pro">
                  <div className="chart-card-header chart-card-header-pro">
                    <div>
                      <span>Bookings & revenue</span>
                      <small>Week to date</small>
                    </div>
                    <strong>14</strong>
                  </div>

                  <div className="chart-legend">
                    <span><i className="legend-dot legend-gold" /> Bookings</span>
                    <span><i className="legend-dot legend-blue" /> Revenue trend</span>
                  </div>

                  <svg viewBox="0 0 320 180" role="img" aria-label="Demo bookings and revenue chart">
                    <line x1="38" y1="28" x2="38" y2="138" stroke="rgba(148,163,184,0.18)" />
                    <line x1="38" y1="138" x2="302" y2="138" stroke="rgba(148,163,184,0.18)" />

                    <line x1="38" y1="38" x2="302" y2="38" stroke="rgba(148,163,184,0.08)" />
                    <line x1="38" y1="63" x2="302" y2="63" stroke="rgba(148,163,184,0.08)" />
                    <line x1="38" y1="88" x2="302" y2="88" stroke="rgba(148,163,184,0.08)" />
                    <line x1="38" y1="113" x2="302" y2="113" stroke="rgba(148,163,184,0.08)" />

                    <text x="12" y="42" className="chart-axis-label">8</text>
                    <text x="12" y="67" className="chart-axis-label">6</text>
                    <text x="12" y="92" className="chart-axis-label">4</text>
                    <text x="12" y="117" className="chart-axis-label">2</text>

                    <rect x="50" y="86" width="18" height="52" rx="5" fill="#b98a1f" />
                    <rect x="84" y="72" width="18" height="66" rx="5" fill="#ffd24a" />
                    <rect x="118" y="93" width="18" height="45" rx="5" fill="#b98a1f" />
                    <rect x="152" y="58" width="18" height="80" rx="5" fill="#ffd24a" />
                    <rect x="186" y="79" width="18" height="59" rx="5" fill="#b98a1f" />
                    <rect x="220" y="51" width="18" height="87" rx="5" fill="#ffd24a" />
                    <rect x="254" y="66" width="18" height="72" rx="5" fill="#b98a1f" />

                    <polyline
                      points="59,97 93,101 127,90 161,78 195,82 229,64 263,58"
                      fill="none"
                      stroke="#2dc4ff"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="263" cy="58" r="4" fill="#2dc4ff" />

                    <text x="47" y="156" className="chart-x-label">Mon</text>
                    <text x="81" y="156" className="chart-x-label">Tue</text>
                    <text x="115" y="156" className="chart-x-label">Wed</text>
                    <text x="149" y="156" className="chart-x-label">Thu</text>
                    <text x="183" y="156" className="chart-x-label">Fri</text>
                    <text x="217" y="156" className="chart-x-label">Sat</text>
                    <text x="251" y="156" className="chart-x-label">Sun</text>
                  </svg>

                  <div className="preview-chart-foot">
                    <span>Booked jobs strengthening</span>
                    <b>Revenue trend improving</b>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="landing-features" id="features">
        {featureCards.map((feature) => (
          <article
            className={`landing-feature landing-feature-${feature.accent}`}
            key={feature.title}
          >
            <div className="landing-feature-icon landing-feature-icon-strong">
              <span>{feature.icon}</span>
              <small>{feature.detail}</small>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <span className="feature-line" />
          </article>
        ))}
      </section>

      <section className="landing-how" id="how-it-works">
        <p className="landing-eyebrow">How it works</p>
        <h2>Simple, controlled lead recovery.</h2>

        <div className="landing-steps landing-steps-detailed">
          <div className="landing-step">
            <span className="landing-step-icon">01</span>
            <strong>Capture every enquiry</strong>
            <p>
              Bring calls, forms and messages into one clear place so new leads
              are easier to see, track and act on quickly.
            </p>
          </div>

          <div className="landing-step">
            <span className="landing-step-icon">02</span>
            <strong>Control the next action</strong>
            <p>
              Organise replies, booking requests and follow-ups so staff know
              what matters now and what can wait.
            </p>
          </div>

          <div className="landing-step">
            <span className="landing-step-icon">03</span>
            <strong>Convert with confidence</strong>
            <p>
              Keep owners in control with a calm dashboard that shows missed
              opportunities, booked jobs and follow-up pressure.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-system-panel landing-system-panel-clean" id="about">
        <div className="landing-system-copy">
          <h2>BEE-AURA AI SYSTEMS for service business leads</h2>
          <h3>One system for enquiries, replies, bookings and follow-up control.</h3>
          <p>
            Bee-Aura gives service businesses a structured AI-ready operating layer,
            helping teams move faster without losing owner control or visibility.
          </p>

          <div className="landing-hero-actions">
            <Link href="/dashboard" className="landing-button landing-button-primary">
              Open Demo Dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
