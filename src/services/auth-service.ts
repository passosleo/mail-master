import { ServiceResult } from '../@types/generic';
import { AuthDTO } from '../dtos/auth';
import { useHelpers } from '../helpers/helpers';
import { useUserRepository } from '../repositories/user-repository';

export function useAuthService() {
  const userRepository = useUserRepository();
  const helpers = useHelpers();

  async function authenticate({
    email,
    password,
  }: AuthDTO): Promise<ServiceResult> {
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    const { password: userHashedPassword } = user;

    if (!userHashedPassword) {
      return {
        success: false,
        error: 'User has no password',
      };
    }

    const isPasswordValid = await helpers.password.validateHashedPassword(
      password,
      userHashedPassword,
    );

    if (!isPasswordValid) {
      return {
        success: false,
        error: 'Invalid password',
      };
    }

    return {
      success: true,
    };
  }

  return {
    authenticate,
  };
}
