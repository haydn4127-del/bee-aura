import Link from "next/link";
import { ControlCentreNav } from "../ControlCentreNav";
import {
  commandFocus,
  commandStats,
  controlDeepThinking,
  overviewPanels,
  reportCards,
} from "../controlCentreData";

const thinking = controlDeepThinking.overview;

export default function ControlCentreOverviewPage() {
  return (
    <main className="controlCentreV4">
      <section className="controlPageHeaderV4">
        <div>
          <p className="controlEyebrowV4">BUSINESS OVERVIEW</p>
          <h1>The owner sees the whole day, the risks and the next move.</h1>
          <p>
            Aura has already sorted the noise into three useful buckets: protect,
            fix and improve.
          </p>
        </div>
        <Link className="controlSecondaryActionV4" href="/control-centre">
          Back to command
        </Link>
      </section>

      <ControlCentreNav active="/control-centre/overview" />

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

      <section className="controlStatGridV4">
        {commandStats.map((stat) => (
          <article key={stat.label} className={`controlStatCardV4 controlTone-${stat.tone}V4`}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <p>{stat.detail}</p>
          </article>
        ))}
      </section>

      <section className="controlOverviewGridV4">
        {overviewPanels.map((panel) => (
          <article key={panel.title} className={`controlInsightCardV4 controlTone-${panel.tone}V4`}>
            <span>{panel.detail}</span>
            <h2>{panel.title}</h2>
            <ul>
              {panel.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="controlTwoColumnV4">
        <div className="controlFocusStackV4">
          <div className="controlSectionHeadV4">
            <p className="controlEyebrowV4">OWNER DECISIONS</p>
            <h2>Three things worth opening first.</h2>
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
          <p className="controlEyebrowV4">VALUE RISK RADAR</p>
          <h2>Where warm work may cool down.</h2>
          <div className="controlBarListV4">
            {reportCards.map((report) => (
              <Link key={report.title} href={report.href} className={`controlBarCardV4 controlTone-${report.tone}V4`}>
                <div>
                  <span>{report.label}</span>
                  <strong>{report.title}</strong>
                </div>
                <div className="controlBarTrackV4">
                  <i style={{ width: `${report.score}%` }} />
                </div>
                <small>{report.score}%</small>
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
