import Panel from "../components/Panel";
import KpiCard from "../components/KpiCard";

export default function LeadsPage() {
  return (
    <div className="page page-section">
      <section className="page-header-block">
        <div>
          <p className="eyebrow">Lead recovery made easy</p>
          <h1>Track every incoming lead and follow up automatically.</h1>
        </div>
      </section>

      <section className="kpi-grid">
        <KpiCard title="New Leads" value="127" detail="Today" accent="gold" />
        <KpiCard title="Hot Leads" value="38" detail="Priority" accent="blue" />
        <KpiCard title="Follow-ups" value="52" detail="Scheduled" accent="cyan" />
      </section>

      <section className="dashboard-grid leads-grid">
        <Panel title="Lead pipeline" subtitle="Recent incoming lead activity">
          <div className="lead-list">
            {[
              { name: "Sophie Carter", source: "Google", status: "New" },
              { name: "Miles Bennett", source: "Instagram", status: "Contacted" },
              { name: "Ava West", source: "Referral", status: "Booked" },
              { name: "Noah Reed", source: "Email", status: "Follow-up" },
            ].map((lead) => (
              <div key={lead.name} className="lead-row">
                <div>
                  <p className="lead-name">{lead.name}</p>
                  <p className="lead-source">{lead.source}</p>
                </div>
                <span className={`status-pill status-pill--${lead.status.toLowerCase()}`}>{lead.status}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Recovery score" subtitle="How likely leads become clients">
          <div className="score-block">
            <div className="score-value">91%</div>
            <p>Automation is converting the majority of missed opportunities.</p>
          </div>
        </Panel>
      </section>
    </div>
  );
}
