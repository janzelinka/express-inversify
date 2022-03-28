import { inject, injectable } from "inversify";
import { Connection, EntityTarget, Repository, SelectQueryBuilder } from "typeorm";
import { User } from "../db/entity/User";

export interface IFooService {
  getRepository: <T>(t: EntityTarget<T>) => Promise<Repository<T>>;
  getQueryBuilder:<T> () => Promise<SelectQueryBuilder<T>>
}

@injectable()
export class DatabaseService implements IFooService {
  /**
   *
   */
  constructor(@inject(Connection) private connection: Connection) {}

  async getRepository<T>(t: EntityTarget<T>): Promise<Repository<T>> {
    return this.connection.getRepository(t);
  }

  async getQueryBuilder<T>() {
    return this.connection.createQueryBuilder()
  }
}
