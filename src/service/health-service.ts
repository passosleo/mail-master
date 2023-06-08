import { useLogger } from '../plugin/logger-plugin';
import { useUserRepository } from '../repository/user-repository';

export function useHealthService() {
  const logger = useLogger({ context: 'health-service' });
  const userRepository = useUserRepository();

  async function checkHealth() {
    const query = await userRepository.findAll();

    logger.info('Checking health...');

    return {
      status: 'ok',
      data: query,
    };
  }

  return {
    checkHealth,
  };
}
