import * as log4js from 'log4js';

log4js.configure({
  appenders: {
    console: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '[%d{dd-MM-yyyy - hh:mm:ss.SSS}] [%p] %c - %m',
      },
    },
    file: {
      type: 'file',
      filename: './logs/app.log',
      layout: {
        type: 'pattern',
        pattern: '[%d{dd-MM-yyyy - hh:mm:ss.SSS}] [%p] %c - %m',
      },
    },
  },
  categories: {
    default: { appenders: ['console', 'file'], level: 'debug' },
  },
});

type LoggerProps = {
  level?: string;
  context?: string;
};

export function useLogger({ level = 'debug', context = 'default' }: LoggerProps = {}) {
  const logger = log4js.getLogger(context);
  logger.level = level;
  return {
    logger,
  };
}
