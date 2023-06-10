import { useUserService } from '../service/user-service';
import { Request, Response, NextFunction } from 'express';

export function useUserController() {
  const service = useUserService();

  async function createUser(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      const result = await service.createUser(body);

      if (!result.success) return res.status(409).json(result);

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  return {
    createUser,
  };
}
