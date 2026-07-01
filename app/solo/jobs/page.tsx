import Link from "next/link";
import { soloActions } from "../soloData";

const jobActions = soloActions.filter((action) =>
  ["send-friendly-follow-up", "request-reviews"].includes(action.slug)
);

export default function SoloJobsPage() {
  return (
    <main className="soloJourneyPage">
      <section className="soloSplitHero">
        <div>
          <p className="simpleEyebrow">SOLO JOBS</p>
          <h1>Jobs, follow-ups and reviews kept simple.</h1>
          <p>
            Jobs keeps follow-ups and review asks visible. Aura does the remembering; you do the approving.
          </p>
        </div>
        <Link href="/solo/today">Back to Today</Link>
      </section>

      <section className="soloJobsGrid">
        {jobActions.map((action) => (
          <article key={action.slug} className={`soloJobCard soloTone-${action.tone}`}>
            <span>{action.status}</span>
            <h2>{action.title}</h2>
            <p>{action.detail}</p>
            <strong>{action.value}</strong>
            <div className="soloTodayActions">
              <Link href={action.actionHref}>{action.actionLabel}</Link>
              <Link href={action.customerHref}>Customer</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
