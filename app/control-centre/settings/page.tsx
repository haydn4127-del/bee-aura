import Link from "next/link";

const metrics = [
  [
    "Money at risk",
    "£1,180",
    "Recoverable today"
  ],
  [
    "Proof ready",
    "6",
    "Reviews/cases"
  ],
  [
    "System issue",
    "1",
    "Needs fixing"
  ],
  [
    "AI reports",
    "3",
    "Prepared"
  ]
] as const;
const panels = [
  [
    "Performance",
    "Web enquiries are slower this week. Aura recommends priority routing.",
    "/control-centre/reports"
  ],
  [
    "Proof Pack",
    "Completed jobs and reviews are ready for proof-backed sales material.",
    "/control-centre/proof"
  ],
  [
    "Needs Fixing",
    "One route failed and has been surfaced before becoming a silent issue.",
    "/control-centre/system"
  ],
  [
    "Permissions",
    "Owner approval rules and team permissions are visible in admin.",
    "/control-centre/settings"
  ]
] as const;

export default function ControlCentreDemoPage() {
  return (
    <main className="demoIdentityPage controlIdentityPage">
      <section className="controlCommandHero">
        <div>
          <p className="simpleEyebrow">CONTROL SETTINGS</p>
          <h1>Permissions, owner approvals and admin control.</h1>
          <p>
            Control Centre is the deepest Bee-Aura demo. It keeps the power of the original
            system but presents it as reporting, proof, system health and owner control.
          </p>
        </div>

        <div className="controlAuraCommand">
          <img src="/brand/source/aura-assistant-transparent.png" alt="Aura assistant" />
          <strong>Aura Control Mode</strong>
          <span>Watching performance, proof, approvals and system issues.</span>
        </div>
      </section>

      <section className="controlMetricGrid">
        {metrics.map(([label, value, detail]) => (
          <article className="controlMetricCard" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{detail}</small>
          </article>
        ))}
      </section>

      <section className="controlDashboardGrid">
        <div className="controlReportPanel">
          <div className="controlPanelHeader">
            <div>
              <p className="simpleEyebrow">AI BUSINESS REPORT</p>
              <h2>Aura found slower web enquiry replies this week.</h2>
            </div>
            <Link href="/control-centre/reports">Open reports</Link>
          </div>

          <div className="controlBars" aria-label="Demo response performance">
            <div><span>Calls</span><i style={{ width: "86%" }} /></div>
            <div><span>Website</span><i style={{ width: "52%" }} /></div>
            <div><span>WhatsApp</span><i style={{ width: "74%" }} /></div>
            <div><span>Reviews</span><i style={{ width: "68%" }} /></div>
          </div>
        </div>

        <div className="controlPanelStack">
          {panels.map(([title, detail, href]) => (
            <Link href={href} className="controlMiniPanel" key={title}>
              <span>{title}</span>
              <p>{detail}</p>
              <strong>Open →</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="controlDeepLinks">
        <Link href="/control-centre/overview">Overview</Link>
        <Link href="/control-centre/reports">Reports</Link>
        <Link href="/control-centre/proof">Proof</Link>
        <Link href="/control-centre/system">System</Link>
        <Link href="/control-centre/settings">Settings</Link>
      </section>
    </main>
  );
}
