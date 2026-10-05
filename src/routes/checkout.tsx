import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cartTotals, useCart } from "@/lib/cart";
import { formatPhone, formatSum, phoneDigits } from "@/lib/format";
import { newOrderId, useOrders, type Payment } from "@/lib/orders";
import { DISTRICTS } from "@/lib/plants";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

function CheckoutPage() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const addOrder = useOrders((s) => s.add);
  const navigate = useNavigate();
  const { lines, subtotal, delivery, total } = cartTotals(items);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [district, setDistrict] = useState<(typeof DISTRICTS)[number] | "">(
    "",
  );
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [payment, setPayment] = useState<Payment>("cash");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  if (!ready) {
    return (
      <main className="mx-auto max-w-lg px-4 py-20">
        <p className="text-muted">Загружаем заказ…</p>
      </main>
    );
  }

  if (lines.length === 0) {
    return (
      <main className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-display text-4xl">Корзина пуста</h1>
        <p className="mt-3 text-muted">Добавьте растение, чтобы оформить доставку.</p>
        <Button asChild className="mt-6">
          <Link to="/catalog">В каталог</Link>
        </Button>
      </main>
    );
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const digits = phoneDigits(phone);
    if (name.trim().length < 2) {
      setError("Напишите, как к вам обращаться.");
      return;
    }
    if (digits.length < 12) {
      setError("Телефон в формате +998 XX XXX XX XX.");
      return;
    }
    if (!district) {
      setError("Выберите район Ташкента.");
      return;
    }
    if (address.trim().length < 5) {
      setError("Укажите улицу и дом.");
      return;
    }
    setError("");
    const id = newOrderId();
    addOrder({
      id,
      createdAt: new Date().toISOString(),
      name: name.trim(),
      phone: formatPhone(phone),
      district,
      address: address.trim(),
      comment: comment.trim(),
      payment,
      items,
      subtotal,
      delivery,
      total,
    });
    clear();
    toast.success("Заказ принят");
    void navigate({ to: "/order/$id", params: { id } });
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-display text-4xl sm:text-5xl">Доставка</h1>
      <p className="mt-3 max-w-xl text-muted">
        Перезвоним в течение часа, согласуем время. По Ташкенту — в день заказа,
        если оформить до 15:00.
      </p>

      <form
        onSubmit={submit}
        className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]"
      >
        <div className="space-y-5">
          <Field label="Имя">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className={fieldClass}
              placeholder="Алина"
            />
          </Field>
          <Field label="Телефон">
            <input
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              inputMode="tel"
              autoComplete="tel"
              className={fieldClass}
            />
          </Field>
          <Field label="Район">
            <select
              value={district}
              onChange={(e) =>
                setDistrict(e.target.value as (typeof DISTRICTS)[number] | "")
              }
              className={fieldClass}
            >
              <option value="">Выберите район</option>
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Адрес">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="street-address"
              className={fieldClass}
              placeholder="Улица, дом, квартира"
            />
          </Field>
          <Field label="Комментарий">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className={cn(fieldClass, "h-auto py-3")}
              placeholder="Домофон, этаж, удобное время"
            />
          </Field>

          <fieldset>
            <legend className="mb-3 text-sm font-medium">Оплата</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <PayCard
                active={payment === "cash"}
                onClick={() => setPayment("cash")}
                title="Наличными курьеру"
                text="При получении растения"
              />
              <PayCard
                active={payment === "transfer"}
                onClick={() => setPayment("transfer")}
                title="Перевод"
                text="Click или карта — реквизиты в звонке"
              />
            </div>
          </fieldset>

          {error ? <p className="text-sm text-terracotta">{error}</p> : null}

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Подтвердить заказ · {formatSum(total)}
          </Button>
        </div>

        <aside className="h-fit rounded-[1.5rem] bg-surface p-6 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-2xl">Заказ</h2>
          <ul className="mt-4 space-y-3">
            {lines.map(({ plant, qty, line }) => (
              <li key={plant.slug} className="flex gap-3 text-sm">
                <img
                  src={plant.image}
                  alt=""
                  className="size-14 rounded-lg object-cover outline outline-1 -outline-offset-1 outline-ink/10"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{plant.name}</p>
                  <p className="text-muted">
                    {qty} × {formatSum(plant.price)}
                  </p>
                </div>
                <p className="tabular-nums">{formatSum(line)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Доставка</dt>
              <dd className="tabular-nums">
                {delivery === 0 ? "Бесплатно" : formatSum(delivery)}
              </dd>
            </div>
            <div className="flex justify-between font-medium">
              <dt>Итого</dt>
              <dd className="tabular-nums">{formatSum(total)}</dd>
            </div>
          </dl>
        </aside>
      </form>
    </main>
  );
}

const fieldClass =
  "h-12 w-full rounded-xl bg-surface px-4 text-sm text-ink shadow-[var(--shadow-border)] outline-none focus:ring-2 focus:ring-forest/25";

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

function PayCard({
  active,
  onClick,
  title,
  text,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  text: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl px-4 py-4 text-left transition-colors",
        active
          ? "bg-forest text-surface"
          : "bg-surface text-ink shadow-[var(--shadow-border)]",
      )}
    >
      <p className="font-medium">{title}</p>
      <p className={cn("mt-1 text-sm", active ? "text-surface/75" : "text-muted")}>
        {text}
      </p>
    </button>
  );
}
