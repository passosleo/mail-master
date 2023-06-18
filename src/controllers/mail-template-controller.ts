import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { useMailTemplateService } from '../services/mail-template-service';

export function useMailTemplateController() {
  const service = useMailTemplateService();

  async function createMailTemplate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const file = req.file as Express.Multer.File;
    const name = req.params.name as string;
    const userId = req.user?.userId as string;
    try {
      const result = await service.createMailTemplate({
        file,
        name,
        userId,
      });

      if (!result.success)
        return res.status(StatusCodes.BAD_REQUEST).json(result);

      return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }

  return {
    createMailTemplate,
  };
}
