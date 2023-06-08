import { StatusCodes } from 'http-status-codes';

export type DefaultResponse = {
  status: StatusCodes;
  message: string;
  data?: any;
};
