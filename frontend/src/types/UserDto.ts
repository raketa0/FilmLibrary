export type UserDto = {
  id: string;
  name: string;
  email: string;
  linkToAvatar?: string | null;
  dateOfBirth?: string | null;
};

export type RegisterDto = {
  name: string;
  email: string;
  password: string;
  dateOfBirth?: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type UpdateProfileDto = {
  name?: string;
  linkToAvatar?: string;
};
