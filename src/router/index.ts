import { Express } from 'express';
import { userRoutes } from './user-routes';

export function configureRoutes(app: Express) {
  app.use('/user', userRoutes);
}
