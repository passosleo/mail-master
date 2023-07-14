import Joi from 'joi';
import { MailTemplate } from '../entities/mail-template';

export const createMailTemplateSchema = Joi.object<MailTemplate>({
  name: Joi.string().required().min(3).max(100).lowercase(),
});

export const updateMailTemplateSchema = Joi.object<MailTemplate>({
  templateId: Joi.string().uuid().required(),
  name: Joi.string().required().min(3).max(100).lowercase(),
});

export const searchMailTemplateSchema = Joi.object<MailTemplate>({
  templateId: Joi.string().uuid().required(),
});
