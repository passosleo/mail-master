import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { useAuth } from '../plugins/auth-plugin';
import { UserDTO } from '../data/dtos/user';

export function authenticate() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    const auth = useAuth();
    const token = authorization.split(' ')[1];

    try {
      const user = await auth.verifyToken<UserDTO>(token);

      req.user = user;

      next();
    } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        error: 'Unauthorized',
      });
    }
  };
}
