"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type MemberRole = "Owner" | "Admin" | "Staff";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
};

type ToggleMap = Record<string, boolean>;

const initialBusinessProfile = {
  businessName: "Northfield Home Services",
  contactEmail: "hello@northfieldhomes.com",
  phoneNumber: "+44 7588 123 4567",
  serviceArea: "Northfield, Birmingham and surrounding areas",
  businessHours: "Mon - Fri 8:00 AM - 6:00 PM",
};

const initialChannels: ToggleMap = {
  whatsapp: true,
  email: true,
  sms: true,
  webchat: true,
};

const initialAutomation: ToggleMap = {
  aiDraftReplies: true,
  missedCallRecovery: true,
  bookingConfirmations: true,
  reviewRequestAutomation: true,
  humanApprovalRequired: false,
};

const initialNotifications: ToggleMap = {
  newLeadAlerts: true,
  bookingReminders: true,
  followUpReminders: true,
  dailySummary: true,
};

const initialSecurity: ToggleMap = {
  twoFactorAuth: true,
  auditLogging: true,
};

const initialTeam: TeamMember[] = [
  {
    id: "TM-1",
    name: "John D.",
    email: "john@northfieldhomes.com",
    role: "Owner",
  },
  {
    id: "TM-2",
    name: "Sarah J.",
    email: "sarah@northfieldhomes.com",
    role: "Admin",
  },
  {
    id: "TM-3",
    name: "Tom W.",
    email: "tom@northfieldhomes.com",
    role: "Staff",
  },
];

function SettingToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      className={`settingsRef-toggle ${checked ? "is-on" : "is-off"}`}
      onClick={onChange}
      aria-pressed={checked}
    >
      <span />
    </button>
  );
}

export default function SettingsPage() {
  const [businessProfile, setBusinessProfile] = useState(initialBusinessProfile);
  const [channels, setChannels] = useState(initialChannels);
  const [automation, setAutomation] = useState(initialAutomation);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [security, setSecurity] = useState(initialSecurity);
  const [timezone, setTimezone] = useState("UTC+00:00 Central Time (UK)");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [team, setTeam] = useState(initialTeam);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState(
    "Your settings are automatically saved in this demo environment."
  );

  const visibleCards = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return {
        business: true,
        channels: true,
        automation: true,
        notifications: true,
        team: true,
        security: true,
      };
    }

    const match = (text: string) => text.toLowerCase().includes(query);

    return {
      business:
        match("business profile business name contact email phone number service area business hours") ||
        Object.values(businessProfile).some((value) => match(value)),
      channels: match("channels integrations whatsapp email sms web chat"),
      automation: match("ai automation draft replies missed call recovery booking confirmations review request automation human approval"),
      notifications: match("notifications new lead alerts booking reminders follow-up reminders daily summary"),
      team:
        match("team permissions invite team member owner admin staff") ||
        team.some((member) => match(`${member.name} ${member.email} ${member.role}`)),
      security:
        match("security preferences two-factor authentication audit logging time zone date format"),
    };
  }, [search, businessProfile, team]);

  function toggleGroupValue(
    groupSetter: React.Dispatch<React.SetStateAction<ToggleMap>>,
    key: string,
    label: string
  ) {
    groupSetter((current) => {
      const next = { ...current, [key]: !current[key] };
      setNotice(`${label} ${next[key] ? "enabled" : "disabled"}.`);
      return next;
    });
  }

  function updateMemberRole(id: string, role: MemberRole) {
    setTeam((current) =>
      current.map((member) => (member.id === id ? { ...member, role } : member))
    );
    setNotice(`Team role updated to ${role}.`);
  }

  function inviteDemoMember() {
    const count = team.length + 1;
    setTeam((current) => [
      ...current,
      {
        id: `TM-${Date.now()}`,
        name: `New Member ${count}`,
        email: `member${count}@northfieldhomes.com`,
        role: "Staff",
      },
    ]);
    setNotice("Demo team member added.");
  }

  function resetDefaults() {
    setBusinessProfile(initialBusinessProfile);
    setChannels(initialChannels);
    setAutomation(initialAutomation);
    setNotifications(initialNotifications);
    setSecurity(initialSecurity);
    setTimezone("UTC+00:00 Central Time (UK)");
    setDateFormat("MM/DD/YYYY");
    setTeam(initialTeam);
    setSearch("");
    setNotice("Settings reset back to demo defaults.");
  }

  return (
    <main className="settingsRef-page">
      <header className="settingsRef-topbar">
        <div>
          <h1>Settings</h1>
          <p>Manage your business profile, channels, automations and preferences in one place.</p>
        </div>

        <div className="settingsRef-toolbar">
          <label className="settingsRef-search">
            <span>⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search settings..."
            />
          </label>

          <Link href="/settings" className="settingsRef-owner">
            <span>JD</span>
            <strong>John D.</strong>
            <small>Owner</small>
          </Link>
        </div>
      </header>

      <section className="settingsRef-grid">
        {visibleCards.business ? (
          <section className="settingsRef-card">
            <div className="settingsRef-cardHeader">
              <h2>1. Business Profile</h2>
            </div>

            <div className="settingsRef-form">
              <label>
                <span>Business name</span>
                <input
                  value={businessProfile.businessName}
                  onChange={(event) =>
                    setBusinessProfile((current) => ({
                      ...current,
                      businessName: event.target.value,
                    }))
                  }
                />
              </label>

              <label>
                <span>Contact email</span>
                <input
                  value={businessProfile.contactEmail}
                  onChange={(event) =>
                    setBusinessProfile((current) => ({
                      ...current,
                      contactEmail: event.target.value,
                    }))
                  }
                />
              </label>

              <label>
                <span>Phone number</span>
                <input
                  value={businessProfile.phoneNumber}
                  onChange={(event) =>
                    setBusinessProfile((current) => ({
                      ...current,
                      phoneNumber: event.target.value,
                    }))
                  }
                />
              </label>

              <label>
                <span>Service area</span>
                <input
                  value={businessProfile.serviceArea}
                  onChange={(event) =>
                    setBusinessProfile((current) => ({
                      ...current,
                      serviceArea: event.target.value,
                    }))
                  }
                />
              </label>

              <label>
                <span>Business hours</span>
                <select
                  value={businessProfile.businessHours}
                  onChange={(event) =>
                    setBusinessProfile((current) => ({
                      ...current,
                      businessHours: event.target.value,
                    }))
                  }
                >
                  <option>Mon - Fri 8:00 AM - 6:00 PM</option>
                  <option>Mon - Sat 8:00 AM - 7:00 PM</option>
                  <option>24/7 Emergency Availability</option>
                </select>
              </label>
            </div>
          </section>
        ) : null}

        {visibleCards.channels ? (
          <section className="settingsRef-card">
            <div className="settingsRef-cardHeader">
              <h2>2. Channels & Integrations</h2>
            </div>

            <div className="settingsRef-toggleList">
              <div className="settingsRef-toggleRow">
                <div>
                  <strong>WhatsApp</strong>
                  <small>Connected</small>
                </div>
                <SettingToggle
                  checked={channels.whatsapp}
                  onChange={() => toggleGroupValue(setChannels, "whatsapp", "WhatsApp")}
                />
              </div>

              <div className="settingsRef-toggleRow">
                <div>
                  <strong>Email</strong>
                  <small>Connected</small>
                </div>
                <SettingToggle
                  checked={channels.email}
                  onChange={() => toggleGroupValue(setChannels, "email", "Email")}
                />
              </div>

              <div className="settingsRef-toggleRow">
                <div>
                  <strong>SMS</strong>
                  <small>Connected</small>
                </div>
                <SettingToggle
                  checked={channels.sms}
                  onChange={() => toggleGroupValue(setChannels, "sms", "SMS")}
                />
              </div>

              <div className="settingsRef-toggleRow">
                <div>
                  <strong>Web chat</strong>
                  <small>Connected</small>
                </div>
                <SettingToggle
                  checked={channels.webchat}
                  onChange={() => toggleGroupValue(setChannels, "webchat", "Web chat")}
                />
              </div>
            </div>
          </section>
        ) : null}

        {visibleCards.automation ? (
          <section className="settingsRef-card">
            <div className="settingsRef-cardHeader">
              <h2>3. AI & Automation</h2>
            </div>

            <div className="settingsRef-toggleList">
              <div className="settingsRef-toggleRow">
                <div>
                  <strong>AI draft replies</strong>
                  <small>Suggested message replies</small>
                </div>
                <SettingToggle
                  checked={automation.aiDraftReplies}
                  onChange={() =>
                    toggleGroupValue(setAutomation, "aiDraftReplies", "AI draft replies")
                  }
                />
              </div>

              <div className="settingsRef-toggleRow">
                <div>
                  <strong>Missed call recovery</strong>
                  <small>Auto follow-up on missed calls</small>
                </div>
                <SettingToggle
                  checked={automation.missedCallRecovery}
                  onChange={() =>
                    toggleGroupValue(
                      setAutomation,
                      "missedCallRecovery",
                      "Missed call recovery"
                    )
                  }
                />
              </div>

              <div className="settingsRef-toggleRow">
                <div>
                  <strong>Booking confirmations</strong>
                  <small>Send booking reminders and confirmations</small>
                </div>
                <SettingToggle
                  checked={automation.bookingConfirmations}
                  onChange={() =>
                    toggleGroupValue(
                      setAutomation,
                      "bookingConfirmations",
                      "Booking confirmations"
                    )
                  }
                />
              </div>

              <div className="settingsRef-toggleRow">
                <div>
                  <strong>Review request automation</strong>
                  <small>Prompt happy customers for reviews</small>
                </div>
                <SettingToggle
                  checked={automation.reviewRequestAutomation}
                  onChange={() =>
                    toggleGroupValue(
                      setAutomation,
                      "reviewRequestAutomation",
                      "Review request automation"
                    )
                  }
                />
              </div>

              <div className="settingsRef-toggleRow">
                <div>
                  <strong>Human approval required</strong>
                  <small>Owner sign-off for selected automations</small>
                </div>
                <SettingToggle
                  checked={automation.humanApprovalRequired}
                  onChange={() =>
                    toggleGroupValue(
                      setAutomation,
                      "humanApprovalRequired",
                      "Human approval requirement"
                    )
                  }
                />
              </div>
            </div>
          </section>
        ) : null}

        {visibleCards.notifications ? (
          <section className="settingsRef-card">
            <div className="settingsRef-cardHeader">
              <h2>4. Notifications</h2>
            </div>

            <div className="settingsRef-toggleList">
              <div className="settingsRef-toggleRow">
                <div>
                  <strong>New lead alerts</strong>
                  <small>Instant owner notifications</small>
                </div>
                <SettingToggle
                  checked={notifications.newLeadAlerts}
                  onChange={() =>
                    toggleGroupValue(setNotifications, "newLeadAlerts", "New lead alerts")
                  }
                />
              </div>

              <div className="settingsRef-toggleRow">
                <div>
                  <strong>Booking reminders</strong>
                  <small>Upcoming appointment reminders</small>
                </div>
                <SettingToggle
                  checked={notifications.bookingReminders}
                  onChange={() =>
                    toggleGroupValue(
                      setNotifications,
                      "bookingReminders",
                      "Booking reminders"
                    )
                  }
                />
              </div>

              <div className="settingsRef-toggleRow">
                <div>
                  <strong>Follow-up reminders</strong>
                  <small>Quote chases and callback reminders</small>
                </div>
                <SettingToggle
                  checked={notifications.followUpReminders}
                  onChange={() =>
                    toggleGroupValue(
                      setNotifications,
                      "followUpReminders",
                      "Follow-up reminders"
                    )
                  }
                />
              </div>

              <div className="settingsRef-toggleRow">
                <div>
                  <strong>Daily summary</strong>
                  <small>Daily recap of bookings, leads and messages</small>
                </div>
                <SettingToggle
                  checked={notifications.dailySummary}
                  onChange={() =>
                    toggleGroupValue(setNotifications, "dailySummary", "Daily summary")
                  }
                />
              </div>
            </div>
          </section>
        ) : null}

        {visibleCards.team ? (
          <section className="settingsRef-card">
            <div className="settingsRef-cardHeader">
              <h2>5. Team & Permissions</h2>
            </div>

            <div className="settingsRef-teamList">
              {team.map((member) => (
                <div key={member.id} className="settingsRef-teamRow">
                  <div className="settingsRef-teamIdentity">
                    <span>{member.name.slice(0, 2).toUpperCase()}</span>
                    <div>
                      <strong>{member.name}</strong>
                      <small>{member.email}</small>
                    </div>
                  </div>

                  <select
                    value={member.role}
                    onChange={(event) =>
                      updateMemberRole(member.id, event.target.value as MemberRole)
                    }
                  >
                    <option>Owner</option>
                    <option>Admin</option>
                    <option>Staff</option>
                  </select>
                </div>
              ))}

              <button
                type="button"
                className="settingsRef-secondaryAction"
                onClick={inviteDemoMember}
              >
                + Invite Team Member
              </button>
            </div>
          </section>
        ) : null}

        {visibleCards.security ? (
          <section className="settingsRef-card">
            <div className="settingsRef-cardHeader">
              <h2>6. Security & Preferences</h2>
            </div>

            <div className="settingsRef-form">
              <div className="settingsRef-toggleRow">
                <div>
                  <strong>Two-factor authentication</strong>
                  <small>Recommended for owner access</small>
                </div>
                <SettingToggle
                  checked={security.twoFactorAuth}
                  onChange={() =>
                    toggleGroupValue(
                      setSecurity,
                      "twoFactorAuth",
                      "Two-factor authentication"
                    )
                  }
                />
              </div>

              <div className="settingsRef-toggleRow">
                <div>
                  <strong>Audit logging</strong>
                  <small>Track actions and setting changes</small>
                </div>
                <SettingToggle
                  checked={security.auditLogging}
                  onChange={() =>
                    toggleGroupValue(setSecurity, "auditLogging", "Audit logging")
                  }
                />
              </div>

              <label>
                <span>Time zone</span>
                <select
                  value={timezone}
                  onChange={(event) => {
                    setTimezone(event.target.value);
                    setNotice(`Time zone changed to ${event.target.value}.`);
                  }}
                >
                  <option>UTC+00:00 Central Time (UK)</option>
                  <option>UTC+01:00 British Summer Time</option>
                  <option>UTC-05:00 Eastern Time</option>
                </select>
              </label>

              <label>
                <span>Date format</span>
                <select
                  value={dateFormat}
                  onChange={(event) => {
                    setDateFormat(event.target.value);
                    setNotice(`Date format changed to ${event.target.value}.`);
                  }}
                >
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </label>
            </div>
          </section>
        ) : null}
      </section>

      <footer className="settingsRef-footerBar">
        <div className="settingsRef-footerNote">♡ Your settings are automatically saved.</div>

        <div className="settingsRef-footerActions">
          <button
            type="button"
            className="settingsRef-primaryAction"
            onClick={() => setNotice("Demo settings saved successfully.")}
          >
            ⇩ Save Changes
          </button>

          <button
            type="button"
            className="settingsRef-resetAction"
            onClick={resetDefaults}
          >
            ↺ Reset to Defaults
          </button>
        </div>
      </footer>

      <div className="settingsRef-notice">{notice}</div>
    </main>
  );
}
