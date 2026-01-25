import { client } from './client';
import type { CreateFilmDto, FilmDto, FilmPersonDto, UpdateFilmDto } from '../types/FilmDto';
import axios from 'axios';

const API = '/films';

export async function getAllFilms(): Promise<FilmDto[]> {
  const { data } = await client.get(API);
  return data;
}

export async function getFilm(id: number): Promise<FilmDto> {
  const { data } = await client.get(`${API}/${id}`);
  return data;
}

export async function createFilm(dto: CreateFilmDto): Promise<FilmDto> {
  try {
    const { data } = await client.post(API, dto);
    return data;
  } catch (err: any) {
    const msg = err?.response?.data || err?.message || 'Ошибка создания фильма';
    throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg));
  }
}

export async function updateFilm(id: number, dto: UpdateFilmDto): Promise<FilmDto> {
  const { data } = await client.put(`${API}/${id}`, dto);
  return data;
}

export async function deleteFilm(id: number) {
  await client.delete(`${API}/${id}`);
}

export async function searchFilms(name?: string, genreIds?: number[]) {
  const params = new URLSearchParams();

  if (name) params.append("name", name);

  genreIds?.forEach(id => {
    params.append("genreIds", id.toString());
  });

  const { data } = await client.get(`/films/search?${params.toString()}`);
  return data;
}


export async function rateFilm(id: number, value: number) {
  await client.post(`${API}/${id}/rate`, null, { params: { value } });
}

export async function updateFilmPersons(id: number, persons: FilmPersonDto[]) {
  await client.put(`${API}/${id}/persons`, { persons });
}

export async function uploadFilmFiles(
  id: number,
  poster?: File,
  film?: File
): Promise<FilmDto> {
  if (!poster && !film) throw new Error('Нет файлов для загрузки');

  try {
    const formData = new FormData();
    if (poster) formData.append('poster', poster);
    if (film) formData.append('film', film);

    const res = await fetch(`http://localhost:5173/api/films/${id}/files`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Ошибка загрузки файлов фильма');
    }

    const data: FilmDto = await res.json();
    return data;
  } catch (err: any) {
    console.error('Ошибка uploadFilmFiles:', err);
    throw new Error(err?.message || 'Не удалось загрузить файлы фильма');
  }
}

export async function getMyFilmsStats(userId: string) {
  const { data } = await client.get(`/films/my/${userId}`);
  return data;
}

export async function getViewHistory() {
  const { data } = await client.get("/history");
  return data;
}

export async function addView(filmId: number, userId: string) {
try {
await axios.post(`http://localhost:5000/api/films/${filmId}/add-view`, null, {
params: { userId }
});
console.log("Просмотр добавлен!");
} catch (err) {
console.error("Ошибка добавления просмотра:", err);
}
}
