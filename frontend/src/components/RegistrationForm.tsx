import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import type { RegisterDto } from "../types/UserDto";
import { useAuthContext } from "./AuthContext";

export default function RegistrationForm() {
  const { register: registerUser, uploadAvatar } = useAuth();
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { register, handleSubmit, formState } = useForm<RegisterDto>();
  const { setUser } = useAuthContext();

  const handleAvatarSelect = (file: File) => {
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: RegisterDto) => {
    const res = await registerUser(data);
    if (!res.success || !res.user) {
      alert(res.error || "Ошибка регистрации");
      return;
    }

    setUser(res.user);
    localStorage.setItem("user", JSON.stringify(res.user));
    localStorage.setItem("user_id", res.user.id);

    if (avatarFile) {
      await uploadAvatar(res.user.id, avatarFile);
    }

    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm">
          Имя
        </label>
        <input
          id="name"
          {...register("name", { required: true })}
          className="w-full mt-1 px-3 py-2 rounded-md bg-transparent border border-white/10"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm">
          Email
        </label>
        <input
          id="email"
          type="email"
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
          {...register("password", { required: true, minLength: 6 })}
          className="w-full mt-1 px-3 py-2 rounded-md bg-transparent border border-white/10"
        />
      </div>

      <div>
        <label htmlFor="dob" className="block text-sm">
          Дата рождения
        </label>
        <input
          id="dob"
          type="date"
          {...register("dateOfBirth")}
          className="w-full mt-1 px-3 py-2 rounded-md bg-transparent border border-white/10"
        />
      </div>

      <div>
        <label htmlFor="avatar" className="block text-sm">
          Аватар
        </label>
        <input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && handleAvatarSelect(e.target.files[0])}
          className="w-full mt-1 px-3 py-2 rounded-md bg-transparent border border-white/10"
        />
        {preview && <img src={preview} alt="Preview" className="mt-2 w-20 h-20 rounded-md" />}
      </div>

      <button
        disabled={formState.isSubmitting}
        type="submit"
        className="w-full px-4 py-2 rounded-md bg-brand-500"
      >
        Зарегистрироваться
      </button>
    </form>
  );
}
