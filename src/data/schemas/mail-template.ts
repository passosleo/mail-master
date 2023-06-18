import Joi from 'joi';
import { MailTemplate } from '../entities/mail-template';

export const createMailTemplateSchema = Joi.object<MailTemplate>({
  name: Joi.string().required().min(3).max(100),
});
