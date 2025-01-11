'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Typography, CircularProgress } from '@mui/material';
import PokemonCard from '../PokemonCard/PokemonCard';

export default function PokemonList({ pokemons, offset }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [visiblePokemons, setVisiblePokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);
  const batchSize = 7; // Tamaño del lote a cargar

  // Agregar ID a cada Pokémon
  const pokemonsWithId = React.useMemo(() => {
    return pokemons.map((pokemon, idx) => ({
      ...pokemon,
      id: offset + idx + 1,
    }));
  }, [pokemons, offset]);


  // Filtrar Pokémon basándonos en el término de búsqueda
  const filteredPokemons = React.useMemo(() => {
    return pokemonsWithId.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pokemonsWithId, searchTerm]);

  // Inicializar los primeros Pokémon visibles
  useEffect(() => {
    setVisiblePokemons(filteredPokemons.slice(0, batchSize));
  }, [filteredPokemons]);

  // Función para cargar más Pokémon
  const loadMorePokemons = () => {
    if (isLoading || searchTerm !== '') return; // Evitar carga si hay búsqueda activa
    setIsLoading(true);

    const nextBatch = filteredPokemons.slice(
      visiblePokemons.length,
      visiblePokemons.length + batchSize
    );

    if (nextBatch.length > 0) {
      setTimeout(() => {
        setVisiblePokemons((prev) => [...prev, ...nextBatch]);
        setIsLoading(false);
      }, 1000); // Simulación de tiempo de carga
    } else {
      setIsLoading(false);
    }
  };

  // Configuración del IntersectionObserver
  useEffect(() => {
    if (searchTerm !== '') return; // No configurar el observer si hay búsqueda activa

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMorePokemons();
        }
      },
      { threshold: 1 }
    );

    const currentRef = observerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isLoading, searchTerm]); // Eliminado `visiblePokemons.length` para evitar dependencias innecesarias

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
        {visiblePokemons.length > 0 ? (
          visiblePokemons.map((pokemon, index) => (
            <PokemonCard
              key={index} // Usar `pokemon.id` como clave única
              index={pokemon.id}
              name={pokemon.name}
            />
          ))
        ) : (
          <Typography>No se encontraron resultados.</Typography>
        )}
      </Box>

      {/* Loader y referencia para IntersectionObserver */}
      {searchTerm === '' && ( // Mostrar sólo si no hay búsqueda activa
        <Box
          ref={observerRef}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 4,
          }}
        >
          {isLoading && <CircularProgress />}
        </Box>
      )}
    </Box>
  );
}
