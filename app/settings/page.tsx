import Panel from "../components/Panel";

export default function SettingsPage() {
  return (
    <div className="page page-section">
      <section className="page-header-block">
        <div>
          <p className="eyebrow">Settings</p>
          <h1>Control how Bee-Aura supports your lead recovery workflow.</h1>
          <p className="page-copy">Simple controls for profile, automation tone, and notifications.</p>
        </div>
      </section>

      <section className="settings-grid">
        <Panel title="Business profile" subtitle="Core workspace details">
          <div className="settings-list">
            <div>
              <p>Business name</p>
              <strong>Bee-Aura AI</strong>
            </div>
            <div>
              <p>Owner</p>
              <strong>Hive Master</strong>
            </div>
            <div>
              <p>Timezone</p>
              <strong>GMT+1</strong>
            </div>
          </div>
        </Panel>

        <Panel title="AI assistant tone" subtitle="Conversation style and rules">
          <div className="settings-list">
            <div>
              <p>Tone</p>
              <strong>Professional</strong>
            </div>
            <div>
              <p>Reply style</p>
              <strong>Concise and helpful</strong>
            </div>
            <div>
              <p>Approval required</p>
              <strong>For high-value leads</strong>
            </div>
          </div>
        </Panel>

        <Panel title="Notification preferences" subtitle="Alerts and owner updates">
          <div className="settings-list">
            <div>
              <p>Email alerts</p>
              <strong>Enabled</strong>
            </div>
            <div>
              <p>SMS summaries</p>
              <strong>Disabled</strong>
            </div>
            <div>
              <p>Daily digest</p>
              <strong>Enabled</strong>
            </div>
          </div>
        </Panel>

        <Panel title="Follow-up rules" subtitle="When the assistant should act">
          <div className="automation-list">
            <div>
              <p>Lead reminder</p>
              <span className="pill">After 4 hours</span>
            </div>
            <div>
              <p>Booking follow-up</p>
              <span className="pill">Same day</span>
            </div>
            <div>
              <p>Review request</p>
              <span className="pill">After booking</span>
            </div>
          </div>
        </Panel>
      </section>
    </div>
  );
}
