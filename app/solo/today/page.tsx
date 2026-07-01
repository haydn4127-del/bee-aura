import Link from "next/link";
import { soloActions } from "../soloData";

export default function SoloTodayPage() {
  return (
    <main className="soloJourneyPage">
      <section className="soloTodayHero">
        <div>
          <p className="simpleEyebrow">SOLO TODAY</p>
          <h1>Do these first.</h1>
          <p>
            A solo service owner does not need loads of tabs. Today shows what Aura has found,
            prepared and ranked so the next move is obvious.
          </p>
        </div>
        <aside>
          <strong>3 urgent actions</strong>
          <span>2 AI drafts ready</span>
          <span>1 follow-up could recover work</span>
        </aside>
      </section>

      <section className="soloTodayLayout">
        <div className="soloTodayQueue">
          {soloActions.map((action, index) => (
            <article key={action.slug} className={`soloTodayCard soloTone-${action.tone}`}>
              <div className="soloTodayNumber">{index + 1}</div>
              <div>
                <span>{action.status}</span>
                <h2>{action.title}</h2>
                <p>{action.detail}</p>
                <small>{action.value} · {action.meta}</small>
                <div className="soloTodayActions">
                  <Link href={action.actionHref}>{action.actionLabel}</Link>
                  <Link href={action.customerHref}>View customer</Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="soloActionBrain">
          <img src="/brand/source/aura-assistant-transparent.png" alt="Aura assistant" />
          <p className="simpleEyebrow">AURA THINKING</p>
          <h2>“I found the warm leads and prepared the safest next move.”</h2>
          <p>
            Aura can prepare safe replies and friendly nudges. Prices, bookings and sensitive messages still need your say-so.
          </p>
        </aside>
      </section>
    </main>
  );
}
