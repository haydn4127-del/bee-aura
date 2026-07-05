import { recoveryCases, weeklyReview } from "../../recovery/recoveryData";
import { CaseCard, RecoveryLayout, styles } from "../../recovery/RecoveryUi";

export default function ControlCentreReportsPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>WEEKLY REVIEW</p>
          <h1>What was surfaced, held, recovered and proved.</h1>
          <p>No fake ROI. No vanity reporting. Just the recovery-control evidence.</p>
        </div>
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

      <section className={styles.list}>
        {recoveryCases.slice(0, 6).map((item, index) => <CaseCard key={item.slug} item={item} index={index} />)}
      </section>
    </RecoveryLayout>
  );
}
