'use client';

import React from 'react';
import { Box } from '@mui/material';
import PokemonCard from '../PokemonCard/PokemonCard';

export default function PokemonList({ pokemons, offset }) {
  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 120,
        backgroundColor: '#360f06',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        py: 10,
        mt: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto'
      }}
    >
      {pokemons.map((pokemon, idx) => (
        <PokemonCard
          key={pokemon.name}
          // index será el ID de PokeAPI (1,2,3...) si parte desde 1
          index={offset + idx + 1}
          name={pokemon.name}
        />
      ))}
    </Box>
  );
}
