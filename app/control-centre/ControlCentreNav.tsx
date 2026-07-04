import Link from "next/link";
import { controlNav } from "./controlCentreData";

export function ControlCentreNav({ active }: { active: string }) {
  return (
    <nav className="controlTabsV4" aria-label="Control Centre sections">
      {controlNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={item.href === active ? "isActive" : undefined}
          aria-current={item.href === active ? "page" : undefined}
        >
          <span>{item.label}</span>
          <small>{item.kicker}</small>
        </Link>
      ))}
    </nav>
  );
}
