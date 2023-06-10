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

  async function createUser({
    email,
    name,
    password,
  }: CreateUserDTO): Promise<ServiceResult> {
    if (await isEmailInUse(email)) {
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

  async function updateUser(
    userId: string,
    { name, email, password }: UpdateUserDTO,
  ): Promise<ServiceResult> {
    const foundUserId = email ? await isEmailInUse(email) : false;

    if (foundUserId && foundUserId !== userId) {
      return {
        success: false,
        error: 'User already exists with same email',
      };
    }

    const { affected } = await userRepository.update(
      { userId },
      { name, email, password },
    );

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
