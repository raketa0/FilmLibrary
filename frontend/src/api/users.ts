// src/api/users.ts
import { client } from './client';
import type { RegisterDto, LoginDto, UpdateProfileDto, UserDto } from '../types/UserDto';

const API = '/users';

export async function register(payload: RegisterDto): Promise<UserDto> {
  const { data } = await client.post<UserDto>(`${API}/register`, payload);
  return data;
}

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

// upload avatar via multipart/form-data; backend expects field "avatar"
export async function uploadAvatar(id: string, file: File): Promise<{ linkToAvatar: string }> {
  const fd = new FormData();
  fd.append('avatar', file);
  const { data } = await client.post<{ linkToAvatar: string }>(`${API}/${id}/UploadAvatar`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function deleteAccount(id: string): Promise<void> {
  await client.delete(`${API}/${id}`);
}
