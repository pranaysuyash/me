import Link from "next/link";

export interface SectionIndexItem {
  label: string;
  href: `#${string}`;
}

interface SectionIndexProps {
  items: readonly SectionIndexItem[];
  label?: string;
}

export function SectionIndex({ items, label = "On this page" }: SectionIndexProps) {
  return (
    <nav aria-label={label} className="border-b bg-background">
      <div className="container mx-auto flex max-w-[1280px] items-center gap-4 overflow-x-auto px-4 py-4 [scrollbar-width:none] md:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden">
        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </span>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
