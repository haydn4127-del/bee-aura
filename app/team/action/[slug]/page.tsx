import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeamAction, teamActions } from "../../teamData";

export function generateStaticParams() {
  return teamActions.map((action) => ({ slug: action.slug }));
}

export default async function TeamActionDetailPage({
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
    <main className="teamPackagePage teamPackageV3">
      <section className="teamHeaderV3">
        <div>
          <p className="simpleEyebrow">TEAM ACTION</p>
          <h1>{action.title}</h1>
          <p>{action.summary}</p>
        </div>

        <div className="teamBadgeV3">
          <span>{action.label}</span>
          <strong>{action.customer}</strong>
        </div>
      </section>

      <section className="teamDetailGridV3">
        <article className="teamDetailPanelV3">
          <p className="simpleEyebrow">WHAT AURA PREPARED</p>
          <h2>Aura sorted the useful bits before the team stepped in.</h2>
          <ul>
            {action.auraPrepared.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="teamDetailPanelV3">
          <p className="simpleEyebrow">TEAM NEXT STEPS</p>
          <h2>{action.result}</h2>
          <ul>
            {action.teamSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="teamButtonRowV3">
            <Link href={action.backHref}>Back to team view</Link>
            <Link href={action.customerHref}>Customer context</Link>
          </div>
        </article>
      </section>
    </main>
  );
}
