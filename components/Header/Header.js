'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
} from '@mui/material';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useWalletStore } from '@/stores/useWalletStore';
import CartDrawer from '@/components/CartDrawer/CartDrawer';
import WalletSection from '@/components/WalletSection/WalletSection';


export default function Header() {

  const LogoImage = `./pokebola.png`;
  // Drawer para Wallet
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  // Leer el balance del store
  const { balance } = useWalletStore();

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Título */}
        <Typography variant="h6" sx={{ width: 200, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <img src={LogoImage} width={80} height={'auto'} />
          PokeShop
        </Typography>

        {/* Mostrar saldo */}
        <Box sx={{ display: 'flex', width: 'auto', alignItems:'center' }}>
          <Typography variant="h6" sx={{ mr: 2 }}>
            Saldo: $ {balance.toFixed(2)} MXN
          </Typography>

          {/* Ícono de billetera */}
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <AccountBalanceWalletIcon />
          </IconButton>

          {/* Popover del carrito */}
          <CartDrawer />
        </Box>

      </Toolbar>

      {/* Drawer de la billetera */}
      <Drawer
        anchor="top" // Desliza desde arriba
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Mi Billetera
          </Typography>
          <WalletSection />
        </Box>
      </Drawer>
    </AppBar>
  );
}
