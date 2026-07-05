import { recoveryCases } from "../../recovery/recoveryData";
import { RecoveryLayout, styles, CompactCase } from "../../recovery/RecoveryUi";

export default function SoloJobsPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>HANDOFF READY</p>
          <h1>Only safe work reaches the job system.</h1>
          <p>Bee-Aura does not run jobs. It prepares enough context for the existing job system to receive clean work.</p>
        </div>
      </section>
      <section className={styles.caseGrid}>
        {recoveryCases.filter((item) => item.role === "Admin move" || item.role === "Recovery work").map((item) => (
          <CompactCase key={item.slug} item={item} />
        ))}
      </section>
    </RecoveryLayout>
  );
}
