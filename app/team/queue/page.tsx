import Link from "next/link";
import { teamLanes } from "../teamData";

export default function TeamQueuePage() {
  return (
    <main className="teamOpsV4">
      <section className="teamPageHeaderV4">
        <div>
          <p className="teamEyebrowV4">SHARED QUEUE</p>
          <h1>Everything the team needs to pick up next.</h1>
          <p>
            Work is grouped by ownership: unassigned, with the team, or waiting for
            the owner. Aura keeps the next move visible.
          </p>
        </div>
        <Link className="teamSecondaryActionV4" href="/team">
          Back to Team Home
        </Link>
      </section>

      <section className="teamQueueBoardV4">
        {teamLanes.map((lane) => (
          <article key={lane.lane} className="teamQueueLaneV4">
            <div className="teamLaneHeadV4">
              <div>
                <span>{lane.lane}</span>
                <p>{lane.summary}</p>
              </div>
              <strong>{lane.count}</strong>
            </div>

            {lane.items.map((item) => (
              <div key={item.slug} className={`teamQueueCardV4 teamTone-${item.tone}V4`}>
                <div className="teamCardMetaV4">
                  <span>{item.priority}</span>
                  <small>{item.age}</small>
                </div>
                <h2>{item.title}</h2>
                <p>{item.detail}</p>
                <dl className="teamCardFactsV4">
                  <div>
                    <dt>Customer</dt>
                    <dd>{item.customer}</dd>
                  </div>
                  <div>
                    <dt>Owner</dt>
                    <dd>{item.owner}</dd>
                  </div>
                  <div>
                    <dt>Aura move</dt>
                    <dd>{item.auraMove}</dd>
                  </div>
                </dl>
                <div className="teamButtonRowV4">
                  <Link href={item.href}>{item.action}</Link>
                  <Link href={item.customerHref}>Customer context</Link>
                </div>
              </div>
            ))}
          </article>
        ))}
      </section>
    </main>
  );
}
