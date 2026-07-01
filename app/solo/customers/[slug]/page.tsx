import Link from "next/link";
import { notFound } from "next/navigation";
import { getSoloCustomer, soloCustomers } from "../../soloData";

export function generateStaticParams() {
  return soloCustomers.map((customer) => ({ slug: customer.slug }));
}

export default async function SoloCustomerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const customer = getSoloCustomer(slug);

  if (!customer) {
    notFound();
  }

  return (
    <main className="soloJourneyPage">
      <section className="soloHiddenHero">
        <div>
          <p className="simpleEyebrow">HIDDEN SOLO CUSTOMER RECORD</p>
          <h1>{customer.name}</h1>
          <p>{customer.need}</p>
        </div>
        <div className="soloCustomerAvatar soloCustomerAvatarLarge">{customer.initials}</div>
      </section>

      <section className="soloHiddenGrid">
        <article className="soloHiddenPanel">
          <p className="simpleEyebrow">CUSTOMER MEMORY</p>
          <h2>Simple record</h2>
          <dl className="soloCustomerFacts">
            <div><dt>Status</dt><dd>{customer.status}</dd></div>
            <div><dt>Area</dt><dd>{customer.area}</dd></div>
            <div><dt>Source</dt><dd>{customer.source}</dd></div>
            <div><dt>Value</dt><dd>{customer.value}</dd></div>
            <div><dt>Next action</dt><dd>{customer.nextAction}</dd></div>
          </dl>

          <div className="soloTodayActions">
            <Link href={customer.actionHref}>Open action</Link>
            <Link href="/solo/customers">Back to customers</Link>
          </div>
        </article>

        <aside className="soloActionBrain">
          <img src="/brand/source/aura-assistant-transparent.png" alt="Aura assistant" />
          <p className="simpleEyebrow">AURA CUSTOMER MEMORY</p>
          <h2>Enough to act. Not enough to give you a headache.</h2>
          <p>
            Solo customer notes stay short on purpose. Aura keeps the next useful action first.
          </p>
        </aside>
      </section>
    </main>
  );
}
