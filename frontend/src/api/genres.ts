import { client } from './client';
import type { GenreDto } from '../types/GenreDto';

export async function getAllGenres(): Promise<GenreDto[]> {
  const { data } = await client.get('/genres');
  return data;
}
