import { recoveryCases } from "../../recovery/recoveryData";
import { RecoveryLayout, styles } from "../../recovery/RecoveryUi";

const flagship = recoveryCases[0];

export default function ControlCentreProofPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>PROOF TIMELINE</p>
          <h1>Proof of what happened, who decided and when.</h1>
          <p>Proof is the trust layer: message, risk, draft, hold, approval, call, assignment and outcome.</p>
        </div>
      </section>

      <section className={styles.split}>
        <div className={styles.timeline}>
          {flagship.proof.map((event) => (
            <article key={event} className={styles.timelineEvent}>
              <time>{event.slice(0, 5)}</time>
              <div>
                <h3>{event.slice(6)}</h3>
                <p>{flagship.title}</p>
              </div>
            </article>
          ))}
        </div>
        <aside className={styles.sticky}>
          <p className={styles.eyebrow}>WHY THIS MATTERS</p>
          <h2>Proof makes the system trustworthy.</h2>
          <p>The product should show the reason, the human checkpoint and the evidence trail.</p>
        </aside>
      </section>
    </RecoveryLayout>
  );
}
