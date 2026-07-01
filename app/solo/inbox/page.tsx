import Link from "next/link";
import { soloActions } from "../soloData";

const inboxActions = soloActions.filter((action) =>
  ["call-back-sarah", "approve-first-reply"].includes(action.slug)
);

export default function SoloInboxPage() {
  return (
    <main className="soloJourneyPage">
      <section className="soloSplitHero">
        <div>
          <p className="simpleEyebrow">SOLO INBOX</p>
          <h1>Fresh leads and replies, without the faff.</h1>
          <p>
            Inbox shows fresh enquiries, safe reply drafts and anything that needs your say-so.
          </p>
        </div>
        <Link href="/solo/today">Back to Today</Link>
      </section>

      <section className="soloInboxStack">
        {inboxActions.map((action) => (
          <article key={action.slug} className={`soloInboxItem soloTone-${action.tone}`}>
            <div>
              <span>{action.status}</span>
              <h2>{action.title}</h2>
              <p>{action.detail}</p>
              <small>{action.value} · {action.meta}</small>
            </div>
            <div className="soloInboxActions">
              <Link href={action.actionHref}>{action.actionLabel}</Link>
              <Link href={action.customerHref}>Customer</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
