'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const API_KEY_CURRENCY = process.env.NEXT_PUBLIC_FREE_CURRENCY_API_KEY;

export function useCurrencies() {
  // 1. Lee localStorage en la inicialización del estado
  const [initialData] = useState(() => {
      const savedRates = localStorage.getItem('exchangeRates');
      if (savedRates) {
        return JSON.parse(savedRates);
      }
  });

  // 2. Configura la query
  return useQuery({
    queryKey: ['currencyRates'],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY_CURRENCY}`
      );
      return response.data.data; // Ajusta si la estructura es distinta
    },
    initialData,           // Usamos la data leída (si existe)
    staleTime: 1000 * 5,   // 5s
    onSuccess: (data) => {
      if (!data) return;
      // Filtra las monedas que desees
      const filteredRates = {
        USD: data.USD,
        MXN: data.MXN,
        EUR: data.EUR,
        JPY: data.JPY,
        BRL: data.BRL,
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('exchangeRates', JSON.stringify(filteredRates));
      }
    },
  });
}
