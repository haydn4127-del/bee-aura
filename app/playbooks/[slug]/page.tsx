import Link from "next/link";
import { notFound } from "next/navigation";
import { playbookBySlug, recoveryPlaybooks } from "../../recovery/recoveryData";
import { ActionRow, RecoveryLayout, cx, styles, toneClass } from "../../recovery/RecoveryUi";

export function generateStaticParams() {
  return recoveryPlaybooks.map((item) => ({ slug: item.slug }));
}

export default async function PlaybookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const playbook = playbookBySlug[slug];

  if (!playbook) {
    notFound();
  }

  return (
    <RecoveryLayout>
      <section className={cx(styles.playbookHero, toneClass(playbook.tone))}>
        <div>
          <p className={styles.eyebrow}>RECOVERY PLAYBOOK</p>
          <h1>{playbook.title}</h1>
          <p>{playbook.why}</p>
          <ActionRow>
            <Link className={styles.primary} href="/solo/today">Back to queue</Link>
            <Link className={styles.secondary} href="/control-centre/settings">Open guardrails</Link>
          </ActionRow>
        </div>
        <aside className={styles.sticky}>
          <p className={styles.eyebrow}>TRIGGER</p>
          <h2>{playbook.trigger}</h2>
        </aside>
      </section>

      <section className={styles.playbookGrid}>
        <article className={styles.card}>
          <span>Safe move</span>
          <h2>{playbook.safeMove}</h2>
        </article>
        <article className={styles.card}>
          <span>Owner rule</span>
          <h2>{playbook.ownerRule}</h2>
        </article>
        <article className={styles.card}>
          <span>Proof event</span>
          <h2>{playbook.proofEvent}</h2>
        </article>
        <article className={styles.card}>
          <span>System use</span>
          <h2>Decision visible before customer-facing action.</h2>
        </article>
      </section>

      <section className={styles.compare}>
        <article className={cx(styles.compareCard, styles.blocked)}>
          <span>Do not send</span>
          <h2>{playbook.blockedWording}</h2>
        </article>
        <article className={cx(styles.compareCard, styles.safe)}>
          <span>Safer wording</span>
          <h2>{playbook.safeWording}</h2>
        </article>
      </section>
    </RecoveryLayout>
  );
}
