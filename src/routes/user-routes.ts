import express from 'express';
import { useUserController } from '../controllers/user-controller';
import { validate } from '../middlewares/validate-middleware';
import {
  createUserSchema,
  searchUserSchema,
  updateUserSchema,
} from '../data/schemas/user';

const router = express.Router();
const controller = useUserController();

router.get('/', controller.getUsers);

router.get(
  '/:userId',
  validate({ schema: searchUserSchema, path: 'params' }),
  controller.getUserById,
);

router.post(
  '/',
  validate({ schema: createUserSchema, path: 'body' }),
  controller.createUser,
);

router.put(
  '/:userId',
  validate([
    { schema: searchUserSchema, path: 'params' },
    { schema: updateUserSchema, path: 'body' },
  ]),
  controller.updateUser,
);

router.delete(
  '/:userId',
  validate({ schema: searchUserSchema, path: 'params' }),
  controller.deleteUser,
);

export const userRoutes = router;
