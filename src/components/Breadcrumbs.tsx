import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react";

interface Crumb {
  label: string;
  href: string;
}

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  if (!crumbs || crumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] font-mono text-text-secondary/50 mb-6 overflow-x-auto">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={crumb.href} className="flex items-center gap-1.5 whitespace-nowrap">
            {i > 0 && <CaretRight size={10} weight="bold" className="text-text-secondary/20" />}
            {isLast ? (
              <span className="text-text-secondary/40">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-accent transition-colors duration-200">
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
