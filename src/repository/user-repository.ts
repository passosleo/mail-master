import { User } from '../entities/user';
import { useBaseRepository } from './base-repository';

export function useUserRepository() {
  const baseRepository = useBaseRepository<User>({ entity: User });

  async function findByEmail(email: string): Promise<User | null> {
    return baseRepository.findOneBy({ email });
  }

  return {
    ...baseRepository,
    findByEmail,
  };
}
