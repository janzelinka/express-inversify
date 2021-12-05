import { inject, injectable } from "inversify";
import { Connection, EntityTarget, Repository } from "typeorm";
import { User } from "../db/entity/User";

export interface IFooService {
  getRepository: <T>(t: EntityTarget<T>) => Promise<Repository<T>>;
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
}
