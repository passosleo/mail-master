import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/user';
import { useLogger } from '../plugins/logger-plugin';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});

export function initializeDataSource() {
  const logger = useLogger({ context: 'data-source' });
  try {
    AppDataSource.initialize();
    logger.info('Data source initialized');
  } catch (error) {
    logger.error(
      'Oops! Something went wrong while initializing data source',
      error,
    );
    process.exit(1);
  }
}
