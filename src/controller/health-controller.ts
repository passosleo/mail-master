import { useHealthService } from '../service/health-service';
import { Request, Response, NextFunction } from 'express';

export function useHealthController() {
  const service = useHealthService();

  async function checkHealth(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.checkHealth();
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  return {
    checkHealth,
  };
}
