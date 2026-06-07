import Panel from "../components/Panel";
import KpiCard from "../components/KpiCard";

const leads = [
  {
    name: "Emma Wilson",
    contact: "emma@hiveagency.com",
    service: "Conversion Strategy",
    source: "Google Ads",
    status: "New",
    priority: "High",
    value: "£760",
    lastContact: "Today",
    action: "Send first message",
  },
  {
    name: "Olivia Martin",
    contact: "olivia@mail.com",
    service: "Booking package",
    source: "Instagram",
    status: "Contacted",
    priority: "Medium",
    value: "£540",
    lastContact: "Yesterday",
    action: "Confirm appointment",
  },
  {
    name: "Peter Hughes",
    contact: "peter@designco.com",
    service: "Lead follow-up",
    source: "Website",
    status: "Hot",
    priority: "High",
    value: "£1,200",
    lastContact: "2h ago",
    action: "Review offer",
  },
  {
    name: "Sophie Carter",
    contact: "sophie@wellness.co",
    service: "Consultation",
    source: "Referral",
    status: "Follow-up",
    priority: "High",
    value: "£620",
    lastContact: "3h ago",
    action: "Schedule call",
  },
  {
    name: "Mike Bennett",
    contact: "mike@studio.ai",
    service: "VIP onboarding",
    source: "Email",
    status: "Warm",
    priority: "Medium",
    value: "£980",
    lastContact: "1d ago",
    action: "Send reminder",
  },
];

export default function LeadsPage() {
  return (
    <div className="page page-section">
      <section className="page-header-block">
        <div>
          <p className="eyebrow">Lead management</p>
          <h1>Manage every incoming lead and keep the pipeline moving.</h1>
          <p className="page-copy">A single place to review lead details, prioritize outreach, and close deals faster.</p>
        </div>
      </section>

      <section className="kpi-grid">
        <KpiCard title="New leads" value="127" detail="Today" accent="gold" />
        <KpiCard title="Hot leads" value="38" detail="Priority" accent="blue" />
        <KpiCard title="Follow-ups" value="52" detail="Scheduled" accent="cyan" />
      </section>

      <section className="panel full-width">
        <div className="panel-header">
          <div>
            <h2>Active leads</h2>
            <p>Lead contact, status and next action for recovery.</p>
          </div>
        </div>
        <div className="lead-table">
          <div className="table-row table-head">
            <div>Name / contact</div>
            <div>Service</div>
            <div>Source</div>
            <div>Status</div>
            <div>Priority</div>
            <div>Value</div>
            <div>Next action</div>
          </div>
          {leads.map((lead) => (
            <div key={lead.name} className="table-row">
              <div>
                <p className="lead-name">{lead.name}</p>
                <p className="lead-contact">{lead.contact}</p>
              </div>
              <div>{lead.service}</div>
              <div>{lead.source}</div>
              <div>
                <span className={`status-pill status-pill--${lead.status.toLowerCase().replace(" ", "-")}`}>
                  {lead.status}
                </span>
              </div>
              <div>{lead.priority}</div>
              <div>{lead.value}</div>
              <div>{lead.action}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
