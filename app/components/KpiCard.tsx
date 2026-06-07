type KpiCardProps = {
  title: string;
  value: string;
  detail?: string;
  accent?: "gold" | "blue" | "cyan";
};

const accentClasses: Record<NonNullable<KpiCardProps["accent"]>, string> = {
  gold: "kpi-card--gold",
  blue: "kpi-card--blue",
  cyan: "kpi-card--cyan",
};

export default function KpiCard({ title, value, detail, accent = "gold" }: KpiCardProps) {
  return (
    <section className={`kpi-card ${accentClasses[accent]}`}>
      <div className="kpi-card__head">
        <span className="kpi-card__title">{title}</span>
        <span className="kpi-card__value">{value}</span>
      </div>
      {detail ? <p className="kpi-card__detail">{detail}</p> : null}
    </section>
  );
}
