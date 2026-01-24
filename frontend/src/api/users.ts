// src/api/users.ts
import { client } from './client';
import type { RegisterDto, LoginDto, UpdateProfileDto, UserDto } from '../types/UserDto';

const API = '/users';

export const register = async (data: RegisterDto, avatarFile?: File): Promise<UserDto> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('password', data.password);
  if (data.dateOfBirth) formData.append('dateOfBirth', data.dateOfBirth);
  if (avatarFile) formData.append('avatar', avatarFile);

  const res = await fetch('http://localhost:5173/api/users/register', {
    method: 'POST',
    body: formData, // ❌ НЕ JSON
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const uploadAvatar = async (id: string, file: File) => {
  const formData = new FormData();
  formData.append('avatar', file);

  const res = await fetch(`http://localhost:5173/api/users/${id}/avatar`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export async function login(payload: LoginDto): Promise<UserDto> {
  const { data } = await client.post<UserDto>(`${API}/login`, payload);
  return data;
}

export async function getUser(id: string): Promise<UserDto> {
  const { data } = await client.get<UserDto>(`${API}/${id}`);
  return data;
}

export async function updateProfile(id: string, payload: UpdateProfileDto): Promise<UserDto> {
  const { data } = await client.put<UserDto>(`${API}/${id}/profile`, payload);
  return data;
}


export async function deleteAccount(id: string): Promise<void> {
  await client.delete(`${API}/${id}`);
}
