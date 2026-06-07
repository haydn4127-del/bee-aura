import Panel from "../components/Panel";

export default function SettingsPage() {
  return (
    <div className="page page-section">
      <section className="page-header-block">
        <div>
          <p className="eyebrow">Settings & controls</p>
          <h1>Configure your Bee-Aura experience and automation preferences.</h1>
        </div>
      </section>

      <section className="dashboard-grid settings-grid">
        <Panel title="Workspace settings" subtitle="Branding, notifications and AI flow">
          <div className="settings-list">
            <div>
              <p>Brand name</p>
              <strong>Bee-Aura AI</strong>
            </div>
            <div>
              <p>Notification mode</p>
              <strong>Smart alerts</strong>
            </div>
            <div>
              <p>Conversation tone</p>
              <strong>Professional</strong>
            </div>
          </div>
        </Panel>

        <Panel title="Automation status" subtitle="Current engagement rules">
          <div className="automation-list">
            <div>
              <p>Lead capture</p>
              <span className="pill">Active</span>
            </div>
            <div>
              <p>Follow-up engine</p>
              <span className="pill">Active</span>
            </div>
            <div>
              <p>Booking assistant</p>
              <span className="pill">Active</span>
            </div>
          </div>
        </Panel>
      </section>
    </div>
  );
}
