import { recoveryPillars, recoveryVerticals } from "../../recovery/recoveryData";
import { RecoveryLayout, cx, styles, toneClass } from "../../recovery/RecoveryUi";

export default function ControlCentreOverviewPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>SYSTEM MAP</p>
          <h1>The spine: risk, next move, approval and proof.</h1>
          <p>
            Bee-Aura can grow without becoming a booking, quote, invoice or customer database.
          </p>
        </div>
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
    </RecoveryLayout>
  );
}
