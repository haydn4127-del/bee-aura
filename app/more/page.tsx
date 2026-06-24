import Link from "next/link";

const adminLinks = [
  ["Reviews", "Proof, review requests and owner replies", "/reviews"],
  ["System history", "What happened across the demo", "/activity-log"],
  ["Needs fixing", "Failed routes and recovery control", "/error-log"],
  ["Settings", "Team, approval and demo controls", "/settings"],
];

export default function MorePage() {
  return (
    <main className="simplePage">
      <section className="simpleHero">
        <p className="simpleEyebrow">MORE / ADMIN</p>
        <h1>Deeper controls stay hidden until needed.</h1>
        <p>
          Normal users should live in Today, Inbox, Jobs and Customers. Reviews,
          logs and settings stay here so the demo feels simple, not like a bloated CRM.
        </p>

        <div className="simpleHeroActions">
          <Link href="/today">Back to Today</Link>
          <Link href="/customers">Open Customers</Link>
        </div>
      </section>

      <section className="simpleAdminGrid">
        {adminLinks.map(([title, detail, href]) => (
          <Link key={title} href={href} className="simpleAdminCard">
            <span>Hidden depth</span>
            <h2>{title}</h2>
            <p>{detail}</p>
            <strong>Open →</strong>
          </Link>
        ))}
      </section>
    </main>
  );
}
