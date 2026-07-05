import { recoveryCases } from "../../recovery/recoveryData";
import { CompactCase, RecoveryLayout, styles } from "../../recovery/RecoveryUi";

export default function TeamAssignmentsPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>ASSIGNMENTS</p>
          <h1>Every active case has one owner.</h1>
          <p>No crossed wires. No two people promising different things to the same customer.</p>
        </div>
      </section>
      <section className={styles.caseGrid}>
        {recoveryCases.map((item) => <CompactCase key={item.slug} item={item} />)}
      </section>
    </RecoveryLayout>
  );
}
