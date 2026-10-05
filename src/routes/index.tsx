import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, Sun, Truck } from "lucide-react";
import { PlantCard } from "@/components/plant-card";
import { PlantQuiz } from "@/components/plant-quiz";
import { Button } from "@/components/ui/button";
import { PLANTS } from "@/lib/plants";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const featured = PLANTS.filter((p) => p.featured);

  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs tracking-widest text-terracotta uppercase">
            Ташкент · доставка в день заказа
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.08] text-balance sm:text-5xl lg:text-6xl">
            Растения, которые живут в этом городе
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Подбираем комнатные растения под сухой воздух, отопление и яркое
            солнце Ташкента. Керамика и грунт — в комплекте.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/catalog">
                Смотреть каталог
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#podbor">Подобрать растение</a>
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-[1.75rem] bg-paper shadow-[var(--shadow-border)]">
            <img
              src={`${import.meta.env.BASE_URL}plants/monstera.jpg`}
              alt="Монстера деликатесная в керамическом горшке"
              className="aspect-3/4 w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10 sm:aspect-4/5"
            />
          </div>
          <p className="absolute bottom-4 left-4 rounded-full bg-surface/90 px-4 py-2 text-sm text-ink backdrop-blur-sm">
            Монстера · 620 000 сум
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-paper/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
          <Promise
            icon={Sun}
            title="Климат города"
            text="Отбираем виды, которые держатся при кондиционере, пыли и батареях."
          />
          <Promise
            icon={Truck}
            title="11 районов"
            text="Доставка по Ташкенту 29 000 сум. От 900 000 — бесплатно."
          />
          <Promise
            icon={Leaf}
            title="Горшок в цене"
            text="Каждое растение приезжает в керамике, с дренажем и инструкцией."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-widest text-muted uppercase">
              Сейчас в ателье
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">
              Избранное
            </h2>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/catalog">
              Весь каталог
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <PlantCard key={p.slug} plant={p} />
          ))}
        </div>
      </section>

      <PlantQuiz />

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[1.75rem] bg-paper shadow-[var(--shadow-border)]">
          <img
            src={`${import.meta.env.BASE_URL}plants/ficus-lyrata.jpg`}
            alt="Фикус лировидный"
            className="aspect-4/5 w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
          />
        </div>
        <div>
          <p className="text-xs tracking-widest text-muted uppercase">
            Как устроен заказ
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">
            Привезём сегодня, если успеете до 15:00
          </h2>
          <ol className="mt-8 space-y-6">
            {[
              {
                n: "01",
                t: "Выбираете растение",
                d: "В каталоге или через подбор. Можно несколько — упакуем вместе.",
              },
              {
                n: "02",
                t: "Перезваниваем",
                d: "В течение часа подтверждаем район, время и наличие.",
              },
              {
                n: "03",
                t: "Доставляем стоя",
                d: "Растения едут вертикально. Оплата наличными или переводом.",
              },
            ].map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="font-display text-2xl text-terracotta">
                  {s.n}
                </span>
                <div>
                  <p className="font-medium">{s.t}</p>
                  <p className="mt-1 text-sm text-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <Button asChild className="mt-8" size="lg">
            <Link to="/about">О доставке и ателье</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

function Promise({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Sun;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface text-forest shadow-[var(--shadow-border)]">
        <Icon className="size-5" />
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
      </div>
    </div>
  );
}
