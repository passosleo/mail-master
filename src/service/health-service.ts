import { useLogger } from '../plugin/logger-plugin';

export function useHealthService() {
  const { logger } = useLogger({ context: 'health-service' });

  async function checkHealth() {
    logger.info('Checking health...');

    throw new Error('Error checking health');
    // return {
    //   status: 'ok',
    // };
  }

  return {
    checkHealth,
  };
}
