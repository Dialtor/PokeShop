'use client'; 
// Debe ser "use client" si lo usas en componentes cliente de Next.js

import { create } from 'zustand';

export const useCurrencyStore = create((set) => ({
  // Objeto con las monedas que vas a manejar
  exchangeRates: {
    USD: 0,
    MXN: 0,
    EUR: 0,
    JPY: 0,
    BRL: 0,
  },
  setExchangeRates: (newRates) => set({ exchangeRates: newRates }),
}));