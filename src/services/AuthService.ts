import { inject, injectable } from "inversify";
import { User } from "../db/entity/User";
import { generateAccessToken, JWTUserInfo } from "../jwt";
import { DatabaseService } from "./DatabaseService";

export interface IAuthService {
  login: ({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) => Promise<string>;
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
  }): Promise<string> => {
    const user = await (
      await this.databaseService.getRepository(User)
    ).findOne({
      where: { userName, password },
    });
    if (user) {
      const jwtUserInfo: JWTUserInfo = {
        ...user,
      };
      delete jwtUserInfo["password"];
      const token = generateAccessToken(jwtUserInfo);
      return token;
    }
    return "";
  };

  register = async (user: User): Promise<User> => {
    const userRepository = await this.databaseService.getRepository(User);
    return userRepository.save(userRepository.create(user));
  };
}
