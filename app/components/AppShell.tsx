"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

const mobilePreviewCards = [
  {
    label: "New leads waiting",
    value: "6",
    note: "Aura is qualifying urgent enquiries.",
  },
  {
    label: "Replies needed",
    value: "3",
    note: "Risky replies are queued for owner approval.",
  },
  {
    label: "Bookings today",
    value: "5",
    note: "Prepared bookings stay visible for review.",
  },
  {
    label: "System alerts",
    value: "1",
    note: "Failed automation is flagged before it is missed.",
  },
  {
    label: "Follow-ups due",
    value: "7",
    note: "Safe follow-ups can run using approved rules.",
  },
  {
    label: "Reviews needing reply",
    value: "2",
    note: "Sensitive review replies stay owner-controlled.",
  },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [showFullDemoOnPhone, setShowFullDemoOnPhone] = useState(false);
  const [showMobileOwnerPreview, setShowMobileOwnerPreview] = useState(false);

  const phoneGateHidden = showFullDemoOnPhone || showMobileOwnerPreview;

  const phoneTurnGate = (
    <section
      className={`phone-turn-gate ${phoneGateHidden ? "is-hidden" : ""}`}
      aria-label="Bee-Aura phone viewing guidance"
    >
      <div className="phone-turn-gate__shell">
        <div className="phone-turn-gate__brand">
          <img src="/brand/source/bee-aura-symbol.svg" alt="" />
          <div>
            <p>BEE-AURA AI SYSTEMS</p>
            <span>Lead Recovery OS</span>
          </div>
        </div>

        <div className="phone-turn-gate__visual" aria-hidden="true">
          <div className="phone-turn-gate__phone">
            <span></span>
          </div>
          <div className="phone-turn-gate__arrow">↻</div>
        </div>

        <div className="phone-turn-gate__hero">
          <p>Best demo experience</p>
          <h1>Turn your phone sideways.</h1>
          <span>
            Bee-Aura is a full command-centre dashboard. For the smoothest demo,
            rotate your phone to landscape or open it on a tablet, laptop or monitor.
          </span>
        </div>

        <div className="phone-turn-gate__actions">
          <button type="button" onClick={() => setShowMobileOwnerPreview(true)}>
            View mobile owner preview
          </button>
          <button type="button" onClick={() => setShowFullDemoOnPhone(true)}>
            Open full demo anyway
          </button>
          <Link href="/">Back to Bee-Aura home</Link>
        </div>

        <p className="phone-turn-gate__footer">
          Interactive demo — sample data only. No live customer data, messages,
          payments or integrations are connected.
        </p>
      </div>
    </section>
  );

  const mobileOwnerPreview = showMobileOwnerPreview && !showFullDemoOnPhone ? (
    <section className="mobile-owner-preview is-active" aria-label="Bee-Aura mobile owner preview">
      <div className="mobile-owner-preview__shell">
        <div className="mobile-owner-preview__brand">
          <img src="/brand/source/bee-aura-symbol.svg" alt="" />
          <div>
            <p>BEE-AURA AI SYSTEMS</p>
            <span>Lead Recovery OS</span>
          </div>
        </div>

        <div className="mobile-owner-preview__hero">
          <p className="mobile-owner-preview__eyebrow">Mobile owner preview</p>
          <h1>Keep control of urgent leads, replies and bookings.</h1>
          <p>
            On phone, owners would use a focused Bee-Aura view for urgent actions.
            The full command-centre dashboard is best shown in landscape, tablet,
            laptop or screen-share.
          </p>
        </div>

        <div className="mobile-owner-preview__status">
          <strong>Aura Automation Active</strong>
          <span>
            Aura handles safe lead recovery automatically. Owner approval is kept
            for bookings, quotes, complaints and risky actions.
          </span>
        </div>

        <div className="mobile-owner-preview__grid">
          {mobilePreviewCards.map((card) => (
            <article key={card.label} className="mobile-owner-preview__card">
              <span>{card.label}</span>
              <strong>{card.value}</strong>
              <p>{card.note}</p>
            </article>
          ))}
        </div>

        <div className="mobile-owner-preview__actions">
          <button type="button" onClick={() => setShowFullDemoOnPhone(true)}>
            Open full desktop demo
          </button>
          <button type="button" onClick={() => setShowMobileOwnerPreview(false)}>
            Back to turn-phone screen
          </button>
        </div>

        <p className="mobile-owner-preview__footer">
          Interactive demo — sample data only. No live customer data, messages,
          payments or integrations are connected.
        </p>
      </div>
    </section>
  ) : null;

  const mobileReturnButton = showFullDemoOnPhone ? (
    <div className="mobile-owner-preview__return">
      <button type="button" onClick={() => setShowFullDemoOnPhone(false)}>
        Back to phone demo options
      </button>
    </div>
  ) : null;

  if (pathname === "/") {
    return (
      <>
        {phoneTurnGate}
        {mobileOwnerPreview}
        {mobileReturnButton}
        <div className={`home-demo-shell ${showFullDemoOnPhone ? "mobile-full-demo-open" : ""}`}>
          {children}
        </div>
      </>
    );
  }

  return (
    <>
      {phoneTurnGate}
      {mobileOwnerPreview}
      {mobileReturnButton}

      <div className={`app-shell ${showFullDemoOnPhone ? "mobile-full-demo-open" : ""}`}>
        <Sidebar />
        <main className="app-main">{children}</main>
      </div>
    </>
  );
}
