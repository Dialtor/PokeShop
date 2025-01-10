'use client';

// React
import React from 'react';
// Hooks
import { usePokemons } from '@/hooks/usePokemons';
import { usePagination } from '@/hooks/usePagination';
// MUI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Box, Typography, CircularProgress } from '@mui/material';
// Components
import PaginationControls from '@/components/PaginationControls/PaginationControls';
import PokemonList from '@/components/PokemonList/PokemonList';
import Header from '@/components/Header/Header';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#f50057' },
  },
});

export default function HomePage() {
  // Lógica de paginación
  const { limit, offset, handleNext, handlePrev } = usePagination(200);

  // Lógica de fetch pokemones (custom hook)
  const {
    data,
    isLoading,
    isError,
    isPreviousData,
  } = usePokemons(limit, offset);

  return (
    <ThemeProvider theme={theme}>

      <Header/>

      <Container sx={{ py:8, minWidth: '80vw' }}>
        <Typography variant="h4" gutterBottom>
          Pokémon Store
        </Typography>

        {/* Loading */}
        {isLoading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {/* Error */}
        {isError && (
          <Typography color="error">
            Ocurrió un error al cargar los pokemones.
          </Typography>
        )}

        {/* Lista + Paginación */}
        {!isLoading && !isError && (
          <>
            <PokemonList
              pokemons={data?.results || []}
              offset={offset}
            />

            {/* <PaginationControls
              offset={offset}
              isPreviousData={isPreviousData}
              onPrev={handlePrev}
              onNext={handleNext}
            /> */}
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}
