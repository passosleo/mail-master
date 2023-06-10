import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required().max(100),
  email: Joi.string().email().required().max(100),
  password: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().optional().max(100),
  email: Joi.string().email().optional().max(100),
  emailVerified: Joi.boolean(),
  role: Joi.string().optional().max(100),
  password: Joi.string().optional(),
});
