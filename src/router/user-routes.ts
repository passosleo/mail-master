import express from 'express';
import { useUserController } from '../controllers/user-controller';
import { validate } from '../middlewares/validate-middleware';
import { createUserSchema } from '../schema/user';

const router = express.Router();
const controller = useUserController();

router.post(
  '/',
  validate([{ schema: createUserSchema, path: 'body' }]),
  controller.createUser,
);

export const userRoutes = router;
