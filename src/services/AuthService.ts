<<<<<<< HEAD
import { inject, injectable } from "inversify";
import { User } from "../db/entity/User";
import { DatabaseService } from "./DatabaseService";

import { UserNotCreated } from "../errors/UserNotCreated";
import { UserNotSaved } from "../errors/UserNotSaved";
import { HashService } from "./HashService";
import { ERoles } from "../enums/Roles";
import { AbstractRepository } from "typeorm/repository/AbstractRepository";
import { JWTService } from "./JWTService";
=======
import { inject, injectable } from 'inversify'
import { User } from '../database/entity/User'
import { ERoles } from '../enums/Roles'
import { UserNotCreated } from '../errors/UserNotCreated'
import { generateAccessToken } from '../jwt'
import { AbstractRepository } from '../repository/Repository'
import { DatabaseService } from './DatabaseService'
import { HashService } from './HashService'

>>>>>>> 10d47a89ebf1908823bc2c7e880f6733eb7527b1
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
<<<<<<< HEAD
    @inject(DatabaseService) private readonly databaseService: DatabaseService,
    @inject(HashService) private readonly hashService: HashService,
    @inject(JWTService) private readonly jwtService: JWTService
  ) { }
=======
    @inject(DatabaseService) databaseService: DatabaseService,
    @inject(HashService) private readonly hashService: HashService
  ) {
    super(databaseService.getRepository(User))
    console.log('running constructor')
  }
>>>>>>> 10d47a89ebf1908823bc2c7e880f6733eb7527b1

  login = async ({
    userName,
    password,
  }: {
    userName: string
    password: string
  }): Promise<string | null> => {
<<<<<<< HEAD

    const userRepository = await this.databaseService.getRepository<User>(User);
    const user = await userRepository.findOne({
=======
    const [user] = await this.get({
>>>>>>> 10d47a89ebf1908823bc2c7e880f6733eb7527b1
      where: { userName },
      relations: ['role'],
    })

    console.log(user)

    if (user) {
      const hash = this.hashService.createHash(password, user.salt)

      if (hash === user.password) {
<<<<<<< HEAD
        return this.jwtService.generateAccessToken(user);
=======
        return generateAccessToken(user)
>>>>>>> 10d47a89ebf1908823bc2c7e880f6733eb7527b1
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
