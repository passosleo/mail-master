import { StatusCodes } from 'http-status-codes';
import { CreateUserDTO, DeleteUserDTO, UpdateUserDTO } from '../dtos/user';
import { useUserService } from '../services/user-service';
import { Request, Response, NextFunction } from 'express';

export function useUserController() {
  const service = useUserService();

  async function createUser(req: Request, res: Response, next: NextFunction) {
    const user: CreateUserDTO = req.body;
    try {
      const result = await service.createUser(user);

      if (!result.success) return res.status(StatusCodes.CONFLICT).json(result);

      return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }

  async function updateUser(req: Request, res: Response, next: NextFunction) {
    const user: UpdateUserDTO = req.body;
    try {
      const result = await service.updateUser(user);

      if (!result.success)
        return res.status(StatusCodes.BAD_REQUEST).json(result);

      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async function deleteUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params as DeleteUserDTO;
    try {
      const result = await service.deleteUser({ userId });

      if (!result.success)
        return res.status(StatusCodes.BAD_REQUEST).json(result);

      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  return {
    createUser,
    updateUser,
    deleteUser,
  };
}
