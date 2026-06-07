import Panel from "../components/Panel";

export default function MessagesPage() {
  return (
    <div className="page page-section">
      <section className="page-header-block">
        <div>
          <p className="eyebrow">Message automation</p>
          <h1>Manage conversations and keep every engagement moving forward.</h1>
        </div>
      </section>

      <section className="dashboard-grid messages-grid">
        <Panel title="Recent conversations" subtitle="Latest communication streams">
          <ul className="message-list">
            <li>
              <div>
                <p className="message-title">New inquiry from Mason</p>
                <p className="message-desc">Interested in a discovery call for service planning.</p>
              </div>
              <span>2 min ago</span>
            </li>
            <li>
              <div>
                <p className="message-title">Follow-up to Olivia</p>
                <p className="message-desc">Reminder sent for appointment confirmation.</p>
              </div>
              <span>15 min ago</span>
            </li>
            <li>
              <div>
                <p className="message-title">Automated note for Liam</p>
                <p className="message-desc">Lead captured from landing page chat.</p>
              </div>
              <span>38 min ago</span>
            </li>
          </ul>
        </Panel>

        <Panel title="AI message health" subtitle="Performance snapshot">
          <div className="message-summary">
            <div>
              <p>Open response rate</p>
              <strong>94%</strong>
            </div>
            <div>
              <p>Average reply time</p>
              <strong>5 min</strong>
            </div>
            <div>
              <p>Auto-responses sent</p>
              <strong>48</strong>
            </div>
          </div>
        </Panel>
      </section>
    </div>
  );
}
