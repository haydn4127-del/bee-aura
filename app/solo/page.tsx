import Link from "next/link";
import { soloActions } from "./soloData";

export default function SoloDemoPage() {
  return (
    <main className="soloJourneyPage soloJourneyHome">
      <section className="soloJourneyHero">
        <div className="soloOwnerPhone">
          <div className="soloOwnerPhoneTop">
            <span>BEE-AURA SOLO</span>
            <strong>Today</strong>
          </div>

          <div className="soloOwnerSummary">
            <span>Aura found</span>
            <strong>3 actions</strong>
            <p>with safe next moves ready</p>
          </div>

          <div className="soloOwnerActionList">
            {soloActions.slice(0, 3).map((action) => (
              <Link key={action.slug} href={action.actionHref} className={`soloOwnerAction soloTone-${action.tone}`}>
                <span>{action.status}</span>
                <h3>{action.title}</h3>
                <p>{action.detail}</p>
                <small>{action.meta} · {action.actionLabel}</small>
              </Link>
            ))}
          </div>

          <nav className="soloOwnerBottomNav" aria-label="Solo demo phone navigation">
            <Link href="/solo/today">Today</Link>
            <Link href="/solo/inbox">Inbox</Link>
            <Link href="/solo/jobs">Jobs</Link>
            <Link href="/solo/customers">People</Link>
          </nav>
        </div>

        <div className="soloOwnerCopy">
          <p className="simpleEyebrow">SOLO DEMO</p>
          <h1>For one busy service owner who wants the next win, not another headache.</h1>
          <p>
            Solo keeps the pages simple, while Aura does the clever work underneath:
            spotting leads, preparing safe replies and showing the next best move.
          </p>

          <div className="soloOwnerActions">
            <Link href="/solo/today">Open Solo Today</Link>
            <Link href="/team">Compare Team Demo</Link>
          </div>

          <div className="soloOwnerAura">
            <img src="/brand/source/aura-assistant-transparent.png" alt="Aura assistant" />
            <div>
              <strong>Aura Solo Mode</strong>
              <span>Aura spots, sorts and prepares. You stay in charge of the important stuff.</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
