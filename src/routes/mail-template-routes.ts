import express from 'express';
import { validate } from '../middlewares/validate-middleware';
import { useMailTemplateController } from '../controllers/mail-template-controller';
import { upload } from '../middlewares/upload-middleware';
import {
  createMailTemplateSchema,
  searchMailTemplateSchema,
  updateMailTemplateSchema,
} from '../data/schemas/mail-template';

const router = express.Router();
const controller = useMailTemplateController();

router.get(
  '/',
  controller.getMailTemplates,
);

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

router.put(
  '/:templateId/:name',
  validate({
    path: 'params',
    schema: updateMailTemplateSchema,
  }),
  upload({
    mimeType: 'text/html',
    dest: 'uploads/templates',
    fieldName: 'template',
  }),
  controller.updateMailTemplate,
);

router.delete(
  '/:templateId',
  validate({
    path: 'params',
    schema: searchMailTemplateSchema,
  }),
  controller.deleteMailTemplate,
);

export const mailTemplateRoutes = router;
