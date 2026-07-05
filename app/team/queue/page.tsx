import Link from "next/link";
import {
  adminMoveCases,
  engineerCheckCases,
  ownerDecisionCases,
  proofGapCases,
  recoveryWorkCases,
} from "../../recovery/recoveryData";
import { ActionRow, RecoveryLayout, cx, styles, toneClass } from "../../recovery/RecoveryUi";

const lanes = [
  { title: "Owner decisions", summary: "Held wording that must wait before it leaves the business.", cases: ownerDecisionCases },
  { title: "Admin moves", summary: "Safe next moves the coordinator can move forward.", cases: adminMoveCases },
  { title: "Engineer checks", summary: "Technical facts needed before customer wording is safe.", cases: engineerCheckCases },
  { title: "Recovery work", summary: "Cooling, review-ready or duplicated cases that still need control.", cases: recoveryWorkCases },
  { title: "Proof gaps", summary: "Cases that cannot close until evidence is added.", cases: proofGapCases },
];

export default function TeamQueuePage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>SHARED RECOVERY QUEUE</p>
          <h1>One owner. One next move. One proof trail.</h1>
          <p>Grouped by decision type, not by generic pipeline stage.</p>
        </div>
        <Link className={styles.secondary} href="/team">Back to Team Home</Link>
      </section>

      <section className={styles.roleStrip}>
        <article><span>Owner</span><strong>Approves risky wording</strong></article>
        <article><span>Admin</span><strong>Moves safe cases forward</strong></article>
        <article><span>Engineer</span><strong>Checks technical facts</strong></article>
        <article><span>Proof</span><strong>Records who decided</strong></article>
      </section>

      <section className={styles.laneBoard}>
        {lanes.map((lane) => (
          <article key={lane.title} className={styles.lane}>
            <div className={styles.laneHead}>
              <span>{lane.title}</span>
              <strong>{lane.cases.length}</strong>
              <p>{lane.summary}</p>
            </div>
            {lane.cases.map((item) => (
              <article key={item.slug} className={cx(styles.laneCard, toneClass(item.tone))}>
                <span>{item.status}</span>
                <h2>{item.customer}</h2>
                <p>{item.title}</p>
                <dl>
                  <div><dt>Owner</dt><dd>{item.owner}</dd></div>
                  <div><dt>Hold reason</dt><dd>{item.riskLabels.slice(0, 2).join(" · ")}</dd></div>
                  <div><dt>Next move</dt><dd>{item.nextMove}</dd></div>
                </dl>
                <ActionRow>
                  <Link className={styles.primary} href={`/playbooks/${item.playbook}`}>Open playbook</Link>
                  <Link className={styles.secondary} href={`/recovery/cases/${item.slug}`}>Customer Memory</Link>
                </ActionRow>
              </article>
            ))}
          </article>
        ))}
      </section>
    </RecoveryLayout>
  );
}
