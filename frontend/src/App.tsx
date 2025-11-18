import { useForm, type SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import './App.css';

type MyForm = {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;  // String для input type="date"
};

function App() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<MyForm>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      dateOfBirth: ''
    }
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');  // State для имени после успеха

  const submit: SubmitHandler<MyForm> = async (data) => {
    setServerError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5084/api/Users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const user = await response.json();  // UserDto от backend
        console.log('Зарегистрирован:', user);
        setSuccess(true);
        setUserName(data.name);  // Сохрани имя в state
        reset();  // Очисти форму
        // Редирект позже: setTimeout(() => window.location.href = '/profile', 2000);
      } else {
        const errorData = await response.text();  // Text для ошибки
        setServerError(errorData || 'Ошибка регистрации');
      }
    } catch (error) {
      setServerError('Сбой сети. Проверь backend.');
      console.error('Регистрация ошибка:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Регистрация в Фильмотеке</h1>
        {success && <p style={{ color: 'green' }}>Регистрация успешна! Добро пожаловать, {userName}!</p>}
        {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
        <form onSubmit={handleSubmit(submit)} className="register-form">
          <div>
            <label htmlFor="name">Имя:</label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Имя обязательно', minLength: { value: 2, message: 'Минимум 2 символа' } })}
            />
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email обязателен',
                pattern: { value: /^\S+@\S+$/i, message: 'Неверный email' }
              })}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          <div>
            <label htmlFor="password">Пароль:</label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: 'Пароль обязателен',
                minLength: { value: 6, message: 'Минимум 6 символов' }
              })}
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>

          <div>
            <label htmlFor="dateOfBirth">Дата рождения:</label>
            <input
              id="dateOfBirth"
              type="date"
              {...register('dateOfBirth', {
                required: 'Дата рождения обязательна',
                validate: (value) => new Date(value) < new Date() || 'Дата не может быть в будущем'
              })}
            />
            {errors.dateOfBirth && <span className="error">{errors.dateOfBirth.message}</span>}
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;