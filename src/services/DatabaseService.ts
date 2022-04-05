<<<<<<< HEAD
import { inject, injectable } from "inversify";
import { Connection, EntityTarget, Repository, SelectQueryBuilder } from "typeorm";
import { User } from "../db/entity/User";

export interface IFooService {
  getRepository: <T>(t: EntityTarget<T>) => Promise<Repository<T>>;
  getQueryBuilder:<T> () => Promise<SelectQueryBuilder<T>>
=======
import { inject, injectable } from 'inversify'
import { Connection, EntityTarget, Repository } from 'typeorm'

export interface IFooService {
  getRepository: <T>(t: EntityTarget<T>) => Promise<Repository<T>>
>>>>>>> 10d47a89ebf1908823bc2c7e880f6733eb7527b1
}

@injectable()
export class DatabaseService implements IFooService {
  /**
   *
   */
  constructor(@inject(Connection) private connection: Connection) {}

  async getRepository<T>(t: EntityTarget<T>): Promise<Repository<T>> {
    return this.connection.getRepository(t)
  }

  async getQueryBuilder<T>() {
    return this.connection.createQueryBuilder()
  }

  async getQueryBuilder<T>() {
    return this.connection.createQueryBuilder()
  }
}
