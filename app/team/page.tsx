import Link from "next/link";
import { teamItems, teamLanes, teamStats } from "./teamData";

const ownerChecks = teamItems.filter((item) => item.needsOwnerCheck);
const nextMoves = teamItems.slice(0, 3);

export default function TeamPage() {
  return (
    <main className="teamOpsV4 teamOpsHomeV4">
      <section className="teamHeroV4">
        <div className="teamHeroCopyV4">
          <p className="teamEyebrowV4">TEAM DEMO</p>
          <h1>One shared board for today’s customer work.</h1>
          <p>
            Aura spots fresh leads, handovers and owner checks, then shows who should
            pick up each one. The team can move fast while the owner keeps sensitive
            decisions under control.
          </p>
          <div className="teamHeroActionsV4">
            <Link className="teamPrimaryActionV4" href="/team/queue">
              Open shared queue
            </Link>
            <Link className="teamSecondaryActionV4" href="/team/approvals">
              Review owner checks
            </Link>
          </div>
        </div>

        <aside className="teamControlCardV4" aria-label="Aura team mode summary">
          <div className="teamControlTopV4">
            <span className="teamPulseV4" />
            <div>
              <strong>Aura Team Mode</strong>
              <p>2 unassigned · 2 owner checks · 1 duplicate reply warning</p>
            </div>
          </div>
          <ul className="teamControlListV4">
            {nextMoves.map((item) => (
              <li key={item.slug}>
                <span>{item.priority}</span>
                <strong>{item.customer}</strong>
                <small>{item.auraMove}</small>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="teamStatGridV4" aria-label="Team status">
        {teamStats.map((stat) => (
          <article key={stat.label} className="teamStatCardV4">
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.detail}</small>
          </article>
        ))}
      </section>

      <section className="teamPanelGridV4">
        <div className="teamBoardPreviewV4">
          <div className="teamSectionHeadV4">
            <p className="teamEyebrowV4">SHARED QUEUE</p>
            <h2>Who owns what, and what needs a check?</h2>
          </div>

          <div className="teamBoardGridV4">
            {teamLanes.map((lane) => (
              <article key={lane.lane} className="teamLaneV4">
                <div className="teamLaneHeadV4">
                  <div>
                    <span>{lane.lane}</span>
                    <p>{lane.summary}</p>
                  </div>
                  <strong>{lane.count}</strong>
                </div>

                {lane.items.map((item) => (
                  <div key={item.slug} className={`teamCardV4 teamTone-${item.tone}V4`}>
                    <div className="teamCardMetaV4">
                      <span>{item.source}</span>
                      <small>{item.age}</small>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                    <div className="teamCardOwnerV4">
                      <span>{item.owner}</span>
                      <small>{item.ownerRole}</small>
                    </div>
                    <div className="teamButtonRowV4">
                      <Link href={item.href}>{item.action}</Link>
                      <Link href={item.customerHref}>Context</Link>
                    </div>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </div>

        <aside className="teamOwnerPanelV4">
          <p className="teamEyebrowV4">OWNER GUARDRAIL</p>
          <h2>Prepared by the team. Held when it matters.</h2>
          <p>
            Quotes, complaints, cancellations, availability and payment details stay
            held until the right person says yes.
          </p>
          <div className="teamMiniListV4">
            {ownerChecks.map((item) => (
              <Link key={item.slug} href={item.href}>
                <span>{item.priority}</span>
                <strong>{item.customer}</strong>
                <small>{item.teamNote}</small>
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
