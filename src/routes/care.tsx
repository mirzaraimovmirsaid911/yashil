import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/care")({ component: CarePage });

const SECTIONS = [
  {
    title: "Лето: стекло и кондиционер",
    text: "С мая по сентябрь солнце в Ташкенте жёсткое. Листья у южного стекла получают ожог за один полдень. Сдвигайте крупные растения на полметра вглубь или закрывайте тюлем. Струя кондиционера сушит края — не ставьте монстеру и калатею прямо под поток.",
  },
  {
    title: "Зима: батареи и сухой воздух",
    text: "Отопление сушит воздух сильнее, чем пустыня за окном. Кончики ареки и калатеи первыми показывают это. Отодвиньте горшки от радиатора минимум на метр, поставьте поддон с мокрым керамзитом. Поливайте реже: в холоде грунт сохнет медленно, заливы случаются чаще, чем засуха.",
  },
  {
    title: "Вода из-под крана",
    text: "Вода в городе жёсткая. На калатее и спатифиллуме остаются белые пятна, грунт засаливается. Отстаивайте сутки в открытой банке или используйте фильтр. Тёплая вода — всегда. Холодная с подоконника останавливает рост.",
  },
  {
    title: "Пыль на листьях",
    text: "Пыль закрывает устьица. Раз в две недели протирайте крупные листья влажной тканью, мелколистные — тёплым душем в ванной. После душа дайте стечь, не ставьте мокрый горшок на холодный кафель.",
  },
  {
    title: "Первые две недели после доставки",
    text: "Растение пережило дорогу. Не пересаживайте сразу, не крутите к свету каждый день, не удобряйте. Выберите одно место и оставьте. Жёлтый нижний лист в первую неделю — нормальная реакция, не паника.",
  },
];

function CarePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs tracking-widest text-muted uppercase">Гид</p>
      <h1 className="mt-2 font-display text-4xl sm:text-5xl">
        Уход в климате Ташкента
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Универсальные советы из интернета здесь работают плохо. Город сухой,
        лето жжёт стекло, зимой батареи высушивают воздух за ночь. Ниже — то,
        что мы говорим при передаче растения.
      </p>

      <div className="mt-8 overflow-hidden rounded-[1.5rem] bg-paper shadow-[var(--shadow-border)]">
        <img
          src={`${import.meta.env.BASE_URL}plants/calathea.jpg`}
          alt="Калатея орбифолия"
          className="aspect-4/3 w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
        />
      </div>

      <div className="mt-12 space-y-12">
        {SECTIONS.map((s, i) => (
          <article key={s.title}>
            <p className="font-display text-terracotta">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl">{s.title}</h2>
            <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-16 rounded-[1.5rem] bg-forest px-6 py-10 text-surface">
        <h2 className="font-display text-3xl">Не знаете, с чего начать</h2>
        <p className="mt-3 max-w-md text-surface/75">
          Возьмите сансевиерию или замиокулькас. Они прощают пропущенный полив и
          сухой воздух панельного дома.
        </p>
        <Button asChild variant="cream" className="mt-6">
          <Link to="/catalog" search={{ cat: "easy" }}>
            Неприхотливые виды
          </Link>
        </Button>
      </div>
    </main>
  );
}
