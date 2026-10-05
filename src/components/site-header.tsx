import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cartCount, useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/catalog" as const, label: "Каталог" },
  { to: "/care" as const, label: "Уход" },
  { to: "/about" as const, label: "Ателье" },
];

function LeafMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M19.2 4.2c-4.6.4-8.7 2.6-11.4 6.1-1.4 1.8-2.3 3.9-2.7 6.2-.2 1.2.8 2.1 1.9 1.9 2.3-.4 4.4-1.3 6.2-2.7 3.5-2.7 5.7-6.8 6.1-11.4.1-.6-.4-1.1-1.1-1.1z" />
      <path d="M7.2 19.4c1.8-2.8 4.2-5.1 7.1-6.7-2.2 2.8-3.8 6-4.6 9.5-.2.7-1.2.8-1.6.2-1-1-1.4-2-0.9-3z" />
    </svg>
  );
}

export function SiteHeader() {
  const items = useCart((s) => s.items);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const count = ready ? cartCount(items) : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
        <button
          type="button"
          className="relative -ml-1 flex size-11 items-center justify-center rounded-xl text-ink md:hidden"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link
          to="/"
          className="flex items-center gap-2 text-forest"
          onClick={() => setOpen(false)}
        >
          <LeafMark className="size-6" />
          <span className="font-display text-2xl leading-none tracking-tight">
            Yashil
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-forest"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/cart"
          className="relative flex size-11 items-center justify-center rounded-xl text-ink transition-colors hover:bg-paper"
          aria-label="Корзина"
        >
          <ShoppingBag className="size-5" />
          {count > 0 ? (
            <span className="absolute top-1.5 right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1 text-xs font-semibold text-surface tabular-nums">
              {count}
            </span>
          ) : null}
        </Link>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border md:hidden",
          "transition-[max-height,opacity] duration-200 ease-out",
          open ? "max-h-56 opacity-100" : "max-h-0 opacity-0 border-t-0",
        )}
      >
        <nav className="flex flex-col px-4 py-3">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="flex h-12 items-center text-base font-medium text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
