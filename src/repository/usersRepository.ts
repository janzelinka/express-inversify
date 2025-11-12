import { inject, injectable } from 'inversify'
import { User } from '../database/entity/User'
import { Repository } from 'typeorm'

@injectable()
export class UsersService {
  constructor(
    @inject('Repository<User>')
    private readonly repository: Repository<User>
  ) {}

  public getAllUsers = async (): Promise<User[]> => {
    return this.repository.find()
  }
}
