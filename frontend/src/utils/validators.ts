import * as yup from 'yup';

export const registerSchema = yup.object({
  name: yup.string().required('Введите имя'),
  email: yup.string().email('Неверный email').required('Введите email'),
  password: yup.string().min(6, 'Не менее 6 символов').required('Введите пароль'),
  dateOfBirth: yup.string().nullable()
});
