'use client';

import React, { useState, useEffect } from 'react';
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
        <Box onClick={scrollToTop}>
          <Typography
            variant="h6"
            sx={{
              width: 200,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <img src={LogoImage} width={80} height={'auto'} />
            PokeShop
          </Typography>
        </Box>

        {/* Mostrar saldo */}
        <Box sx={{ display: 'flex', width: 'auto', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ mr: 2 }}>
            Saldo: $ {balance.toFixed(2)} MXN
          </Typography>

          <IconButton
            color="inherit"
            onClick={toggleDrawer(true)}
            sx={{
              animation: balance === 0 ? `${pulseAnimation} 1.5s infinite` : 'none',
            }}
          >
           
          </IconButton>
          <WalletSection />

          <CartDrawer />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
