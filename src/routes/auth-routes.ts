import express from 'express';
import { validate } from '../middlewares/validate-middleware';
import { useAuthController } from '../controllers/auth-controller';
import { authSchema } from '../data/schemas/auth';

const router = express.Router();
const controller = useAuthController();

router.post(
  '/',
  validate({
    schema: authSchema,
    path: 'body',
  }),
  controller.authenticate,
);

export const authRoutes = router;
