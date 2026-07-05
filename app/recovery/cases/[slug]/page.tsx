import Link from "next/link";
import { notFound } from "next/navigation";
import { caseBySlug, recoveryCases } from "../../recoveryData";
import { ActionRow, RecoveryLayout, cx, styles, toneClass } from "../../RecoveryUi";

export function generateStaticParams() {
  return recoveryCases.map((item) => ({ slug: item.slug }));
}

export default async function RecoveryCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = caseBySlug[slug];

  if (!item) {
    notFound();
  }

  return (
    <RecoveryLayout>
      <section className={cx(styles.caseHero, toneClass(item.tone))}>
        <div>
          <p className={styles.eyebrow}>ENQUIRY AT RISK</p>
          <h1>{item.customer}</h1>
          <p>{item.message}</p>
          <div className={styles.chips}>
            {item.riskLabels.map((label) => <span key={label}>{label}</span>)}
          </div>
          <ActionRow>
            <Link className={styles.primary} href={`/playbooks/${item.playbook}`}>Open playbook</Link>
            <Link className={styles.secondary} href="/solo/today">Back to queue</Link>
          </ActionRow>
        </div>
        <aside className={styles.sticky}>
          <p className={styles.eyebrow}>DECISION</p>
          <h2>{item.status}</h2>
          <p>{item.ownerDecision}</p>
        </aside>
      </section>

      <section className={styles.detailGrid}>
        <article className={styles.detailBox}>
          <h3>Customer Memory</h3>
          <ul>{item.memory.map((memory) => <li key={memory}>{memory}</li>)}</ul>
        </article>
        <article className={styles.detailBox}>
          <h3>Missing information</h3>
          <ul>{item.missingInfo.map((info) => <li key={info}>{info}</li>)}</ul>
        </article>
        <article className={styles.detailBox}>
          <h3>Next Move</h3>
          <p>{item.nextMove}</p>
        </article>
        <article className={styles.detailBox}>
          <h3>Outcome</h3>
          <p>{item.outcome}</p>
        </article>
      </section>

      <section className={styles.panel}>
        <p className={styles.eyebrow}>PROOF TIMELINE</p>
        <h2>What happened, who decided and when.</h2>
        <div className={styles.timeline}>
          {item.proof.map((event) => (
            <article key={event} className={styles.timelineEvent}>
              <time>{event.slice(0, 5)}</time>
              <div>
                <h3>{event.slice(6)}</h3>
                <p>{item.title}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </RecoveryLayout>
  );
}
