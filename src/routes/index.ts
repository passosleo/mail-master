import { Express } from 'express';
import { userRoutes } from './user-routes';
import { authRoutes } from './auth-routes';

export function configureRoutes(app: Express) {
  app.use('/api/v1/user', userRoutes);
  app.use('/api/v1/auth', authRoutes);
}
