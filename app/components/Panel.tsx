import type { ReactNode } from "react";

type PanelProps = {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  action?: ReactNode;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
};

export default function Panel({
  title,
  subtitle,
  eyebrow,
  action,
  footer,
  className = "",
  children,
}: PanelProps) {
  const hasHeader = eyebrow || title || subtitle || action;

  return (
    <section className={`panel ${className}`.trim()}>
      {hasHeader ? (
        <div className="panel-header">
          <div>
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            {title ? <h2>{title}</h2> : null}
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
          {action ? <div>{action}</div> : null}
        </div>
      ) : null}

      <div className="panel-content">{children}</div>

      {footer ? <div className="panel-footer">{footer}</div> : null}
    </section>
  );
}
