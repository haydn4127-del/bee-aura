import Link from "next/link";
import { teamCustomers } from "../teamData";

export default function TeamCustomersPage() {
  return (
    <main className="teamOpsV4">
      <section className="teamPageHeaderV4">
        <div>
          <p className="teamEyebrowV4">TEAM CUSTOMER CONTEXT</p>
          <h1>Customer context the whole team can understand.</h1>
          <p>
            Aura keeps the useful bits in one place, so the next person does not have
            to decode a pile of notes.
          </p>
        </div>
        <Link className="teamSecondaryActionV4" href="/team/queue">
          Open shared queue
        </Link>
      </section>

      <section className="teamCustomerGridV4">
        {teamCustomers.map((customer) => (
          <article key={customer.slug} className="teamCustomerCardV4">
            <div className="teamCustomerBadgeV4">{customer.initials}</div>
            <div className="teamCardMetaV4">
              <span>{customer.status}</span>
              <small>{customer.lastTouch}</small>
            </div>
            <h2>{customer.name}</h2>
            <p>{customer.detail}</p>
            <div className="teamCustomerMiniV4">
              <span>Owner</span>
              <strong>{customer.owner}</strong>
              <small>Next: {customer.nextAction}</small>
            </div>
            <div className="teamButtonRowV4">
              <Link href={`/team/customers/${customer.slug}`}>View context</Link>
              <Link href={customer.actionHref}>Open action</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
