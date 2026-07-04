import Link from "next/link";
import { ControlCentreNav } from "../ControlCentreNav";
import { controlDeepThinking, proofItems, proofTimeline } from "../controlCentreData";

const thinking = controlDeepThinking.proof;

export default function ControlCentreProofPage() {
  return (
    <main className="controlCentreV4">
      <section className="controlPageHeaderV4">
        <div>
          <p className="controlEyebrowV4">PROOF PACK</p>
          <h1>Proof of what Aura prepared, protected and paused.</h1>
          <p>
            Proof turns the invisible AI work into something the owner can trust:
            held replies, follow-ups, review asks, duplicate warnings and safety checks.
          </p>
        </div>
        <Link className="controlSecondaryActionV4" href="/control-centre/reports">
          Open reports
        </Link>
      </section>

      <ControlCentreNav active="/control-centre/proof" />

      <section className={`controlThinkingStripV5 controlTone-${thinking.tone}V4`}>
        <div>
          <span>{thinking.label}</span>
          <h2>{thinking.title}</h2>
          <p>{thinking.ownerPlain}</p>
        </div>
        <ul>
          {thinking.aiWork.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link href={thinking.href}>{thinking.nextAction}</Link>
      </section>

      <section className="controlProofGridV4">
        {proofItems.map((item) => (
          <article key={item.title} className={`controlProofCardV4 controlTone-${item.tone}V4`}>
            <span>{item.label}</span>
            <h2>{item.title}</h2>
            <p>{item.detail}</p>
            <strong>{item.status}</strong>
          </article>
        ))}
      </section>

      <section className="controlTwoColumnV4">
        <div className="controlTimelineV4">
          <div className="controlSectionHeadV4">
            <p className="controlEyebrowV4">SYSTEM HISTORY</p>
            <h2>What happened today.</h2>
          </div>
          {proofTimeline.map((event) => (
            <article key={`${event.time}-${event.title}`} className={`controlTimelineItemV4 controlTone-${event.tone}V4`}>
              <time>{event.time}</time>
              <div>
                <h3>{event.title}</h3>
                <p>{event.detail}</p>
              </div>
            </article>
          ))}
        </div>

        <aside className="controlReportPreviewV4">
          <p className="controlEyebrowV4">WHY THIS MATTERS</p>
          <h2>Trust the AI because you can see its trail.</h2>
          <p>
            Aura should not feel magic behind a curtain. This page shows what was
            prepared, what was held and what still needs a human yes.
          </p>
          <div className="controlHeroActionsV4">
            <Link className="controlPrimaryActionV4" href="/control-centre/system">
              Check system
            </Link>
            <Link className="controlSecondaryActionV4" href="/control-centre/settings">
              Review settings
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
