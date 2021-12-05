import { inject, injectable } from "inversify";
import { User } from "../db/entity/User";
import { generateAccessToken, JWTUserInfo } from "../jwt";
import { DatabaseService } from "./DatabaseService";
import crypto from "crypto";
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
    @inject(DatabaseService) private readonly databaseService: DatabaseService
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
    });

    const hash = crypto
      .pbkdf2Sync(password, user.salt, 1000, 64, `sha512`)
      .toString(`hex`);

    console.log(user, hash);

    if (user && hash === user.password) {
      console.log("logged in");
      return generateAccessToken(user);
    }
    return null;
  };

  register = async (user: User): Promise<User> => {
    const userRepository = await this.databaseService.getRepository(User);
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(user.password, salt, 1000, 64, `sha512`)
      .toString(`hex`);

    console.log(`salt and hash`, salt, hash);
    return userRepository.save(
      userRepository.create({ ...user, password: hash, salt })
    );
  };
}
