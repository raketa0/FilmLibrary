// src/hooks/useAuth.ts
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const logout = useAuthStore((s) => s.logout);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const uploadAvatar = useAuthStore((s) => s.uploadAvatar);
  const deleteAccount = useAuthStore((s) => s.deleteAccount);

  return {
    user,
    login,
    register,
    logout,
    updateProfile,
    uploadAvatar,
    deleteAccount,
  };
};
