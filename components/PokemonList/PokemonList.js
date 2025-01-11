'use client';

import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import PokemonCard from '../PokemonCard/PokemonCard';

export default function PokemonList({ pokemons, offset }) {
  // Estado para manejar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar los Pokémon basándonos en el término de búsqueda
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 120,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        py: 10,
        mt: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
      }}
    >
      {/* Campo de búsqueda */}
      <TextField
        label="Buscar Pokémon"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4, width: '50%' }}
      />

      {/* Lista de Pokémon */}
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 2,
          justifyContent: 'center',
        }}
      >
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon, idx) => (
            <PokemonCard
              key={pokemon.name}
              index={idx + 1}
              name={pokemon.name}
            />
          ))
        ) : (
          <Typography>No se encontraron resultados.</Typography>
        )}
      </Box>
    </Box>
  );
}
