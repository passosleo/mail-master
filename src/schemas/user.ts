import Joi from 'joi';
import { User } from '../entities/user';

export const createUserSchema = Joi.object<User>({
  name: Joi.string().required().min(3).max(100),
  email: Joi.string().email().required().max(100),
  password: Joi.string().required(),
});

export const updateUserSchema = Joi.object<User>({
  name: Joi.string().optional().min(3).max(100),
  email: Joi.string().email().optional().max(100),
  password: Joi.string().optional(),
});

export const searchUserSchema = Joi.object<User>({
  userId: Joi.string().uuid().required(),
});

// export const updateUserSchema = Joi.object({
//   name: Joi.string().optional().max(100),
//   email: Joi.string().email().optional().max(100),
//   emailVerified: Joi.boolean(),
//   role: Joi.string().optional().max(100),
//   password: Joi.string().optional(),
// });
