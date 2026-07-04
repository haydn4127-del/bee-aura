import Link from "next/link";
import { ControlCentreNav } from "../ControlCentreNav";
import { controlDeepThinking, proofItems, reportCards, systemPulse } from "../controlCentreData";

const thinking = controlDeepThinking.reports;

export default function ControlCentreReportsPage() {
  return (
    <main className="controlCentreV4">
      <section className="controlPageHeaderV4">
        <div>
          <p className="controlEyebrowV4">REPORTS</p>
          <h1>AI reports that explain what matters and why.</h1>
          <p>
            Aura turns customer activity into plain-English signals: what moved,
            what stalled, what improved and where the owner should look next.
          </p>
        </div>
        <Link className="controlSecondaryActionV4" href="/control-centre/proof">
          View proof pack
        </Link>
      </section>

      <ControlCentreNav active="/control-centre/reports" />

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

      <section className="controlReportsGridV4">
        {reportCards.map((report) => (
          <article key={report.title} className={`controlReportCardV4 controlTone-${report.tone}V4`}>
            <div className="controlReportCardTopV4">
              <span>{report.label}</span>
              <strong>{report.score}%</strong>
            </div>
            <h2>{report.title}</h2>
            <p>{report.detail}</p>
            <div className="controlBarTrackV4">
              <i style={{ width: `${report.score}%` }} />
            </div>
            <Link href={report.href}>{report.action}</Link>
          </article>
        ))}
      </section>

      <section className="controlTwoColumnV4">
        <article className="controlInsightCardV4 controlTone-blueV4">
          <span>Executive summary</span>
          <h2>Aura's read of the week.</h2>
          <ul>
            {systemPulse.map((item) => (
              <li key={item.label}>
                <strong>{item.value}</strong>
                <small>{item.detail}</small>
              </li>
            ))}
          </ul>
        </article>

        <article className="controlInsightCardV4 controlTone-greenV4">
          <span>Proof behind the numbers</span>
          <h2>Reports are backed by events.</h2>
          <ul>
            {proofItems.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <small>{item.status}</small>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
