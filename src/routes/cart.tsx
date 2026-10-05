import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { QtyControl } from "@/components/qty-control";
import { Button } from "@/components/ui/button";
import { cartTotals, useCart } from "@/lib/cart";
import { formatSum } from "@/lib/format";
import { FREE_DELIVERY_FROM } from "@/lib/plants";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const { lines, subtotal, delivery, total } = cartTotals(items);
  const toFree = Math.max(0, FREE_DELIVERY_FROM - subtotal);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  if (!ready) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="font-display text-4xl sm:text-5xl">Корзина</h1>
        <p className="mt-6 text-muted">Загружаем…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-display text-4xl sm:text-5xl">Корзина</h1>

      {lines.length === 0 ? (
        <div className="mt-16 max-w-md">
          <p className="font-display text-2xl">Пока пусто</p>
          <p className="mt-2 text-muted">
            Выберите растение в каталоге — сохраним его здесь, пока оформляете
            доставку по Ташкенту.
          </p>
          <Button asChild className="mt-6">
            <Link to="/catalog">Открыть каталог</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem]">
          <ul className="divide-y divide-border">
            {lines.map(({ plant, qty, line }) => (
              <li key={plant.slug} className="flex gap-4 py-6 first:pt-0">
                <Link
                  to="/plant/$slug"
                  params={{ slug: plant.slug }}
                  className="size-28 shrink-0 overflow-hidden rounded-2xl bg-paper sm:size-32"
                >
                  <img
                    src={plant.image}
                    alt=""
                    className="size-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        to="/plant/$slug"
                        params={{ slug: plant.slug }}
                        className="font-display text-xl leading-tight hover:text-forest"
                      >
                        {plant.name}
                      </Link>
                      <p className="mt-1 text-sm text-muted">{plant.latin}</p>
                    </div>
                    <button
                      type="button"
                      aria-label="Удалить"
                      className="flex size-11 shrink-0 items-center justify-center rounded-xl text-muted hover:bg-paper hover:text-ink"
                      onClick={() => remove(plant.slug)}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
                    <QtyControl
                      value={qty}
                      onChange={(n) => setQty(plant.slug, n)}
                      min={1}
                      max={Math.min(plant.stock, 8)}
                    />
                    <p className="font-medium text-terracotta tabular-nums">
                      {formatSum(line)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-[1.5rem] bg-surface p-6 shadow-[var(--shadow-border)]">
            <h2 className="font-display text-2xl">Итого</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <Row label="Растения" value={formatSum(subtotal)} />
              <Row
                label="Доставка по Ташкенту"
                value={delivery === 0 ? "Бесплатно" : formatSum(delivery)}
              />
            </dl>
            {toFree > 0 ? (
              <p className="mt-4 text-xs leading-relaxed text-muted">
                Ещё {formatSum(toFree)} — и доставка бесплатная.
              </p>
            ) : (
              <p className="mt-4 text-xs text-forest">Доставка уже бесплатная.</p>
            )}
            <p className="mt-5 flex justify-between border-t border-border pt-4 text-base font-medium">
              <span>К оплате</span>
              <span className="tabular-nums">{formatSum(total)}</span>
            </p>
            <Button asChild className="mt-6 w-full" size="lg">
              <Link to="/checkout">Оформить доставку</Link>
            </Button>
          </aside>
        </div>
      )}
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
