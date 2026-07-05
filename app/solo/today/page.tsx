import { recoveryCases } from "../../recovery/recoveryData";
import { CaseCard, RecoveryLayout, styles } from "../../recovery/RecoveryUi";

export default function SoloTodayPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>SOLO TODAY</p>
          <h1>Enquiries that need a decision.</h1>
          <p>
            Sorted by risk, not noise. Each case shows what came in, why it matters,
            what was prepared or held and what decision is next.
          </p>
        </div>
        <aside className={styles.headerAside}>
          <strong>{recoveryCases.length} cases surfaced</strong>
          <span>4 owner checks</span>
          <span>2 proof gaps to close</span>
        </aside>
      </section>

      <section className={styles.split}>
        <div className={styles.list}>
          {recoveryCases.map((item, index) => (
            <CaseCard key={item.slug} item={item} index={index} />
          ))}
        </div>

        <aside className={styles.sticky}>
          <p className={styles.eyebrow}>DECISION STACK</p>
          <h2>Bee-Aura shows what should not be guessed.</h2>
          <div className={styles.stack}>
            <article>
              <span>What came in</span>
              <strong>Urgent, vague, duplicated or cooling customer signal.</strong>
            </article>
            <article>
              <span>Why it matters</span>
              <strong>Timing, price, responsibility or safety can be risky.</strong>
            </article>
            <article>
              <span>What is held</span>
              <strong>Risky wording waits for the owner or engineer.</strong>
            </article>
            <article>
              <span>What proof records</span>
              <strong>Message, risk, draft, decision and outcome.</strong>
            </article>
          </div>
        </aside>
      </section>
    </RecoveryLayout>
  );
}
