import Link from "next/link";
import { notFound } from "next/navigation";

const customers = [
  { slug: "tom-wilson", name: "Tom Wilson", service: "Boiler repair", phone: "07912 345678", source: "Google", value: "£450", status: "New lead", nextAction: "Call tomorrow at 10:00 AM" },
  { slug: "sarah-johnson", name: "Sarah Johnson", service: "Plumbing leak", phone: "07845 678912", source: "Website", value: "£320", status: "Contacted", nextAction: "Follow up today at 2:00 PM" },
  { slug: "emma-davis", name: "Emma Davis", service: "Bathroom renovation", phone: "07955 789123", source: "Referral", value: "£6,200", status: "Quote sent", nextAction: "Follow up tomorrow at 11:00 AM" },
  { slug: "mike-thompson", name: "Mike Thompson", service: "Electrical fault", phone: "07798 123456", source: "Google", value: "£180", status: "Follow-up due", nextAction: "Follow up today at 4:00 PM" },
  { slug: "james-brown", name: "James Brown", service: "Drain clearance", phone: "07534 567890", source: "Facebook", value: "£220", status: "New lead", nextAction: "Follow up tomorrow at 9:30 AM" },
  { slug: "olivia-smith", name: "Olivia Smith", service: "Thermostat install", phone: "07766 445566", source: "Website", value: "£210", status: "Contacted", nextAction: "Follow up tomorrow at 1:00 PM" },
  { slug: "david-clarke", name: "David Clarke", service: "Roof repair", phone: "07888 223344", source: "Referral", value: "£1,850", status: "Referral", nextAction: "Review customer history" },
  { slug: "charlotte-lee", name: "Charlotte Lee", service: "Boiler service", phone: "07890 112233", source: "Google", value: "£120", status: "Referral", nextAction: "Send annual service reminder" },
  { slug: "ben-morris", name: "Ben Morris", service: "Bathroom leak", phone: "07700 998877", source: "Website", value: "£250", status: "Follow-up due", nextAction: "Follow up today at 11:00 AM" },
  { slug: "amelia-ward", name: "Amelia Ward", service: "Emergency boiler repair", phone: "07911 220044", source: "Google", value: "£420", status: "Critical lead", nextAction: "Call immediately" },
  { slug: "daniel-khan", name: "Daniel Khan", service: "Bathroom leak", phone: "07822 334455", source: "Website", value: "£650", status: "Contacted", nextAction: "Send quote follow-up" },
  { slug: "priya-shah", name: "Priya Shah", service: "Annual boiler service", phone: "07733 445566", source: "Referral", value: "£140", status: "Follow-up due", nextAction: "Confirm service appointment" },
  { slug: "lucas-green", name: "Lucas Green", service: "Blocked drain", phone: "07544 556677", source: "Facebook", value: "£280", status: "Quote sent", nextAction: "Follow up tomorrow at 12:00 PM" },
];

export function generateStaticParams() {
  return customers.map((customer) => ({ slug: customer.slug }));
}

export const dynamicParams = false;

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const customer = customers.find((item) => item.slug === slug);

  if (!customer) {
    notFound();
  }

  return (
    <main className="customer-detail-page">
      <header className="customer-detail-header">
        <div>
          <p className="eyebrow">Customer Record</p>
          <h1>{customer.name}</h1>
          <p>{customer.service} enquiry from {customer.source}.</p>
        </div>

        <Link href="/leads" className="customer-back-link">
          ← Back to Leads
        </Link>
      </header>

      <section className="customer-detail-grid">
        <article className="customer-detail-card">
          <h2>Contact</h2>
          <p><span>Phone</span><strong>{customer.phone}</strong></p>
          <p><span>Status</span><strong>{customer.status}</strong></p>
          <p><span>Estimated value</span><strong>{customer.value}</strong></p>
        </article>

        <article className="customer-detail-card">
          <h2>Recommended next action</h2>
          <p>{customer.nextAction}</p>
          <div className="customer-detail-actions">
            <Link href="/messages">Open Messages</Link>
            <Link href="/bookings">Create Booking</Link>
            <Link href="/follow-ups">Schedule Follow-Up</Link>
          </div>
        </article>

        <article className="customer-detail-card wide">
          <h2>Demo history</h2>
          <ul>
            <li>Lead captured in Bee-Aura AI demo system.</li>
            <li>Conversation and follow-up activity visible across the dashboard.</li>
            <li>Owner can control next action before any real customer message is sent.</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
