import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

interface RelatedGroup {
  title: string;
  links: { label: string; href: string }[];
}

export default function RelatedSection({ groups, className }: { groups: RelatedGroup[]; className?: string }) {
  const filtered = groups.filter((g) => g.links.length > 0);
  if (filtered.length === 0) return null;

  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((group) => (
          <div key={group.title} className="bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5">
            <h4 className="text-[10px] font-mono tracking-widest uppercase text-accent/60 mb-3">{group.title}</h4>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
