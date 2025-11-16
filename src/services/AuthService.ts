import { inject, injectable } from 'inversify'
import { User } from '../database/entity/User'
import { HashService } from './hashService'
import { DataSource } from 'typeorm'
import { JWTService } from './jwtService'
import { UsersService } from './usersService'

interface ILogin {
  userName: string
  password: string
}

export interface IAuthService {
  login: ({ userName, password }: ILogin) => Promise<string>
  register: (user: User) => Promise<User>
}

@injectable()
export class AuthService {
  constructor(
    @inject('DataSource') dataSource: DataSource,
    @inject('HashService') private readonly hashService: HashService,
    @inject('JWTService') private readonly jwtService: JWTService,
    @inject('UsersService') private readonly usersService: UsersService
  ) {}

  login = async ({
    userName,
    password,
  }: {
    userName: string
    password: string
  }): Promise<string | null> => {
    const [user] = await this.usersService.getUserByUsername(userName, {
      withRole: true,
    })

    if (user) {
      const hash = this.hashService.createHash(password, user.salt)

      if (hash === user.password) {
        return this.jwtService.generateAccessToken(user)
      }
    }
    return null
  }

  // register = async (user: User): Promise<User> => {
  //   const { hash, salt } = this.hashService.generateHashAndSaltFromPassword(
  //     user.password
  //   )

  //   let userCreated
  //   try {
  //     userCreated = await this.create({
  //       ...user,
  //       role: { id: ERoles.USER },
  //       password: hash,
  //       salt,
  //     })
  //   } catch (error) {
  //     throw new UserNotCreated(error.message)
  //   }

  //   return userCreated
  // }
}
