import { useForm, type SubmitHandler } from 'react-hook-form';
import { type RegisterUserDto } from '../types/UserDto';

type Props = {
  onSuccess: (user: RegisterUserDto) => void;
};

export const RegistrationForm: React.FC<Props> = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterUserDto>({
    defaultValues: { name: '', email: '', password: '', dateOfBirth: '' }
  });

  const submit: SubmitHandler<RegisterUserDto> = async (data) => {
    try {
      // Здесь вызов api.userApi.register(data), но для примера console
      console.log('Регистрация:', data);
      onSuccess(data);  // Callback
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="register-form">
      <div>
        <label htmlFor="name">Имя:</label>
        <input id="name" type="text" {...register('name', { required: 'Имя обязательно' })} />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" {...register('email', { required: 'Email обязателен' })} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="password">Пароль:</label>
        <input id="password" type="password" {...register('password', { required: 'Пароль обязателен', minLength: { value: 6, message: 'Минимум 6 символов' } })} />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>
      <div>
        <label htmlFor="dateOfBirth">Дата рождения:</label>
        <input id="dateOfBirth" type="date" {...register('dateOfBirth', { required: 'Дата обязательна' })} />
        {errors.dateOfBirth && <span className="error">{errors.dateOfBirth.message}</span>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
};