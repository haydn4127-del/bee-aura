import Link from "next/link";

const todayCards = [
  {
    tone: "urgent",
    label: "Urgent",
    title: "Call back Sarah Johnson",
    detail: "Missed boiler repair enquiry. High chance of booking today.",
    meta: "£280 est. • Waiting 18 mins",
    primary: "Call / reply",
    href: "/messages?search=Sarah%20Johnson",
    secondary: "View customer",
    secondaryHref: "/customers/sarah-johnson",
  },
  {
    tone: "approval",
    label: "Owner decision",
    title: "Approve drafted boiler reply",
    detail: "Aura has prepared a safe first response. Owner approval stays required.",
    meta: "Reply ready • Needs your decision",
    primary: "Approve reply",
    href: "/messages?search=boiler%20reply",
    secondary: "Open Inbox",
    secondaryHref: "/inbox",
  },
  {
    tone: "job",
    label: "Job today",
    title: "Confirm 14:00 kitchen leak visit",
    detail: "Customer has booking details. Keep the job visible until complete.",
    meta: "Today • Confirmed",
    primary: "Open job",
    href: "/bookings?search=kitchen%20leak",
    secondary: "Open Jobs",
    secondaryHref: "/jobs",
  },
  {
    tone: "review",
    label: "Reviews ready",
    title: "Send 2 review requests",
    detail: "Completed jobs are ready for review request. No sensitive reply needed.",
    meta: "2 ready • Demo only",
    primary: "Open reviews",
    href: "/reviews",
    secondary: "More/Admin",
    secondaryHref: "/more",
  },
];

const summary = [
  ["Urgent now", "3", "Do first"],
  ["Needs reply", "5", "Inbox"],
  ["Jobs today", "4", "Jobs"],
  ["Approvals", "2", "Owner"],
  ["Money at risk", "£1,180", "Recoverable"],
];

export default function TodayPage() {
  return (
    <main className="simplePage simpleTodayPage">
      <section className="simpleHero">
        <p className="simpleEyebrow">TODAY</p>
        <h1>Open Bee-Aura and see what needs doing now.</h1>
        <p>
          A simple daily queue for urgent leads, replies, jobs, approvals and reviews.
          Deeper pages stay hidden until the owner needs detail.
        </p>

        <div className="simpleHeroActions">
          <Link href="/inbox">Open Inbox</Link>
          <Link href="/jobs">Open Jobs</Link>
        </div>
      </section>

      <section className="simpleSummaryGrid" aria-label="Today summary">
        {summary.map(([label, value, detail]) => (
          <Link
            key={label}
            href={label === "Jobs today" ? "/jobs" : label === "Needs reply" ? "/inbox" : "/today"}
            className="simpleSummaryCard"
          >
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{detail}</small>
          </Link>
        ))}
      </section>

      <section className="simpleMainGrid">
        <div className="simpleQueue">
          <div className="simpleSectionHeader">
            <div>
              <p className="simpleEyebrow">DO THESE FIRST</p>
              <h2>Today’s recovery queue</h2>
            </div>
            <Link href="/dashboard">Open expanded Today view</Link>
          </div>

          <div className="simpleCardStack">
            {todayCards.map((card) => (
              <article key={card.title} className={`simpleActionCard simpleActionCard-${card.tone}`}>
                <div className="simpleCardTop">
                  <span>{card.label}</span>
                  <small>{card.meta}</small>
                </div>
                <h3>{card.title}</h3>
                <p>{card.detail}</p>
                <div className="simpleCardActions">
                  <Link href={card.href}>{card.primary}</Link>
                  <Link href={card.secondaryHref}>{card.secondary}</Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="simpleAuraRail">
          <img src="/brand/source/aura-assistant-transparent.png" alt="Aura assistant" />
          <div>
            <p className="simpleEyebrow">AURA SUMMARY</p>
            <h2>Three items could be lost today if they are not handled.</h2>
            <p>
              Aura has drafted safe replies and kept owner approval visible for anything
              that commits the business.
            </p>
          </div>

          <div className="simpleApprovalBox">
            <strong>Owner approvals</strong>
            <span>2 drafted replies ready</span>
            <span>1 booking decision waiting</span>
            <Link href="/inbox">Review approvals</Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
