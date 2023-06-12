import { ServiceResult } from '../@types/generic';
import { CreateUserDTO, SearchUserDTO, UpdateUserDTO } from '../dtos/user';
import { useUserRepository } from '../repositories/user-repository';

export function useUserService() {
  const userRepository = useUserRepository();

  async function isEmailInUse(email: string): Promise<false | string> {
    const user = await userRepository.findOneBy({ email });

    return user ? user.userId : false;
  }

  async function getUsers(): Promise<ServiceResult> {
    const users = await userRepository.findAll();

    return {
      success: true,
      data: users,
    };
  }

  async function getUserById({
    userId,
  }: SearchUserDTO): Promise<ServiceResult> {
    const user = await userRepository.findOneBy({ userId });

    return user
      ? { success: true, data: user }
      : { success: false, error: 'User not found' };
  }

  async function createUser(userData: CreateUserDTO): Promise<ServiceResult> {
    if (await isEmailInUse(userData.email)) {
      return {
        success: false,
        error: 'User already exists with same email',
      };
    }

    const user = await userRepository.create(userData);

    return {
      success: true,
      data: user,
    };
  }

  async function updateUser(
    userId: string,
    userData: UpdateUserDTO,
  ): Promise<ServiceResult> {
    const foundUserId = userData.email
      ? await isEmailInUse(userData.email)
      : false;

    if (foundUserId && foundUserId !== userId) {
      return {
        success: false,
        error: 'User already exists with same email',
      };
    }

    const { affected } = await userRepository.update({ userId }, userData);

    const isUpdated = !!affected;

    return isUpdated
      ? { success: true }
      : { success: false, error: 'User not found' };
  }

  async function deleteUser({ userId }: SearchUserDTO): Promise<ServiceResult> {
    const { affected } = await userRepository.remove({ userId });

    const isDeleted = !!affected;

    return isDeleted
      ? { success: true }
      : { success: false, error: 'User not found' };
  }

  return {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };
}
