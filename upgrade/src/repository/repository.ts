import { injectable } from 'inversify'
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  Repository,
  UpdateResult,
  FindOptionsWhere,
  ObjectId,
} from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

type TFindConditions<T> =
  | string
  | string[]
  | number
  | number[]
  | Date
  | Date[]
  | ObjectId
  | ObjectId[]
  | FindOptionsWhere<T>
  | FindOptionsWhere<T>[]

///maybe not beneficial, else will be removed later
@injectable()
export abstract class AbstractRepository<T> {
  constructor(private readonly repository: Promise<Repository<T>>) {}

  protected get = async (options?: FindManyOptions<T>): Promise<T[]> => {
    return (await this.repository).find(options)
  }

  protected create = async (data: DeepPartial<T>) => {
    const repo = await this.repository
    return repo.save(data)
  }

  protected update = async (
    conditions: TFindConditions<T>,
    data: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult> => {
    return (await this.repository).update(conditions, data)
  }

  protected delete = async (
    conditions: TFindConditions<T>
  ): Promise<DeleteResult> => {
    return (await this.repository).delete(conditions)
  }
}
