import KpiCard from "../components/KpiCard";
import Panel from "../components/Panel";

export default function DashboardPage() {
  return (
    <div className="page page-dashboard">
      <section className="page-header-block">
        <div>
          <p className="eyebrow">Welcome back, Hive Master</p>
          <h1>Here’s what’s happening in your hive today.</h1>
        </div>
        <div className="filter-pills">
          <button className="pill active">Today</button>
          <button className="pill">7 Days</button>
          <button className="pill">30 Days</button>
          <button className="pill">Custom</button>
        </div>
      </section>

      <section className="kpi-grid">
        <KpiCard title="New Leads" value="127" detail="Today" accent="gold" />
        <KpiCard title="AI Calls Handled" value="89" detail="Connected" accent="blue" />
        <KpiCard title="Appointments Booked" value="24" detail="Confirmed" accent="cyan" />
        <KpiCard title="Revenue Generated" value="£3,420" detail="Projected" accent="gold" />
        <KpiCard title="Active Clients" value="56" detail="Subscribed" accent="blue" />
      </section>

      <section className="dashboard-grid">
        <Panel title="Lead Flow & Revenue Growth" subtitle="Projected conversion trends">
          <div className="chart-panel">
            <svg viewBox="0 0 800 320" className="spark-chart" aria-hidden="true">
              <defs>
                <linearGradient id="gold-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f5d76e" />
                  <stop offset="100%" stopColor="#cfa626" />
                </linearGradient>
                <linearGradient id="blue-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#5ce1ff" />
                  <stop offset="100%" stopColor="#3e8cff" />
                </linearGradient>
              </defs>
              <path d="M 56 260 C 140 230 200 210 280 195 C 360 180 420 145 500 160 C 580 175 640 140 728 120" fill="none" stroke="url(#gold-gradient)" strokeWidth="5" />
              <path d="M 56 300 C 140 265 200 240 280 235 C 360 232 420 220 500 205 C 580 190 640 175 728 165" fill="none" stroke="url(#blue-gradient)" strokeWidth="4" strokeDasharray="12 8" />
              <g className="spark-dots">
                {[72, 180, 276, 364, 460, 546, 640, 728].map((x, index) => (
                  <circle key={index} cx={x} cy={260 - index * 10} r="6" fill="#f7d66f" />
                ))}
              </g>
            </svg>
          </div>
          <div className="chart-stats-row">
            <div>
              <span>Lead velocity</span>
              <strong>+18%</strong>
            </div>
            <div>
              <span>Revenue trend</span>
              <strong>+12%</strong>
            </div>
          </div>
        </Panel>

        <Panel title="Hive Status" subtitle="System health & automation overview">
          <div className="status-grid">
            <div className="status-pill-small">Inbound automation: Active</div>
            <div className="status-pill-small">Response time: 12 min</div>
            <div className="status-pill-small">Task completion: 98%</div>
            <div className="status-pill-small">Lead capture: 91%</div>
          </div>
        </Panel>

        <Panel title="Live Activity" subtitle="Latest engagement from the hive">
          <ul className="activity-list">
            <li><span>New SMS lead received</span><strong>3 min ago</strong></li>
            <li><span>Voice assistant booked an appointment</span><strong>11 min ago</strong></li>
            <li><span>Follow-up sequence launched</span><strong>25 min ago</strong></li>
            <li><span>Client onboarding checklist updated</span><strong>39 min ago</strong></li>
          </ul>
        </Panel>

        <Panel title="Leads by Source" subtitle="Track where the hottest leads came from">
          <div className="source-bars">
            <div><span>Organic Search</span><strong>42%</strong></div>
            <div><span>Social Ads</span><strong>28%</strong></div>
            <div><span>Referrals</span><strong>18%</strong></div>
            <div><span>Email nurture</span><strong>12%</strong></div>
          </div>
        </Panel>

        <Panel title="Appointments Overview" subtitle="Upcoming sessions and booking health">
          <div className="overview-list">
            <div><span>Confirmed</span><strong>24</strong></div>
            <div><span>Pending</span><strong>8</strong></div>
            <div><span>Reschedules</span><strong>2</strong></div>
          </div>
        </Panel>

        <Panel title="AI Performance" subtitle="How the assistant is improving outcomes">
          <div className="performance-grid">
            <div><span>Conversation rating</span><strong>4.9/5</strong></div>
            <div><span>Task automation</span><strong>82%</strong></div>
            <div><span>Retention uplift</span><strong>14%</strong></div>
          </div>
        </Panel>

        <Panel title="Hive Intelligence" subtitle="Insights powering your decisions">
          <ul className="insight-list">
            <li>Peak lead volume between 10:00–12:00</li>
            <li>Most booked service: Strategy review</li>
            <li>Follow-up reminders converted 10x faster</li>
          </ul>
        </Panel>

        <Panel title="Today’s Hive Summary" subtitle="Key goals and highlights">
          <div className="summary-blocks">
            <div>
              <p>Action items</p>
              <strong>7 pending</strong>
            </div>
            <div>
              <p>New campaigns</p>
              <strong>2 launched</strong>
            </div>
            <div>
              <p>Client check-ins</p>
              <strong>4 scheduled</strong>
            </div>
          </div>
        </Panel>
      </section>
    </div>
  );
}
