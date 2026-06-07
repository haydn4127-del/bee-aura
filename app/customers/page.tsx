import Panel from "../components/Panel";

export default function CustomersPage() {
  return (
    <div className="page page-section">
      <section className="page-header-block">
        <div>
          <p className="eyebrow">Customer intelligence</p>
          <h1>View your service book and customer relationships clearly.</h1>
        </div>
      </section>

      <section className="dashboard-grid customers-grid">
        <Panel title="Top customers" subtitle="Highest value relationships">
          <ul className="customer-list">
            <li>
              <div>
                <p className="customer-name">Nova Studios</p>
                <p>Monthly subscription</p>
              </div>
              <span>£1,200</span>
            </li>
            <li>
              <div>
                <p className="customer-name">Luna Wellness</p>
                <p>Quarterly package</p>
              </div>
              <span>£860</span>
            </li>
            <li>
              <div>
                <p className="customer-name">Aria Creative</p>
                <p>Growth program</p>
              </div>
              <span>£680</span>
            </li>
          </ul>
        </Panel>

        <Panel title="Customer health" subtitle="Engagement and retention snapshot">
          <div className="health-summary">
            <div>
              <p>Retention</p>
              <strong>92%</strong>
            </div>
            <div>
              <p>Active clients</p>
              <strong>56</strong>
            </div>
          </div>
        </Panel>
      </section>
    </div>
  );
}
