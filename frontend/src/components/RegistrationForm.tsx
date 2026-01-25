import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import type { RegisterDto } from '../types/UserDto';
import { useAuthContext } from './AuthContext';

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
    try {
      const res = await registerUser(data);
      if (!res.success || !res.user) {
        alert(res.error || 'Ошибка регистрации');
        return;
      }

      setUser(res.user);
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem('user_id', res.user.id);

      if (avatarFile) {
        const up = await uploadAvatar(res.user.id, avatarFile);
        if (!up.success) alert(up.error || 'Аватар не загружен');
      }

      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      alert('Произошла ошибка регистрации');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div
        className="w-full h-32 border border-white/20 rounded-md flex items-center justify-center bg-white/5"
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files && e.dataTransfer.files[0]) handleAvatarSelect(e.dataTransfer.files[0]);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        {preview ? <img src={preview} className="h-full object-contain" alt="preview" /> : 'Перетащите фото или нажмите'}
      </div>

      <input type="file" accept="image/*" onChange={(e) => e.target.files && handleAvatarSelect(e.target.files[0])} />

      <div>
        <label className="block text-sm">Имя</label>
        <input {...register('name', { required: true })} className="w-full mt-1 px-3 py-2 rounded-md bg-transparent border border-white/10" />
      </div>

      <div>
        <label className="block text-sm">Email</label>
        <input {...register('email', { required: true })} type="email" className="w-full mt-1 px-3 py-2 rounded-md bg-transparent border border-white/10" />
      </div>

      <div>
        <label className="block text-sm">Пароль</label>
        <input {...register('password', { required: true, minLength: 6 })} type="password" className="w-full mt-1 px-3 py-2 rounded-md bg-transparent border border-white/10" />
      </div>

      <div>
        <label className="block text-sm">Дата рождения</label>
        <input {...register('dateOfBirth')} type="date" className="w-full mt-1 px-3 py-2 rounded-md bg-transparent border border-white/10" />
      </div>

      <div>
        <button disabled={formState.isSubmitting} type="submit" className="w-full px-4 py-2 rounded-md bg-brand-500">Зарегистрироваться</button>
      </div>
    </form>
  );
}