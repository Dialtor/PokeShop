'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  keyframes,
} from '@mui/material';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useWalletStore } from '@/stores/useWalletStore';
import CartDrawer from '@/components/CartDrawer/CartDrawer';
import WalletSection from '@/components/WalletSection/WalletSection';

export default function Header() {
  const LogoImage = `./pokebola.png`;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const { balance } = useWalletStore();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Animación sutil (keyframes)
  const pulseAnimation = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  `;

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#2e313b' }}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Título */}
        <Box onClick={scrollToTop} sx={{display: 'flex'}}>
        <img src={LogoImage} width={80} height={'auto'} />
          <Typography
            variant="h6"
            sx={{
              width: 200,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              // Ocultar "PokeShop" en dispositivos pequeños
              '@media (max-width: 600px)': {
                display: 'none',
              },
            }}
          >
            PokeShop
          </Typography>
        </Box>

        {/* Mostrar saldo */}
        <Box sx={{ display: 'flex', width: 'auto', alignItems: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              mr: 2,
              // Ocultar "Saldo" en dispositivos pequeños
              '@media (max-width: 640px)': {
                display: 'none',
              },
            }}
          >
            Saldo: $ {balance.toFixed(2)} MXN
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mr: 2,
              // Ocultar "Saldo" en dispositivos pequeños
              '@media (min-width: 640px)': {
                display: 'none',
              },
            }}
          >
             $ {balance.toFixed(2)} MXN
          </Typography>

          <WalletSection />

          <CartDrawer />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
