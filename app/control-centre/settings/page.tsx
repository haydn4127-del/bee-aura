import Link from "next/link";
import { ControlCentreNav } from "../ControlCentreNav";
import { controlDeepThinking, conversationRules, permissionRows, settingsSections } from "../controlCentreData";

const thinking = controlDeepThinking.settings;

export default function ControlCentreSettingsPage() {
  return (
    <main className="controlCentreV4">
      <section className="controlPageHeaderV4">
        <div>
          <p className="controlEyebrowV4">SETTINGS</p>
          <h1>Set the guardrails. Let Aura do the sorting.</h1>
          <p>
            Settings are the owner’s safety rules for the AI brain: what Aura can
            prepare, what the team can touch and what must wait for approval.
          </p>
        </div>
        <Link className="controlSecondaryActionV4" href="/control-centre/system">
          Back to system
        </Link>
      </section>

      <ControlCentreNav active="/control-centre/settings" />

      <section className={`controlThinkingStripV5 controlTone-${thinking.tone}V4`}>
        <div>
          <span>{thinking.label}</span>
          <h2>{thinking.title}</h2>
          <p>{thinking.ownerPlain}</p>
        </div>
        <ul>
          {thinking.aiWork.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link href={thinking.href}>{thinking.nextAction}</Link>
      </section>

      <section className="controlSettingsGridV4">
        {settingsSections.map((section) => (
          <article key={section.title} className={`controlSettingCardV4 controlTone-${section.tone}V4`}>
            <span>{section.label}</span>
            <h2>{section.title}</h2>
            <p>{section.detail}</p>
            <ul>
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="controlSettingsGridV4">
        {conversationRules.map((rule) => (
          <article key={rule.title} className={`controlSettingCardV4 controlTone-${rule.tone}V4`}>
            <span>{rule.label}</span>
            <h2>{rule.title}</h2>
            <p>{rule.detail}</p>
            <ul>
              {rule.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="controlPermissionPanelV4">
        <div className="controlSectionHeadV4">
          <p className="controlEyebrowV4">TEAM PERMISSIONS</p>
          <h2>Everyone gets useful access. Risky decisions stay locked.</h2>
        </div>

        <div className="controlPermissionRowsV4">
          {permissionRows.map((row) => (
            <article key={row.role} className={`controlPermissionRowV4 controlTone-${row.tone}V4`}>
              <strong>{row.role}</strong>
              <span>{row.can}</span>
              <small>{row.guardrail}</small>
            </article>
          ))}
        </div>

        <div className="controlHeroActionsV4">
          <Link className="controlPrimaryActionV4" href="/control-centre/proof">
            Check proof pack
          </Link>
          <Link className="controlSecondaryActionV4" href="/control-centre/reports">
            Open reports
          </Link>
        </div>
      </section>
    </main>
  );
}
