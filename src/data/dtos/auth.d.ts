import { UserDTO } from './user';

export type AuthDTO = {
  email: string;
  password: string;
};

export type TokenDTO = {
  user: UserDTO;
  iat: number;
  exp: number;
};
