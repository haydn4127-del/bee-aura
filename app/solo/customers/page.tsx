import Link from "next/link";
import { soloCustomers } from "../soloData";

export default function SoloCustomersPage() {
  return (
    <main className="soloJourneyPage">
      <section className="soloSplitHero">
        <div>
          <p className="simpleEyebrow">SOLO CUSTOMERS</p>
          <h1>Useful customer notes, without the faff.</h1>
          <p>
            Solo Customers shows who needs you, what Aura spotted, and the next useful action.
          </p>
        </div>
        <Link href="/solo/today">Back to Today</Link>
      </section>

      <section className="soloCustomerGrid">
        {soloCustomers.map((customer) => (
          <article key={customer.slug} className="soloCustomerCard">
            <div className="soloCustomerAvatar">{customer.initials}</div>
            <div>
              <span>{customer.status}</span>
              <h2>{customer.name}</h2>
              <p>{customer.need}</p>
              <small>{customer.area} · {customer.source} · {customer.value}</small>
              <div className="soloTodayActions">
                <Link href={`/solo/customers/${customer.slug}`}>View record</Link>
                <Link href={customer.actionHref}>Open action</Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
