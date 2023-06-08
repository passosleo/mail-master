import { Express } from 'express';
import { healthRoutes } from './health-routes';

export function configureRoutes(app: Express) {
  app.use('/health', healthRoutes);
}
