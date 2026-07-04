import Link from "next/link";
import { ControlCentreNav } from "./ControlCentreNav";
import {
  commandFocus,
  commandStats,
  controlDeepThinking,
  reportCards,
  systemPulse,
} from "./controlCentreData";

const thinking = controlDeepThinking.command;

export default function ControlCentrePage() {
  return (
    <main className="controlCentreV4">
      <section className="controlHeroV4">
        <div className="controlHeroCopyV4">
          <p className="controlEyebrowV4">CONTROL CENTRE DEMO</p>
          <h1>Aura reads the whole day and turns it into owner decisions.</h1>
          <p>
            The Control Centre shows what is live, what is protected, what needs
            fixing and what the owner should improve next. One AI brain, made simple.
          </p>
          <div className="controlHeroActionsV4">
            <Link className="controlPrimaryActionV4" href="/control-centre/overview">
              Open business overview
            </Link>
            <Link className="controlSecondaryActionV4" href="/control-centre/system">
              Review needs fixing
            </Link>
          </div>
        </div>

        <aside className="controlBrainPanelV4" aria-label="Aura executive brief">
          <div className="controlBrainTopV4">
            <span className="controlBluePulseV4" />
            <div>
              <strong>Aura Executive Brief</strong>
              <p>Healthy today. Two owner checks need attention.</p>
            </div>
          </div>

          <div className={`controlThinkingNoteV5 controlTone-${thinking.tone}V4`}>
            <span>{thinking.label}</span>
            <strong>{thinking.title}</strong>
            <p>{thinking.ownerPlain}</p>
          </div>

          <ul className="controlPulseListV4">
            {systemPulse.map((item) => (
              <li key={item.label} className={`controlTone-${item.tone}V4`}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <small>{item.detail}</small>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <ControlCentreNav active="/control-centre" />

      <section className={`controlThinkingStripV5 controlTone-${thinking.tone}V4`}>
        <div>
          <span>{thinking.label}</span>
          <h2>{thinking.lead}</h2>
          <p>{thinking.ownerPlain}</p>
        </div>
        <ul>
          {thinking.aiWork.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link href={thinking.href}>{thinking.nextAction}</Link>
      </section>

      <section className="controlStatGridV4" aria-label="Control Centre status">
        {commandStats.map((stat) => (
          <article key={stat.label} className={`controlStatCardV4 controlTone-${stat.tone}V4`}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <p>{stat.detail}</p>
          </article>
        ))}
      </section>

      <section className="controlCommandGridV4">
        <div className="controlFocusStackV4">
          <div className="controlSectionHeadV4">
            <p className="controlEyebrowV4">TODAY'S COMMAND LIST</p>
            <h2>What the owner should look at first.</h2>
          </div>

          {commandFocus.map((item) => (
            <article key={item.title} className={`controlFocusCardV4 controlTone-${item.tone}V4`}>
              <div>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
              <Link href={item.href}>{item.action}</Link>
            </article>
          ))}
        </div>

        <aside className="controlReportPreviewV4">
          <p className="controlEyebrowV4">REPORT SIGNALS</p>
          <h2>Proof that the system is doing useful work.</h2>
          <div className="controlMiniReportListV4">
            {reportCards.slice(0, 3).map((report) => (
              <Link key={report.title} href={report.href} className={`controlTone-${report.tone}V4`}>
                <span>{report.label}</span>
                <strong>{report.title}</strong>
                <small>{report.score}% signal strength</small>
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
