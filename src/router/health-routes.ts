import express from 'express';
import { useHealthController } from '../controller/health-controller';
import { validate } from '../middleware/validate-middleware';
import { createUserSchema } from '../schema/user';

const router = express.Router();
const controller = useHealthController();

router.get(
  '/',
  validate({ schema: createUserSchema, path: 'query' }),
  controller.checkHealth,
);

export const healthRoutes = router;
