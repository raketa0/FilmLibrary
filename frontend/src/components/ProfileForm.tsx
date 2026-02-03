import React from 'react';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { type UpdateProfileDto, type UserDto } from '../types/UserDto';
import { useAuth } from '../hooks/useAuth';

type Props = {
  user: UserDto;
  onUpdate?: () => void; // optional callback после обновления
};

export const ProfileForm: React.FC<Props> = ({ user, onUpdate }) => {
  const { updateProfile } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateProfileDto>({
    defaultValues: { name: user.name, AvatarLink: user.linkToAvatar || '' }
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    user.linkToAvatar ? `http://localhost:5000/store/${user.linkToAvatar}` : null
  );

  const submit: SubmitHandler<UpdateProfileDto> = async (data) => {
    try {
      const res = await updateProfile(user.id, data, avatarFile || undefined);
      if (!res.success) {
        alert(res.error || 'Ошибка обновления профиля');
        return;
      }
      setPreview(res.user?.linkToAvatar ? `http://localhost:5000/store/${res.user.linkToAvatar}` : null);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
    }
  };

  const handleAvatarSelect = (file: File) => {
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="profile-form space-y-4">
      <div
        className="w-32 h-32 border border-white/20 rounded-md flex items-center justify-center bg-white/5 cursor-pointer"
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files && e.dataTransfer.files[0]) handleAvatarSelect(e.dataTransfer.files[0]);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        {preview ? <img src={preview} className="h-full object-contain" alt="preview" /> : 'Перетащите фото или нажмите'}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files && handleAvatarSelect(e.target.files[0])}
      />

      <div>
        <label htmlFor="name">Имя:</label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Имя обязательно' })}
          className="w-full mt-1 px-3 py-2 rounded-md bg-transparent border border-white/10"
        />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 rounded-md bg-brand-500"
      >
        {isSubmitting ? 'Сохранение...' : 'Сохранить'}
      </button>
    </form>
  );
};
