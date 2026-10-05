import { Link } from "@tanstack/react-router";
import { DIFFICULTY_LABEL, type Plant } from "@/lib/plants";
import { formatSum } from "@/lib/format";

export function PlantCard({ plant }: { plant: Plant }) {
  return (
    <Link
      to="/plant/$slug"
      params={{ slug: plant.slug }}
      className="group block"
    >
      <div className="overflow-hidden rounded-2xl bg-paper shadow-[var(--shadow-border)]">
        <div className="relative aspect-3/4 overflow-hidden">
          <img
            src={plant.image}
            alt={plant.name}
            className="size-full object-cover outline outline-1 -outline-offset-1 outline-ink/10 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <span className="absolute top-3 left-3 rounded-full bg-surface/90 px-2.5 py-1 text-xs font-medium tracking-wide text-forest backdrop-blur-sm">
            {DIFFICULTY_LABEL[plant.difficulty]}
          </span>
          {plant.stock <= 2 ? (
            <span className="absolute top-3 right-3 rounded-full bg-terracotta px-2.5 py-1 text-xs font-medium text-surface">
              Осталось {plant.stock}
            </span>
          ) : null}
        </div>
      </div>
      <div className="mt-3 px-0.5">
        <p className="text-xs tracking-widest text-muted uppercase">
          {plant.latin}
        </p>
        <h3 className="mt-1 font-display text-xl leading-tight text-balance text-ink">
          {plant.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-terracotta tabular-nums">
          {formatSum(plant.price)}
        </p>
      </div>
    </Link>
  );
}
