import Panel from "../components/Panel";

const messages = [
  {
    name: "Olivia Martin",
    channel: "SMS",
    latest: "I’m ready to confirm the booking for Thursday.",
    urgency: "High",
    status: "Awaiting reply",
    aiAction: "Send confirmation template",
    time: "2 min ago",
  },
  {
    name: "Peter Hughes",
    channel: "Email",
    latest: "Do you have availability next week?",
    urgency: "Medium",
    status: "New",
    aiAction: "Draft response",
    time: "15 min ago",
  },
  {
    name: "Sophie Carter",
    channel: "WhatsApp",
    latest: "Can you call me back about pricing?",
    urgency: "High",
    status: "Pending",
    aiAction: "Offer follow-up call",
    time: "38 min ago",
  },
  {
    name: "Mike Bennett",
    channel: "Email",
    latest: "Looking for a longer-term package.",
    urgency: "Low",
    status: "Open",
    aiAction: "Suggest upgrade",
    time: "1h ago",
  },
];

export default function MessagesPage() {
  return (
    <div className="page page-section">
      <section className="page-header-block">
        <div>
          <p className="eyebrow">Inbox</p>
          <h1>Track conversations and respond to the most urgent threads first.</h1>
          <p className="page-copy">A clean view of customer inquiries, urgency, and AI suggested actions.</p>
        </div>
      </section>

      <section className="panel full-width">
        <div className="panel-header">
          <div>
            <h2>Message queue</h2>
            <p>Conversations, channels, and next steps.</p>
          </div>
        </div>
        <div className="message-list">
          <div className="message-row message-head">
            <div>Customer</div>
            <div>Channel</div>
            <div>Latest message</div>
            <div>Urgency</div>
            <div>Status</div>
            <div>AI action</div>
            <div>Received</div>
          </div>
          {messages.map((message) => (
            <div key={message.name} className="message-row">
              <div>
                <p className="message-name">{message.name}</p>
              </div>
              <div>{message.channel}</div>
              <div>{message.latest}</div>
              <div>{message.urgency}</div>
              <div>{message.status}</div>
              <div>{message.aiAction}</div>
              <div>{message.time}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
