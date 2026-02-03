import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import type { LoginDto } from "../types/UserDto";
import { useAuthContext } from "./AuthContext";

export default function LoginForm() {
  const { register, handleSubmit, formState } = useForm<LoginDto>();
  const auth = useAuth();
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const onSubmit = async (data: LoginDto) => {
    const res = await auth.login(data);
    if (!res.success) {
      alert(res.error || "Ошибка входа");
      return;
    }

    if (res.user) {
      setUser(res.user);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("user_id", res.user.id);
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm">
          Email
        </label>
        <input
          id="email"
          {...register("email", { required: true })}
          className="w-full mt-1 px-3 py-2 rounded-md bg-transparent border border-white/10"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm">
          Пароль
        </label>
        <input
          id="password"
          type="password"
          {...register("password", { required: true })}
          className="w-full mt-1 px-3 py-2 rounded-md bg-transparent border border-white/10"
        />
      </div>

      <button
        disabled={formState.isSubmitting}
        type="submit"
        className="w-full px-4 py-2 rounded-md bg-brand-500"
      >
        Войти
      </button>
    </form>
  );
}
