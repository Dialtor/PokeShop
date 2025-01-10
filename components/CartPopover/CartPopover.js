'use client';

import React, { useState } from 'react';
import { Popover, Box, Typography, Button, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useCartStore } from '@/stores/useCartStore';
import { useWalletStore } from '@/stores/useWalletStore';

import { usePurchasedStore } from '@/stores/usePurchasedStore';

export default function CartPopover() {
  // 1. carrito
  const { cartItems, removeFromCart, clearCart } = useCartStore();
  // 2. monedero
  const { balance, subtractFunds } = useWalletStore();
  // 3. la función para marcar como comprado
  const { markAsPurchased } = usePurchasedStore();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const totalMXN = cartItems.reduce(
    (acc, item) => acc + item.convertedPriceMXN,
    0
  );

  const confirmPurchase = () => {
    if (balance >= totalMXN) {

      subtractFunds(totalMXN);

      cartItems.forEach((item) => markAsPurchased(item));

      clearCart();

      handleClosePopover();
    } else {
      alert('No tienes suficiente saldo');
    }
  };

  return (
    <Box>
      <IconButton color="inherit" onClick={handleOpenPopover}>
        <ShoppingCartIcon />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            Carrito de Compras
          </Typography>

          {cartItems.length === 0 ? (
            <Typography>Carrito vacío</Typography>
          ) : (
            <>
              {cartItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    border: '1px solid #ccc',
                    p: 1,
                    mb: 1,
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2">
                    Pokémon #{item.id} - {item.price.toFixed(2)} {item.currency}
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    Equivale a {item.convertedPriceMXN.toFixed(2)} MXN
                  </Typography>

                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </Button>
                </Box>
              ))}

              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                Total en MXN: {totalMXN.toFixed(2)}
              </Typography>
              <Typography variant="subtitle2" sx={{ mt: 1 }}>
                Saldo disponible: {balance.toFixed(2)} MXN
              </Typography>

              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={confirmPurchase}
              >
                Confirmar Compra
              </Button>
            </>
          )}
        </Box>
      </Popover>
    </Box>
  );
}
