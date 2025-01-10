import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemons(limit = 150, offset = 0) {
  const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  return response.data;
}