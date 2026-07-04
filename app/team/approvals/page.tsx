import Link from "next/link";
import { teamItems } from "../teamData";

const approvalItems = teamItems.filter((item) => item.needsOwnerCheck);

export default function TeamApprovalsPage() {
  return (
    <main className="teamOpsV4">
      <section className="teamPageHeaderV4">
        <div>
          <p className="teamEyebrowV4">OWNER CHECKS</p>
          <h1>The team can prepare it. The owner still makes the call.</h1>
          <p>
            Promises, sensitive replies and duplicate-message risks are held here until
            the right person approves them.
          </p>
        </div>
        <Link className="teamSecondaryActionV4" href="/team/queue">
          Back to queue
        </Link>
      </section>

      <section className="teamApprovalLayoutV4">
        <div className="teamApprovalStackV4">
          {approvalItems.map((item) => (
            <article key={item.slug} className={`teamApprovalCardV4 teamTone-${item.tone}V4`}>
              <div className="teamCardMetaV4">
                <span>{item.priority}</span>
                <small>{item.age}</small>
              </div>
              <h2>{item.title}</h2>
              <p>{item.detail}</p>
              <div className="teamApprovalHoldV4">
                <span>Held safely</span>
                <strong>{item.teamNote}</strong>
              </div>
              <div className="teamButtonRowV4">
                <Link href={item.href}>{item.action}</Link>
                <Link href={item.customerHref}>Customer context</Link>
              </div>
            </article>
          ))}
        </div>

        <aside className="teamSafetyPanelV4">
          <p className="teamEyebrowV4">WHY THIS PAGE EXISTS</p>
          <h2>Fast team, calm owner control.</h2>
          <ul>
            <li>Replies can be drafted without being sent.</li>
            <li>Duplicate messages get paused before customers see them.</li>
            <li>Promises wait for the person who can approve them.</li>
            <li>The team keeps moving without guessing.</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}
