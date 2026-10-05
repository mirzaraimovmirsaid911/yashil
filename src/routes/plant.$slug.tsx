import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Droplets, Shield, Sun, Wind } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PlantCard } from "@/components/plant-card";
import { QtyControl } from "@/components/qty-control";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatSum } from "@/lib/format";
import {
  DIFFICULTY_LABEL,
  getPlant,
  LIGHT_LABEL,
  relatedPlants,
  SIZE_LABEL,
} from "@/lib/plants";

export const Route = createFileRoute("/plant/$slug")({
  loader: ({ params }) => {
    const plant = getPlant(params.slug);
    if (!plant) throw notFound();
    return { plant };
  },
  component: PlantPage,
});

function PlantPage() {
  const { plant } = Route.useLoaderData();
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const related = relatedPlants(plant);
  const max = Math.min(plant.stock, 8);

  function addToCart() {
    add(plant.slug, qty);
    toast.success(`${plant.name} — в корзине`);
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="text-sm text-muted">
        <Link to="/catalog" className="hover:text-forest">
          Каталог
        </Link>
        <span className="mx-2">/</span>
        {plant.name}
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="overflow-hidden rounded-[1.75rem] bg-paper shadow-[var(--shadow-border)]">
          <img
            src={plant.image}
            alt={plant.name}
            className="aspect-3/4 w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
          />
        </div>

        <div>
          <p className="text-xs tracking-widest text-muted uppercase">
            {plant.latin}
          </p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">{plant.name}</h1>
          <p className="mt-4 text-2xl font-medium text-terracotta tabular-nums">
            {formatSum(plant.price)}
          </p>
          <p className="mt-4 max-w-md leading-relaxed text-muted">
            {plant.description}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-3 text-sm">
            <Spec label="Размер" value={`${SIZE_LABEL[plant.size]} · ${plant.heightCm} см`} />
            <Spec label="Горшок" value={`${plant.potCm} см, керамика`} />
            <Spec label="Свет" value={LIGHT_LABEL[plant.light]} />
            <Spec label="Уход" value={DIFFICULTY_LABEL[plant.difficulty]} />
          </dl>

          <p className="mt-4 text-sm text-muted">
            {plant.petSafe
              ? "Безопасно при контакте с животными."
              : "Ядовито при поедании — держите выше лап."}{" "}
            В наличии {plant.stock} шт.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <QtyControl value={qty} onChange={setQty} max={max} />
            <Button
              size="lg"
              className="min-w-48 flex-1 sm:flex-none"
              onClick={addToCart}
              disabled={plant.stock < 1}
            >
              В корзину
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted">
            Доставка по Ташкенту · оплата при получении или переводом
          </p>
        </div>
      </div>

      <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CareNote icon={Droplets} title="Полив" text={plant.care.water} />
        <CareNote icon={Sun} title="Свет" text={plant.care.light} />
        <CareNote icon={Wind} title="Воздух" text={plant.care.humidity} />
        <CareNote icon={Shield} title="Ташкент" text={plant.care.tashkent} />
      </section>

      <p className="mt-6 max-w-2xl text-sm text-muted">
        Лучше всего для: {plant.bestFor}.
      </p>

      {related.length > 0 ? (
        <section className="mt-20">
          <h2 className="font-display text-3xl">Рядом в ателье</h2>
          <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-3">
            {related.map((p) => (
              <PlantCard key={p.slug} plant={p} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="sticky bottom-0 z-30 -mx-4 mt-10 border-t border-border bg-bg/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3">
          <p className="flex-1 font-medium tabular-nums">
            {formatSum(plant.price)}
          </p>
          <Button onClick={addToCart}>В корзину</Button>
        </div>
      </div>
    </main>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-0.5 font-medium">{value}</dd>
    </div>
  );
}

function CareNote({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Sun;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]">
      <Icon className="size-5 text-forest" />
      <p className="mt-3 font-medium">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}
