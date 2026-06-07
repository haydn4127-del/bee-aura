import Panel from "../components/Panel";
import { getMockFollowUps } from "../lib/mockData";

export default function FollowUpsPage() {
  const followUps = getMockFollowUps();

  // Group by priority
  const critical = followUps.filter((f) => f.priority === "critical");
  const high = followUps.filter((f) => f.priority === "high");
  const medium = followUps.filter((f) => f.priority === "medium");
  const low = followUps.filter((f) => f.priority === "low");

  const PriorityGroup = ({
    title,
    items,
    color,
  }: {
    title: string;
    items: typeof followUps;
    color: string;
  }) => (
    <Panel title={title}>
      <div className="task-list">
        {items.map((item) => (
          <div key={item.id} className="task-row">
            <div>
              <p className="task-title">{item.name}</p>
              <p className="task-detail">{item.task}</p>
              <p style={{ fontSize: "0.9rem", color: "var(--ba-text-muted)", marginTop: "6px" }}>
                Due:{" "}
                {new Date(item.dueDate).toLocaleDateString("en-GB", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {item.daysOverdue > 0 && ` • ${item.daysOverdue}d overdue`}
              </p>
            </div>
            <span className="task-badge">{item.type}</span>
          </div>
        ))}
      </div>
    </Panel>
  );

  return (
    <div className="page page-follow-ups">
      <section className="page-header-block">
        <div>
          <p className="eyebrow">Follow-ups</p>
          <h1>Overdue and due follow-ups</h1>
          <p className="page-copy">
            Track callbacks, quote confirmations, booking reminders, and review requests. Stay on top of
            urgent customer follow-ups.
          </p>
        </div>
      </section>

      {critical.length > 0 && <PriorityGroup title="Critical (Now)" items={critical} color="red" />}
      {high.length > 0 && <PriorityGroup title="High (Today)" items={high} color="orange" />}
      {medium.length > 0 && <PriorityGroup title="Medium (This Week)" items={medium} color="yellow" />}
      {low.length > 0 && <PriorityGroup title="Low (Later)" items={low} color="gray" />}

      {followUps.length === 0 && (
        <Panel title="No follow-ups">
          <p style={{ color: "var(--ba-text-soft)" }}>All follow-ups completed!</p>
        </Panel>
      )}
    </div>
  );
}
