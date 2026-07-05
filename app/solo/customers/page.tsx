import { recoveryCases } from "../../recovery/recoveryData";
import { CompactCase, RecoveryLayout, styles } from "../../recovery/RecoveryUi";

export default function SoloCustomersPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>CUSTOMER MEMORY</p>
          <h1>Customer context only where it changes the safe reply.</h1>
          <p>No bloated record. Just the property, history, channel and risk context needed to decide the next move.</p>
        </div>
      </section>
      <section className={styles.caseGrid}>
        {recoveryCases.map((item) => (
          <CompactCase key={item.slug} item={item} />
        ))}
      </section>
    </RecoveryLayout>
  );
}
