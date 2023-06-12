export type UserDTO = {
  userId: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: UserRolesDTO;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  emailVerified?: boolean;
  role?: UserRolesDTO;
  isEnabled?: boolean;
};

export type UpdateUserDTO = {
  userId: string;
  name?: string;
  email?: string;
  password?: string;
  emailVerified?: boolean;
  role?: UserRolesDTO;
  isEnabled?: boolean;
};

export type SearchUserDTO = {
  userId: string;
};

export type UserRolesDTO = 'admin' | 'user';
