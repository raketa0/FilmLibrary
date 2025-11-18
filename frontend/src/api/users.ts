import { client } from './client';
import type { RegisterDto, LoginDto, UpdateProfileDto, UserDto } from '../types/UserDto';

export async function register(payload: RegisterDto) {
  const res = await client.post<UserDto>('/users/register', payload);
  return res.data;
}

export async function login(payload: LoginDto) {
  const res = await client.post<UserDto>('/users/login', payload);
  return res.data;
}

export async function updateProfile(id: string, payload: UpdateProfileDto) {
  const res = await client.put<UserDto>(`/users/${id}/profile`, payload);
  return res.data;
}

export async function getById(id: string) {
  const res = await client.get<UserDto>(`/users/${id}`);
  return res.data;
}
