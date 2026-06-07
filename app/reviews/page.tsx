import Panel from "../components/Panel";
import { getMockReviews } from "../lib/mockData";

function value(record: Record<string, unknown>, keys: string[], fallback = "—") {
  for (const key of keys) {
    const found = record[key];
    if (found !== undefined && found !== null && found !== "") return String(found);
  }
  return fallback;
}

export default function ReviewsPage() {
  const reviews = getMockReviews();

  return (
    <main className="page">
      <div className="page-header-block">
        <div>
          <p className="eyebrow">Review Recovery</p>
          <h1>Reviews</h1>
          <p>
            Track completed jobs, review opportunities, and customer feedback for Northfield Home Services.
          </p>
        </div>
      </div>

      <section className="summary-strip">
        <div className="summary-card">
          <span>Total review records</span>
          <strong>{reviews.length}</strong>
        </div>
        <div className="summary-card">
          <span>Ready / pending</span>
          <strong>
            {reviews.filter((review) => {
              const record = review as unknown as Record<string, unknown>;
              return value(record, ["status"]).toLowerCase().includes("pending") ||
                value(record, ["status"]).toLowerCase().includes("ready");
            }).length}
          </strong>
        </div>
        <div className="summary-card">
          <span>Demo scope</span>
          <strong>Fake data</strong>
        </div>
      </section>

      <Panel title="Review opportunities" subtitle="Fake review records for the local demo.">
        <div className="record-grid">
          {reviews.map((review) => {
            const record = review as unknown as Record<string, unknown>;

            return (
              <article className="record-card" key={value(record, ["id"])}>
                <div>
                  <p className="eyebrow">{value(record, ["status", "requestStatus"])}</p>
                  <h3>{value(record, ["customerName", "name", "customer"])}</h3>
                  <p>{value(record, ["service", "jobType"])}</p>
                </div>

                <div className="record-meta">
                  <span>Completed: {value(record, ["jobCompletedDate", "completedDate", "date"])}</span>
                  <span>Method: {value(record, ["requestMethod", "channel"])}</span>
                  <span>Action: {value(record, ["recommendedAction", "nextAction"])}</span>
                </div>
              </article>
            );
          })}
        </div>
      </Panel>
    </main>
  );
}
