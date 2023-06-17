import { Express } from 'express';
import { authRoutes } from './auth-routes';
import { userRoutes } from './user-routes';
import { authenticate } from '../middlewares/auth-middleware';

export function configureRoutes(app: Express) {
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/user', authenticate({ roles: ['admin'] }), userRoutes);
}
