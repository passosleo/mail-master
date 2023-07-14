import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { useAuth } from '../plugins/auth-plugin';
import { TokenDTO } from '../data/dtos/auth';
import { UserRoles } from '../data/dtos/user';

export function authenticate({ roles }: { roles: UserRoles[] }) {
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
      const { user } = await auth.verifyToken<TokenDTO>(token);

      if (!roles.includes(user.role) && user.role !== 'admin')
        throw new Error('Invalid role');

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
