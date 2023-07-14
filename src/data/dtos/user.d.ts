export type UserDTO = {
  userId: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: UserRoles;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  emailVerified?: boolean;
  role?: UserRoles;
  isEnabled?: boolean;
};

export type UpdateUserDTO = {
  userId: string;
  name?: string;
  email?: string;
  password?: string;
  emailVerified?: boolean;
  role?: UserRoles;
  isEnabled?: boolean;
};

export type UserRoles = 'admin' | 'user';
