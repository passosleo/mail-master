import express from 'express';
import { useHealthController } from '../controller/health-controller';

const router = express.Router();
const controller = useHealthController();

router.get('/', controller.checkHealth);

export const healthRoutes = router;
