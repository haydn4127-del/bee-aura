import KpiCard from "../components/KpiCard";
import Panel from "../components/Panel";

export default function DashboardPage() {
  return (
    <div className="page page-dashboard">
      <section className="page-header-block">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Today’s lead recovery command centre</h1>
          <p className="page-copy">
            See urgent leads, messages, bookings and follow-ups in one actionable view.
          </p>
        </div>
      </section>

      <section className="dashboard-top-cards">
        <KpiCard title="Open leads" value="127" detail="Needs review" accent="gold" />
        <KpiCard title="Hot leads" value="38" detail="Priority follow-up" accent="blue" />
        <KpiCard title="Messages" value="21" detail="Need reply" accent="blue" />
        <KpiCard title="Follow-ups" value="14" detail="Due today" accent="gold" />
        <KpiCard title="Bookings" value="9" detail="Today" accent="cyan" />
        <KpiCard title="Reviews" value="11" detail="Ready to publish" accent="gold" />
      </section>

      <section className="dashboard-grid dashboard-grid--top">
        <div className="main-panel">
          <Panel title="Owner action queue" subtitle="What needs attention first">
            <div className="task-list">
              {[
                {
                  task: "Reply to Olivia’s message",
                  detail: "High urgency — quote requested",
                  badge: "Message",
                },
                {
                  task: "Confirm booking for Emma Wilson",
                  detail: "Appointment tomorrow at 10:00",
                  badge: "Booking",
                },
                {
                  task: "Follow up with Sophie Carter",
                  detail: "Last contact 2 days ago",
                  badge: "Follow-up",
                },
                {
                  task: "Review hot lead from Google Ads",
                  detail: "Potential value £760",
                  badge: "Lead",
                },
              ].map((item) => (
                <div key={item.task} className="task-row">
                  <div>
                    <p className="task-title">{item.task}</p>
                    <p className="task-detail">{item.detail}</p>
                  </div>
                  <span className="task-badge">{item.badge}</span>
                </div>
              ))}
            </div>
          </Panel>

          <div className="dashboard-summary-grid">
            <Panel title="Pipeline value" subtitle="Estimated close value">
              <div className="status-summary-row">
                <div>
                  <p>Current pipeline</p>
                  <strong>£18,400</strong>
                </div>
                <div>
                  <p>AI drafts pending</p>
                  <strong>8</strong>
                </div>
              </div>
            </Panel>

            <Panel title="Follow-up summary" subtitle="Actions due today">
              <div className="status-summary-row">
                <div>
                  <p>Automated follow-ups</p>
                  <strong>14</strong>
                </div>
                <div>
                  <p>Manual review</p>
                  <strong>5</strong>
                </div>
              </div>
            </Panel>
          </div>
        </div>

        <div className="dashboard-aside">
          <Panel title="System status" subtitle="AI and automation health">
            <div className="status-grid compact">
              <div>
                <span>Lead capture</span>
                <strong className="status-online">Active</strong>
              </div>
              <div>
                <span>Message assistant</span>
                <strong className="status-online">Active</strong>
              </div>
              <div>
                <span>Booking engine</span>
                <strong className="status-online">Active</strong>
              </div>
              <div>
                <span>Follow-up rules</span>
                <strong className="status-online">Active</strong>
              </div>
              <div>
                <span>Calendar sync</span>
                <strong className="status-online">Online</strong>
              </div>
            </div>
          </Panel>

          <Panel title="Recent activity" subtitle="What the hive has done most recently">
            <ul className="activity-list compact">
              <li>
                <span>11:18 — New lead captured from website</span>
                <strong>Hot</strong>
              </li>
              <li>
                <span>10:50 — AI sent confirmation to Mason</span>
                <strong>Sent</strong>
              </li>
              <li>
                <span>10:32 — 2 follow-ups triggered</span>
                <strong>Done</strong>
              </li>
              <li>
                <span>09:45 — Lead scored as hot</span>
                <strong>Review</strong>
              </li>
            </ul>
          </Panel>
        </div>
      </section>

      <section className="dashboard-grid dashboard-grid--secondary">
        <Panel title="Booking summary" subtitle="Confirmed and pending sessions">
          <div className="status-summary-row">
            <div>
              <p>Confirmed today</p>
              <strong>9</strong>
            </div>
            <div>
              <p>Pending approval</p>
              <strong>3</strong>
            </div>
          </div>
        </Panel>

        <Panel title="Lead recovery" subtitle="Recent conversion progress">
          <div className="status-summary-row">
            <div>
              <p>Recovery rate</p>
              <strong>91%</strong>
            </div>
            <div>
              <p>Hot lead conversion</p>
              <strong>62%</strong>
            </div>
          </div>
        </Panel>

        <Panel title="Message queue" subtitle="Open threads needing action">
          <div className="status-summary-row">
            <div>
              <p>Awaiting reply</p>
              <strong>21</strong>
            </div>
            <div>
              <p>AI suggestions</p>
              <strong>6</strong>
            </div>
          </div>
        </Panel>

        <Panel title="Owner priorities" subtitle="Actions that keep the system healthy">
          <ul className="insight-list compact">
            <li>Confirm tomorrow’s appointments before 4pm.</li>
            <li>Review the top 3 hot leads from Google Ads.</li>
            <li>Approve suggested follow-up sequence for Sophie Carter.</li>
          </ul>
        </Panel>
      </section>
    </div>
  );
}
