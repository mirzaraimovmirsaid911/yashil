export function formatSum(n: number) {
  return `${new Intl.NumberFormat("ru-RU").format(n)} сум`;
}

export function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  let d = digits;
  if (d.startsWith("998")) d = d.slice(3);
  if (d.startsWith("8") && d.length > 9) d = d.slice(1);
  const a = d.slice(0, 2);
  const b = d.slice(2, 5);
  const c = d.slice(5, 7);
  const e = d.slice(7, 9);
  let out = "+998";
  if (a) out += ` ${a}`;
  if (b) out += ` ${b}`;
  if (c) out += ` ${c}`;
  if (e) out += ` ${e}`;
  return out;
}

export function phoneDigits(raw: string) {
  return raw.replace(/\D/g, "");
}
