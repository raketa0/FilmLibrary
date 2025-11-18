import React, { useState } from 'react';
import { RegistrationForm } from '../components/RegistrationForm';
import { LoginForm } from '../components/LoginForm';
import { userApi } from '../services/api';
import type { RegisterUserDto, LoginDto } from '../types/UserDto';

const AuthPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handleSuccess = async (data: RegisterUserDto | LoginDto) => {
    try {
      if (isRegister) {
        const user = await userApi.register(data as RegisterUserDto);
        console.log('Регистрация:', user);
        // Редирект: window.location.href = '/profile';
      } else {
        const user = await userApi.login(data as LoginDto);
        console.log('Логин:', user);
        // Сохрани в localStorage: localStorage.setItem('user', JSON.stringify(user));
      }
      window.location.href = '/profile';  // Редирект на профиль
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div className="auth-page">
      <h1>{isRegister ? 'Регистрация' : 'Вход'}</h1>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'У меня аккаунт' : 'Создать аккаунт'}
      </button>
      {isRegister ? <RegistrationForm onSuccess={handleSuccess} /> : <LoginForm onSuccess={handleSuccess} />}
    </div>
  );
};

export { AuthPage };