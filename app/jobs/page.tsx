import Link from "next/link";

const jobItems = [
  ["Today", "Kitchen leak visit", "14:00 • Confirmed", "Open job", "/bookings?search=kitchen%20leak"],
  ["Follow-up", "Blocked drain quote", "£620 est. • waiting 4 days", "Send follow-up", "/follow-ups?search=blocked%20drain"],
  ["Tomorrow", "Boiler service reminder", "08:30 • reminder ready", "Open reminder", "/follow-ups?search=boiler%20service"],
  ["Done today", "Bathroom repair", "Review request ready", "Request review", "/reviews"],
];

export default function JobsPage() {
  return (
    <main className="simplePage">
      <section className="simpleHero">
        <p className="simpleEyebrow">JOBS</p>
        <h1>Bookings and follow-ups together.</h1>
        <p>
          Jobs keeps appointments, reminders and follow-ups in one place so work keeps moving.
          Expanded Bookings and Follow-Ups remain available underneath.
        </p>

        <div className="simpleHeroActions">
          <Link href="/bookings">Open expanded Bookings</Link>
          <Link href="/follow-ups">Open expanded Follow-Ups</Link>
        </div>
      </section>

      <section className="simpleMainGrid">
        <div className="simpleQueue">
          <div className="simpleSectionHeader">
            <div>
              <p className="simpleEyebrow">JOB QUEUE</p>
              <h2>Today’s jobs and follow-ups</h2>
            </div>
            <Link href="/today">Back to Today</Link>
          </div>

          <div className="simpleCardStack">
            {jobItems.map(([status, title, meta, action, href]) => (
              <article key={title} className="simpleActionCard">
                <div className="simpleCardTop">
                  <span>{status}</span>
                  <small>{meta}</small>
                </div>
                <h3>{title}</h3>
                <p>Keep the next job step visible, simple and owner-controlled.</p>
                <div className="simpleCardActions">
                  <Link href={href}>{action}</Link>
                  <Link href="/customers">View customer</Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="simpleAuraRail">
          <img src="/brand/source/aura-assistant-transparent.png" alt="Aura assistant" />
          <div>
            <p className="simpleEyebrow">AURA JOB WATCH</p>
            <h2>Follow-ups and booking promises are kept visible.</h2>
            <p>
              Aura can remind, draft and flag risk, but owner approval stays visible for commitments.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
