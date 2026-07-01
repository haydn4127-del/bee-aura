import Link from "next/link";
import { teamLanes } from "../teamData";

export default function TeamQueuePage() {
  return (
    <main className="teamPackagePage teamPackageV3">
      <section className="teamHeaderV3">
        <div>
          <p className="simpleEyebrow">TEAM SHARED QUEUE</p>
          <h1>Everything the team needs to pick up next.</h1>
          <p>
            The shared queue keeps unassigned work, active tasks and owner checks in
            one tidy place. No digging, no guessing, no “I thought you had it”.
          </p>
        </div>
        <Link href="/team">Back to Team Home</Link>
      </section>

      <section className="teamQueueLayoutV3">
        {teamLanes.map((lane) => (
          <div key={lane.lane} className="teamLaneV3">
            <div className="teamLaneHeaderV3">
              <span>{lane.lane}</span>
              <strong>{lane.count}</strong>
            </div>

            {lane.items.map((item) => (
              <article key={item.slug} className="teamCardV3">
                <small>{item.owner}</small>
                <h2>{item.title}</h2>
                <p>{item.detail}</p>
                <div className="teamButtonRowV3">
                  <Link href={item.href}>{item.action}</Link>
                  <Link href={item.customerHref}>Customer context</Link>
                </div>
              </article>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}
