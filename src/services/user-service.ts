import { ServiceResult } from '../@types/generic';
import { CreateUserDTO, SearchUserDTO, UpdateUserDTO } from '../dtos/user';
import { useHelpers } from '../helpers/helpers';
import { useUserRepository } from '../repositories/user-repository';
import _ from 'lodash';

export function useUserService() {
  const userRepository = useUserRepository();
  const helpers = useHelpers();

  async function isEmailInUse(email: string): Promise<false | string> {
    const user = await userRepository.findOneBy({ email });

    return user ? user.userId : false;
  }

  async function getUsers(): Promise<ServiceResult> {
    const users = await userRepository.findAll();

    return {
      success: true,
      data: users,
      // data: users.map((user) => _.omit(user, ['password'])),
    };
  }

  async function getUserById({
    userId,
  }: SearchUserDTO): Promise<ServiceResult> {
    const user = await userRepository.findOneBy({ userId });

    return user
      ? { success: true, data: _.omit(user, ['password']) }
      : { success: false, error: 'User not found' };
  }

  async function createUser(userData: CreateUserDTO): Promise<ServiceResult> {
    if (await isEmailInUse(userData.email)) {
      return {
        success: false,
        error: 'User already exists with same email',
      };
    }

    const hashedPassword = await helpers.password.hashPassword(
      userData.password,
    );

    const user = await userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return {
      success: true,
      data: _.omit(user, ['password']),
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
