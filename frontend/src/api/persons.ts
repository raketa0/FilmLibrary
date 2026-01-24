import { client } from './client';
import type { PersonDto, CreatePersonDto, CareerDto } from '../types/PersonDto';

const API = '/persons';

export async function getAllPersons(): Promise<PersonDto[]> {
  const { data } = await client.get(API);
  return data;
}

export async function createPerson(dto: CreatePersonDto): Promise<PersonDto> {
  try {
    const { data } = await client.post(API, dto);
    return data;
  } catch (err: any) {
    const msg = err?.response?.data || err?.message || 'Ошибка создания персонажа';
    throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg));
  }
}

export async function getAllCareers(): Promise<CareerDto[]> {
  const { data } = await client.get('/careers');
  return data;
}
