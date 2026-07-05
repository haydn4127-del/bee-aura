import { recoveryCases } from "../../recovery/recoveryData";
import { CaseCard, RecoveryLayout, styles } from "../../recovery/RecoveryUi";

export default function SoloInboxPage() {
  return (
    <RecoveryLayout>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>INBOX RECOVERY</p>
          <h1>Messages become decisions, not clutter.</h1>
          <p>Inbox items are shown only when they need a safe next move, callback, owner approval or proof.</p>
        </div>
      </section>
      <section className={styles.list}>
        {recoveryCases.filter((item) => ["Web form", "SMS", "Email", "Missed call + voicemail", "WhatsApp + voicemail"].some((channel) => item.channel.includes(channel))).map((item, index) => (
          <CaseCard key={item.slug} item={item} index={index} />
        ))}
      </section>
    </RecoveryLayout>
  );
}
