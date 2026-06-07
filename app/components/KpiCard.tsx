type KpiCardProps = {
  title: string;
  value: string;
  detail: string;
  accent?: "gold" | "blue" | "cyan";
  delta?: string;
};

const accentClasses: Record<NonNullable<KpiCardProps["accent"]>, string> = {
  gold: "kpi-card--gold",
  blue: "kpi-card--blue",
  cyan: "kpi-card--cyan",
};

export default function KpiCard({ title, value, detail, accent = "gold", delta }: KpiCardProps) {
  return (
    <section className={`kpi-card ${accentClasses[accent]}`}>
      <div className="kpi-card__accent" />
      <div className="kpi-card__head">
        <div>
          <span className="kpi-card__title">{title}</span>
          <strong className="kpi-card__value">{value}</strong>
        </div>
        <span className="kpi-card__icon" aria-hidden="true" />
      </div>
      <div className="kpi-card__meta">
        <span className="kpi-card__detail">{detail}</span>
        {delta ? <span className="kpi-card__delta">{delta}</span> : null}
      </div>
      <svg className="kpi-card__sparkline" viewBox="0 0 100 28" aria-hidden="true">
        <path
          d="M 2 22 C 28 12 42 18 58 10 C 72 4 84 12 98 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </section>
  );
}
