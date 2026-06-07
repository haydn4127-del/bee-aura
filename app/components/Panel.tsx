type PanelProps = {
  title: string;
  subtitle?: string;
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export default function Panel({ title, subtitle, footer, className = "", children }: PanelProps) {
  return (
    <section className={`panel ${className}`}>
      <div className="panel-header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
      <div className="panel-content">{children}</div>
      {footer ? <div className="panel-footer">{footer}</div> : null}
    </section>
  );
}
