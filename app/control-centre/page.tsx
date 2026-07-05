import Link from "next/link";
import { recoveryCases, recoveryMetrics, recoveryPillars, weeklyReview } from "../recovery/recoveryData";
import { ActionRow, RecoveryLayout, CaseCard, styles } from "../recovery/RecoveryUi";

export default function ControlCentrePage() {
  return (
    <RecoveryLayout>
      <section className={styles.controlHero}>
        <div>
          <p className={styles.eyebrow}>RECOVERY CONTROL CENTRE</p>
          <h1>What is at risk across every enquiry?</h1>
          <p>
            Control Centre is the exceptions view: blocked, cooling, duplicated,
            unresolved or missing proof.
          </p>
          <ActionRow>
            <Link className={styles.primary} href="/control-centre/overview">Open system map</Link>
            <Link className={styles.secondary} href="/control-centre/proof">View proof timeline</Link>
          </ActionRow>
        </div>
        <aside className={styles.sticky}>
          <p className={styles.eyebrow}>OWNER VIEW</p>
          <h2>Not another dashboard.</h2>
          <p>The owner sees what needs a decision, what must not be sent yet and what proof exists.</p>
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

      <section className={styles.split}>
        <div className={styles.list}>
          <p className={styles.eyebrow}>NEXT RECOVERY DECISIONS</p>
          {recoveryCases.slice(0, 5).map((item, index) => <CaseCard key={item.slug} item={item} index={index} />)}
        </div>
        <aside className={styles.sticky}>
          <p className={styles.eyebrow}>SYSTEM OBJECTS</p>
          <h2>The product grows from the same control loop.</h2>
          <div className={styles.stack}>
            {recoveryPillars.map((pillar) => (
              <article key={pillar.title}>
                <span>{pillar.label}</span>
                <strong>{pillar.title}</strong>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className={styles.weeklyGrid}>
        {weeklyReview.map((item) => (
          <article key={item.title}>
            <span>{item.title}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>
    </RecoveryLayout>
  );
}
