'use client';

import React, { useState, useEffect } from 'react';
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
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';

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

  const GifVoidCart = './voidCart.gif';

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
    } else {
      setShowAlert(true); // Mostrar el alert si no hay suficiente saldo
    }
  };

  // Actualizar la visibilidad del alert en función del saldo disponible
  useEffect(() => {
    setShowAlert(balance < totalMXN && cartItems.length > 0);
  }, [balance, totalMXN, cartItems]);

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
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100vw', sm: '60vw', md: '40vw', lg: '30vw' }, // Este es el tamaño del Drawer
          },
        }}
      >
        <Box
          sx={{
            width: 'auto',
            p: 2,
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '7px',
              alignItems: 'center',
              color: '#8b8c8d',
              cursor: 'pointer',
            }}
            onClick={() => toggleDrawer(false)}
          >
            <KeyboardBackspaceRoundedIcon />
            <Typography sx={{ fontSize: '1rem' }}>Seguir comprando</Typography>
          </Box>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 3, mt: 3 }}
          >
            Carrito de Compras
          </Typography>

          {cartItems.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">
                Carrito vacío! ¿Qué esperas para comprar?
              </Typography>
              <img
                src={GifVoidCart}
                width={'60%'}
                height={'auto'}
                style={{ minWidth: 250 }}
              />
            </Box>
          ) : (
            <>
              {cartItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    border: '1px solid #ccc',
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderRadius: '7px',
                    flexDirection: 'row',
                    '@media (max-width: 380px)': {
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '15px',
                      width: '100%',
                      '@media (max-width: 380px)': {
                        flexDirection: 'column',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        border: '1px solid #ccc',
                        padding: 2,
                        borderRadius: '7px',
                        backgroundImage: `url('https://cdn.pixabay.com/photo/2016/07/23/13/21/pokemon-1536855_640.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        '@media (max-width: 380px)': {
                          width: 'auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                      }}
                    >
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.id}.svg`}
                        width={'80px'}
                        height={'85px'}
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                        mt: 1,
                        fontSize: '1rem',
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      p: 1,
                      width: '100%',
                      '@media (max-width: 380px)': {
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontStyle: 'italic',
                        fontSize: '0.7rem',
                        color: '#8b8c8d',
                      }}
                    >
                      $ {item.price.toFixed(2)} {item.currency}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      $ {item.convertedPriceMXN.toFixed(2)} MXN
                    </Typography>

                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      sx={{ mt: 1, fontSize: '0.7rem' }}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </Button>
                  </Box>
                </Box>
              ))}

              <Typography
                variant="subtitle1"
                sx={{ mt: 1, textAlign: 'right' }}
              >
                Total estimado: <span style={{ fontWeight: 'bold' }}> $ {totalMXN.toFixed(2)} MXN</span>
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ mt: 1, textAlign: 'right' }}
              >
                Saldo disponible: $ {balance.toFixed(2)} MXN
              </Typography>

              {showAlert && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  No tienes suficiente saldo para realizar la compra.
                </Alert>
              )}

              <Button
                variant="contained"
                color="inherit"
                sx={{ mt: 2 }}
                onClick={confirmPurchase}
              >
                Confirmar Compra
              </Button>
              <br />
              <br />
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}
