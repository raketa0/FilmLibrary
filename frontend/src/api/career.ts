import { client } from './client';
import type { CareerDto } from '../types/PersonDto';

const API = '/careers';

export async function getAllCareers(): Promise<CareerDto[]> {
  try {
    const { data } = await client.get(API);
    return data;
  } catch (err: any) {
    const msg = err?.response?.data || err?.message || 'Ошибка получения карьер';
    throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg));
  }
}
