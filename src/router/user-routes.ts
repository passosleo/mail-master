import express from 'express';
import { useUserController } from '../controllers/user-controller';
import { validate } from '../middlewares/validate-middleware';
import {
  createUserSchema,
  deleteUserSchema,
  updateUserSchema,
} from '../schema/user';

const router = express.Router();
const controller = useUserController();

router.post(
  '/',
  validate({ schema: createUserSchema, path: 'body' }),
  controller.createUser,
);

router.put(
  '/',
  validate({ schema: updateUserSchema, path: 'body' }),
  controller.updateUser,
);

router.delete(
  '/:userId',
  validate({ schema: deleteUserSchema, path: 'params' }),
  controller.deleteUser,
);

export const userRoutes = router;
