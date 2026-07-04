import Link from "next/link";
import { teamItems } from "../teamData";

const assignmentItems = teamItems.filter((item) => !item.needsOwnerCheck);

export default function TeamAssignmentsPage() {
  return (
    <main className="teamOpsV4">
      <section className="teamPageHeaderV4">
        <div>
          <p className="teamEyebrowV4">TEAM ASSIGNMENTS</p>
          <h1>Who owns what before the day gets noisy?</h1>
          <p>
            Aura suggests ownership so fresh work does not drift. The team can accept,
            change or escalate the next move.
          </p>
        </div>
        <Link className="teamSecondaryActionV4" href="/team/queue">
          Open shared queue
        </Link>
      </section>

      <section className="teamAssignmentDeskV4">
        {assignmentItems.map((item) => (
          <article key={item.slug} className={`teamAssignmentRowV4 teamTone-${item.tone}V4`}>
            <div className="teamAssignmentOwnerV4">
              <span>{item.ownerRole}</span>
              <strong>{item.owner}</strong>
              <small>{item.age}</small>
            </div>

            <div className="teamAssignmentMainV4">
              <div className="teamCardMetaV4">
                <span>{item.priority}</span>
                <small>{item.source}</small>
              </div>
              <h2>{item.title}</h2>
              <p>{item.detail}</p>
              <div className="teamAssignmentReasonV4">
                <span>Aura reason</span>
                <strong>{item.auraMove}</strong>
              </div>
            </div>

            <div className="teamAssignmentActionsV4">
              <Link className="teamPrimaryActionV4" href={item.href}>
                {item.action}
              </Link>
              <Link className="teamGhostActionV4" href={item.customerHref}>
                Customer
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
