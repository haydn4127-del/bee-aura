"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showFullDemoOnPhone, setShowFullDemoOnPhone] = useState(false);

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <>
      {!showFullDemoOnPhone && (
        <section className="mobile-owner-preview" aria-label="Bee-Aura mobile owner preview">
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
                The full Bee-Aura command-centre demo is designed for tablet, laptop,
                desktop and screen-share. On phone, owners would use a focused mobile
                view for urgent actions.
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
                View full desktop demo
              </button>
              <Link href="/">Back to Bee-Aura home</Link>
            </div>

            <p className="mobile-owner-preview__footer">
              Interactive demo — sample data only. No live customer data, messages,
              payments or integrations are connected.
            </p>
          </div>
        </section>
      )}

      {showFullDemoOnPhone && (
        <div className="mobile-owner-preview__return">
          <button type="button" onClick={() => setShowFullDemoOnPhone(false)}>
            Back to mobile owner preview
          </button>
        </div>
      )}

      <div className={`app-shell ${showFullDemoOnPhone ? "mobile-full-demo-open" : ""}`}>
        <Sidebar />
        <main className="app-main">{children}</main>
      </div>
    </>
  );
}
