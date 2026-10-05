import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { PlantCard } from "@/components/plant-card";
import {
  CATEGORY_LABEL,
  DIFFICULTY_LABEL,
  LIGHT_LABEL,
  PLANTS,
  type Category,
  type Difficulty,
  type Light,
} from "@/lib/plants";
import { cn } from "@/lib/utils";

type CatalogSearch = {
  cat?: Category;
  q?: string;
};

export const Route = createFileRoute("/catalog")({
  validateSearch: (search: Record<string, unknown>): CatalogSearch => ({
    cat:
      search.cat === "tropics" ||
      search.cat === "easy" ||
      search.cat === "palms" ||
      search.cat === "flowering"
        ? search.cat
        : undefined,
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  component: Catalog,
});

const CATS = Object.entries(CATEGORY_LABEL) as [Category, string][];
const LIGHTS = Object.entries(LIGHT_LABEL) as [Light, string][];
const CARES = Object.entries(DIFFICULTY_LABEL) as [Difficulty, string][];

function Catalog() {
  const { cat: catFromUrl, q: qFromUrl } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(qFromUrl ?? "");
  const [cat, setCat] = useState<Category | "all">(catFromUrl ?? "all");
  const [light, setLight] = useState<Light | "all">("all");
  const [care, setCare] = useState<Difficulty | "all">("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const plants = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PLANTS.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (light !== "all" && p.light !== light) return false;
      if (care !== "all" && p.difficulty !== care) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.latin.toLowerCase().includes(q) ||
        p.short.toLowerCase().includes(q)
      );
    });
  }, [query, cat, light, care]);

  function setCategory(next: Category | "all") {
    setCat(next);
    void navigate({
      search: (prev) => ({
        ...prev,
        cat: next === "all" ? undefined : next,
      }),
    });
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs tracking-widest text-muted uppercase">Каталог</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-4xl sm:text-5xl">Растения в наличии</h1>
        <p className="text-sm text-muted">{plants.length} из {PLANTS.length}</p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Название или латынь"
            className="h-12 w-full rounded-xl bg-surface pr-4 pl-10 text-sm shadow-[var(--shadow-border)] outline-none focus:ring-2 focus:ring-forest/25"
          />
        </label>
        <button
          type="button"
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-surface px-4 text-sm font-medium shadow-[var(--shadow-border)] lg:hidden"
          onClick={() => setFiltersOpen((v) => !v)}
        >
          <SlidersHorizontal className="size-4" />
          Фильтры
        </button>
      </div>

      <div
        className={cn(
          "mt-4 space-y-3",
          filtersOpen ? "block" : "hidden lg:block",
        )}
      >
        <FilterRow
          label="Коллекция"
          value={cat}
          onAll={() => setCategory("all")}
        >
          {CATS.map(([k, label]) => (
            <Chip key={k} active={cat === k} onClick={() => setCategory(k)}>
              {label}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Свет" value={light} onAll={() => setLight("all")}>
          {LIGHTS.map(([k, label]) => (
            <Chip key={k} active={light === k} onClick={() => setLight(k)}>
              {label}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Уход" value={care} onAll={() => setCare("all")}>
          {CARES.map(([k, label]) => (
            <Chip key={k} active={care === k} onClick={() => setCare(k)}>
              {label}
            </Chip>
          ))}
        </FilterRow>
      </div>

      {plants.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="font-display text-2xl">Ничего не нашлось</p>
          <p className="mt-2 text-muted">Снимите фильтры или измените запрос.</p>
          <button
            type="button"
            className="mt-4 inline-flex h-12 items-center gap-2 text-sm font-medium text-forest"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setLight("all");
              setCare("all");
            }}
          >
            <X className="size-4" />
            Сбросить
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {plants.map((p) => (
            <PlantCard key={p.slug} plant={p} />
          ))}
        </div>
      )}
    </main>
  );
}

function FilterRow({
  label,
  children,
  onAll,
  value,
}: {
  label: string;
  children: ReactNode;
  onAll: () => void;
  value: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-24 text-xs tracking-wide text-muted uppercase">
        {label}
      </span>
      <Chip active={value === "all"} onClick={onAll}>
        Все
      </Chip>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 rounded-full px-3.5 text-sm transition-colors",
        active
          ? "bg-forest text-surface"
          : "bg-surface text-ink shadow-[var(--shadow-border)] hover:bg-paper",
      )}
    >
      {children}
    </button>
  );
}
