// src/store/authStore.ts
import { create } from 'zustand';
import type { UserDto, RegisterDto, LoginDto, UpdateProfileDto } from '../types/UserDto';
import * as usersApi from '../api/users';

type AuthResponse = {
  success: boolean;
  user?: UserDto;
  error?: string;
};

type State = {
  user: UserDto | null;
  setUser: (user: UserDto | null) => void;
  register: (payload: RegisterDto, avatarFile?: File | null) => Promise<AuthResponse>;
  login: (payload: LoginDto) => Promise<AuthResponse>;
  logout: () => void;
  updateProfile: (id: string, payload: UpdateProfileDto, avatarFile?: File | null) => Promise<AuthResponse>;
  uploadAvatar: (id: string, file: File) => Promise<AuthResponse>;
  deleteAccount: (id: string) => Promise<AuthResponse>;
};

const initialUser: UserDto | null = (() => {
  try {
    const raw = localStorage.getItem('fl_user');
    return raw ? (JSON.parse(raw) as UserDto) : null;
  } catch {
    return null;
  }
})();

export const useAuthStore = create<State>((set, get) => ({
  user: initialUser,

  setUser: (user) => {
    set({ user });
    if (user) localStorage.setItem('fl_user', JSON.stringify(user));
    else localStorage.removeItem('fl_user');
  },

  register: async (payload, avatarFile) => {  // ← добавляем avatarFile
  try {
    const fileToSend = avatarFile ?? undefined;
    const data = await usersApi.register(payload, fileToSend); // FormData + backend
    set({ user: data });
    localStorage.setItem('fl_user', JSON.stringify(data));
    return { success: true, user: data };
  } catch (e: any) {
    const msg = e?.response?.data || e?.message || 'Ошибка регистрации';
    return { success: false, error: typeof msg === 'string' ? msg : JSON.stringify(msg) };
  }
},


  login: async (payload) => {
    try {
      const data = await usersApi.login(payload);
      set({ user: data });
      localStorage.setItem('fl_user', JSON.stringify(data));
      return { success: true, user: data };
    } catch (e: any) {
      const msg = e?.response?.data || e?.message || 'Ошибка входа';
      return { success: false, error: typeof msg === 'string' ? msg : JSON.stringify(msg) };
    }
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem('fl_user');
  },

  // updateProfile: if avatarFile present -> upload first, get link, then put JSON with AvatarLink
  updateProfile: async (id, payload, avatarFile) => {
    try {
      let updatedUser: UserDto;
      if (avatarFile) {
        // upload file -> returns { linkToAvatar }
        const uploadRes = await usersApi.uploadAvatar(id, avatarFile);
        // backend stores relative path in LinkToAvatar; service returns { linkToAvatar }
        // Now send profile update with AvatarLink = returned relative path
        const dto = { ...payload, AvatarLink: uploadRes.linkToAvatar } as any;
        updatedUser = await usersApi.updateProfile(id, dto);
      } else {
        updatedUser = await usersApi.updateProfile(id, payload);
      }

      set({ user: updatedUser });
      localStorage.setItem('fl_user', JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    } catch (e: any) {
      const msg = e?.response?.data || e?.message || 'Ошибка обновления профиля';
      return { success: false, error: typeof msg === 'string' ? msg : JSON.stringify(msg) };
    }
  },

  uploadAvatar: async (id, file) => {
  try {
    // загрузка на сервер
    await usersApi.uploadAvatar(id, file);

    // ✅ обновляем пользователя с сервера
    const updatedUser = await usersApi.getUser(id);

    set({ user: updatedUser });
    localStorage.setItem('fl_user', JSON.stringify(updatedUser));

    return { success: true, user: updatedUser };
  } catch (e: any) {
    const msg = e?.response?.data || e?.message || 'Ошибка загрузки аватара';
    return { success: false, error: typeof msg === 'string' ? msg : JSON.stringify(msg) };
  }
},

  deleteAccount: async (id) => {
    try {
      await usersApi.deleteAccount(id);
      set({ user: null });
      localStorage.removeItem('fl_user');
      return { success: true };
    } catch (e: any) {
      const msg = e?.response?.data || e?.message || 'Ошибка удаления аккаунта';
      return { success: false, error: typeof msg === 'string' ? msg : JSON.stringify(msg) };
    }
  },
}));
