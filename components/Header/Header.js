'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useCurrencies } from '@/hooks/useCurrencies';
import CartPopover from '@/components/CartPopover/CartPopover';
import WalletSection from '../WalletSection/WalletSection';

export default function Header() {
  const { data, isLoading, isError } = useCurrencies();

  return (
    <>
      <AppBar position="static" variant='elevation'>
        <Toolbar>
          <Typography variant="h6">Pokémon Store</Typography>
          <Box sx={{ flexGrow: 1 }} />

          <WalletSection/>

          <CartPopover />
        </Toolbar>

        {isLoading && (
          <Typography sx={{ p: 1 }}>Obteniendo tipos de cambio...</Typography>
        )}
        {isError && (
          <Typography sx={{ p: 1 }} color="error">
            Error al obtener tipos de cambio
          </Typography>
        )}
        {data && (
          <Typography variant="subtitle2" sx={{ p: 1 }}>
            1 USD = {data.MXN} MXN | 1 USD = {data.EUR} EUR | 1 USD = {data.JPY} JPY | 1 USD = {data.BRL} BRL
          </Typography>
        )}
      </AppBar>
    </>
  );
}
