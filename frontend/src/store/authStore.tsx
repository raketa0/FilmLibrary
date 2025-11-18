import { create } from 'zustand';
import type { UserDto, RegisterDto, LoginDto, UpdateProfileDto } from '../types/UserDto';
import * as usersApi from '../api/users';

type State = {
  user: UserDto | null;
  setUser: (u: UserDto | null) => void;
  register: (payload: RegisterDto) => Promise<{ success: boolean; error?: string }>;
  login: (payload: LoginDto) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (id: string, payload: UpdateProfileDto) => Promise<{ success: boolean; error?: string }>;
};

const initialUser = (() => {
  try {
    const raw = localStorage.getItem('fl_user');
    return raw ? (JSON.parse(raw) as UserDto) : null;
  } catch {
    return null;
  }
})();

export const useAuthStore = create<State>((set, get) => ({
  user: initialUser,

  setUser: (u) => {
    set({ user: u });
    if (u) localStorage.setItem('fl_user', JSON.stringify(u));
    else localStorage.removeItem('fl_user');
  },

  register: async (payload) => {
    try {
      const data = await usersApi.register(payload);
      set({ user: data });
      localStorage.setItem('fl_user', JSON.stringify(data));
      return { success: true };
    } catch (e: any) {
      const msg = e?.response?.data || e?.message || 'Ошибка';
      return { success: false, error: typeof msg === 'string' ? msg : JSON.stringify(msg) };
    }
  },

  login: async (payload) => {
    try {
      const data = await usersApi.login(payload);
      set({ user: data });
      localStorage.setItem('fl_user', JSON.stringify(data));
      return { success: true };
    } catch (e: any) {
      const msg = e?.response?.data || e?.message || 'Ошибка';
      return { success: false, error: typeof msg === 'string' ? msg : JSON.stringify(msg) };
    }
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem('fl_user');
  },

  updateProfile: async (id, payload) => {
    try {
      const data = await usersApi.updateProfile(id, payload);
      set({ user: data });
      localStorage.setItem('fl_user', JSON.stringify(data));
      return { success: true };
    } catch (e: any) {
      const msg = e?.response?.data || e?.message || 'Ошибка';
      return { success: false, error: typeof msg === 'string' ? msg : JSON.stringify(msg) };
    }
  },
}));
