"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type Channel = "WhatsApp" | "Facebook" | "Website" | "Email" | "Instagram" | "SMS" | "Phone";
type ConversationStatus =
  | "Unread"
  | "Needs Reply"
  | "Replied"
  | "Booked"
  | "Follow-up"
  | "Closed";
type Priority = "Emergency" | "Today" | "Tomorrow" | "Later";
type StatusTab = "All" | "Unread" | "Needs reply" | "Booked" | "Follow-up" | "Closed";
type NewMessageChannel = "WhatsApp" | "SMS" | "Email";

type Conversation = {
  id: string;
  customerName: string;
  customerSlug?: string;
  phone: string;
  email: string;
  address: string;
  channel: Channel;
  status: ConversationStatus;
  priority: Priority;
  enquiry: string;
  lastMessage: string;
  lastSeen: string;
  avgResponseMinutes: number;
  booking: string;
  followUp: string;
  recentActivity: string;
  estimatedValue: string;
  ownerAction: string;
  unread: boolean;
};

type ThreadMessage = {
  id: string;
  sender: "customer" | "business" | "system";
  name: string;
  body: string;
  time: string;
  channel: Channel | "System";
};

type ActivityItem = {
  id: string;
  text: string;
};

const baseConversations: Conversation[] = [
  {
    id: "conv-sarah",
    customerName: "Sarah Johnson",
    customerSlug: "sarah-johnson",
    phone: "07944 203 118",
    email: "sarah.johnson@example.com",
    address: "Didsbury, Manchester",
    channel: "WhatsApp",
    status: "Needs Reply",
    priority: "Emergency",
    enquiry: "Emergency boiler repair",
    lastMessage: "Auto first reply sent. Waiting for postcode and access confirmation.",
    lastSeen: "2 min ago",
    avgResponseMinutes: 2,
    booking: "Today, 14:30 — emergency boiler repair",
    followUp: "Confirm engineer ETA within 10 minutes",
    recentActivity: "Safe first response sent automatically by Bee-Aura",
    estimatedValue: "£180–£350",
    ownerAction: "Review postcode reply and confirm engineer slot",
    unread: true,
  },
  {
    id: "conv-tom",
    customerName: "Tom Wilson",
    customerSlug: "tom-wilson",
    phone: "07891 882 014",
    email: "tom.wilson@example.com",
    address: "Salford, Greater Manchester",
    channel: "Email",
    status: "Booked",
    priority: "Tomorrow",
    enquiry: "Annual boiler servicing",
    lastMessage: "Thanks, tomorrow morning works for me.",
    lastSeen: "9 min ago",
    avgResponseMinutes: 4,
    booking: "Tomorrow, 09:00 — annual boiler service",
    followUp: "Send reminder tonight at 18:00",
    recentActivity: "Booking confirmed from email enquiry",
    estimatedValue: "£95",
    ownerAction: "Send service reminder",
    unread: false,
  },
  {
    id: "conv-emma",
    customerName: "Emma Davis",
    customerSlug: "emma-davis",
    phone: "07720 339 901",
    email: "emma.davis@example.com",
    address: "Stockport, Greater Manchester",
    channel: "SMS",
    status: "Follow-up",
    priority: "Today",
    enquiry: "Plumbing leak repair",
    lastMessage: "I can send a photo of the leak if that helps.",
    lastSeen: "18 min ago",
    avgResponseMinutes: 3,
    booking: "No booking yet — waiting on photo",
    followUp: "Ask for photo and preferred access time",
    recentActivity: "Lead moved to follow-up queue",
    estimatedValue: "£120–£260",
    ownerAction: "Request photo and book inspection",
    unread: false,
  },
  {
    id: "conv-marc",
    customerName: "Marc Patel",
    customerSlug: "marc-patel",
    phone: "07900 442 712",
    email: "marc.patel@example.com",
    address: "Chorlton, Manchester",
    channel: "Phone",
    status: "Unread",
    priority: "Today",
    enquiry: "Drain clearance",
    lastMessage: "Missed call captured. Customer tried to call about a blocked outside drain.",
    lastSeen: "31 min ago",
    avgResponseMinutes: 5,
    booking: "No booking yet — missed call recovery needed",
    followUp: "Call back or send SMS within 5 minutes",
    recentActivity: "Missed call converted into message thread",
    estimatedValue: "£140–£300",
    ownerAction: "Recover missed call",
    unread: true,
  },
  {
    id: "conv-olivia",
    customerName: "Olivia Brown",
    customerSlug: "olivia-brown",
    phone: "07855 734 620",
    email: "olivia.brown@example.com",
    address: "Didsbury, Manchester",
    channel: "Website",
    status: "Replied",
    priority: "Later",
    enquiry: "Maintenance plan",
    lastMessage: "Could you send information about monthly maintenance plans?",
    lastSeen: "1 hr ago",
    avgResponseMinutes: 6,
    booking: "No booking yet — nurture lead",
    followUp: "Send plan options and invite call",
    recentActivity: "Website form routed into inbox",
    estimatedValue: "£25–£65/month",
    ownerAction: "Send plan summary",
    unread: false,
  },
  {
    id: "conv-facebook",
    customerName: "Daniel Price",
    customerSlug: "daniel-price",
    phone: "07788 440 219",
    email: "daniel.price@example.com",
    address: "Sale, Greater Manchester",
    channel: "Facebook",
    status: "Needs Reply",
    priority: "Today",
    enquiry: "Electrical fault inspection",
    lastMessage: "Hi, I saw your page. We have sockets tripping downstairs. Can someone inspect it?",
    lastSeen: "12 min ago",
    avgResponseMinutes: 3,
    booking: "No booking yet — qualify electrical issue",
    followUp: "Ask if power is currently off and confirm safe access",
    recentActivity: "Facebook enquiry routed into inbox",
    estimatedValue: "£95–£220",
    ownerAction: "Qualify fault and offer inspection slot",
    unread: true,
  },
  {
    id: "conv-instagram",
    customerName: "Mia Green",
    customerSlug: "mia-green",
    phone: "07822 114 907",
    email: "mia.green@example.com",
    address: "Ancoats, Manchester",
    channel: "Instagram",
    status: "Follow-up",
    priority: "Tomorrow",
    enquiry: "Thermostat installation",
    lastMessage: "I messaged on Instagram about installing a smart thermostat.",
    lastSeen: "24 min ago",
    avgResponseMinutes: 4,
    booking: "No booking yet — waiting on thermostat model",
    followUp: "Ask for thermostat model and property type",
    recentActivity: "Instagram DM added to follow-up queue",
    estimatedValue: "£110–£190",
    ownerAction: "Ask for model and book installation",
    unread: false,
  },

  {
    id: "conv-james-wilson",
    customerName: "James Wilson",
    customerSlug: "james-wilson",
    phone: "07912 345 678",
    email: "james.wilson@example.com",
    address: "Oldham, Greater Manchester",
    channel: "WhatsApp",
    status: "Booked",
    priority: "Today",
    enquiry: "Boiler installation",
    lastMessage: "Can you confirm the engineer is still coming at 09:00?",
    lastSeen: "4 min ago",
    avgResponseMinutes: 2,
    booking: "Today, 09:00 — boiler installation",
    followUp: "Send ETA and engineer confirmation",
    recentActivity: "Customer asked for booking confirmation",
    estimatedValue: "£2,400",
    ownerAction: "Confirm engineer ETA",
    unread: true,
  },
  {
    id: "conv-amelia-ward",
    customerName: "Amelia Ward",
    customerSlug: "amelia-ward",
    phone: "07911 220 044",
    email: "amelia.ward@example.com",
    address: "Prestwich, Greater Manchester",
    channel: "Phone",
    status: "Needs Reply",
    priority: "Emergency",
    enquiry: "Emergency boiler repair",
    lastMessage: "Missed call captured. Customer has no heating and needs a same-day slot.",
    lastSeen: "6 min ago",
    avgResponseMinutes: 1,
    booking: "No booking yet — emergency slot available",
    followUp: "Call back and confirm postcode",
    recentActivity: "Missed emergency call converted into inbox thread",
    estimatedValue: "£180–£420",
    ownerAction: "Call back urgently",
    unread: true,
  },
  {
    id: "conv-daniel-khan",
    customerName: "Daniel Khan",
    customerSlug: "daniel-khan",
    phone: "07822 334 455",
    email: "daniel.khan@example.com",
    address: "Altrincham, Greater Manchester",
    channel: "Website",
    status: "Needs Reply",
    priority: "Today",
    enquiry: "Bathroom leak",
    lastMessage: "I filled in the website form. The leak is getting worse under the bath.",
    lastSeen: "16 min ago",
    avgResponseMinutes: 5,
    booking: "No booking yet — inspection slot needed",
    followUp: "Ask for photos and offer next inspection slot",
    recentActivity: "Website lead waiting for fast reply",
    estimatedValue: "£250–£650",
    ownerAction: "Qualify leak and offer booking",
    unread: true,
  },
  {
    id: "conv-lucas-green",
    customerName: "Lucas Green",
    customerSlug: "lucas-green",
    phone: "07544 556 677",
    email: "lucas.green@example.com",
    address: "Salford, Greater Manchester",
    channel: "Facebook",
    status: "Follow-up",
    priority: "Tomorrow",
    enquiry: "Blocked drain",
    lastMessage: "Thanks for the quote. Can you still do tomorrow around lunchtime?",
    lastSeen: "28 min ago",
    avgResponseMinutes: 6,
    booking: "Quote sent — waiting for confirmation",
    followUp: "Confirm tomorrow lunch slot and access details",
    recentActivity: "Facebook enquiry moved from quote to booking decision",
    estimatedValue: "£280",
    ownerAction: "Confirm availability and convert quote",
    unread: false,
  },
  {
    id: "conv-priya-shah",
    customerName: "Priya Shah",
    customerSlug: "priya-shah",
    phone: "07733 445 566",
    email: "priya.shah@example.com",
    address: "Stockport, Greater Manchester",
    channel: "Email",
    status: "Follow-up",
    priority: "Today",
    enquiry: "Annual boiler service",
    lastMessage: "Can you remind me what is included in the annual service?",
    lastSeen: "42 min ago",
    avgResponseMinutes: 7,
    booking: "No booking yet — service information requested",
    followUp: "Send service checklist and offer booking time",
    recentActivity: "Annual service lead added to follow-up queue",
    estimatedValue: "£140",
    ownerAction: "Send service summary",
    unread: false,
  },
];

const initialThreads: Record<string, ThreadMessage[]> = {
  "conv-sarah": [
    {
      id: "sarah-1",
      sender: "customer",
      name: "Sarah Johnson",
      body: "Hi, our boiler has stopped working and we have no hot water. Can someone come today?",
      time: "09:14",
      channel: "WhatsApp",
    },
    {
      id: "sarah-2",
      sender: "system",
      name: "Bee-Aura",
      body: "Emergency heating lead detected. Safe first response sent automatically. Owner reviews the booking slot after postcode/access confirmation.",
      time: "09:15",
      channel: "System",
    },
    {
      id: "sarah-auto-reply",
      sender: "business",
      name: "Bee-Aura Auto Reply",
      body: "Hi Sarah, thanks for messaging Manchester Home Services. We can help with the emergency boiler repair today. Please send your postcode and confirm someone is at the property now, and we will secure the next available engineer slot.",
      time: "09:16",
      channel: "WhatsApp",
    },
  ],
  "conv-tom": [
    {
      id: "tom-1",
      sender: "customer",
      name: "Tom Wilson",
      body: "Can I book an annual boiler service for tomorrow morning?",
      time: "08:52",
      channel: "Email",
    },
    {
      id: "tom-2",
      sender: "business",
      name: "Sarah via Bee-Aura",
      body: "Yes, we can book you in tomorrow at 09:00. Please reply YES and we will confirm the engineer.",
      time: "08:56",
      channel: "Email",
    },
    {
      id: "tom-3",
      sender: "customer",
      name: "Tom Wilson",
      body: "Thanks, tomorrow morning works for me.",
      time: "09:04",
      channel: "Email",
    },
  ],
  "conv-emma": [
    {
      id: "emma-1",
      sender: "customer",
      name: "Emma Davis",
      body: "There is water coming through under the sink. I can send a photo if that helps.",
      time: "08:41",
      channel: "SMS",
    },
    {
      id: "emma-2",
      sender: "system",
      name: "Bee-Aura",
      body: "Follow-up due: request photo, access details, and whether the leak is still active.",
      time: "08:42",
      channel: "System",
    },
  ],
  "conv-marc": [
    {
      id: "marc-1",
      sender: "system",
      name: "Bee-Aura",
      body: "Missed call captured from Marc Patel. Likely urgent drain clearance enquiry.",
      time: "08:28",
      channel: "System",
    },
  ],
  "conv-olivia": [
    {
      id: "olivia-1",
      sender: "customer",
      name: "Olivia Brown",
      body: "Could you send information about monthly maintenance plans?",
      time: "07:59",
      channel: "Website",
    },
    {
      id: "olivia-2",
      sender: "business",
      name: "Sarah via Bee-Aura",
      body: "Of course. We have maintenance options for boilers, plumbing checks, and priority call-outs.",
      time: "08:05",
      channel: "Website",
    },
  ],
  "conv-facebook": [
    {
      id: "facebook-1",
      sender: "customer",
      name: "Daniel Price",
      body: "Hi, I saw your page. We have sockets tripping downstairs. Can someone inspect it?",
      time: "09:22",
      channel: "Facebook",
    },
    {
      id: "facebook-2",
      sender: "system",
      name: "Bee-Aura",
      body: "Facebook enquiry detected. Suggested next step: ask if power is off, confirm postcode, and offer inspection slot.",
      time: "09:23",
      channel: "System",
    },
  ],
  "conv-instagram": [
    {
      id: "instagram-1",
      sender: "customer",
      name: "Mia Green",
      body: "I messaged on Instagram about installing a smart thermostat. Do you cover Manchester city centre?",
      time: "09:05",
      channel: "Instagram",
    },
    {
      id: "instagram-2",
      sender: "system",
      name: "Bee-Aura",
      body: "Instagram DM moved into follow-up queue. Ask for thermostat model and property type.",
      time: "09:06",
      channel: "System",
    },
  ],

  "conv-james-wilson": [
    {
      id: "james-wilson-1",
      sender: "customer",
      name: "James Wilson",
      body: "Can you confirm the engineer is still coming at 09:00 for the boiler installation?",
      time: "09:01",
      channel: "WhatsApp",
    },
    {
      id: "james-wilson-2",
      sender: "system",
      name: "Bee-Aura",
      body: "Booking confirmation request detected. Suggested next step: confirm ETA and reassure the customer.",
      time: "09:02",
      channel: "System",
    },
  ],
  "conv-amelia-ward": [
    {
      id: "amelia-1",
      sender: "system",
      name: "Bee-Aura",
      body: "Missed emergency call captured. Amelia Ward has no heating and needs a same-day slot.",
      time: "09:08",
      channel: "System",
    },
  ],
  "conv-daniel-khan": [
    {
      id: "daniel-1",
      sender: "customer",
      name: "Daniel Khan",
      body: "I filled in the website form. The leak is getting worse under the bath. Can someone inspect it today?",
      time: "09:12",
      channel: "Website",
    },
    {
      id: "daniel-2",
      sender: "system",
      name: "Bee-Aura",
      body: "Bathroom leak lead detected. Ask for photos, postcode, and offer the next inspection slot.",
      time: "09:13",
      channel: "System",
    },
  ],
  "conv-lucas-green": [
    {
      id: "lucas-1",
      sender: "customer",
      name: "Lucas Green",
      body: "Thanks for the quote. Can you still do tomorrow around lunchtime?",
      time: "08:59",
      channel: "Facebook",
    },
    {
      id: "lucas-2",
      sender: "business",
      name: "Sarah via Bee-Aura",
      body: "Yes, we can hold a lunchtime slot tomorrow. Please confirm access and whether the blocked drain is outside or internal.",
      time: "09:05",
      channel: "Facebook",
    },
  ],
  "conv-priya-shah": [
    {
      id: "priya-1",
      sender: "customer",
      name: "Priya Shah",
      body: "Can you remind me what is included in the annual service?",
      time: "08:44",
      channel: "Email",
    },
    {
      id: "priya-2",
      sender: "system",
      name: "Bee-Aura",
      body: "Annual service follow-up detected. Suggested next step: send service checklist and offer booking time.",
      time: "08:45",
      channel: "System",
    },
  ],
};

const channelTabs: Array<"All" | Channel> = ["All", "WhatsApp", "Facebook", "Website", "Email", "Instagram", "Phone", "SMS"];
const statusTabs: StatusTab[] = ["All", "Unread", "Needs reply", "Booked", "Follow-up", "Closed"];

function messageSlugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function priorityClass(priority: Priority) {
  return priority.toLowerCase().replace(" ", "-");
}

function statusClass(status: ConversationStatus) {
  return status.toLowerCase().replace(" ", "-");
}

function channelClass(channel: "All" | Channel) {
  return `messagesV7-channelTab messagesV7-channel-${channel.toLowerCase()}`;
}



const knownCustomerRecordSlugs = new Set([
  "tom-wilson",
  "sarah-johnson",
  "emma-davis",
]);

function customerRecordHref(conversation: Conversation) {
  const searchableName = encodeURIComponent(conversation.customerName);

  if (conversation.customerSlug && knownCustomerRecordSlugs.has(conversation.customerSlug)) {
    return `/customers/${conversation.customerSlug}`;
  }

  return `/customers?search=${searchableName}`;
}

function makeSuggestedReply(conversation: Conversation) {
  if (conversation.priority === "Emergency") {
    return `Hi ${conversation.customerName.split(" ")[0]}, thanks for messaging Manchester Home Services. We can help with the ${conversation.enquiry.toLowerCase()} today. Please confirm your postcode and whether someone is at the property now, and I will secure the next available engineer slot.`;
  }

  if (conversation.status === "Booked") {
    return `Hi ${conversation.customerName.split(" ")[0]}, your booking is confirmed for ${conversation.booking}. We will send a reminder before arrival. Please reply here if anything changes.`;
  }

  if (conversation.status === "Follow-up") {
    return `Hi ${conversation.customerName.split(" ")[0]}, thanks for the update. Please send the photo when ready and let us know your preferred access time. We can then confirm the best next slot for you.`;
  }

  return `Hi ${conversation.customerName.split(" ")[0]}, thanks for contacting Manchester Home Services. We can help with your ${conversation.enquiry.toLowerCase()}. Please send your postcode and preferred time, and we will come back with the best available option.`;
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(baseConversations);
  const [threads, setThreads] = useState<Record<string, ThreadMessage[]>>(initialThreads);
  const [selectedId, setSelectedId] = useState(baseConversations[0].id);
  const [channelTab, setChannelTab] = useState<"All" | Channel>("All");
  const [statusTab, setStatusTab] = useState<StatusTab>("All");
  const [searchText, setSearchText] = useState("");
  const [composerText, setComposerText] = useState("");
  const [showNewMessagePanel, setShowNewMessagePanel] = useState(false);
  const [newMessageForm, setNewMessageForm] = useState({
    channel: "WhatsApp" as NewMessageChannel,
    customerName: "",
    contact: "",
    email: "",
    enquiry: "",
    message: "",
  });
  const [, setActionNotice] = useState("Messages command centre ready.");
  const [activityItems, setActivityItems] = useState<ActivityItem[]>([
    {
      id: "activity-start-1",
      text: "Emergency heating lead flagged for fast reply.",
    },
    {
      id: "activity-start-2",
      text: "Average response target set to 2m 48s.",
    },
    {
      id: "activity-start-3",
      text: "Owner approval remains required for high-risk actions.",
    },
  ]);

  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedId) ?? conversations[0];

  const suggestedReply = composerText || makeSuggestedReply(selectedConversation);
  const selectedMessages = threads[selectedConversation.id] ?? [];

  const filteredConversations = useMemo(() => {
    const lowerSearch = searchText.trim().toLowerCase();

    return conversations.filter((conversation) => {
      const channelMatch = channelTab === "All" || conversation.channel === channelTab;

      const statusMatch =
        statusTab === "All" ||
        (statusTab === "Unread" && conversation.unread) ||
        (statusTab === "Needs reply" &&
          (conversation.status === "Needs Reply" || conversation.status === "Unread")) ||
        (statusTab === "Booked" && conversation.status === "Booked") ||
        (statusTab === "Follow-up" && conversation.status === "Follow-up") ||
        (statusTab === "Closed" && conversation.status === "Closed");

      const searchMatch =
        lowerSearch.length === 0 ||
        conversation.customerName.toLowerCase().includes(lowerSearch) ||
        conversation.enquiry.toLowerCase().includes(lowerSearch) ||
        conversation.phone.toLowerCase().includes(lowerSearch) ||
        conversation.channel.toLowerCase().includes(lowerSearch);

      return channelMatch && statusMatch && searchMatch;
    });
  }, [channelTab, conversations, searchText, statusTab]);

  function submitInboxSearch(event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    const firstMatch = filteredConversations[0];

    if (firstMatch) {
      selectConversation(firstMatch);
      pushActivity(`Search opened ${firstMatch.customerName}'s ${firstMatch.channel} thread.`);
      return;
    }

    pushActivity("No matching inbox conversation found.");
  }

  function clearInboxSearch() {
    setSearchText("");
    pushActivity("Inbox search cleared.");
  }

  const statusCounts = useMemo(() => {
    return conversations.reduce(
      (counts, conversation) => {
        counts.total += 1;
        if (conversation.unread) counts.unread += 1;
        if (conversation.status === "Needs Reply" || conversation.status === "Unread") {
          counts.needsReply += 1;
        }
        if (conversation.status === "Booked") counts.booked += 1;
        if (conversation.status === "Follow-up") counts.followUp += 1;
        return counts;
      },
      { total: 0, unread: 0, needsReply: 0, booked: 0, followUp: 0 },
    );
  }, [conversations]);

  function pushActivity(message: string) {
    const activityId = `activity-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    setActionNotice(message);
    setActivityItems((current) => [{ id: activityId, text: message }, ...current].slice(0, 5));
  }

  function selectConversation(conversation: Conversation) {
    setSelectedId(conversation.id);
    setComposerText("");
    setConversations((current) =>
      current.map((item) =>
        item.id === conversation.id
          ? {
              ...item,
              unread: false,
              status: item.status === "Unread" ? "Needs Reply" : item.status,
            }
          : item,
      ),
    );
    pushActivity(`Opened ${conversation.customerName}'s ${conversation.channel} thread.`);
  }

  function startNewMessage() {
    setShowNewMessagePanel(true);

    window.setTimeout(() => {
      document
        .getElementById("messages-new-message-panel")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);

    pushActivity("New message form opened.");
  }

  function updateNewMessageForm(field: keyof typeof newMessageForm, value: string) {
    setNewMessageForm((current) => ({ ...current, [field]: value }));
  }

  function createNewMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanName = newMessageForm.customerName.trim();
    const cleanContact = newMessageForm.contact.trim();
    const cleanEmail = newMessageForm.email.trim();
    const cleanEnquiry = newMessageForm.enquiry.trim();
    const cleanMessage = newMessageForm.message.trim();

    if (!cleanName || !cleanEnquiry || !cleanMessage) {
      pushActivity("Add a customer name, enquiry and message before creating the thread.");
      return;
    }

    const newId = `new-demo-${Date.now()}`;
    const firstName = cleanName.split(" ")[0] || "there";

    const newConversation: Conversation = {
      id: newId,
      customerName: cleanName,
      customerSlug: messageSlugify(cleanName),
      phone: cleanContact || "07--- --- ---",
      email: cleanEmail || "new.lead@example.com",
      address: "Manchester, UK",
      channel: newMessageForm.channel,
      status: "Needs Reply",
      priority: "Today",
      enquiry: cleanEnquiry,
      lastMessage: cleanMessage,
      lastSeen: "Just now",
      avgResponseMinutes: 0,
      booking: "No booking yet — qualify the enquiry first",
      followUp: "Ask for postcode, preferred time and booking intent",
      recentActivity: `New ${newMessageForm.channel} thread created from the inbox form`,
      estimatedValue: "To qualify",
      ownerAction: "Send first response",
      unread: true,
    };

    setConversations((current) => [newConversation, ...current]);
    setThreads((current) => ({
      ...current,
      [newId]: [
        {
          id: `${newId}-customer`,
          sender: "customer",
          name: cleanName,
          body: cleanMessage,
          time: "Just now",
          channel: newMessageForm.channel,
        },
        {
          id: `${newId}-system`,
          sender: "system",
          name: "Bee-Aura",
          body: `New ${newMessageForm.channel} message created. Suggested next step: reply quickly, confirm service details, and move the enquiry toward a booking.`,
          time: "Just now",
          channel: "System",
        },
      ],
    }));

    setSelectedId(newId);
    setChannelTab("All");
    setStatusTab("All");
    setSearchText("");
    setComposerText(
      `Hi ${firstName}, thanks for contacting Manchester Home Services. We can help with your ${cleanEnquiry.toLowerCase()}. Please send your postcode and preferred time, and we will come back with the best available option.`,
    );

    setNewMessageForm({
      channel: "WhatsApp",
      customerName: "",
      contact: "",
      email: "",
      enquiry: "",
      message: "",
    });

    setShowNewMessagePanel(false);
    pushActivity(`New ${newMessageForm.channel} thread created for ${cleanName}.`);
  }

  function updateSelectedConversation(update: Partial<Conversation>, notice: string) {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedConversation.id ? { ...conversation, ...update } : conversation,
      ),
    );
    pushActivity(notice);
  }

  function sendMessage(text: string, label: string) {
    const cleanText = text.trim();

    if (!cleanText) {
      pushActivity("Type a message or choose a suggested reply first.");
      return;
    }

    const outgoingMessage: ThreadMessage = {
      id: `msg-${Date.now()}`,
      sender: "business",
      name: "Sarah via Bee-Aura",
      body: cleanText,
      time: "Just now",
      channel: selectedConversation.channel,
    };

    setThreads((current) => ({
      ...current,
      [selectedConversation.id]: [...(current[selectedConversation.id] ?? []), outgoingMessage],
    }));

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedConversation.id
          ? {
              ...conversation,
              status: "Replied",
              unread: false,
              lastMessage: cleanText,
              lastSeen: "Just now",
              avgResponseMinutes: Math.min(conversation.avgResponseMinutes, 2),
              recentActivity: label,
            }
          : conversation,
      ),
    );

    setComposerText("");
    pushActivity(`${label}: reply added to ${selectedConversation.customerName}'s thread.`);
  }

  function copyPhoneNumber() {
    void navigator.clipboard?.writeText(selectedConversation.phone);
    pushActivity(`Copied phone number for ${selectedConversation.customerName}.`);
  }

  function loadReplyTemplate(template: "fast" | "booking" | "followup") {
    if (template === "fast") {
      setComposerText(makeSuggestedReply(selectedConversation));
      pushActivity("Fast reply template loaded into the message box.");
      return;
    }

    if (template === "booking") {
      setComposerText(
        `Hi ${selectedConversation.customerName.split(" ")[0]}, we can book this in for you. Please confirm your postcode and the best arrival window, and we will secure the slot.`,
      );
      pushActivity("Booking template loaded into the message box.");
      return;
    }

    setComposerText(
      `Hi ${selectedConversation.customerName.split(" ")[0]}, just following up on your ${selectedConversation.enquiry.toLowerCase()}. Would you like us to get this booked in?`,
    );
    pushActivity("Follow-up template loaded into the message box.");
  }

  return (
    <main className="messagesV7-page">
<section className="messagesV7-hero">
        <div>
          <p className="messagesV7-eyebrow">Bee-Aura AI Inbox</p>
          <h1>Messages that turn into booked jobs.</h1>
          <p>
            One command centre for WhatsApp, email, SMS, calls, and web enquiries — built for fast
            replies, clean handovers, and owner-controlled lead recovery.
          </p>
        </div>

        <div className="messagesV7-heroActions">
          <button type="button" onClick={startNewMessage} className="messagesV7-primaryButton">
            + New Message
          </button>
          <Link href="/bookings" className="messagesV7-secondaryButton">
            View Bookings
          </Link>

          
          <form className="baMessagesHeaderSearch" onSubmit={submitInboxSearch}>
            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search inbox..."
              aria-label="Search inbox"
            />
            <button type="submit">Search</button>
          </form>

<Link href="/settings" className="messagesV7-ownerTab" aria-label="Open owner settings">
            <span>JD</span>
            <strong>John D<small>Owner</small></strong>
            <em>⌄</em>
          </Link>
        </div>
      </section>
<section className="baFlowStrip baFlowStrip--messages" aria-label="Turn each message into the next clear action.">
        <div className="baFlowIntro">
          <p>Reply to booking path</p>
          <h2>Turn each message into the next clear action.</h2>
          <span>Aura handles the safe conversation flow, gathers missing details and prepares the next action for owner approval when needed.</span>
        </div>

        <div className="baFlowCards">

          <Link href="/messages?search=Sarah%20Johnson" className="baFlowCard">
            <span>Now</span>
            <strong>Auto reply sent</strong>
            <small>Safe first response sent. Waiting for postcode.</small>
            <em>Open inbox</em>
          </Link>

          <Link href="/bookings?search=Sarah%20Johnson" className="baFlowCard">
            <span>14:30</span>
            <strong>Check booking slot</strong>
            <small>Sarah Johnson has a same-day emergency slot ready.</small>
            <em>Open booking</em>
          </Link>

          <Link href="/follow-ups?search=Emma%20Davis" className="baFlowCard">
            <span>16:00</span>
            <strong>Set follow-up</strong>
            <small>Emma Davis needs a reminder so the lead does not go cold.</small>
            <em>Open task</em>
          </Link>
        </div>
      </section>


      {showNewMessagePanel ? (
        <section id="messages-new-message-panel" className="messagesV7-newMessagePanel">
          <div className="messagesV7-newMessageHeader">
            <div>
              <p className="messagesV7-eyebrow">Create message</p>
              <h2>Start a new customer conversation.</h2>
              <span>Choose WhatsApp, SMS or Email and create a demo inbox thread.</span>
            </div>

            <button type="button" onClick={() => setShowNewMessagePanel(false)}>
              Close
            </button>
          </div>

          <form className="messagesV7-newMessageForm" onSubmit={createNewMessage}>
            <label>
              Message type
              <select
                value={newMessageForm.channel}
                onChange={(event) => updateNewMessageForm("channel", event.target.value as NewMessageChannel)}
              >
                <option>WhatsApp</option>
                <option>SMS</option>
                <option>Email</option>
              </select>
            </label>

            <label>
              Customer name
              <input
                value={newMessageForm.customerName}
                onChange={(event) => updateNewMessageForm("customerName", event.target.value)}
                placeholder="Customer name"
              />
            </label>

            <label>
              Phone / contact
              <input
                value={newMessageForm.contact}
                onChange={(event) => updateNewMessageForm("contact", event.target.value)}
                placeholder="07..."
              />
            </label>

            <label>
              Email
              <input
                value={newMessageForm.email}
                onChange={(event) => updateNewMessageForm("email", event.target.value)}
                placeholder="customer@example.com"
              />
            </label>

            <label>
              Enquiry
              <input
                value={newMessageForm.enquiry}
                onChange={(event) => updateNewMessageForm("enquiry", event.target.value)}
                placeholder="Boiler repair, leak, booking question..."
              />
            </label>

            <label className="messagesV7-newMessageText">
              Message
              <textarea
                value={newMessageForm.message}
                onChange={(event) => updateNewMessageForm("message", event.target.value)}
                placeholder="Type the first customer message here..."
              />
            </label>

            <div className="messagesV7-newMessageActions">
              <button type="button" onClick={() => setShowNewMessagePanel(false)}>
                Cancel
              </button>
              <button type="submit">
                Create Thread
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <section className="messagesV7-kpiRow">
        <article>
          <span>Average response</span>
          <strong>2m 48s</strong>
          <small>Under 12 minute target</small>
        </article>
        <article>
          <span>Needs reply</span>
          <strong>{statusCounts.needsReply}</strong>
          <small>Live threads to recover</small>
        </article>
        <article>
          <span>Unread</span>
          <strong>{statusCounts.unread}</strong>
          <small>Waiting for action</small>
        </article>
        <article>
          <span>Booked</span>
          <strong>{statusCounts.booked}</strong>
          <small>Conversations converted</small>
        </article>
      </section>

      <section className="messagesV7-tabsPanel">
        <div>
          <p>Channel tabs</p>
          <div className="messagesV7-tabRow">
            {channelTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setChannelTab(tab);
                  pushActivity(`${tab} channel tab selected.`);
                }}
                className={`${channelClass(tab)} ${channelTab === tab ? "isActive" : ""}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p>Status tabs</p>
          <div className="messagesV7-tabRow">
            {statusTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setStatusTab(tab);
                  pushActivity(`${tab} status tab selected.`);
                }}
                className={statusTab === tab ? "isActive" : ""}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        
      </section>

      <section className="messagesV7-shell">
        <aside className="messagesV7-listPanel">
          <div className="messagesV7-panelHeader">
            <div>
              <p>Live inbox</p>
              <h2>{filteredConversations.length} conversations</h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setChannelTab("All");
                setStatusTab("All");
                setSearchText("");
                pushActivity("Inbox filters cleared.");
              }}
            >
              Clear
            </button>
          </div>

          <div className="messagesV7-conversationList">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                onClick={() => selectConversation(conversation)}
                className={`messagesV7-conversationCard ${
                  selectedConversation.id === conversation.id ? "isSelected" : ""
                }`}
              >
                <span className={`messagesV7-priority ${priorityClass(conversation.priority)}`}>
                  {conversation.priority}
                </span>
                <strong>{conversation.customerName}</strong>
                <small>
                  {conversation.channel} · {conversation.lastSeen}
                </small>
                <p>{conversation.lastMessage}</p>
                <span className={`messagesV7-status ${statusClass(conversation.status)}`}>
                  {conversation.status}
                </span>
              </button>
            ))}

            {filteredConversations.length === 0 && (
              <div className="messagesV7-empty">
                <strong>No conversations found.</strong>
                <p>Clear the filters or start a new demo message.</p>
                <button type="button" onClick={startNewMessage}>
                  Create demo message
                </button>
              </div>
            )}
          </div>
        </aside>

        <section className="messagesV7-chatPanel">
          <div className="messagesV7-chatHeader">
            <div>
              <p>{selectedConversation.channel} conversation</p>
              <h2>{selectedConversation.customerName}</h2>
              <span>{selectedConversation.enquiry}</span>
            </div>
            <div className="messagesV7-chatHeaderActions">
              {selectedConversation.customerSlug ? (
                <Link href={customerRecordHref(selectedConversation)}>Open Customer</Link>
              ) : (
                <button
                  type="button"
                  onClick={() => pushActivity("Demo customer record prepared but not saved.")}
                >
                  Create Customer
                </button>
              )}
            </div>
          </div>

          <div className="messagesV7-thread">
            {selectedMessages.map((message) => (
              <div
                key={message.id}
                data-message-sender={message.sender}
                className={`messagesV7-messageRow ${
                  message.sender === "business"
                    ? "isBusiness"
                    : message.sender === "system"
                      ? "isSystem"
                      : ""
                }`}
              >
                <article>
                  <span>
                    {message.name} · {message.time}
                  </span>
                  <p>{message.body}</p>
                </article>
              </div>
            ))}
          </div>

          <div className="messagesV7-composer">
            <div>
              <p>Auto reply sent</p>
              <strong>{suggestedReply}</strong>
            </div>

            <textarea
              value={composerText}
              onChange={(event) => setComposerText(event.target.value)}
              placeholder="Write a reply or load a template..."
            />

            <div className="messagesV7-composerActions">
              <button type="button" onClick={() => loadReplyTemplate("fast")}>
                Continue Aura Intake
              </button>
              <button type="button" onClick={() => loadReplyTemplate("booking")}>
                Prepare Booking
              </button>
              <button type="button" onClick={() => loadReplyTemplate("followup")}>
                Continue Follow-Up
              </button>
              <button
                type="button"
                className="messagesV7-primaryButton"
                onClick={() => sendMessage(suggestedReply, "Message sent")}
              >
                Approve & Send
              </button>
            </div>
          </div>
        </section>
      </section>

      <section className="messagesV7-bottomGrid">
        <article>
          <span>Contact Details</span>
          <h3>{selectedConversation.customerName}</h3>
          <p>{selectedConversation.phone}</p>
          <p>{selectedConversation.email}</p>
          <p>{selectedConversation.address}</p>
        </article>

        <article>
          <span>Upcoming Booking</span>
          <h3>{selectedConversation.booking}</h3>
          <p>Estimated value: {selectedConversation.estimatedValue}</p>
          <button
            type="button"
            onClick={() =>
              updateSelectedConversation(
                { status: "Booked", booking: "Demo slot secured — next available engineer" },
                `${selectedConversation.customerName} marked as booked.`,
              )
            }
          >
            Mark booked
          </button>
        </article>

        <article>
          <span>Follow-Up Due</span>
          <h3>{selectedConversation.followUp}</h3>
          <p>Owner action: {selectedConversation.ownerAction}</p>
          <button
            type="button"
            onClick={() =>
              updateSelectedConversation(
                { status: "Follow-up", followUp: "Follow-up scheduled for later today" },
                `Follow-up scheduled for ${selectedConversation.customerName}.`,
              )
            }
          >
            Schedule follow-up
          </button>
        </article>

        <article>
          <span>Recent Activity</span>
          <h3>{selectedConversation.recentActivity}</h3>
          <ul>
            {activityItems.map((item) => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => pushActivity(`${selectedConversation.customerName} activity reviewed.`)}
          >
            Mark reviewed
          </button>
        </article>

        <article className="messagesV7-aiCard">
          <span>AI Suggestions</span>
          <h3>Next best move</h3>
          <p>{selectedConversation.ownerAction}</p>
          <div>
            <button
              type="button"
              onClick={() =>
                updateSelectedConversation(
                  { priority: "Emergency" },
                  `${selectedConversation.customerName} marked urgent for owner review.`,
                )
              }
            >
              Mark urgent
            </button>
            <button
              type="button"
              onClick={() => sendMessage(makeSuggestedReply(selectedConversation), "AI suggestion sent")}
            >
              Approve AI Suggestion
            </button>
          </div>
        </article>
      </section>

      <section className="messagesV7-brandBanner messagesV7-brandBannerWithBot">
        <Link href="/messages" className="messagesV7-brandBot" aria-label="Open Aura message assistant">
          <img
            src="/brand/source/aura-assistant-transparent.png"
            alt="Aura Assistant"
          />
        </Link>
        <div>
          <p>From ping to paid job</p>
          <h2>Bee-Aura keeps every lead warm, every reply fast, and every booking under control.</h2>
        </div>
        <div>
          <span>Recover missed calls</span>
          <span>Reply before leads go cold</span>
          <span>Turn chats into booked work</span>
          <span>Keep the owner in control</span>
        </div>
      </section>
    </main>
  );
}
