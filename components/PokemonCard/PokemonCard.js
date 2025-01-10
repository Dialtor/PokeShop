'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { usePurchasedStore } from '@/stores/usePurchasedStore';
import { useWalletStore } from '@/stores/useWalletStore';
import { useCartStore } from '@/stores/useCartStore'; 
import { usePokemonPrice } from '@/components/PokemonCard/hooks/usePokemonPrice';

export default function PokemonCard({ index, name }) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index}.svg`;

  const {
    randomPrice,
    randomCurrency,
    convertedPriceMXN,
    isLoading,
    isError,
  } = usePokemonPrice();

  const { addToCart } = useCartStore();

  // Comprados
  const {
    isPurchased,
    removeFromPurchased,
    getPurchasedItemById,
  } = usePurchasedStore();

  // Wallet
  const { addFunds } = useWalletStore();

  const purchased = isPurchased(index);

  const handleAddToCart = () => {
    const item = {
      id: index,
      name,
      price: randomPrice,
      currency: randomCurrency,
      convertedPriceMXN,
    };
    addToCart(item);
  };


  const handleRefund = () => {

    const purchasedItem = getPurchasedItemById(index);
    if (!purchasedItem) {
      alert('Error: no se encontró el item en la lista de comprados.');
      return;
    }

    addFunds(purchasedItem.convertedPriceMXN);

    removeFromPurchased(index);
  };

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

      <Typography variant="h6">#{index}</Typography>
      <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
        {name}
      </Typography>

      {isLoading && <Typography>Cargando precios...</Typography>}
      {isError && <Typography color="error">Error al obtener tasas</Typography>}

      {!isLoading && !isError && (
        <>
          <Typography>
            {randomPrice.toFixed(2)} {randomCurrency}
          </Typography>
          <Typography>
            Precio Local: {convertedPriceMXN.toFixed(2)} MXN
          </Typography>

          {purchased ? (
            <>
              <Button variant="contained" disabled sx={{ mt: 2 }}>
                Comprado
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleRefund}
                sx={{ mt: 1 }}
              >
                Reembolsar
              </Button>
            </>
          ) : (
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddToCart}>
              Agregar al Carrito
            </Button>
          )}
        </>
      )}
    </Box>
  );
}
