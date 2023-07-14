import { Request, Response, NextFunction } from 'express';
import { useLogger } from '../plugins/logger-plugin';
import { StatusCodes } from 'http-status-codes';

export async function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const logger = useLogger({ context: 'error-handler' });

  logger.error({
    method: req.method,
    path: req.path,
    params: req.params,
    query: req.query,
    body: req.body,
    error: error,
  });

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: 'Internal server error',
  });
}
