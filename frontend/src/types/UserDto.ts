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
  email?: string;
  password?: string;
  confirmPassword?: string;
  dateOfBirth?: string;
  AvatarLink?: string; // optional if you want to pass from frontend (note capital A matches backend DTO field AvatarLink)
};
