import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DISTRICTS, FREE_DELIVERY_FROM } from "@/lib/plants";
import { formatSum } from "@/lib/format";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs tracking-widest text-muted uppercase">Ателье</p>
      <h1 className="mt-2 max-w-2xl font-display text-4xl sm:text-5xl">
        Yashil — комнатные растения в Ташкенте
      </h1>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[1.75rem] bg-paper shadow-[var(--shadow-border)]">
          <img
            src={`${import.meta.env.BASE_URL}plants/rubber.jpg`}
            alt="Фикус каучуконосный в ателье Yashil"
            className="aspect-4/5 w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
          />
        </div>
        <div className="max-w-xl">
          <p className="text-lg leading-relaxed text-muted">
            Мы не продаём всё, что везут оптом. В ателье попадают растения,
            которые уже пережили акклиматизацию: сухой воздух, жёсткую воду и
            резкий свет. Поэтому монстера из Yashil с меньшей вероятностью
            сбросит листья на второй неделе.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Самовывоз — в Мирабаде, на Амира Темура, 15. Можно приехать,
            посмотреть лист вживую и увезти в тот же день. Если удобнее дома —
            привезём стоя, в том же горшке, что на фото.
          </p>
          <dl className="mt-8 space-y-3 text-sm">
            <div>
              <dt className="text-muted">Адрес</dt>
              <dd className="font-medium">Мирабад, ул. Амира Темура, 15</dd>
            </div>
            <div>
              <dt className="text-muted">Часы</dt>
              <dd className="font-medium">Ежедневно 10:00–20:00</dd>
            </div>
            <div>
              <dt className="text-muted">Телефон</dt>
              <dd className="font-medium">
                <a href="tel:+998712001515">+998 71 200 15 15</a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Telegram</dt>
              <dd className="font-medium">
                <a href="https://t.me/yashil_tashkent">@yashil_tashkent</a>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-3xl">Доставка</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card
            title="29 000 сум"
            text="Фиксированная стоимость по городу. Не зависит от района."
          />
          <Card
            title={`От ${formatSum(FREE_DELIVERY_FROM)}`}
            text="Доставка бесплатная. Суммируется несколько растений."
          />
          <Card
            title="До 15:00"
            text="Заказ до трёх дня — привезём сегодня. После — на следующий."
          />
        </div>
        <p className="mt-8 text-sm text-muted">Районы доставки:</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {DISTRICTS.map((d) => (
            <li
              key={d}
              className="rounded-full bg-surface px-3 py-1.5 text-sm shadow-[var(--shadow-border)]"
            >
              {d}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 rounded-[1.5rem] bg-paper px-6 py-10 sm:px-10">
        <h2 className="font-display text-3xl">Нужна помощь с выбором</h2>
        <p className="mt-3 max-w-lg text-muted">
          Напишите в Telegram фото окна — подскажем вид, который не сгорит и не
          засохнет у батареи.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <a href="https://t.me/yashil_tashkent">Написать в Telegram</a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/catalog">Открыть каталог</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]">
      <p className="font-display text-2xl text-forest">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}
