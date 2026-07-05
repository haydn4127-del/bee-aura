import Link from "next/link";
import { recoveryCases, recoveryMetrics } from "../recovery/recoveryData";
import { ActionRow, RecoveryLayout, styles } from "../recovery/RecoveryUi";

export default function TeamDemoPage() {
  return (
    <RecoveryLayout>
      <section className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>TEAM DEMO</p>
          <h1>Who owns it, and are we safe to reply?</h1>
          <p>
            Team mode is the handover surface. Owner, admin and engineer can see
            who owns the case, what is risky, what is held and what proof will be created.
          </p>
          <ActionRow>
            <Link className={styles.primary} href="/team/queue">Open shared queue</Link>
            <Link className={styles.secondary} href="/team/approvals">Review held drafts</Link>
          </ActionRow>
        </div>

        <aside className={styles.sticky}>
          <p className={styles.eyebrow}>TEAM RISK VIEW</p>
          <h2>4 waiting approval. 1 duplicate contact. 2 proof gaps.</h2>
          <div className={styles.stack}>
            {recoveryCases.slice(0, 3).map((item) => (
              <article key={item.slug}>
                <span>{item.status}</span>
                <strong>{item.customer}</strong>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className={styles.metricGrid}>
        {recoveryMetrics.map((metric) => (
          <article key={metric.label} className={styles.metric}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <p>{metric.detail}</p>
          </article>
        ))}
      </section>
    </RecoveryLayout>
  );
}
