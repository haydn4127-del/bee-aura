import Link from "next/link";
import { notFound } from "next/navigation";
import { getSoloAction, soloActionDetails } from "../../soloData";

export function generateStaticParams() {
  return soloActionDetails.map((action) => ({ slug: action.slug }));
}

export default async function SoloActionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const action = getSoloAction(slug);

  if (!action) {
    notFound();
  }

  return (
    <main className="soloJourneyPage">
      <section className="soloHiddenHero">
        <div>
          <p className="simpleEyebrow">HIDDEN SOLO ACTION</p>
          <h1>{action.title}</h1>
          <p>{action.summary}</p>
        </div>
        <div className="soloHiddenBadge">
          <span>{action.label}</span>
          <strong>{action.customer}</strong>
        </div>
      </section>

      <section className="soloHiddenGrid">
        <article className="soloHiddenPanel">
          <p className="simpleEyebrow">WHAT AURA PREPARED</p>
          <h2>What Aura prepared</h2>
          <ul>
            {action.preparedByAura.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="soloHiddenPanel">
          <p className="simpleEyebrow">OWNER ACTION</p>
          <h2>{action.ownerAction}</h2>
          <p><strong>Why it matters:</strong> {action.risk}</p>
          <ul>
            {action.ownerSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="soloTodayActions">
            <Link href={action.backHref}>Back to queue</Link>
            <Link href={action.customerHref}>View customer</Link>
          </div>
        </article>

        <aside className="soloActionBrain">
          <img src="/brand/source/aura-assistant-transparent.png" alt="Aura assistant" />
          <p className="simpleEyebrow">SAFETY RULE</p>
          <h2>Aura prepared it. You stay in charge.</h2>
          <p>
            Demo only. Nothing gets sent, booked, charged or connected.
          </p>
        </aside>
      </section>
    </main>
  );
}
