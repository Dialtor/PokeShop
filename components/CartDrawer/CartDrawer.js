'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Badge,
  Drawer,
  Alert,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useCartStore } from '@/stores/useCartStore';
import { useWalletStore } from '@/stores/useWalletStore';
import { usePurchasedStore } from '@/stores/usePurchasedStore';

export default function CartDrawer() {
  // Carrito
  const { cartItems, removeFromCart, clearCart } = useCartStore();
  // Monedero
  const { balance, subtractFunds } = useWalletStore();
  // Marcador de comprados
  const { markAsPurchased } = usePurchasedStore();

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar el Alert

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
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
      setDrawerOpen(false);
      setShowAlert(false); // Ocultar el alert si la compra se realiza
    } else {
      setShowAlert(true); // Mostrar el alert si no hay suficiente saldo
    }
  };

  return (
    <Box>
      <Badge
        badgeContent={cartItems.length}
        color="secondary"
        overlap="circular"
      >
        <IconButton color="inherit" onClick={() => toggleDrawer(true)}>
          <ShoppingCartIcon />
        </IconButton>
      </Badge>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box
          sx={{
            width: 300,
            p: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
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

              {showAlert && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  No tienes suficiente saldo para realizar la compra.
                </Alert>
              )}

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
      </Drawer>
    </Box>
  );
}
