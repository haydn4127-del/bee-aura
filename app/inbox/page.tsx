import Link from "next/link";

const inboxItems = [
  ["Urgent", "Sarah Johnson", "Missed boiler repair enquiry", "£280 est. • 18 mins waiting", "/messages?search=Sarah%20Johnson"],
  ["Needs reply", "Mr Patel", "Blocked drain quote follow-up", "£620 est. • waiting 4 days", "/leads?search=Patel"],
  ["Approval", "Emily Davis", "Bathroom reply draft ready", "Owner decision needed", "/messages?search=Emily%20Davis"],
  ["Waiting", "Tom Wilson", "Customer asked for tomorrow slot", "Booking route prepared", "/messages?search=Tom%20Wilson"],
];

export default function InboxPage() {
  return (
    <main className="simplePage">
      <section className="simpleHero">
        <p className="simpleEyebrow">INBOX</p>
        <h1>Leads and messages in one simple queue.</h1>
        <p>
          Inbox combines new enquiries, customer messages, missed calls and owner-approved replies.
          The old Leads and Messages pages stay available as deeper detail.
        </p>

        <div className="simpleHeroActions">
          <Link href="/messages">Open expanded Messages</Link>
          <Link href="/leads">Open expanded Leads</Link>
        </div>
      </section>

      <section className="simpleMainGrid">
        <div className="simpleQueue">
          <div className="simpleSectionHeader">
            <div>
              <p className="simpleEyebrow">REPLY QUEUE</p>
              <h2>Handle these first</h2>
            </div>
            <Link href="/today">Back to Today</Link>
          </div>

          <div className="simpleCardStack">
            {inboxItems.map(([status, name, issue, meta, href]) => (
              <article key={name} className="simpleActionCard">
                <div className="simpleCardTop">
                  <span>{status}</span>
                  <small>{meta}</small>
                </div>
                <h3>{name}</h3>
                <p>{issue}</p>
                <div className="simpleCardActions">
                  <Link href={href}>Open item</Link>
                  <Link href="/customers">Find customer</Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="simpleAuraRail">
          <img src="/brand/source/aura-assistant-transparent.png" alt="Aura assistant" />
          <div>
            <p className="simpleEyebrow">AURA INBOX WATCH</p>
            <h2>Safe replies can be drafted. Risky replies need approval.</h2>
            <p>
              Quotes, bookings, complaints and payment messages stay owner-controlled.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
