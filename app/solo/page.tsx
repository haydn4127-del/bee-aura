import Link from "next/link";
import { recoveryCases, recoveryPillars } from "../recovery/recoveryData";
import { ActionRow, CompactCase, RecoveryLayout, cx, styles, toneClass } from "../recovery/RecoveryUi";

const flagship = recoveryCases[0];

export default function SoloDemoPage() {
  return (
    <RecoveryLayout>
      <section className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>SOLO DEMO</p>
          <h1>One risky enquiry. One safe next move.</h1>
          <p>
            Solo is the decision surface. It opens on the enquiry most likely to be
            mishandled, why it is risky and what the owner should approve next.
          </p>
          <ActionRow>
            <Link className={styles.primary} href="/solo/today">Open Solo Today</Link>
            <Link className={styles.secondary} href={`/playbooks/${flagship.playbook}`}>Review flagship case</Link>
          </ActionRow>
        </div>

        <article className={cx(styles.flagship, toneClass(flagship.tone))}>
          <span>{flagship.status}</span>
          <h2>{flagship.customer}: tenant has no hot water</h2>
          <p>{flagship.message}</p>
          <div className={styles.factStack}>
            <div className={styles.fact}>
              <span className={styles.factLabel}>Risk</span>
              <strong>{flagship.riskLabels.join(" · ")}</strong>
            </div>
            <div className={styles.fact}>
              <span className={styles.factLabel}>Next move</span>
              <strong>{flagship.nextMove}</strong>
            </div>
            <div className={styles.fact}>
              <span className={styles.factLabel}>Owner decision</span>
              <strong>{flagship.ownerDecision}</strong>
            </div>
          </div>
        </article>
      </section>

      <section className={styles.caseGrid}>
        {recoveryCases.slice(1, 4).map((item) => (
          <CompactCase key={item.slug} item={item} />
        ))}
      </section>

      <section className={styles.panel}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>SOLO CONTROL LOOP</p>
          <h2>Signal → safe next move → owner approval → proof.</h2>
          <p>
            Every feature must strengthen the same loop. Anything that turns Bee-Aura
            into a job board, quote builder or generic dashboard is cut.
          </p>
        </div>
        <div className={styles.pillarGrid}>
          {recoveryPillars.slice(0, 4).map((pillar) => (
            <article key={pillar.title} className={styles.card}>
              <span>{pillar.label}</span>
              <h2>{pillar.title}</h2>
              <p>{pillar.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </RecoveryLayout>
  );
}
