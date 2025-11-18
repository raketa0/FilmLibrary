import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileForm } from '../components/ProfileForm';
import { userApi } from '../services/api';
import type{ UserDto, UpdateProfileDto } from '../types/UserDto';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const id = localStorage.getItem('userId');  // ID из localStorage после логина
      console.log('LocalStorage userId:', id);  // Лог для отладки (F12 Console)

      if (!id) {
        console.log('No userId in localStorage — redirect to auth');
        setError('Пользователь не найден. Войдите ещё раз.');
        setLoading(false);
        return;
      }

      try {
        const fetchedUser = await userApi.getUser(id);
        console.log('User fetched:', fetchedUser);
        setUser(fetchedUser);
      } catch (err: any) {
        console.error('Fetch user error:', err);
        setError(err.message || 'Ошибка загрузки профиля');
        setTimeout(() => navigate('/auth'), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleUpdate = async (data: UpdateProfileDto) => {
    if (!user) return;
    try {
      const updatedUser = await userApi.updateProfile(user.id, data);
      setUser(updatedUser);
      console.log('Profile updated:', updatedUser);
    } catch (error) {
      console.error('Update error:', error);
      setError('Ошибка обновления');
    }
  };

  if (loading) return <p>Загрузка профиля...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Профиль не найден. <button onClick={() => navigate('/auth')}>Войти</button></p>;

  return (
    <div className="profile-page">
      <h1>Личный кабинет</h1>
      <p>Email: {user.email}</p>
      <p>Дата рождения: {new Date(user.dateOfBirth).toLocaleDateString()}</p>
      <p>Дата регистрации: {new Date(user.registrationDate).toLocaleDateString()}</p>
      <ProfileForm user={user} onUpdate={handleUpdate} />
    </div>
  );
};

export { ProfilePage };