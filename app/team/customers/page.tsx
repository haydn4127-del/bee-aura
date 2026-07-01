import Link from "next/link";
import { teamCustomers } from "../teamData";

export default function TeamCustomersPage() {
  return (
    <main className="teamPackagePage teamPackageV3">
      <section className="teamHeaderV3">
        <div>
          <p className="simpleEyebrow">TEAM CUSTOMERS</p>
          <h1>Customer context the whole team can understand.</h1>
          <p>
            Team Customers shows the owner, the next action and the useful context
            needed for clean handovers.
          </p>
        </div>
        <Link href="/team/queue">Open shared queue</Link>
      </section>

      <section className="teamCustomerGridV3">
        {teamCustomers.map((customer) => (
          <article key={customer.slug} className="teamCustomerCardV3">
            <div className="teamAvatarV3">{customer.initials}</div>
            <div>
              <span>{customer.status}</span>
              <h2>{customer.name}</h2>
              <p>{customer.detail}</p>
              <small>Owner: {customer.owner} · Next: {customer.nextAction}</small>
              <div className="teamButtonRowV3">
                <Link href={`/team/customers/${customer.slug}`}>View context</Link>
                <Link href={customer.actionHref}>Open action</Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
