import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/cart";

export type Payment = "cash" | "transfer";

export type Order = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  district: string;
  address: string;
  comment: string;
  payment: Payment;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  total: number;
};

type OrderState = {
  orders: Order[];
  add: (order: Order) => void;
};

export const useOrders = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      add: (order) => set({ orders: [order, ...get().orders].slice(0, 20) }),
    }),
    { name: "yashil-orders" },
  ),
);

export function newOrderId() {
  const n = Math.floor(1000 + Math.random() * 9000);
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `YS-${mm}${dd}-${n}`;
}
