'use client';

import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';

export default function PokemonFilter({ pokemons }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  return (
    <Box sx={{ p: 2 }}>
      {/* Input para búsqueda */}
      <TextField
        label="Buscar Pokémon"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />

      {/* Mostrar resultados */}
      {filteredPokemons.length > 0 ? (
        <Box>
          {filteredPokemons.map((pokemon) => (
            <Box
              key={pokemon.id}
              sx={{
                border: '1px solid #ccc',
                p: 1,
                mb: 1,
                borderRadius: 1,
              }}
            >
              <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                #{pokemon.id} - {pokemon.name}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No se encontraron resultados.
        </Typography>
      )}
    </Box>
  );
}
