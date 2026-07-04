import Link from "next/link";
import { ControlCentreNav } from "../ControlCentreNav";
import { controlDeepThinking, fixList, systemEvents } from "../controlCentreData";

const thinking = controlDeepThinking.system;

export default function ControlCentreSystemPage() {
  return (
    <main className="controlCentreV4">
      <section className="controlPageHeaderV4">
        <div>
          <p className="controlEyebrowV4">SYSTEM</p>
          <h1>Aura watches the rules, the risks and the fixes.</h1>
          <p>
            This is the maintenance brain: safety checks, gaps, paused risks and
            the small things that should be tightened before the week gets noisy.
          </p>
        </div>
        <Link className="controlSecondaryActionV4" href="/control-centre/settings">
          Open settings
        </Link>
      </section>

      <ControlCentreNav active="/control-centre/system" />

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

      <section className="controlTwoColumnV4">
        <div className="controlFocusStackV4">
          <div className="controlSectionHeadV4">
            <p className="controlEyebrowV4">NEEDS FIXING</p>
            <h2>Small fixes, big calm.</h2>
          </div>
          {fixList.map((item) => (
            <article key={item.title} className={`controlFocusCardV4 controlTone-${item.tone}V4`}>
              <div>
                <span>Fix next</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
              <Link href={item.href}>{item.action}</Link>
            </article>
          ))}
        </div>

        <aside className="controlReportPreviewV4">
          <p className="controlEyebrowV4">SYSTEM STATUS</p>
          <h2>Aura is active, but still owner-controlled.</h2>
          <p>
            Aura prepares, prioritises and organises the work. Anything that sends live,
            promises a time, gives a price, confirms a booking or handles something sensitive stays held until the right person says yes.
          </p>
          <div className="controlHeroActionsV4">
            <Link className="controlPrimaryActionV4" href="/control-centre/proof">
              View proof
            </Link>
            <Link className="controlSecondaryActionV4" href="/control-centre/overview">
              Back to overview
            </Link>
          </div>
        </aside>
      </section>

      <section className="controlSystemGridV4">
        {systemEvents.map((event) => (
          <article key={event.title} className={`controlSystemCardV4 controlTone-${event.tone}V4`}>
            <span>{event.label}</span>
            <h2>{event.title}</h2>
            <p>{event.detail}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
