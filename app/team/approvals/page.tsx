import { ownerDecisionCases } from "../../recovery/recoveryData";
import { CaseCard, RecoveryLayout, styles } from "../../recovery/RecoveryUi";

export default function TeamApprovalsPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>OWNER APPROVALS</p>
          <h1>Held replies that should not leave yet.</h1>
          <p>Timing, price, responsibility, complaint and safety wording stay blocked until the right person approves.</p>
        </div>
      </section>
      <section className={styles.list}>
        {ownerDecisionCases.map((item, index) => (
          <CaseCard key={item.slug} item={item} index={index} />
        ))}
      </section>
    </RecoveryLayout>
  );
}
