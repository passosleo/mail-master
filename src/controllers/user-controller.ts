import { StatusCodes } from 'http-status-codes';
import { CreateUserDTO, UpdateUserDTO } from '../data/dtos/user';
import { useUserService } from '../services/user-service';
import { Request, Response, NextFunction } from 'express';

export function useUserController() {
  const service = useUserService();

  async function getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.getUsers();

      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async function getUserById(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    try {
      const result = await service.getUserById(userId);

      if (!result.success)
        return res.status(StatusCodes.BAD_REQUEST).json(result);

      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async function createUser(req: Request, res: Response, next: NextFunction) {
    const user: CreateUserDTO = req.body;
    try {
      const result = await service.createUser(user);

      if (!result.success)
        return res.status(StatusCodes.BAD_REQUEST).json(result);

      return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }

  async function updateUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const user: UpdateUserDTO = req.body;
    try {
      const result = await service.updateUser(userId, user);

      if (!result.success)
        return res.status(StatusCodes.BAD_REQUEST).json(result);

      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async function deleteUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    try {
      const result = await service.deleteUser(userId);

      if (!result.success)
        return res.status(StatusCodes.BAD_REQUEST).json(result);

      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  return {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };
}
