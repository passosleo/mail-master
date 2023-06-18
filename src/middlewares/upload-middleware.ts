import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import multer from 'multer';
import mime from 'mime';
import { v4 as uuid } from 'uuid';

export type UploadOptions = {
  mimeType: string;
  dest: string;
  fieldName: string;
};

export function upload({ mimeType, dest, fieldName }: UploadOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const handleUpload = multer({
        storage: multer.diskStorage({
          destination: (req, file, cb) => {
            cb(null, dest);
          },
          filename: (req, file, cb) => {
            const fileId = uuid();
            const extension = mime.getExtension(file.mimetype);
            cb(null, `${fileId}.${extension}`);
          },
        }),
        fileFilter: (req, file, cb) => {
          const extension = mime.getExtension(mimeType);
          if (file.mimetype !== mimeType) {
            return res.status(StatusCodes.BAD_REQUEST).json({
              success: false,
              error: `Only ${extension} files are allowed`,
            });
          }
          cb(null, true);
        },
      }).single(fieldName);

      handleUpload(req, res, (error) => {
        if (error)
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, error: 'Internal Server Error' });

        next();
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: 'Internal Server Error',
      });
    }
  };
}
