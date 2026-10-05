// После сборки: 404.html = копия index.html, чтобы прямые ссылки
// (например /catalog) работали на GitHub Pages, и .nojekyll.
import { copyFileSync, writeFileSync, existsSync } from "node:fs";
const out = "dist/client";
if (!existsSync(`${out}/index.html`)) {
  console.error(`Не найден ${out}/index.html`);
  process.exit(1);
}
copyFileSync(`${out}/index.html`, `${out}/404.html`);
writeFileSync(`${out}/.nojekyll`, "");
console.log("OK: 404.html и .nojekyll созданы");
