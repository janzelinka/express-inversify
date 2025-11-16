import { inject, injectable } from 'inversify'
import { User } from '../database/entity/User'
import { Repository } from 'typeorm'

interface IWithUserRelation {
  withRole: boolean
}

@injectable()
export class UsersService {
  constructor(
    @inject('Repository<User>')
    private readonly repository: Repository<User>
  ) {}

  public getAllUsers = async (): Promise<User[]> => {
    return this.repository.find()
  }

  public getUserByUsername = async (
    userName: string,
    { withRole }: IWithUserRelation = { withRole: false }
  ): Promise<User[]> => {
    return this.repository.find({
      where: { userName },
      relations: [withRole ? 'role' : undefined].filter(Boolean) as string[],
    })
  }
}
