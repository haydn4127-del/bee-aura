import Panel from "../components/Panel";

const customers = [
  {
    name: "Emma Wilson",
    contact: "emma@hiveagency.com",
    service: "Strategy Retainer",
    value: "£4,200",
    lastInteraction: "Today",
    action: "Send service plan",
  },
  {
    name: "Olivia Martin",
    contact: "olivia@mail.com",
    service: "Booking package",
    value: "£2,100",
    lastInteraction: "Yesterday",
    action: "Confirm booking",
  },
  {
    name: "Peter Hughes",
    contact: "peter@designco.com",
    service: "Follow-up coaching",
    value: "£3,600",
    lastInteraction: "2 days ago",
    action: "Share progress note",
  },
  {
    name: "Sophie Carter",
    contact: "sophie@wellness.co",
    service: "Onboarding",
    value: "£1,800",
    lastInteraction: "3 hours ago",
    action: "Review next step",
  },
];

export default function CustomersPage() {
  return (
    <div className="page page-section">
      <section className="page-header-block">
        <div>
          <p className="eyebrow">CRM</p>
          <h1>Keep client relationships visible and easy to manage.</h1>
          <p className="page-copy">A simple customer book with value, touchpoints and next actions.</p>
        </div>
      </section>

      <section className="panel full-width">
        <div className="panel-header">
          <div>
            <h2>Customer list</h2>
            <p>Active relationships and recent interactions.</p>
          </div>
        </div>
        <div className="customer-list">
          <div className="table-row table-head">
            <div>Customer</div>
            <div>Contact</div>
            <div>Service history</div>
            <div>Value</div>
            <div>Last interaction</div>
            <div>Next action</div>
          </div>
          {customers.map((customer) => (
            <div key={customer.name} className="table-row">
              <div>
                <p className="lead-name">{customer.name}</p>
              </div>
              <div>{customer.contact}</div>
              <div>{customer.service}</div>
              <div>{customer.value}</div>
              <div>{customer.lastInteraction}</div>
              <div>{customer.action}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
