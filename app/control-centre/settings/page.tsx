import { recoveryPlaybooks } from "../../recovery/recoveryData";
import { PlaybookCard, RecoveryLayout, styles } from "../../recovery/RecoveryUi";

export default function ControlCentreSettingsPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>OWNER GUARDRAILS</p>
          <h1>The rules that stop risky promises leaving the business.</h1>
          <p>Plain-English owner rules for timing, price, gas-safety wording, responsibility, complaints, channel use and proof.</p>
        </div>
      </section>

      <section className={styles.guardrailGrid}>
        {recoveryPlaybooks.map((playbook) => <PlaybookCard key={playbook.slug} playbook={playbook} />)}
      </section>
    </RecoveryLayout>
  );
}
