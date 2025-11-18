import { useForm, type SubmitHandler } from 'react-hook-form';
import { type UpdateProfileDto, type UserDto } from '../types/UserDto';

type Props = {
  user: UserDto;
  onUpdate: (data: UpdateProfileDto) => void;
};

export const ProfileForm: React.FC<Props> = ({ user, onUpdate }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateProfileDto>({
    defaultValues: { name: user.name, avatarLink: user.avatarLink || '' }
  });

  const submit: SubmitHandler<UpdateProfileDto> = async (data) => {
    try {
      console.log('Обновление профиля:', data);
      onUpdate(data);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="profile-form">
      <div>
        <label htmlFor="name">Имя:</label>
        <input id="name" type="text" {...register('name', { required: 'Имя обязательно' })} />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>
      <div>
        <label htmlFor="avatarLink">Ссылка на аватар:</label>
        <input id="avatarLink" type="url" {...register('avatarLink')} />
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Сохранение...' : 'Сохранить'}
      </button>
    </form>
  );
};