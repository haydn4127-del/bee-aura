import { recoveryCases } from "../recovery/recoveryData";

export const soloActions = recoveryCases.map((item) => ({
  slug: item.playbook,
  status: item.status,
  title: `${item.customer}: ${item.title}`,
  detail: item.nextMove,
  value: item.channel,
  meta: item.age,
  tone: item.tone,
  actionLabel: "Open playbook",
  actionHref: `/playbooks/${item.playbook}`,
  customerHref: `/recovery/cases/${item.slug}`,
}));

export const soloCustomers = recoveryCases.map((item) => ({
  slug: item.slug,
  name: item.customer,
  status: item.status,
  detail: item.title,
  href: `/recovery/cases/${item.slug}`,
}));
