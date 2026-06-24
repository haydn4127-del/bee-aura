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
  ["Pipeline", "£84k", "+17% this week"],
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
          <Link href="/today">Today</Link>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
        </div>

        <div className="landing-nav-actions">
          <Link href="/settings" className="landing-button landing-button-ghost">
            Login
          </Link>
          <Link href="/today" className="landing-button landing-button-primary">
            Enter Demo
          </Link>
        </div>
      </nav>

      <section className="landing-hero" id="platform">
        <div className="landing-hero-copy">
          <p className="landing-eyebrow">AI lead control for UK service businesses</p>
          <h1>Open Today. See What Needs Doing.</h1>
          <h2 className="landing-hero-subheading">
            Today shows urgent leads, replies, jobs and approvals in one simple queue.
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
              href="/today"
              className="landing-button landing-button-primary landing-button-large"
            >
              Enter Today
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
              <Link href="/today" className="active" aria-label="Open dashboard overview">
                Today
              </Link>
              <Link href="/leads" aria-label="Open leads page">
                Leads
              </Link>
              <Link href="/inbox" aria-label="Open messages page">
                Messages
              </Link>
              <Link href="/jobs" aria-label="Open bookings page">
                Bookings
              </Link>
              <Link href="/jobs" aria-label="Open follow-ups page">
                Follow-Ups
              </Link>
              <Link href="/more" aria-label="Open reviews page">
                Reviews
              </Link>
              <Link href="/settings" aria-label="Open settings page">
                Settings
              </Link>
            </aside>

            <section className="preview-content">
              <div className="preview-topbar">
                <div>
                  <p>Today view</p>
                  <strong>Manchester Home Services</strong>
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

              <div className="preview-chart-grid preview-chart-grid-final">
                <div className="preview-chart-card preview-chart-card-final home-final-chart-card home-final-chart-card-enquiries">
                  <div className="chart-card-header chart-card-header-pro home-final-chart-header">
                    <div>
                      <span>Enquiry trend</span>
                      <small>Last 7 days</small>
                    </div>
                    <strong>482</strong>
                  </div>

                  <div className="chart-legend chart-legend-pro home-final-chart-legend">
                    <span><i className="legend-dot legend-blue" /> Qualified enquiries</span>
                    <span><i className="legend-dot legend-gold" /> Owner priority</span>
                  </div>

                  <svg className="home-final-chart home-final-chart-enquiries" viewBox="0 0 520 300" role="img" aria-label="Professional enquiry trend chart">
                    <defs>
                      <linearGradient id="homeFinalEnquiryAreaV2" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(76, 166, 255, 0.32)" />
                        <stop offset="70%" stopColor="rgba(76, 166, 255, 0.08)" />
                        <stop offset="100%" stopColor="rgba(76, 166, 255, 0)" />
                      </linearGradient>
                      <linearGradient id="homeFinalEnquiryLineV2" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#4da3ff" />
                        <stop offset="55%" stopColor="#7dc8ff" />
                        <stop offset="100%" stopColor="#f4c94a" />
                      </linearGradient>
                      <filter id="homeFinalLineGlowV2" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2.2" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    <rect className="home-final-plot-bg" x="46" y="30" width="426" height="204" rx="18" />
                    <g className="home-final-grid">
                      <line x1="62" y1="62" x2="452" y2="62" />
                      <line x1="62" y1="102" x2="452" y2="102" />
                      <line x1="62" y1="142" x2="452" y2="142" />
                      <line x1="62" y1="182" x2="452" y2="182" />
                      <line x1="62" y1="222" x2="452" y2="222" />
                    </g>

                    <g className="home-final-axis-labels">
                      <text x="20" y="66">500</text>
                      <text x="20" y="146">250</text>
                      <text x="28" y="226">0</text>
                      <text x="62" y="260">Mon</text>
                      <text x="126" y="260">Tue</text>
                      <text x="190" y="260">Wed</text>
                      <text x="254" y="260">Thu</text>
                      <text x="318" y="260">Fri</text>
                      <text x="382" y="260">Sat</text>
                      <text x="438" y="260">Sun</text>
                    </g>

                    <path className="home-final-area-blue" d="M70 206 C104 178 120 166 142 172 C178 182 190 134 220 128 C248 122 266 150 294 138 C328 123 340 84 374 76 C406 68 420 48 452 44 L452 222 L70 222 Z" />
                    <path className="home-final-line-blue" d="M70 206 C104 178 120 166 142 172 C178 182 190 134 220 128 C248 122 266 150 294 138 C328 123 340 84 374 76 C406 68 420 48 452 44" filter="url(#homeFinalLineGlowV2)" />

                    <g className="home-final-dot-row">
                      <circle cx="70" cy="206" r="4" />
                      <circle cx="142" cy="172" r="4" />
                      <circle cx="220" cy="128" r="4" />
                      <circle cx="294" cy="138" r="4" />
                      <circle cx="374" cy="76" r="4" />
                      <circle className="home-final-dot-active" cx="452" cy="44" r="6" />
                    </g>

                    <g className="home-final-callout">
                      <rect x="346" y="72" width="92" height="38" rx="13" />
                      <text x="360" y="96">+10%</text>
                    </g>
                  </svg>

                  <div className="preview-chart-foot preview-chart-foot-final home-final-chart-foot">
                    <span>+10% vs prior week</span>
                    <b>482 total</b>
                  </div>
                </div>

                <div className="preview-chart-card preview-chart-card-final home-final-chart-card home-final-chart-card-bookings">
                  <div className="chart-card-header chart-card-header-pro home-final-chart-header">
                    <div>
                      <span>Bookings & revenue</span>
                      <small>Week vs prior week</small>
                    </div>
                    <strong>14</strong>
                  </div>

                  <div className="chart-legend chart-legend-pro home-final-chart-legend">
                    <span><i className="legend-dot legend-blue" /> Bookings</span>
                    <span><i className="legend-dot legend-gold" /> Revenue</span>
                  </div>

                  <svg className="home-final-chart home-final-chart-bookings" viewBox="0 0 520 300" role="img" aria-label="Professional bookings and revenue chart">
                    <defs>
                      <linearGradient id="homeFinalBookingBarV2" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(82, 171, 255, 0.88)" />
                        <stop offset="100%" stopColor="rgba(82, 171, 255, 0.18)" />
                      </linearGradient>
                      <linearGradient id="homeFinalRevenueBarV2" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(244, 201, 74, 0.92)" />
                        <stop offset="100%" stopColor="rgba(244, 201, 74, 0.18)" />
                      </linearGradient>
                      <linearGradient id="homeFinalRevenueLineV2" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#f4c94a" />
                        <stop offset="100%" stopColor="#ffffff" />
                      </linearGradient>
                    </defs>

                    <rect className="home-final-plot-bg" x="46" y="30" width="426" height="204" rx="18" />
                    <g className="home-final-grid">
                      <line x1="62" y1="62" x2="452" y2="62" />
                      <line x1="62" y1="102" x2="452" y2="102" />
                      <line x1="62" y1="142" x2="452" y2="142" />
                      <line x1="62" y1="182" x2="452" y2="182" />
                      <line x1="62" y1="222" x2="452" y2="222" />
                    </g>

                    <g className="home-final-axis-labels">
                      <text x="16" y="66">£90k</text>
                      <text x="16" y="146">£45k</text>
                      <text x="30" y="226">£0</text>
                      <text x="70" y="260">M</text>
                      <text x="130" y="260">T</text>
                      <text x="190" y="260">W</text>
                      <text x="250" y="260">T</text>
                      <text x="310" y="260">F</text>
                      <text x="370" y="260">S</text>
                      <text x="430" y="260">S</text>
                    </g>

                    <g className="home-final-bars">
                      <rect className="home-final-bar-blue" x="74" y="176" width="18" height="46" rx="6" />
                      <rect className="home-final-bar-gold" x="96" y="162" width="18" height="60" rx="6" />

                      <rect className="home-final-bar-blue" x="134" y="158" width="18" height="64" rx="6" />
                      <rect className="home-final-bar-gold" x="156" y="136" width="18" height="86" rx="6" />

                      <rect className="home-final-bar-blue" x="194" y="146" width="18" height="76" rx="6" />
                      <rect className="home-final-bar-gold" x="216" y="118" width="18" height="104" rx="6" />

                      <rect className="home-final-bar-blue" x="254" y="128" width="18" height="94" rx="6" />
                      <rect className="home-final-bar-gold" x="276" y="100" width="18" height="122" rx="6" />

                      <rect className="home-final-bar-blue" x="314" y="106" width="18" height="116" rx="6" />
                      <rect className="home-final-bar-gold" x="336" y="82" width="18" height="140" rx="6" />

                      <rect className="home-final-bar-blue" x="374" y="94" width="18" height="128" rx="6" />
                      <rect className="home-final-bar-gold" x="396" y="66" width="18" height="156" rx="6" />
                    </g>

                    <path className="home-final-revenue-line" d="M83 178 C132 158 162 150 205 130 C248 110 278 100 323 84 C366 70 402 58 438 44" />
                    <circle className="home-final-revenue-dot" cx="438" cy="44" r="6" />

                    <g className="home-final-callout">
                      <rect x="336" y="80" width="102" height="38" rx="13" />
                      <text x="350" y="104">£84k</text>
                    </g>
                  </svg>

                  <div className="preview-chart-foot preview-chart-foot-final home-final-chart-foot">
                    <span>14 booked</span>
                    <b>£84k revenue</b>
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

      <section className="landing-system-panel landing-system-panel-clean landing-system-panel-final" id="about">
        <div className="landing-system-copy landing-system-copy-final">
          <p className="landing-section-kicker">BEE-AURA AI SYSTEMS</p>
          <h2>
            Lead recovery control for
            <span>service businesses.</span>
          </h2>
          <h3>One automation command centre for enquiries, replies, bookings and follow-up recovery.</h3>
          <p>
            Bee-Aura gives service businesses a structured AI-ready operating layer,
            helping teams move faster without losing owner control or visibility.
          </p>

          <div className="landing-hero-actions">
            <Link href="/today" className="landing-button landing-button-primary">
              Open Demo Dashboard
            </Link>
          </div>
        </div>

        <div className="landing-system-brand-display landing-system-brand-display-final" aria-label="Bee-Aura AI Systems symbol">
          <img
            src="/brand/source/bee-aura-symbol.svg"
            alt="Bee-Aura symbol"
            className="landing-system-brand-symbol landing-system-brand-symbol-final"
          />
        </div>
      </section>
      <section id="pricing" className="landing-pricing" aria-label="Bee-Aura demo pricing">
        <div className="landing-pricing-copy">
          <p>PRICING PREVIEW</p>
          <h2>Simple monthly pricing with clear setup fees.</h2>
          <span>
            Demo pricing only. Bee-Aura is shown here as a fake-data operating system with no payments, no live integrations and no customer-impacting actions.
          </span>
        </div>

        <div className="landing-pricing-grid">
          <article>
            <p>Starter</p>
            <h3>£149<span>/mo</span></h3>
            <strong>Setup from £299</strong>
            <small>For small service teams that need basic lead capture, inbox visibility and follow-up control.</small>
            <ul>
              <li>Lead capture dashboard</li>
              <li>Smart inbox overview</li>
              <li>Basic follow-up queue</li>
              <li>Owner-safe demo actions</li>
            </ul>
          </article>

          <article className="is-featured">
            <p>Growth</p>
            <h3>£299<span>/mo</span></h3>
            <strong>Setup from £499</strong>
            <small>For growing service teams that need bookings, reminders, review requests and owner approval.</small>
            <ul>
              <li>Booking command view</li>
              <li>Reply and review approval</li>
              <li>Daily calendar / action path</li>
              <li>Lead recovery reporting</li>
            </ul>
          </article>

          <article>
            <p>Owner OS</p>
            <h3>£499<span>/mo</span></h3>
            <strong>Setup from £799</strong>
            <small>For teams that want full command visibility, recovery oversight and audit-ready action tracking.</small>
            <ul>
              <li>Full operating dashboard</li>
              <li>Audit and error visibility</li>
              <li>Priority recovery queue</li>
              <li>Multi-page owner control view</li>
            </ul>
          </article>
        </div>
      </section>



    </main>
  );
}
