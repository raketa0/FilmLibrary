export type UserDto = {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  registrationDate: string;
  avatarLink: string | null;
}

export type RegisterUserDto = {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
}

export type LoginDto = {
  email: string;
  password: string;
}

export type UpdateProfileDto = {
  name: string;
  avatarLink: string | null;
}