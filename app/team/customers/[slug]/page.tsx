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
    <main className="teamPackagePage teamPackageV3">
      <section className="teamHeaderV3">
        <div>
          <p className="simpleEyebrow">TEAM CUSTOMER CONTEXT</p>
          <h1>{customer.name}</h1>
          <p>{customer.detail}</p>
        </div>

        <div className="teamAvatarV3 teamAvatarLargeV3">{customer.initials}</div>
      </section>

      <section className="teamDetailGridV3">
        <article className="teamDetailPanelV3">
          <p className="simpleEyebrow">TEAM VIEW</p>
          <h2>Who owns it and what happens next?</h2>
          <dl className="teamFactsV3">
            <div><dt>Status</dt><dd>{customer.status}</dd></div>
            <div><dt>Owner</dt><dd>{customer.owner}</dd></div>
            <div><dt>Next action</dt><dd>{customer.nextAction}</dd></div>
          </dl>

          <div className="teamButtonRowV3">
            <Link href={customer.actionHref}>Open action</Link>
            <Link href="/team/customers">Back to customers</Link>
          </div>
        </article>

        <aside className="teamDetailPanelV3">
          <p className="simpleEyebrow">AURA TEAM CONTEXT</p>
          <h2>No repeat questions. No lost handovers.</h2>
          <p>
            Aura keeps the useful customer context visible so the team can pick up
            the work without starting from scratch.
          </p>
        </aside>
      </section>
    </main>
  );
}
