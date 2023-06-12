import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { useAuthService } from '../services/auth-service';
import { AuthDTO } from '../dtos/auth';

export function useAuthController() {
  const service = useAuthService();

  async function authenticate(req: Request, res: Response, next: NextFunction) {
    const { email, password }: AuthDTO = req.body;
    try {
      const result = await service.authenticate({ email, password });

      if (!result.success) {
        return res.status(StatusCodes.BAD_REQUEST).json(result);
      }

      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  return {
    authenticate,
  };
}
