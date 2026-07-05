import Link from "next/link";
import {
  demoBusiness,
  recoveryCases,
  recoveryPillars,
  recoveryVerticals,
} from "./recovery/recoveryData";
import { ActionRow, RecoveryLayout, styles, toneClass, cx } from "./recovery/RecoveryUi";

const flagship = recoveryCases[0];

export default function Home() {
  return (
    <RecoveryLayout>
      <section className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>BEE-AURA FINAL DEMO</p>
          <h1>Owner-safe enquiry recovery for service teams.</h1>
          <p>
            Bee-Aura turns vague, urgent and cooling enquiries into the next safe action,
            owner-approved risky replies and a proof trail the team can trust.
          </p>
          <p>
            It starts with plumbing and heating because the risk is easy to see:
            timing, price, landlord context, safety wording and callbacks. The same
            recovery-control loop can expand across service businesses.
          </p>
          <ActionRow>
            <Link className={styles.primary} href="/solo/today">Open decision queue</Link>
            <Link className={styles.secondary} href="/team/queue">See team handover</Link>
            <Link className={styles.secondary} href="/control-centre">Open risk board</Link>
          </ActionRow>
          <div className={styles.pills}>
            <span>Not call answering</span>
            <span>Not a job board</span>
            <span>Not a quote builder</span>
            <span>No risky auto-send</span>
          </div>
        </div>

        <article className={cx(styles.flagship, toneClass(flagship.tone))}>
          <span>ENQUIRY AT RISK</span>
          <h2>{flagship.customer}: tenant has no hot water.</h2>
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
              <span className={styles.factLabel}>Approval</span>
              <strong>{flagship.ownerDecision}</strong>
            </div>
            <div className={styles.fact}>
              <span className={styles.factLabel}>Proof</span>
              <strong>{flagship.proof.join(" → ")}</strong>
            </div>
          </div>
          <ActionRow>
            <Link className={styles.primary} href={`/playbooks/${flagship.playbook}`}>
              Review flagship decision
            </Link>
          </ActionRow>
        </article>
      </section>

      <section className={styles.modeGrid}>
        <Link className={styles.card} href="/solo">
          <span>Solo</span>
          <h2>One risky enquiry. One safe next move.</h2>
          <p>For owner-led teams that need the clearest possible view of what needs attention now.</p>
          <strong>Open Solo</strong>
        </Link>
        <Link className={styles.card} href="/team">
          <span>Team</span>
          <h2>Ownership, handover and held replies.</h2>
          <p>For admin, owner and engineer handover before anyone replies too fast.</p>
          <strong>Open Team</strong>
        </Link>
        <Link className={styles.card} href="/control-centre">
          <span>Control Centre</span>
          <h2>Risk, proof and guardrails across the week.</h2>
          <p>The owner sees what is blocked, cooling, duplicated or missing proof.</p>
          <strong>Open Control</strong>
        </Link>
      </section>

      <section className={styles.pillarGrid}>
        {recoveryPillars.map((pillar) => (
          <article key={pillar.title} className={cx(styles.card, toneClass(pillar.tone))}>
            <span>{pillar.label}</span>
            <h2>{pillar.title}</h2>
            <p>{pillar.detail}</p>
            <strong>{pillar.proof}</strong>
          </article>
        ))}
      </section>

      <section className={styles.verticalGrid}>
        {recoveryVerticals.map((vertical) => (
          <article key={vertical.title} className={styles.card}>
            <span>{vertical.status}</span>
            <h2>{vertical.title}</h2>
            <p>{vertical.summary}</p>
            <strong>{vertical.fit}</strong>
          </article>
        ))}
      </section>

      <section className={styles.panel}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>SYSTEM RULE</p>
          <h2>Grow through recovery, approval, handover and proof.</h2>
          <p>{demoBusiness.systemLine}</p>
        </div>
      </section>
    </RecoveryLayout>
  );
}
