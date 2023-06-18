import express from 'express';
import { validate } from '../middlewares/validate-middleware';
import { useMailTemplateController } from '../controllers/mail-template-controller';
import { upload } from '../middlewares/upload-middleware';
import { createMailTemplateSchema } from '../data/schemas/mail-template';

const router = express.Router();
const controller = useMailTemplateController();

router.post(
  '/:name',
  validate({
    path: 'params',
    schema: createMailTemplateSchema,
  }),
  upload({
    mimeType: 'text/html',
    dest: 'uploads/templates',
    fieldName: 'template',
  }),
  controller.createMailTemplate,
);

export const mailTemplateRoutes = router;
