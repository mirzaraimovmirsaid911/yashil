import { create } from "zustand";
import { persist } from "zustand/middleware";
import { deliveryFor, getPlant } from "@/lib/plants";

export type CartItem = { slug: string; qty: number };

type CartState = {
  items: CartItem[];
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (slug, qty = 1) => {
        const items = [...get().items];
        const i = items.findIndex((x) => x.slug === slug);
        if (i >= 0) {
          items[i] = { slug, qty: items[i]!.qty + qty };
        } else {
          items.push({ slug, qty });
        }
        set({ items });
      },
      remove: (slug) => set({ items: get().items.filter((x) => x.slug !== slug) }),
      setQty: (slug, qty) => {
        if (qty < 1) {
          set({ items: get().items.filter((x) => x.slug !== slug) });
          return;
        }
        set({
          items: get().items.map((x) => (x.slug === slug ? { slug, qty } : x)),
        });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "yashil-cart" },
  ),
);

export function cartCount(items: CartItem[]) {
  return items.reduce((n, i) => n + i.qty, 0);
}

export function cartLines(items: CartItem[]) {
  return items
    .map((item) => {
      const plant = getPlant(item.slug);
      if (!plant) return null;
      return { plant, qty: item.qty, line: plant.price * item.qty };
    })
    .filter((x) => x !== null);
}

export function cartTotals(items: CartItem[]) {
  const lines = cartLines(items);
  const subtotal = lines.reduce((n, l) => n + l.line, 0);
  const delivery = deliveryFor(subtotal);
  return { lines, subtotal, delivery, total: subtotal + delivery };
}
