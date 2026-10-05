import { Link } from "@tanstack/react-router";
import { Instagram, Send } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-forest text-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl tracking-tight">Yashil</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-surface/75">
            Ателье комнатных растений в Ташкенте. Подбираем экземпляры под сухой
            воздух, отопление и яркое солнце города.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-widest text-surface/55 uppercase">
            Навигация
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/catalog" className="hover:text-surface">
                Каталог
              </Link>
            </li>
            <li>
              <Link to="/care" className="hover:text-surface">
                Уход в климате Ташкента
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-surface">
                Ателье и доставка
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-surface">
                Корзина
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-widest text-surface/55 uppercase">
            Контакты
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-surface/90">
            <li>
              <a href="tel:+998712001515" className="hover:text-surface">
                +998 71 200 15 15
              </a>
            </li>
            <li>Мирабад, ул. Амира Темура, 15</li>
            <li>Ежедневно 10:00–20:00</li>
            <li className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/yashil_tashkent"
                className="flex size-10 items-center justify-center rounded-full bg-surface/10 hover:bg-surface/20"
                aria-label="Telegram"
              >
                <Send className="size-4" />
              </a>
              <a
                href="https://instagram.com/yashil.tashkent"
                className="flex size-10 items-center justify-center rounded-full bg-surface/10 hover:bg-surface/20"
                aria-label="Instagram"
              >
                <Instagram className="size-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-surface/10">
        <p className="mx-auto flex max-w-6xl justify-between px-4 py-4 text-xs text-surface/50 sm:px-6">
          <span>Ташкент · 2026</span>
          <span>Доставка по всем районам города</span>
        </p>
      </div>
    </footer>
  );
}
