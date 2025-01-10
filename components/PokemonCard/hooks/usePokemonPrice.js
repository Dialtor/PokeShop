'use client';

import { useState, useMemo } from 'react';
import { useCurrencies } from '@/hooks/useCurrencies';

export function usePokemonPrice() {
  // 1. Obtenemos las tasas de cambio con React Query
  const {
    data: exchangeRates,
    isLoading,
    isError,
  } = useCurrencies();

  // 2. Monedas disponibles
  const currencyCodes = ['USD', 'MXN', 'EUR', 'JPY', 'BRL'];

  // 3. Moneda aleatoria (una sola vez)
  const [randomCurrency] = useState(() => {
    const randomIndex = Math.floor(Math.random() * currencyCodes.length);
    return currencyCodes[randomIndex];
  });

  // 4. Precio aleatorio entre 1 y 100
  const [randomPrice] = useState(() => {
    const price = Math.random() * (100 - 1) + 1;
    return Number(price.toFixed(2));
  });

  // 5. Calcular conversión a MXN
  //    Se recalcula sólo si cambian las tasas o la moneda/price
  const convertedPriceMXN = useMemo(() => {
    if (!exchangeRates) return 0;
    return randomPrice * (exchangeRates.MXN / exchangeRates[randomCurrency]);
  }, [exchangeRates, randomPrice, randomCurrency]);

  return {
    randomPrice,
    randomCurrency,
    convertedPriceMXN,
    isLoading,
    isError,
  };
}
