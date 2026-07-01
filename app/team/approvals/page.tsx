import Link from "next/link";
import { teamLanes } from "../teamData";

type TeamItem = (typeof teamLanes)[number]["items"][number];

const approvalSlugs = new Set<string>([
  "escalate-missed-call",
  "review-owner-approval",
  "resolve-duplicate-reply",
]);

const items: TeamItem[] = [];

for (const lane of teamLanes) {
  for (const item of lane.items) {
    if (approvalSlugs.has(item.slug)) {
      items.push(item);
    }
  }
}

export default function TeamApprovalsPage() {
  return (
    <main className="teamPackagePage teamPackageV3">
      <section className="teamHeaderV3">
        <div>
          <p className="simpleEyebrow">OWNER CHECKS</p>
          <h1>The team can prepare it. The owner still makes the call.</h1>
          <p>
            Promises, sensitive replies and duplicate-message risks are held here
            until the right person approves them.
          </p>
        </div>
        <Link href="/team/queue">Back to queue</Link>
      </section>

      <section className="teamApprovalDeskV3">
        {items.map((item) => (
          <article key={item.slug} className="teamApprovalCardV3">
            <span>Needs owner check</span>
            <h2>{item.title}</h2>
            <p>{item.detail}</p>
            <div className="teamButtonRowV3">
              <Link href={item.href}>{item.action}</Link>
              <Link href={item.customerHref}>Customer context</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
