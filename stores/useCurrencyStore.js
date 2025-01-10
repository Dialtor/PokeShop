'use client';

import { create } from 'zustand';

export const useCurrencyStore = create((set) => ({

  exchangeRates: {
    USD: 0,
    MXN: 0,
    EUR: 0,
    JPY: 0,
    BRL: 0,
  },
  setExchangeRates: (newRates) => set({ exchangeRates: newRates }),
}));