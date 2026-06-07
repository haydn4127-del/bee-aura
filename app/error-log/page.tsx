import Panel from "../components/Panel";
import { getMockErrorLog } from "../lib/mockData";

function value(record: Record<string, unknown>, keys: string[], fallback = "—") {
  for (const key of keys) {
    const found = record[key];
    if (found !== undefined && found !== null && found !== "") return String(found);
  }
  return fallback;
}

export default function ErrorLogPage() {
  const errors = getMockErrorLog();

  return (
    <main className="page">
      <div className="page-header-block">
        <div>
          <p className="eyebrow">Demo warnings</p>
          <h1>Error Log</h1>
          <p>
            Fake warnings and system checks to show owner visibility. No real integrations are connected.
          </p>
        </div>
      </div>

      <section className="summary-strip">
        <div className="summary-card">
          <span>Demo warnings</span>
          <strong>{errors.length}</strong>
        </div>
        <div className="summary-card">
          <span>Real services</span>
          <strong>None</strong>
        </div>
        <div className="summary-card">
          <span>Status</span>
          <strong>Fake data</strong>
        </div>
      </section>

      <Panel title="Warnings and owner review items" subtitle="Demo-only error/warning records.">
        <div className="record-grid">
          {errors.map((error) => {
            const record = error as unknown as Record<string, unknown>;

            return (
              <article className="record-card" key={value(record, ["id"])}>
                <div>
                  <p className="eyebrow">{value(record, ["severity", "level"])}</p>
                  <h3>{value(record, ["issue", "title", "message"])}</h3>
                  <p>{value(record, ["area", "category"])}</p>
                </div>

                <div className="record-meta">
                  <span>Status: {value(record, ["status"])}</span>
                  <span>Action: {value(record, ["recommendedAction", "nextAction"])}</span>
                  <span>Demo only: {value(record, ["isDemoOnly"], "true")}</span>
                </div>
              </article>
            );
          })}
        </div>
      </Panel>
    </main>
  );
}
