"use client";

import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (item) => {
    const { items } = get();
    const existingItem = items.find(
      (i) => i.id === item.id && i.size === item.size
    );

    if (existingItem) {
      set({
        items: items.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
        isOpen: true,
      });
    } else {
      set({
        items: [...items, { ...item, quantity: 1 }],
        isOpen: true,
      });
    }
  },

  removeItem: (id, size) => {
    set((state) => ({
      items: state.items.filter((i) => !(i.id === id && i.size === size)),
    }));
  },

  updateQuantity: (id, size, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id, size);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id && i.size === size ? { ...i, quantity } : i
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  totalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  totalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
