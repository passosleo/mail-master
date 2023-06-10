import { ServiceResult } from '../@types/generic';
import { CreateUserDTO } from '../dtos/user';
// import { useLogger } from '../plugin/logger-plugin';
import { useUserRepository } from '../repository/user-repository';

export function useUserService() {
  // const logger = useLogger({ context: 'health-service' });
  const userRepository = useUserRepository();

  async function createUser({
    email,
    name,
    password,
  }: CreateUserDTO): Promise<ServiceResult> {
    const isEmailInUse = await userRepository.findOneBy({ email });

    if (isEmailInUse) {
      return {
        success: false,
        error: 'User already exists with same email',
      };
    }

    const user = await userRepository.create({ email, name, password });

    return {
      success: true,
      data: user,
    };
  }

  return {
    createUser,
  };
}
