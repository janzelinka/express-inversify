import { inject, injectable } from "inversify";
import { User } from "../db/entity/User";
import { generateAccessToken, JWTUserInfo } from "../jwt";
import { DatabaseService } from "./DatabaseService";

import { UserNotCreated } from "../errors/UserNotCreated";
import { UserNotSaved } from "../errors/UserNotSaved";
import { HashService } from "./HashService";
import { ERoles } from "../enums/Roles";
interface ILogin {
  userName: string;
  password: string;
}

export interface IAuthService {
  login: ({ userName, password }: ILogin) => Promise<string>;
  register: (user: User) => Promise<User>;
}

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(DatabaseService) private readonly databaseService: DatabaseService,
    @inject(HashService) private readonly hashService: HashService
  ) {}

  login = async ({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }): Promise<string | null> => {
    const userRepository = await this.databaseService.getRepository(User);
    const user = await userRepository.findOne({
      where: { userName },
      relations: ["role"],
    });

    if (user) {
      const hash = this.hashService.createHash(password, user.salt);

      if (hash === user.password) {
        return generateAccessToken(user);
      }
    }
    return null;
  };

  register = async (user: User): Promise<User> => {
    const userRepository = await this.databaseService.getRepository(User);
    const { hash, salt } = this.hashService.generateHashAndSaltFromPassword(
      user.password
    );

    let userCreated;
    try {
      userCreated = await userRepository.save(
        userRepository.create({
          ...user,
          role: { id: ERoles.USER },
          password: hash,
          salt,
        })
      );
    } catch (error) {
      console.log(error);
      throw new UserNotCreated(error.message);
    }

    return userCreated;
  };
}
