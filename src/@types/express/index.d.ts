import { UserDTO } from '../../data/dtos/user';

declare global {
  namespace Express {
    interface Request {
      user?: UserDTO;
    }
  }
}
