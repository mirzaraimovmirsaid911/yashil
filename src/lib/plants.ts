const BASE = import.meta.env.BASE_URL;
export const DELIVERY_FEE = 29_000;
export const FREE_DELIVERY_FROM = 900_000;

export const DISTRICTS = [
  "Мирабад",
  "Яккасарай",
  "Юнусабад",
  "Мирзо-Улугбек",
  "Чиланзар",
  "Шайхантахур",
  "Алмазар",
  "Яшнабад",
  "Учтепа",
  "Сергели",
  "Бектемир",
] as const;

export type Light = "low" | "medium" | "bright";
export type Size = "s" | "m" | "l";
export type Difficulty = "easy" | "medium";
export type Category = "tropics" | "easy" | "palms" | "flowering";

export type Plant = {
  slug: string;
  name: string;
  latin: string;
  price: number;
  size: Size;
  light: Light;
  difficulty: Difficulty;
  category: Category;
  petSafe: boolean;
  heightCm: number;
  potCm: number;
  stock: number;
  featured?: boolean;
  image: string;
  short: string;
  description: string;
  bestFor: string;
  care: {
    water: string;
    light: string;
    humidity: string;
    tashkent: string;
  };
};

export const LIGHT_LABEL: Record<Light, string> = {
  low: "Тень",
  medium: "Рассеянный свет",
  bright: "Яркое окно",
};

export const SIZE_LABEL: Record<Size, string> = {
  s: "S · до 40 см",
  m: "M · 40–90 см",
  l: "L · от 90 см",
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: "Неприхотливое",
  medium: "Нужен уход",
};

export const CATEGORY_LABEL: Record<Category, string> = {
  tropics: "Тропики",
  easy: "Для начинающих",
  palms: "Пальмы",
  flowering: "Цветущие",
};

export const PLANTS: Plant[] = [
  {
    slug: "monstera",
    name: "Монстера деликатесная",
    latin: "Monstera deliciosa",
    price: 620_000,
    size: "l",
    light: "medium",
    difficulty: "easy",
    category: "tropics",
    petSafe: false,
    heightCm: 110,
    potCm: 24,
    stock: 6,
    featured: true,
    image: `${BASE}plants/monstera.jpg`,
    short: "Разрезанные листья, которые делают гостиную.",
    description:
      "Классика городской гостиной. Монстера быстро осваивается в ташкентской квартире: ей достаточно рассеянного света у окна и полива, когда верхний слой грунта просох. В комплекте — керамический цилиндр и дренаж.",
    bestFor: "Гостиная, широкий подоконник, офис с окнами",
    care: {
      water: "Раз в 7–10 дней, грунт должен просохнуть на 3–4 см.",
      light: "Восточное или западное окно, без прямого полуденного солнца.",
      humidity: "Протирать листья от пыли. Опрыскивание — по желанию.",
      tashkent:
        "Летом убирайте от стекла: июльское солнце обжигает. Зимой держите дальше батареи.",
    },
  },
  {
    slug: "ficus-lyrata",
    name: "Фикус лировидный",
    latin: "Ficus lyrata",
    price: 890_000,
    size: "l",
    light: "bright",
    difficulty: "medium",
    category: "tropics",
    petSafe: false,
    heightCm: 140,
    potCm: 28,
    stock: 3,
    featured: true,
    image: `${BASE}plants/ficus-lyrata.jpg`,
    short: "Крупный акцент у высокого окна.",
    description:
      "Скрипичный фикус — растение-архитектура. Любит стабильность: одно светлое место, без перестановок. Мы отбираем экземпляры с крепким стволом, которые уже пережили акклиматизацию в Ташкенте.",
    bestFor: "Светлая гостиная, лофт, высокий потолок",
    care: {
      water: "Когда грунт просох наполовину. Не оставляйте воду в поддоне.",
      light: "Яркий рассеянный свет. Южное окно — через тюль.",
      humidity: "Протирать крупные листья раз в неделю.",
      tashkent:
        "Не крутите горшок каждый день. Фикус сбрасывает листья от сквозняка с кондиционера.",
    },
  },
  {
    slug: "sansevieria",
    name: "Сансевиерия",
    latin: "Sansevieria trifasciata",
    price: 185_000,
    size: "m",
    light: "low",
    difficulty: "easy",
    category: "easy",
    petSafe: false,
    heightCm: 55,
    potCm: 16,
    stock: 12,
    featured: true,
    image: `${BASE}plants/sansevieria.jpg`,
    short: "Почти не требует полива. Для коридора и офиса.",
    description:
      "Тёщин язык переживает забытый полив, тень в прихожей и сухой воздух от отопления. Скульптурные мечи хорошо смотрятся в паре — у двери или на комоде.",
    bestFor: "Прихожая, кабинет, спальня без яркого окна",
    care: {
      water: "Раз в 2–3 недели. Зимой ещё реже.",
      light: "Любое: от тени до яркого окна.",
      humidity: "Обычный комнатный воздух подходит.",
      tashkent: "Идеальна для панельных домов: сухой воздух ей не вредит.",
    },
  },
  {
    slug: "zz",
    name: "Замиокулькас",
    latin: "Zamioculcas zamiifolia",
    price: 245_000,
    size: "m",
    light: "low",
    difficulty: "easy",
    category: "easy",
    petSafe: false,
    heightCm: 60,
    potCm: 18,
    stock: 8,
    featured: true,
    image: `${BASE}plants/zz.jpg`,
    short: "Глянцевые листья и запас воды в клубне.",
    description:
      "ZZ-растение прощает командировки и нерегулярный уход. Клубень хранит влагу, листья остаются глянцевыми даже в глубине комнаты. Хороший старт, если растений дома ещё не было.",
    bestFor: "Офис, северная комната, новичкам",
    care: {
      water: "Раз в 12–16 дней. Лучше недолить, чем залить.",
      light: "Тень и полутень. Прямое солнце не нужно.",
      humidity: "Не опрыскивать — достаточно сухого воздуха.",
      tashkent: "Отлично живёт при кондиционере и отоплении.",
    },
  },
  {
    slug: "senecio",
    name: "Крестовник Роули",
    latin: "Senecio rowleyanus",
    price: 145_000,
    size: "s",
    light: "bright",
    difficulty: "easy",
    category: "easy",
    petSafe: false,
    heightCm: 35,
    potCm: 14,
    stock: 14,
    image: `${BASE}plants/senecio.jpg`,
    short: "Жемчужные нити. Ампель для полки.",
    description:
      "Нити с круглыми «бусинами» спускаются с полки и не требуют частого полива. Суккулент хорошо переносит сухой воздух ташкентской квартиры, если не заливать.",
    bestFor: "Полка, высокий комод, светлое окно",
    care: {
      water: "Раз в 10–14 дней. Между поливами грунт должен просохнуть.",
      light: "Яркий рассеянный. От нехватки света бусины мельчают.",
      humidity: "Обычный сухой воздух подходит. Не опрыскивать.",
      tashkent: "Южное окно летом — через тюль, иначе бусины сморщатся.",
    },
  },
  {
    slug: "calathea",
    name: "Калатея орбифолия",
    latin: "Calathea orbifolia",
    price: 310_000,
    size: "m",
    light: "medium",
    difficulty: "medium",
    category: "tropics",
    petSafe: true,
    heightCm: 50,
    potCm: 18,
    stock: 5,
    image: `${BASE}plants/calathea.jpg`,
    short: "Серебряные круги на листьях. Безопасна для животных.",
    description:
      "Калатея — для тех, кто любит ритуал ухода. Листья складываются вечером и раскрываются утром. Не ядовита для кошек и собак, но просит мягкую воду и влажный воздух.",
    bestFor: "Спальня, дом с животными, витрина",
    care: {
      water: "Мягкая вода, грунт слегка влажный. Не холодная из-под крана.",
      light: "Только рассеянный свет, без прямых лучей.",
      humidity: "Поддон с керамзитом или увлажнитель рядом.",
      tashkent:
        "Жёсткая вода оставляет пятна. Отстаивайте сутки или используйте фильтр.",
    },
  },
  {
    slug: "peace-lily",
    name: "Спатифиллум",
    latin: "Spathiphyllum wallisii",
    price: 220_000,
    size: "m",
    light: "low",
    difficulty: "easy",
    category: "flowering",
    petSafe: false,
    heightCm: 45,
    potCm: 16,
    stock: 7,
    image: `${BASE}plants/peace-lily.jpg`,
    short: "Белые покрывала даже в полутени.",
    description:
      "Женское счастье цветёт белыми покрывалами, если не пересушивать. Хорошо очищает воздух и живёт в глубине комнаты, где другим растениям темно.",
    bestFor: "Спальня, приёмная, северное окно",
    care: {
      water: "Когда листья чуть опустились — значит, пора. Не держите в луже.",
      light: "Полутень. На ярком солнце покрывала зеленеют.",
      humidity: "Любит опрыскивание утром.",
      tashkent: "Зимой не ставьте на холодный мраморный подоконник.",
    },
  },
  {
    slug: "rubber",
    name: "Фикус каучуконосный",
    latin: "Ficus elastica",
    price: 480_000,
    size: "l",
    light: "bright",
    difficulty: "easy",
    category: "tropics",
    petSafe: false,
    heightCm: 100,
    potCm: 22,
    stock: 4,
    image: `${BASE}plants/rubber.jpg`,
    short: "Бордовые лаковые листья. Растёт деревом.",
    description:
      "Каучуковый фикус держит форму и выглядит дороже, чем уход, которого требует. Протирайте листья — лак на свету работает как скульптура. Можно формировать в один ствол или куст.",
    bestFor: "Кабинет, лестница, угол у окна",
    care: {
      water: "Раз в 8–12 дней. Зимой реже.",
      light: "Яркий рассеянный. Бордовый цвет ярче у света.",
      humidity: "Протирать листья влажной тканью.",
      tashkent: "Не любит резкую смену места после доставки — дайте неделю.",
    },
  },
  {
    slug: "areca",
    name: "Пальма арека",
    latin: "Dypsis lutescens",
    price: 540_000,
    size: "l",
    light: "bright",
    difficulty: "medium",
    category: "palms",
    petSafe: true,
    heightCm: 130,
    potCm: 26,
    stock: 4,
    image: `${BASE}plants/areca.jpg`,
    short: "Перистые перья. Живая ширма у окна.",
    description:
      "Арека делит комнату без стены: лёгкая крона, золотистые черешки. Безопасна для животных. Просит свет и регулярный душ от городской пыли.",
    bestFor: "Гостиная, студия, дом с кошками",
    care: {
      water: "Держите грунт слегка влажным летом, зимой — умеренно.",
      light: "Яркий рассеянный. Недостаток света — вытянутые слабые перья.",
      humidity: "Душ раз в две недели. Кончики сохнут от батарей.",
      tashkent: "Зимой отодвигайте от радиатора минимум на метр.",
    },
  },
  {
    slug: "alocasia",
    name: "Алоказия Полли",
    latin: "Alocasia amazonica",
    price: 275_000,
    size: "s",
    light: "medium",
    difficulty: "medium",
    category: "tropics",
    petSafe: false,
    heightCm: 40,
    potCm: 14,
    stock: 2,
    image: `${BASE}plants/alocasia.jpg`,
    short: "Стреловидные листья с белыми жилками. Редкость.",
    description:
      "Полли — коллекционный силуэт: тёмная пластинка и графичные жилки. Любит тепло и ровный полив. Сейчас в ателье осталось два растения — после этого следующая поставка через две недели.",
    bestFor: "Письменный стол, стеллаж, коллекция",
    care: {
      water: "Ровно, без пересушки и застоя. Тёплый душ листьям.",
      light: "Яркий рассеянный. Прямое солнце оставляет пятна.",
      humidity: "Выше среднего. Рядом с увлажнителем — идеально.",
      tashkent:
        "Зимой может сбросить листья и уйти на покой — клубень жив, весной отрастёт.",
    },
  },
];

export function getPlant(slug: string) {
  return PLANTS.find((p) => p.slug === slug);
}

export function relatedPlants(plant: Plant, n = 3) {
  return PLANTS.filter((p) => p.slug !== plant.slug)
    .sort((a, b) => {
      const score = (p: Plant) =>
        (p.category === plant.category ? 2 : 0) +
        (p.light === plant.light ? 1 : 0) +
        (p.difficulty === plant.difficulty ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, n);
}

export function deliveryFor(subtotal: number) {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
}

export type QuizAnswers = {
  light: Light | "any";
  experience: "new" | "some";
  pets: boolean;
};

export function recommendPlants(answers: QuizAnswers, n = 3) {
  const scored = PLANTS.map((p) => {
    let s = 0;
    if (answers.light !== "any") {
      if (p.light === answers.light) s += 3;
      else if (answers.light === "low" && p.light === "medium") s += 1;
      else if (answers.light === "bright" && p.light === "medium") s += 1;
    }
    if (answers.experience === "new") s += p.difficulty === "easy" ? 3 : 0;
    else s += p.difficulty === "medium" ? 1 : 0.5;
    if (answers.pets) s += p.petSafe ? 4 : -5;
    return { p, s };
  });
  return scored
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, n)
    .map((x) => x.p);
}
