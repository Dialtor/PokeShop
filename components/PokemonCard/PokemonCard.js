'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

export default function PokemonCard({ index, name }) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index}.svg`;

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
      {/* Imagen del Pokémon */}
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

      {/* Índice (#) y nombre */}
      <Typography variant="h6" component="div">
        #{index}
      </Typography>
      <Typography
        variant="h6"
        component="div"
        sx={{ textTransform: 'capitalize' }}
      >
        {name}
      </Typography>
    </Box>
  );
}
