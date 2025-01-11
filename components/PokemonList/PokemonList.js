'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Typography, CircularProgress } from '@mui/material';
import PokemonCard from '../PokemonCard/PokemonCard';

export default function PokemonList({ pokemons, offset }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [visiblePokemons, setVisiblePokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);
  const batchSize = 12; // Tamaño del los items a cargar incialmente
  const notFound = "./NotFound.png"


  // Agregar ID único a cada Pokémon
  const pokemonsWithUniqueKey = React.useMemo(() => {
    return pokemons.map((pokemon, idx) => ({
      ...pokemon,
      uniqueKey: `${offset + idx + 1}-${pokemon.name}`, // Clave única
      id: offset + idx + 1, // ID para lógica de la UI
    }));
  }, [pokemons, offset]);

  // Funcion de filtro de pokemons
  const filteredPokemons = React.useMemo(() => {
    return pokemonsWithUniqueKey.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pokemonsWithUniqueKey, searchTerm]);

  // Setear los pokemons visibles en la primera instancia
  useEffect(() => {
    setVisiblePokemons(filteredPokemons.slice(0, batchSize));
  }, [filteredPokemons]);

  // Cargar mas pokemons
  const loadMorePokemons = () => {
    if (isLoading || searchTerm !== '') return; // Evitar carga si hay búsqueda activa
    setIsLoading(true);

    const nextBatch = filteredPokemons.slice(
      visiblePokemons.length,
      visiblePokemons.length + batchSize
    );

    // Agregar solo los pokemon que no estén ya en visiblePokemons
    const uniqueNextBatch = nextBatch.filter(
      (newPokemon) =>
        !visiblePokemons.some(
          (visiblePokemon) => visiblePokemon.uniqueKey === newPokemon.uniqueKey
        )
    );

    if (uniqueNextBatch.length > 0) {
      setTimeout(() => {
        setVisiblePokemons((prev) => [...prev, ...uniqueNextBatch]);
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  // Configuración IntersectionObserver
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
  }, [isLoading, searchTerm, visiblePokemons]); // Agregamos visiblePokemons como dependencia

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
          visiblePokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.uniqueKey} // Clave única basada en `uniqueKey`
              pokeId={pokemon.id}
              name={pokemon.name}
            />
          ))
        ) : (
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant="h3" color="text.secondary">
              No se encontraron resultados.
            </Typography>

            <img src={notFound} width={500} height="auto" />
          </Box>
        )}
      </Box>

      {/* Loader y referencia para IntersectionObserver */}
      {searchTerm === '' && (
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
