import { useForm, type SubmitHandler } from 'react-hook-form';
import { type LoginDto } from '../types/UserDto';

type Props = {
  onSuccess: (data: LoginDto) => void;
};

export const LoginForm: React.FC<Props> = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginDto>({
    defaultValues: { email: '', password: '' }
  });

  const submit: SubmitHandler<LoginDto> = async (data) => {
    try {
      console.log('Логин:', data);
      onSuccess(data);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="login-form">
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" {...register('email', { required: 'Email обязателен' })} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="password">Пароль:</label>
        <input id="password" type="password" {...register('password', { required: 'Пароль обязателен' })} />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
};