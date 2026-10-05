import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { formatSum } from "@/lib/format";
import {
  recommendPlants,
  type Light,
  type QuizAnswers,
} from "@/lib/plants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    key: "light" as const,
    q: "Сколько света в комнате?",
    options: [
      { value: "low", label: "Тень, север или глубина комнаты" },
      { value: "medium", label: "Рассеянный свет у окна" },
      { value: "bright", label: "Юг или запад, много солнца" },
    ],
  },
  {
    key: "experience" as const,
    q: "Как давно живёте с растениями?",
    options: [
      { value: "new", label: "Только начинаю" },
      { value: "some", label: "Уже есть несколько" },
    ],
  },
  {
    key: "pets" as const,
    q: "Дома есть кошки или собаки?",
    options: [
      { value: "yes", label: "Да, нужен безопасный вид" },
      { value: "no", label: "Нет" },
    ],
  },
];

export function PlantQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [done, setDone] = useState(false);

  function pick(value: string) {
    const key = STEPS[step]!.key;
    const next: Partial<QuizAnswers> = { ...answers };
    if (key === "light") next.light = value as Light;
    if (key === "experience") next.experience = value as "new" | "some";
    if (key === "pets") next.pets = value === "yes";
    setAnswers(next);
    if (step < STEPS.length - 1) setStep(step + 1);
    else setDone(true);
  }

  const recs =
    done && answers.light && answers.experience !== undefined
      ? recommendPlants({
          light: answers.light,
          experience: answers.experience,
          pets: Boolean(answers.pets),
        })
      : [];

  return (
    <section id="podbor" className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="rounded-[1.75rem] bg-forest px-5 py-10 text-surface sm:px-10 sm:py-14">
        <p className="text-xs tracking-widest text-surface/55 uppercase">
          Подбор за минуту
        </p>
        <h2 className="mt-3 max-w-lg font-display text-3xl text-balance sm:text-4xl">
          Какое растение приживётся у вас
        </h2>

        {!done ? (
          <div className="mt-8">
            <div className="mb-6 flex gap-1.5">
              {STEPS.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full",
                    i <= step ? "bg-surface" : "bg-surface/20",
                  )}
                />
              ))}
            </div>
            <p className="font-display text-2xl text-balance">
              {STEPS[step]!.q}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {STEPS[step]!.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => pick(opt.value)}
                  className="min-h-14 rounded-2xl bg-surface/10 px-4 py-4 text-left text-sm leading-snug transition-colors hover:bg-surface/20"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8">
            {recs.length === 0 ? (
              <p className="max-w-md text-surface/80">
                Для дома с животными лучше начать с калатеи или ареки — они в
                каталоге.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-3">
                {recs.map((p) => (
                  <Link
                    key={p.slug}
                    to="/plant/$slug"
                    params={{ slug: p.slug }}
                    className="rounded-2xl bg-surface p-3 text-ink"
                  >
                    <img
                      src={p.image}
                      alt=""
                      className="aspect-4/5 w-full rounded-xl object-cover outline outline-1 -outline-offset-1 outline-ink/10"
                    />
                    <p className="mt-3 font-display text-lg leading-tight">
                      {p.name}
                    </p>
                    <p className="mt-1 text-sm text-terracotta tabular-nums">
                      {formatSum(p.price)}
                    </p>
                  </Link>
                ))}
              </div>
            )}
            <Button
              variant="cream"
              className="mt-6"
              onClick={() => {
                setDone(false);
                setStep(0);
                setAnswers({});
              }}
            >
              Пройти ещё раз
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
