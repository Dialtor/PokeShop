'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useCurrencies } from '@/hooks/useCurrencies';

export default function Header() {
  const { data, isLoading, isError } = useCurrencies();

  // data debería contener algo como: { USD: 1, MXN: 20.5, EUR: 0.93, ... }
  // si initialData existía en localStorage, data no estará vacío desde el inicio

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Pokémon Store</Typography>
        <Box sx={{ flexGrow: 1 }} />

        {/* Componente Carrito (icono, etc.) */}
        <Box>
          <Typography>Cart (0)</Typography>
        </Box>
      </Toolbar>

      {isLoading && <Typography>Obteniendo tipos de cambio...</Typography>}
      {isError && <Typography>Error al obtener tipos de cambio</Typography>}
      {data && (
        <Typography variant="subtitle2" sx={{ p: 1 }}>
          1 USD = {data?.MXN} MXN | 
          1 USD = {data?.EUR} EUR | 
          1 USD = {data?.JPY} JPY | 
          1 USD = {data?.BRL} BRL
        </Typography>
      )}
    </AppBar>
  );
}
