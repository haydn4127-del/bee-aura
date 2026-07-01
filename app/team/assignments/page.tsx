import Link from "next/link";
import { teamLanes } from "../teamData";

type TeamItem = (typeof teamLanes)[number]["items"][number];

const items: TeamItem[] = [];

for (const lane of teamLanes) {
  for (const item of lane.items) {
    items.push(item);
  }
}

export default function TeamAssignmentsPage() {
  return (
    <main className="teamPackagePage teamPackageV3">
      <section className="teamHeaderV3">
        <div>
          <p className="simpleEyebrow">TEAM ASSIGNMENTS</p>
          <h1>Who owns what?</h1>
          <p>
            Aura suggests ownership so fresh work does not float around with nobody
            holding it. The team can accept, change or escalate.
          </p>
        </div>
        <Link href="/team/queue">Open shared queue</Link>
      </section>

      <section className="teamAssignmentListV3">
        {items.map((item) => (
          <article key={item.slug} className="teamAssignmentRowV3">
            <div>
              <span>{item.owner}</span>
              <h2>{item.title}</h2>
              <p>{item.detail}</p>
            </div>
            <div className="teamButtonRowV3">
              <Link href={item.href}>{item.action}</Link>
              <Link href={item.customerHref}>Customer</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
