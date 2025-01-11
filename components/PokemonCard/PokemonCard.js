'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, IconButton, Tooltip } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay'; // Icono de reembolso
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { usePurchasedStore } from '@/stores/usePurchasedStore';
import { useWalletStore } from '@/stores/useWalletStore';
import { useCartStore } from '@/stores/useCartStore'; 
import { usePokemonPrice } from '@/components/PokemonCard/hooks/usePokemonPrice';

export default function PokemonCard({ pokeId, name }) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`;
  const noImage = `./pokebola.png`;

  const [isVisible, setIsVisible] = useState(false);

  const {
    randomPrice,
    randomCurrency,
    convertedPriceMXN,
    isLoading,
    isError,
  } = usePokemonPrice();

  const { addToCart } = useCartStore();

  const { isPurchased, removeFromPurchased, getPurchasedItemById } =
    usePurchasedStore();

  const { addFunds } = useWalletStore();

  const purchased = isPurchased(pokeId);

  const handleAddToCart = () => {
    const item = {
      id: pokeId,
      name,
      price: randomPrice,
      currency: randomCurrency,
      convertedPriceMXN,
    };
    addToCart(item);
  };

  const handleRefund = () => {
    const purchasedItem = getPurchasedItemById(pokeId);
    if (!purchasedItem) {
      Swal.fire('Error', 'No se encontró el Pokémon en la lista de comprados.', 'error');
      return;
    }

    addFunds(purchasedItem.convertedPriceMXN);

    removeFromPurchased(pokeId);

    Swal.fire('Reembolso exitoso', `El Pokémon ${name} ha sido reembolsado.`, 'success');
  };

  const handleConfirmRefund = () => {
    const purchasedItem = getPurchasedItemById(pokeId);
    if (!purchasedItem) {
      Swal.fire('Error', 'No se encontró el Pokémon en la lista de comprados.', 'error');
      return;
    }
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas reembolsar a ${name} por $${purchasedItem.convertedPriceMXN.toFixed(2)} MXN? Se aplicaran los mismos cargos a su monedero por el valor inicial de la compra. `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, reembolsar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        handleRefund();
      }
    });
  };

  const handlePurchasedClick = () => {
    Swal.fire({
      title: 'Comprado',
      // text: 'Este Pokémon ya ha sido comprado. Si lo deseas, puedes solicitar un reembolso usando el botón correspondiente.',
      text: 'Este Pokémon ya ha sido comprado.',
      icon: 'info',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Entendido',
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box
      sx={{
        width: 'auto',
        height: 'auto',
        display: 'flex',
        padding: 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: 3,
        backgroundColor: '#fff',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
        '&:hover .pokemon-background::before': {
          left: '125%',
        },
        '&:hover .pokemon-image': {
          transform: 'perspective(600px) rotateY(15deg) scale(1.05)',
        },
        opacity: isVisible ? 1 : 0,
        animation: isVisible ? 'fade-in 0.8s ease-in-out forwards' : 'none',
        '@keyframes fade-in': {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      }}
    >
      {/* Fondo top */}
      <Box
        className="pokemon-background"
        sx={{
          width: '100%',
          height: '200px',
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          background: '#e44b49',
          position: 'absolute',
          zIndex: '-2',
          top: 0,
          transition: 'all 2s ease',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-75%',
            width: '30%',
            height: '100%',
            background: 'rgba(255, 255, 255, 0.16)',
            transform: 'skewX(40deg)',
            transition: 'left 1s ease',
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '7px',
            background: '#2e313b',
            position: 'absolute',
            borderRadius: 2,
            bottom: 0,
            transform: 'translateY(4px)',
          }}
        />
      </Box>

      {/* Imagen del Pokémon */}
      <Box
        sx={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={imageUrl}
          alt={name}
          onError={(e) => (e.target.src = noImage)}
          className="pokemon-image"
          style={{
            width: '160px',
            height: '160px',
            objectFit: 'contain',
            userSelect: 'none',
            transition: 'all 0.4s ease',
          }}
          loading='lazy'
        />
      </Box>

      {/* Índice (#) y nombre */}
      <Typography
        variant="h6"
        component="div"
        sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}
      >
        {name}{' '}
        <span
          style={{
            fontWeight: 'lighter !important',
            color: '#8b8c8d',
          }}
        >
          #{pokeId}
        </span>
      </Typography>

      {/* Botones y precios */}
      {isLoading && <Typography>Cargando precios...</Typography>}
      {isError && <Typography color="error">Error al obtener tasas</Typography>}

      {!isLoading && !isError && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            ${randomPrice.toFixed(2)} {randomCurrency}
          </Typography>
          <Box
            sx={{
              background: '#292323',
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              alignItems: 'center',
              p: '5px',
              borderRadius: 2,
              mt: '5px',
            }}
          >
            <Typography variant="subtitle1" sx={{ color: 'white' }}>
              ${convertedPriceMXN.toFixed(2)} MXN
            </Typography>
            {purchased ? (
              <>
                <Button
                  variant="contained"
                  color="info"
                  sx={{
                    width: 'auto',
                    textTransform: 'none',
                    backgroundColor: '#292929',
                    color: 'white',
                    '&.Mui-disabled': {
                      backgroundColor: '#6c6c6c',
                      color: '#ffffff',
                    },
                  }}
                  onClick={handlePurchasedClick}
                >
                  Comprado
                </Button>
                <Tooltip title="Reembolsar">
                  <IconButton
                    color="primary"
                    onClick={handleConfirmRefund}
                  >
                    <ReplayIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Button
                variant="contained"
                color="inherit"
                sx={{ width: 'auto', textTransform: 'none' }}
                onClick={handleAddToCart}
              >
                Agregar al carro
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
