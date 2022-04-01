import { injectable } from 'inversify'
import {
  Connection,
  DeleteResult,
  FindConditions,
  FindManyOptions,
  Repository,
  UpdateResult,
} from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

@injectable()
export abstract class AbstractRepository<T> {
  constructor(private readonly repository: Promise<Repository<T>>) {}

  protected get = async (
    options?: FindManyOptions<T> | FindConditions<T>
  ): Promise<T[]> => {
    return (await this.repository).find(options)
  }

  protected create = async (data: T): Promise<T> => {
    console.log(this.repository)
    return (await this.repository).save((await this.repository).create(data))
  }

  protected update = async (
    conditions: FindConditions<T>,
    data: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult> => {
    return (await this.repository).update(conditions, data)
  }

  protected delete = async (
    conditions: FindConditions<T>
  ): Promise<DeleteResult> => {
    return (await this.repository).delete(conditions)
  }
}
