import Panel from "../components/Panel";
import { getMockActivityLog } from "../lib/mockData";

function value(record: Record<string, unknown>, keys: string[], fallback = "—") {
  for (const key of keys) {
    const found = record[key];
    if (found !== undefined && found !== null && found !== "") return String(found);
  }
  return fallback;
}

export default function ActivityLogPage() {
  const events = getMockActivityLog();

  return (
    <main className="page">
      <div className="page-header-block">
        <div>
          <p className="eyebrow">System visibility</p>
          <h1>Activity Log</h1>
          <p>
            A fake audit-style timeline showing what Bee-Aura AI and the owner have done in the demo.
          </p>
        </div>
      </div>

      <section className="summary-strip">
        <div className="summary-card">
          <span>Total events</span>
          <strong>{events.length}</strong>
        </div>
        <div className="summary-card">
          <span>Business</span>
          <strong>Northfield</strong>
        </div>
        <div className="summary-card">
          <span>Mode</span>
          <strong>Demo only</strong>
        </div>
      </section>

      <Panel title="Recent activity" subtitle="Fake timeline for learning and demo purposes.">
        <div className="activity-list compact">
          {events.map((event) => {
            const record = event as unknown as Record<string, unknown>;

            return (
              <article className="timeline-card" key={value(record, ["id"])}>
                <div>
                  <strong>{value(record, ["description", "event", "title"])}</strong>
                  <p>{value(record, ["eventType", "type"])} · {value(record, ["linkedRecord", "linkedTo", "record"])}</p>
                </div>
                <div className="record-meta">
                  <span>{value(record, ["time", "createdAt", "timestamp"])}</span>
                  <span>{value(record, ["actor", "createdBy"])}</span>
                  <span>{value(record, ["status"])}</span>
                </div>
              </article>
            );
          })}
        </div>
      </Panel>
    </main>
  );
}
