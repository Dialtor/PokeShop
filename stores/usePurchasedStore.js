'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const usePurchasedStore = create(
  persist(
    (set, get) => ({
      purchasedItems: [],

      markAsPurchased: (item) => {
        set((state) => {
          const already = state.purchasedItems.find((i) => i.id === item.id);
          if (!already) {
            return {
              purchasedItems: [...state.purchasedItems, item],
            };
          }
          return state;
        });
      },

      removeFromPurchased: (id) => {
        set((state) => ({
          purchasedItems: state.purchasedItems.filter((i) => i.id !== id),
        }));
      },

      isPurchased: (id) => {
        return get().purchasedItems.some((i) => i.id === id);
      },

      getPurchasedItemById: (id) => {
        return get().purchasedItems.find((i) => i.id === id);
      },
    }),
    {
      name: 'purchased-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
