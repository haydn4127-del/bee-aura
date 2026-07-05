import Link from "next/link";
import { proofGapCases, recoveryCases } from "../../recovery/recoveryData";
import { ActionRow, RecoveryLayout, CompactCase, styles } from "../../recovery/RecoveryUi";

const fixes = [
  {
    title: "Fix proof gap on Peter Long",
    detail: "Attach engineer note before complaint reply is released or case is marked recovered.",
    href: "/playbooks/complaint-escalation",
  },
  {
    title: "Confirm SMS channel for Margaret Lewis",
    detail: "Reminder can be prepared, but the channel basis must be clear before proactive send.",
    href: "/playbooks/review-readiness-check",
  },
  {
    title: "Review Priya approval timeout",
    detail: "If owner approval is not given, risky wording stays held and call instead becomes the safer path.",
    href: "/playbooks/same-day-promise-check",
  },
];

export default function ControlCentreSystemPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>SYSTEM FIX</p>
          <h1>Fix the gaps before they become customer problems.</h1>
          <p>System Fix shows missing proof, blocked drafts, missing channel checks, duplicate contacts and guardrails that need owner attention.</p>
        </div>
      </section>

      <section className={styles.split}>
        <div className={styles.list}>
          {fixes.map((fix) => (
            <article key={fix.title} className={styles.queueItem}>
              <div className={styles.number}>!</div>
              <div>
                <span>Fix next</span>
                <h2>{fix.title}</h2>
                <p>{fix.detail}</p>
                <ActionRow>
                  <Link className={styles.primary} href={fix.href}>Open fix</Link>
                </ActionRow>
              </div>
            </article>
          ))}
        </div>
        <aside className={styles.sticky}>
          <p className={styles.eyebrow}>OWNER-SAFE RECOVERY</p>
          <h2>Prepared work stays useful. Risky action stays held.</h2>
          <p>The system should make risk, missing proof and owner checkpoints impossible to miss.</p>
        </aside>
      </section>

      <section className={styles.caseGrid}>
        {proofGapCases.concat(recoveryCases.filter((item) => item.proof.length < 4)).map((item) => (
          <CompactCase key={item.slug} item={item} />
        ))}
      </section>
    </RecoveryLayout>
  );
}
