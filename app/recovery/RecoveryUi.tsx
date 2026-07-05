import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./recovery.module.css";
import type { RecoveryCase, RecoveryPlaybook, RecoveryTone } from "./recoveryData";

const toneMap: Record<RecoveryTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  blue: styles.toneBlue,
  green: styles.toneGreen,
  purple: styles.tonePurple,
};

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function toneClass(tone: RecoveryTone) {
  return toneMap[tone];
}

export function RecoveryLayout({ children }: { children: ReactNode }) {
  return (
    <main className={styles.page}>
      <div className={styles.canvas}>
        <header className={styles.topbar}>
          <Link href="/" className={styles.brand}>
            <img src="/brand/source/bee-aura-symbol.svg" alt="Bee-Aura mark" />
            <span>
              <strong>Bee-Aura AI Systems</strong>
              <small>Recovery Control</small>
            </span>
          </Link>

          <nav className={styles.nav}>
            <Link href="/solo">Solo</Link>
            <Link href="/team">Team</Link>
            <Link href="/control-centre">Control Centre</Link>
            <Link href="/control-centre/overview">System Map</Link>
            <Link href="/control-centre/settings">Guardrails</Link>
          </nav>
        </header>

        {children}
      </div>
    </main>
  );
}

export function ActionRow({ children }: { children: ReactNode }) {
  return <div className={styles.actions}>{children}</div>;
}

export function CaseCard({ item, index }: { item: RecoveryCase; index?: number }) {
  return (
    <article className={cx(styles.queueItem, toneClass(item.tone))}>
      {typeof index === "number" ? <div className={styles.number}>{index + 1}</div> : null}
      <div>
        <span>{item.status}</span>
        <h2>{item.customer}: {item.title}</h2>
        <p>{item.message}</p>
        <div className={styles.chips}>
          {item.riskLabels.slice(0, 4).map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <ActionRow>
          <Link className={styles.primary} href={`/playbooks/${item.playbook}`}>
            Open playbook
          </Link>
          <Link className={styles.secondary} href={`/recovery/cases/${item.slug}`}>
            Customer Memory
          </Link>
        </ActionRow>
      </div>
    </article>
  );
}

export function CompactCase({ item }: { item: RecoveryCase }) {
  return (
    <Link href={`/recovery/cases/${item.slug}`} className={cx(styles.card, toneClass(item.tone))}>
      <span>{item.status}</span>
      <h2>{item.customer}</h2>
      <p>{item.title}</p>
      <strong>{item.nextMove}</strong>
    </Link>
  );
}

export function PlaybookCard({ playbook }: { playbook: RecoveryPlaybook }) {
  return (
    <article className={cx(styles.guardrail, toneClass(playbook.tone))}>
      <span>{playbook.label}</span>
      <h2>{playbook.title}</h2>
      <p>{playbook.why}</p>
      <div className={styles.fact}>
        <span className={styles.factLabel}>Blocked</span>
        <strong>{playbook.blockedWording}</strong>
      </div>
      <div className={styles.fact}>
        <span className={styles.factLabel}>Safer</span>
        <strong>{playbook.safeWording}</strong>
      </div>
      <ActionRow>
        <Link className={styles.secondary} href={`/playbooks/${playbook.slug}`}>
          Open rule source
        </Link>
      </ActionRow>
    </article>
  );
}

export { styles };
