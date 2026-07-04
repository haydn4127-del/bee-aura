import Link from "next/link";

const demoCards = [
  {
    href: "/solo",
    label: "Solo Demo",
    title: "One owner. One clear list.",
    detail:
      "For service owners who want the next customer, reply, job and follow-up without opening a hundred tabs.",
    bestFor: "Owner-led service businesses",
    promise:
      "Aura lines up the warm leads and prepares the safe first moves. You decide what goes out.",
    points: ["Today action list", "Safe reply drafts", "Friendly nudges", "Simple customer notes"],
    cta: "Open Solo Demo",
  },
  {
    href: "/team",
    label: "Team Demo",
    title: "Shared work without the chaos.",
    detail:
      "For businesses where enquiries, jobs and follow-ups are handled by an admin, coordinator or small team.",
    bestFor: "Teams that share the day",
    promise:
      "Aura shows who owns what, what needs approval and where the next handover belongs.",
    points: ["Shared queue", "Assignments", "Owner approvals", "Team handovers"],
    cta: "Open Team Demo",
  },
  {
    href: "/control-centre",
    label: "Control Centre",
    title: "Full view. Fewer blind spots.",
    detail:
      "For owners who want the bigger picture: reports, proof, system watch, settings and AI business summaries.",
    bestFor: "Businesses wanting deeper control",
    promise:
      "Aura turns the busy bits into a clean command view, so the owner can see what matters.",
    points: ["Reports", "Proof pack", "Needs fixing", "Admin control"],
    cta: "Open Control Centre",
  },
];

const proofPills = [
  "Warm leads surfaced",
  "Safe replies prepared",
  "Follow-ups kept moving",
  "Owner approval visible",
];

export default function Home() {
  return (
    <main className="demoChooserPage">
      <nav className="demoChooserNav">
        <Link href="/" className="landing-brand">
          <img
            src="/brand/source/bee-aura-symbol.svg"
            alt="Bee-Aura logo"
            className="landing-brand-emblem"
          />
          <div className="landing-brand-text">
            <span className="landing-brand-title">BEE-AURA AI SYSTEMS</span>
            <span className="landing-brand-subline">Lead Recovery OS</span>
          </div>
        </Link>

        <div className="demoChooserNavLinks">
          <Link href="/solo">Solo</Link>
          <Link href="/team">Team</Link>
          <Link href="/control-centre">Control Centre</Link>
        </div>
      </nav>

      <section className="demoChooserHero demoChooserHeroSales">
        <p className="simpleEyebrow">CHOOSE YOUR BEE-AURA DEMO</p>
        <h1>Warm leads do not wait around. Aura helps you catch them.</h1>
        <p>
          Bee-Aura is designed for service businesses that need a clearer way to
          spot fresh enquiries, prepare safe replies, keep follow-ups warm and see
          what needs attention next.
        </p>
        <p>
          Same Aura AI brain. Three ways to use it. Pick the demo that matches how the business works today: one owner, shared team, or full command view. Each mode keeps customer context, lead status, next actions and proof in one place.
        </p>

        <div className="demoChooserHeroActions">
          <Link href="/solo">Try Solo</Link>
          <Link href="/team">See Team</Link>
          <Link href="/control-centre">Open Control Centre</Link>
        </div>

        <div className="demoChooserPromiseRow" aria-label="Bee-Aura demo highlights">
          {proofPills.map((pill) => (
            <span key={pill}>{pill}</span>
          ))}
        </div>
      </section>

      <section className="demoChooserGrid" aria-label="Bee-Aura demo options">
        {demoCards.map((demo) => (
          <Link href={demo.href} className="demoChooserCard demoChooserCardSales" key={demo.href}>
            <div className="demoCardTop">
              <span className="demoCardLabel">{demo.label}</span>
              <small>Open demo</small>
            </div>

            <h2>{demo.title}</h2>
            <p>{demo.detail}</p>

            <strong className="demoCardFit">Best for: {demo.bestFor}</strong>
            <p className="demoCardPromise">{demo.promise}</p>

            <ul>
              {demo.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <em className="demoCardCta">{demo.cta} →</em>
          </Link>
        ))}
      </section>

      <section className="demoChooserProof demoChooserProofSales">
        <img src="/brand/source/aura-assistant-transparent.png" alt="Aura assistant" />
        <div>
          <p className="simpleEyebrow">AURA AI BRAIN</p>
          <h2>AI does the looking, sorting and drafting. You keep the final say.</h2>
          <p>
            Aura can spot warm leads, prepare safe replies, summarise the next move
            and keep follow-ups visible. Quotes, bookings, payments, complaints and
            live customer promises stay owner-controlled.
          </p>

          <div className="demoChooserProofGrid">
            <span>Aura finds the next move</span>
            <span>You stay in charge</span>
            <span>No faff, no guesswork</span>
          </div>

          <p className="demoSafetyNote">
            Interactive demo only — sample data is used to show how Bee-Aura works.
            Nothing is sent, booked, charged or connected.
          </p>
        </div>
      </section>
    </main>
  );
}
