import { useQuery } from '@tanstack/react-query';
import { getPokemons } from '@/services/pokemonService';

export function usePokemons(limit = 150, offset = 0) {
  return useQuery({
    queryKey: ['pokemons', limit, offset],
    queryFn: () => getPokemons(limit, offset),
    keepPreviousData: true,
    // ...cualquier otra opción
  });
}
