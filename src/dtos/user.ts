export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserDTO = {
  userId: string;
  name?: string;
  email?: string;
  password?: string;
};

export type DeleteUserDTO = {
  userId: string;
};
