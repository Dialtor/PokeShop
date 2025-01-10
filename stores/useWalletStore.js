'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


export const useWalletStore = create(
  persist(
    (set) => ({
      balance: 0,
      addFunds: (amount) => {
        set((state) => ({ balance: state.balance + amount }));
      },
      subtractFunds: (amount) => {
        set((state) => ({ balance: state.balance - amount }));
      },
      clearBalance: () => {
        set({ balance: 0 });
      },
    }),
    {
      name: 'wallet-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
