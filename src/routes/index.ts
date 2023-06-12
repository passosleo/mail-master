import { Express } from 'express';
import { userRoutes } from './user-routes';
import { authRoutes } from './auth-routes';
import { authenticate } from '../middlewares/auth-middleware';

export function configureRoutes(app: Express) {
  app.use('/api/v1/user', authenticate(), userRoutes);
  app.use('/api/v1/auth', authRoutes);
}
