import { inject, injectable } from 'inversify'
import { User } from '../database/entity/User'
import { ERoles } from '../enums/Roles'
import { UserNotCreated } from '../errors/UserNotCreated'
import { generateAccessToken } from '../jwt'
import { AbstractRepository } from '../repository/Repository'
import { DatabaseService } from './DatabaseService'
import { HashService } from './HashService'

interface ILogin {
  userName: string
  password: string
}

export interface IAuthService {
  login: ({ userName, password }: ILogin) => Promise<string>
  register: (user: User) => Promise<User>
}

@injectable()
export class AuthService
  extends AbstractRepository<User>
  implements IAuthService
{
  constructor(
    @inject(DatabaseService) databaseService: DatabaseService,
    @inject(HashService) private readonly hashService: HashService
  ) {
    super(databaseService.getRepository(User))
    console.log('running constructor')
  }

  login = async ({
    userName,
    password,
  }: {
    userName: string
    password: string
  }): Promise<string | null> => {
    const [user] = await this.get({
      where: { userName },
      relations: ['role'],
    })

    console.log(user)

    if (user) {
      const hash = this.hashService.createHash(password, user.salt)

      if (hash === user.password) {
        return generateAccessToken(user)
      }
    }
    return null
  }

  register = async (user: User): Promise<User> => {
    const { hash, salt } = this.hashService.generateHashAndSaltFromPassword(
      user.password
    )

    let userCreated
    try {
      userCreated = await this.create({
        ...user,
        role: { id: ERoles.USER },
        password: hash,
        salt,
      })
    } catch (error) {
      throw new UserNotCreated(error.message)
    }

    return userCreated
  }
}
