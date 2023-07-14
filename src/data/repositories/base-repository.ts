import {
  DeepPartial,
  EntityTarget,
  FindOptionsWhere,
  ObjectLiteral,
} from 'typeorm';
import { AppDataSource } from '../data-source';

export function useBaseRepository<T extends ObjectLiteral>({
  entity,
}: {
  entity: EntityTarget<T>;
}) {
  const dataSouce = AppDataSource;
  const repository = dataSouce.getRepository(entity);

  async function create(entity: DeepPartial<T>): Promise<T> {
    return repository.save(entity);
  }

  async function update(criteria: FindOptionsWhere<T>, entity: Partial<T>) {
    return repository.update(criteria, entity);
  }

  async function remove(criteria: FindOptionsWhere<T>) {
    return repository.delete(criteria);
  }

  async function findOneBy(criteria: FindOptionsWhere<T>) {
    return repository.findOne({ where: criteria });
  }

  async function findAllBy(criteria: FindOptionsWhere<T>) {
    return repository.find({ where: criteria });
  }

  async function findAll() {
    return repository.find();
  }

  return {
    dataSouce,
    repository,
    create,
    update,
    remove,
    findOneBy,
    findAllBy,
    findAll,
  };
}
