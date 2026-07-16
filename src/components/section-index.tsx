import Link from "next/link";

export interface SectionIndexItem {
  label: string;
  href: `#${string}`;
  description?: string;
}

interface SectionIndexProps {
  items: readonly SectionIndexItem[];
  label?: string;
}

export function SectionIndex({ items, label = "On this page" }: SectionIndexProps) {
  return (
    <nav
      aria-label={label}
      className="border-b bg-background"
    >
      <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-5 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {label}
          </span>
          <div className="flex min-w-max items-center gap-2">
            {items.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                title={item.description}
                className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="mr-1.5 font-mono text-[9px] text-primary/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
