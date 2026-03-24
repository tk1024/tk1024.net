import Link from "next/link";

export function Breadcrumb({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <nav aria-label="パンくずリスト" className="mb-6 text-sm text-ink-faint">
      <ol className="flex items-center gap-1.5 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" className="text-cream-400">
                  /
                </span>
              )}
              {isLast ? (
                <span className="text-ink-light truncate max-w-[20rem]">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-forest transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
