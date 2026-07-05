import Link from "next/link";
import {
  adminMoveCases,
  engineerCheckCases,
  ownerDecisionCases,
  proofGapCases,
  recoveryCases,
  recoveryMetrics,
  recoveryPlaybooks,
  recoveryVerticals,
  recoveryWorkCases,
  weeklyReview,
} from "./recoveryData";
import {
  ActionRow,
  CaseCard,
  CompactCase,
  PlaybookCard,
  RecoveryLayout,
  cx,
  styles,
  toneClass,
} from "./RecoveryUi";

export function RecoveryDashboardPage() {
  return (
    <RecoveryLayout>
      <section className={styles.controlHero}>
        <div>
          <p className={styles.eyebrow}>RECOVERY DASHBOARD</p>
          <h1>Today’s risk, held replies and proof gaps.</h1>
          <p>
            The dashboard is now a recovery-control board. It shows what needs a safe
            next move rather than trying to run the whole business.
          </p>
          <ActionRow>
            <Link className={styles.primary} href="/solo/today">Open decision queue</Link>
            <Link className={styles.secondary} href="/control-centre">Open Control Centre</Link>
          </ActionRow>
        </div>
        <aside className={styles.sticky}>
          <p className={styles.eyebrow}>SYSTEM PROMISE</p>
          <h2>Useful work, held risk, visible proof.</h2>
          <p>Every page maps into recovery, approval, handover or proof.</p>
        </aside>
      </section>

      <section className={styles.metricGrid}>
        {recoveryMetrics.map((metric) => (
          <article key={metric.label} className={styles.metric}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <p>{metric.detail}</p>
          </article>
        ))}
      </section>

      <section className={styles.caseGrid}>
        {recoveryCases.slice(0, 6).map((item) => <CompactCase key={item.slug} item={item} />)}
      </section>
    </RecoveryLayout>
  );
}

export function RecoveryLeadsPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>ENQUIRIES AT RISK</p>
          <h1>Leads are shown only when action or risk is real.</h1>
          <p>
            This replaces generic lead tracking with live recoverable enquiries:
            urgent, vague, duplicated, cooling or waiting owner approval.
          </p>
        </div>
      </section>
      <section className={styles.list}>
        {recoveryCases.map((item, index) => <CaseCard key={item.slug} item={item} index={index} />)}
      </section>
    </RecoveryLayout>
  );
}

export function RecoveryMessagesPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>SAFE MESSAGES</p>
          <h1>Messages become safe drafts, held replies or calls.</h1>
          <p>
            Bee-Aura does not celebrate sending more messages. It shows what wording is safe,
            what must wait and when a call is the better move.
          </p>
        </div>
      </section>
      <section className={styles.caseGrid}>
        {ownerDecisionCases.concat(engineerCheckCases).map((item) => <CompactCase key={item.slug} item={item} />)}
      </section>
    </RecoveryLayout>
  );
}

export function RecoveryInboxPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>CHANNEL INBOX</p>
          <h1>Raw channels feed one recovery case.</h1>
          <p>
            Calls, voicemails, forms, email, SMS and manually owned WhatsApp become
            one case with one owner.
          </p>
        </div>
      </section>
      <section className={styles.list}>
        {recoveryCases.map((item, index) => <CaseCard key={item.slug} item={item} index={index} />)}
      </section>
    </RecoveryLayout>
  );
}

export function RecoveryJobsPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>JOB HANDOFF</p>
          <h1>Only safe, qualified work reaches the job system.</h1>
          <p>
            Bee-Aura does not replace scheduling, dispatch or invoices. It prepares
            customer memory, missing info, safe next move and proof.
          </p>
        </div>
      </section>
      <section className={styles.caseGrid}>
        {adminMoveCases.concat(recoveryWorkCases).map((item) => <CompactCase key={item.slug} item={item} />)}
      </section>
    </RecoveryLayout>
  );
}

export function RecoveryBookingsPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>BOOKING INTENT</p>
          <h1>Interest is not a booking until the promise is safe.</h1>
          <p>
            These enquiries could become bookings, but still need details, availability
            checks, owner approval or engineer facts before a slot is promised.
          </p>
        </div>
      </section>
      <section className={styles.caseGrid}>
        {recoveryCases
          .filter((item) => item.riskLabels.some((label) => label.includes("Same-day") || label.includes("Urgent") || label.includes("Missing")))
          .map((item) => <CompactCase key={item.slug} item={item} />)}
      </section>
    </RecoveryLayout>
  );
}

export function RecoveryCustomersPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>CUSTOMER MEMORY</p>
          <h1>Only the context that changes the safe reply.</h1>
          <p>
            Customer Memory is the minimum context needed to avoid wrong promises,
            duplicate replies and poor handover.
          </p>
        </div>
      </section>
      <section className={styles.caseGrid}>
        {recoveryCases.map((item) => <CompactCase key={item.slug} item={item} />)}
      </section>
    </RecoveryLayout>
  );
}

export function RecoveryFollowUpsPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>RECOVERY FOLLOW-UPS</p>
          <h1>Follow up when it is safe, specific and useful.</h1>
          <p>
            No generic nudges. Bee-Aura follows cooling quotes, missed callbacks,
            repeat service opportunities and safe review readiness.
          </p>
        </div>
      </section>
      <section className={styles.caseGrid}>
        {recoveryWorkCases.concat(adminMoveCases).map((item) => <CompactCase key={item.slug} item={item} />)}
      </section>
    </RecoveryLayout>
  );
}

export function RecoveryReviewsPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>REVIEW READINESS</p>
          <h1>Ask only when the job is genuinely safe to ask about.</h1>
          <p>
            Review readiness checks proof, complaint state and customer outcome before
            a request is prepared.
          </p>
        </div>
      </section>
      <section className={styles.caseGrid}>
        {recoveryCases
          .filter((item) => item.riskLabels.some((label) => label.includes("Review") || label.includes("Proof") || label.includes("Complaint")))
          .map((item) => <CompactCase key={item.slug} item={item} />)}
      </section>
    </RecoveryLayout>
  );
}

export function RecoveryActivityLogPage() {
  const events = recoveryCases.flatMap((item) =>
    item.proof.map((event, index) => ({
      caseSlug: item.slug,
      customer: item.customer,
      event,
      index,
      tone: item.tone,
    }))
  );

  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>PROOF ACTIVITY</p>
          <h1>Activity means evidence, not noise.</h1>
          <p>
            Every useful event shows what came in, what was detected, what was held,
            who decided and what happened next.
          </p>
        </div>
      </section>
      <section className={styles.timeline}>
        {events.map((event) => (
          <article key={`${event.caseSlug}-${event.index}`} className={cx(styles.timelineEvent, toneClass(event.tone))}>
            <time>{event.index + 1}</time>
            <div>
              <h3>{event.customer}</h3>
              <p>{event.event}</p>
              <Link className={styles.secondary} href={`/recovery/cases/${event.caseSlug}`}>Open case</Link>
            </div>
          </article>
        ))}
      </section>
    </RecoveryLayout>
  );
}

export function RecoveryErrorLogPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>PROOF GAPS</p>
          <h1>Errors are gaps before customer problems.</h1>
          <p>
            Missing proof, unresolved owner approval, duplicate messages and unverified
            safety wording become gaps to fix.
          </p>
        </div>
      </section>
      <section className={styles.list}>
        {proofGapCases.concat(engineerCheckCases).map((item, index) => <CaseCard key={item.slug} item={item} index={index} />)}
      </section>
    </RecoveryLayout>
  );
}

export function RecoverySettingsPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>GUARDRAILS</p>
          <h1>Owner rules for risky customer communication.</h1>
          <p>
            Settings are the rules that decide what can be prepared, what must be held
            and what proof is required before a case closes.
          </p>
        </div>
      </section>
      <section className={styles.guardrailGrid}>
        {recoveryPlaybooks.map((playbook) => <PlaybookCard key={playbook.slug} playbook={playbook} />)}
      </section>
    </RecoveryLayout>
  );
}

export function RecoveryMorePage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>EXPANSION MAP</p>
          <h1>Bee-Aura grows through the same recovery-control spine.</h1>
          <p>
            More verticals and more features are allowed only when they strengthen
            recovery, approval, handover or proof.
          </p>
        </div>
      </section>
      <section className={styles.verticalGrid}>
        {recoveryVerticals.map((vertical) => (
          <article key={vertical.title} className={styles.card}>
            <span>{vertical.status}</span>
            <h2>{vertical.title}</h2>
            <p>{vertical.summary}</p>
            <strong>{vertical.fit}</strong>
          </article>
        ))}
      </section>
      <section className={styles.guardrailGrid}>
        {recoveryPlaybooks.slice(0, 6).map((playbook) => <PlaybookCard key={playbook.slug} playbook={playbook} />)}
      </section>
    </RecoveryLayout>
  );
}

export function RecoveryTodayPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>TODAY</p>
          <h1>The cases that need a safe move today.</h1>
          <p>Today is the simple front door: at-risk, waiting approval, duplicated, cooling and missing proof.</p>
        </div>
      </section>
      <section className={styles.list}>
        {recoveryCases.slice(0, 6).map((item, index) => <CaseCard key={item.slug} item={item} index={index} />)}
      </section>
      <section className={styles.weeklyGrid}>
        {weeklyReview.map((item) => (
          <article key={item.title}>
            <span>{item.title}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>
    </RecoveryLayout>
  );
}
