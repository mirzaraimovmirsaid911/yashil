import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatSum } from "@/lib/format";
import { getPlant } from "@/lib/plants";
import { useOrders, type Order } from "@/lib/orders";

export const Route = createFileRoute("/order/$id")({
  component: OrderPage,
});

function OrderPage() {
  const { id } = Route.useParams();
  const orders = useOrders((s) => s.orders);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const order = ready ? orders.find((o) => o.id === id) : undefined;

  if (!ready) {
    return (
      <main className="mx-auto max-w-lg px-4 py-20">
        <p className="text-muted">Загружаем заказ…</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-display text-4xl">Заказ не найден</h1>
        <p className="mt-3 text-muted">
          Он мог быть оформлен в другом браузере. Напишите нам номер — найдём.
        </p>
        <Button asChild className="mt-6">
          <Link to="/catalog">В каталог</Link>
        </Button>
      </main>
    );
  }

  return <OrderReceipt order={order} />;
}

function OrderReceipt({ order }: { order: Order }) {
  return (
    <main className="mx-auto w-full max-w-xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-widest text-terracotta uppercase">
        Заказ принят
      </p>
      <h1 className="mt-2 font-display text-4xl">{order.id}</h1>
      <p className="mt-4 leading-relaxed text-muted">
        Перезвоним на {order.phone} в течение часа и привезём в район{" "}
        {order.district}. Держите телефон рядом.
      </p>

      <div className="mt-8 rounded-[1.5rem] bg-surface p-6 shadow-[var(--shadow-border)]">
        <ul className="space-y-3">
          {order.items.map((item) => {
            const plant = getPlant(item.slug);
            if (!plant) return null;
            return (
              <li key={item.slug} className="flex justify-between gap-4 text-sm">
                <span>
                  {plant.name}
                  <span className="text-muted"> × {item.qty}</span>
                </span>
                <span className="tabular-nums">
                  {formatSum(plant.price * item.qty)}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 flex justify-between border-t border-border pt-4 font-medium">
          <span>Итого</span>
          <span className="tabular-nums">{formatSum(order.total)}</span>
        </p>
        <p className="mt-4 text-sm text-muted">
          {order.name} · {order.district}, {order.address}
          <br />
          {order.payment === "cash"
            ? "Оплата наличными при получении"
            : "Оплата переводом — реквизиты в звонке"}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <a href="https://t.me/yashil_tashkent">Написать в Telegram</a>
        </Button>
        <Button asChild variant="outline">
          <Link to="/">На главную</Link>
        </Button>
      </div>
    </main>
  );
}
