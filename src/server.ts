import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';
import cors from 'cors';
import { configureRoutes } from './routes';
import { useLogger } from './plugins/logger-plugin';
import { errorMiddleware } from './middlewares/error-middleware';
import { initializeDataSource } from './data/data-source';

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

  function setup({
    enableCors = true,
    enableJson = true,
    enableUrlEncoded = true,
    enableMorgan = true,
    enableSwagger = true,
    enableStatic = true,
    enableRoutes = true,
    middlewares = [],
    extra = [() => null],
  }: {
    enableCors?: boolean;
    enableJson?: boolean;
    enableUrlEncoded?: boolean;
    enableMorgan?: boolean;
    enableSwagger?: boolean;
    enableStatic?: boolean;
    enableRoutes?: boolean;
    middlewares?: any[];
    extra?: [() => void];
  }) {
    if (enableCors) app.use(cors());

    if (enableJson) app.use(express.json());

    if (enableUrlEncoded) app.use(express.urlencoded({ extended: false }));

    if (enableMorgan) app.use(morgan('dev'));

    if (enableSwagger)
      app.use(
        '/api/v1/docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDoc, {
          swaggerOptions: {
            url: '/swagger.json',
          },
        }),
      );

    if (enableStatic) app.use(express.static('public'));

    if (enableRoutes) configureRoutes(app);

    middlewares.forEach((middleware) => app.use(middleware));

    extra.forEach((extra) => extra());
  }

  function start({ autoSetup = true }: StartOptions = {}) {
    if (autoSetup) {
      setup({
        middlewares: [errorMiddleware],
        extra: [() => initializeDataSource()],
      });
    }

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
