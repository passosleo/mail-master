import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';
import cors from 'cors';
import { configureRoutes } from './routes';
import { useLogger } from './plugins/logger-plugin';
import { errorMiddleware } from './middlewares/error-middleware';
import { initializeDataSource } from './repositories/data-source';

type ServerProps = {
  port?: number;
  name?: string;
};

type StartOptions = {
  autoSetup?: boolean;
};

export function useServer({ port, name }: ServerProps) {
  const app = express();
  const logger = useLogger({ context: 'server' });

  function setup() {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan('dev'));
    app.use(
      '/api/v1/docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDoc, {
        swaggerOptions: {
          url: '/swagger.json',
        },
      }),
    );
    app.use(express.static('public'));
    configureRoutes(app);
    app.use(errorMiddleware);
    initializeDataSource();
  }

  function start({ autoSetup = true }: StartOptions = {}) {
    if (autoSetup) setup();
    app.listen(port ?? process.env.PORT ?? 3000, () => {
      logger.info(`Server ${name ?? ''} is running on port ${port}`);
      if (autoSetup)
        logger.info(
          `Swagger available at http://127.0.0.1:${port}/api/v1/docs`,
        );
    });
  }

  return {
    app,
    setup,
    start,
  };
}
