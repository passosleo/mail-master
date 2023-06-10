import { ServiceResult } from '../@types/generic';
import { CreateUserDTO, DeleteUserDTO, UpdateUserDTO } from '../dtos/user';
import { useUserRepository } from '../repository/user-repository';

export function useUserService() {
  const userRepository = useUserRepository();

  async function isEmailInUse(email: string): Promise<false | string> {
    const user = await userRepository.findOneBy({ email });

    return user ? user.userId : false;
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

  async function updateUser({
    userId,
    name,
    email,
    password,
  }: UpdateUserDTO): Promise<ServiceResult> {
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

  async function deleteUser({ userId }: DeleteUserDTO): Promise<ServiceResult> {
    const { affected } = await userRepository.remove({ userId });

    const isDeleted = !!affected;

    return isDeleted
      ? { success: true }
      : { success: false, error: 'User not found' };
  }

  return {
    createUser,
    updateUser,
    deleteUser,
  };
}
