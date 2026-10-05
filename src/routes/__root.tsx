import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";

const APP_NAME = "Yashil";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Yashil — комнатные растения с доставкой по Ташкенту. Монстера, фикусы, пальмы и неприхотливые виды в керамике.",
      },
      { name: "theme-color", content: "#2F4A38" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: `${import.meta.env.BASE_URL}favicon.svg` },
      { rel: "stylesheet", href: appCss },
      // На статичном хостинге (GitHub Pages) этих файлов нет.
      ...(import.meta.env.VITE_STATIC_SITE
        ? []
        : [
            { rel: "manifest", href: "/__grok/manifest.webmanifest" },
            { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
          ]),
    ],
  }),
  component: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument() {
  return (
    <html lang="ru" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-bg text-ink">
        <PreviewHostBridge />
        <AuthProvider>
          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <Outlet />
            <SiteFooter />
          </div>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "var(--color-surface)",
                color: "var(--color-ink)",
                border: "1px solid var(--color-border)",
              },
            }}
          />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <main className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
      <p className="text-xs tracking-widest text-muted uppercase">404</p>
      <h1 className="mt-3 font-display text-4xl">Страница не найдена</h1>
      <p className="mt-3 text-muted">
        Этого адреса нет в ателье. Вернитесь в каталог — растения на месте.
      </p>
      <Button asChild className="mt-8">
        <Link to="/catalog">В каталог</Link>
      </Button>
    </main>
  );
}
