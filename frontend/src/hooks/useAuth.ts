import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const user = useAuthStore((s: { user: any; }) => s.user);
  const login = useAuthStore((s: { login: any; }) => s.login);
  const register = useAuthStore((s: { register: any; }) => s.register);
  const logout = useAuthStore((s: { logout: any; }) => s.logout);
  const updateProfile = useAuthStore((s: { updateProfile: any; }) => s.updateProfile);

  return {
    user,
    login,
    register,
    logout,
    updateProfile
  };
};
