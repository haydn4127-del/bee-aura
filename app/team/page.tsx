import Link from "next/link";
import { teamLanes, teamStats } from "./teamData";

export default function TeamDemoPage() {
  return (
    <main className="teamPackagePage teamPackageV3">
      <section className="teamHeroV3">
        <div>
          <p className="simpleEyebrow">TEAM DEMO</p>
          <h1>Shared work. Clear owners. No “who’s got this?” moments.</h1>
          <p>
            Team is for service businesses where more than one person handles enquiries,
            jobs and follow-ups. Aura keeps the work tidy, the owners clear and the
            risky decisions visible.
          </p>

          <div className="teamActionsV3">
            <Link href="/team/queue">Open shared queue</Link>
            <Link href="/team/approvals">Review owner checks</Link>
          </div>
        </div>

        <aside className="teamAuraV3">
          <img src="/brand/source/aura-assistant-transparent.png" alt="Aura assistant" />
          <strong>Aura Team Mode</strong>
          <span>2 unassigned · 4 owner checks · 1 duplicate reply warning</span>
        </aside>
      </section>

      <section className="teamStatsV3">
        {teamStats.map((stat) => (
          <article key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.detail}</small>
          </article>
        ))}
      </section>

      <section className="teamBoardV3" aria-label="Team work board">
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
