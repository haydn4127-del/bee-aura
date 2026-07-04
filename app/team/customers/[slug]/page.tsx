import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeamCustomer, teamCustomers } from "../../teamData";

export function generateStaticParams() {
  return teamCustomers.map((customer) => ({ slug: customer.slug }));
}

export default async function TeamCustomerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const customer = getTeamCustomer(slug);

  if (!customer) {
    notFound();
  }

  return (
    <main className="teamOpsV4">
      <section className="teamCustomerHeroV4">
        <div className="teamCustomerBadgeV4">{customer.initials}</div>
        <div>
          <p className="teamEyebrowV4">{customer.status}</p>
          <h1>{customer.name}</h1>
          <p>{customer.detail}</p>
        </div>
        <Link className="teamSecondaryActionV4" href="/team/customers">
          Back to customers
        </Link>
      </section>

      <section className="teamDetailGridV4">
        <article className="teamDetailCardV4">
          <h2>Who owns it and what happens next?</h2>
          <dl className="teamDetailFactsV4">
            <div>
              <dt>Owner</dt>
              <dd>{customer.owner}</dd>
            </div>
            <div>
              <dt>Last touch</dt>
              <dd>{customer.lastTouch}</dd>
            </div>
            <div>
              <dt>Next action</dt>
              <dd>{customer.nextAction}</dd>
            </div>
          </dl>
          <div className="teamButtonRowV4">
            <Link href={customer.actionHref}>Open action</Link>
            <Link href="/team/queue">Shared queue</Link>
          </div>
        </article>

        <article className="teamDetailCardV4">
          <h2>No repeat questions. No lost handovers.</h2>
          <ul className="teamContextListV4">
            {customer.teamContext.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <aside className="teamResultCardV4">
          <span>Safety note</span>
          <strong>{customer.caution}</strong>
          <p>
            Aura helps the team move faster, but customer-facing decisions stay controlled.
          </p>
        </aside>
      </section>
    </main>
  );
}
