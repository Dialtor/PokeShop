'use client';

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useCurrencies } from '@/hooks/useCurrencies'; // tu hook que trae las tasas

export default function PokemonCard({ index, name }) {
  // Imagen del Pokémon
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index}.svg`;

  // 1. Obtenemos las tasas de conversión (o null si aún cargando)
  const { data: exchangeRates } = useCurrencies();

  // 2. Definimos las monedas posibles
  const currencyCodes = ['USD', 'MXN', 'EUR', 'JPY', 'BRL'];

  // 3. Moneda aleatoria (una sola vez por card)
  const [randomCurrency] = useState(() => {
    const randomIndex = Math.floor(Math.random() * currencyCodes.length);
    return currencyCodes[randomIndex];
  });

  // 4. Precio aleatorio de 1 a 100 (o el rango que gustes)
  const [randomPrice] = useState(() => {
    const price = Math.random() * (100 - 1) + 1;
    return Number(price.toFixed(2));
  });

  // 5. Convertir a MXN usando la fórmula
  let convertedPriceMXN = 0;
  if (exchangeRates) {
    convertedPriceMXN =
      randomPrice * (exchangeRates.MXN / exchangeRates[randomCurrency]);
  }

  return (
    <Box
      sx={{
        width: { xs: '80%', sm: 'auto' },
        height: 'auto',
        display: 'flex',
        padding: 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        backgroundColor: '#fff',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.4s ease',
        transformStyle: 'preserve-3d',
        '&:hover': {
          transform: 'perspective(600px) rotateY(15deg) scale(1.05)',
        },
      }}
    >
      {/* Imagen del Pokémon */}
      <Box
        component="img"
        src={imageUrl}
        alt={name}
        sx={{
          width: '200px',
          height: '200px',
          mb: 1,
          objectFit: 'contain',
          userSelect: 'none',
        }}
      />

      {/* Índice (#) y nombre */}
      <Typography variant="h6" component="div">
        #{index}
      </Typography>
      <Typography
        variant="h6"
        component="div"
        sx={{ textTransform: 'capitalize' }}
      >
        {name}
      </Typography>

      {/* 6. Mostrar precios */}
      {exchangeRates ? (
        <>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            {/* Precio en la moneda aleatoria */}
            ${randomPrice.toFixed(2)} {randomCurrency}
          </Typography>
          <Typography variant="subtitle1">
            {/* Conversión a MXN */}
            Precio Local: ${convertedPriceMXN.toFixed(2)} MXN
          </Typography>
        </>
      ) : (
        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          Cargando precios...
        </Typography>
      )}
    </Box>
  );
}
