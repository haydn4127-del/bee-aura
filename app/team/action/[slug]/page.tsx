import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeamAction, teamActions } from "../../teamData";

export function generateStaticParams() {
  return teamActions.map((action) => ({ slug: action.slug }));
}

export default async function TeamActionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const action = getTeamAction(slug);

  if (!action) {
    notFound();
  }

  return (
    <main className="teamOpsV4">
      <section className="teamPageHeaderV4">
        <div>
          <p className="teamEyebrowV4">{action.label}</p>
          <h1>{action.title}</h1>
          <p>{action.summary}</p>
        </div>
        <Link className="teamSecondaryActionV4" href={action.customerHref}>
          Customer context
        </Link>
      </section>

      <section className="teamActionSplitV4">
        <article className="teamDetailCardV4">
          <div className="teamAiPillV4">Aura prepared</div>
          <h2>The useful bits are ready before the team steps in.</h2>
          <ul className="teamStepListV4">
            {action.auraPrepared.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </article>

        <article className="teamDetailCardV4">
          <div className="teamAiPillV4">Team next steps</div>
          <h2>What the team does now.</h2>
          <ol className="teamStepListV4">
            {action.teamSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>

        <aside className="teamResultCardV4">
          <span>Owner control</span>
          <strong>{action.ownerLine}</strong>
          <p>{action.result}</p>
          <div className="teamButtonRowV4">
            <Link href={action.backHref}>Back to team view</Link>
            <Link href={action.customerHref}>Customer context</Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
