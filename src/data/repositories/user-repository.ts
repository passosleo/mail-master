import { User } from '../entities/user';
import { useBaseRepository } from './base-repository';

export function useUserRepository() {
  const baseRepository = useBaseRepository<User>({ entity: User });

  return {
    ...baseRepository,
  };
}
