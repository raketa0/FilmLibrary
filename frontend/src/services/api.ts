import {type UserDto, type RegisterUserDto, type LoginDto, type UpdateProfileDto } from "../types/UserDto";
const API_BASE = 'http://localhost:5084/api/users';

export const userApi = {
  register: async (data: RegisterUserDto): Promise<UserDto> => {
    const response = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Ошибка регистрации');
    return response.json();
  },

  login: async (data: LoginDto): Promise<UserDto> => {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Ошибка входа');
    return response.json();
  },

  updateProfile: async (id: string, data: UpdateProfileDto): Promise<UserDto> => {
    const response = await fetch(`${API_BASE}/${id}/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Ошибка обновления');
    return response.json();
  },

  getUser: async (id: string): Promise<UserDto> => {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error('Пользователь не найден');
    return response.json();
  },
};