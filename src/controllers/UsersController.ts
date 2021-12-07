import * as express from "express";
import {
  interfaces,
  controller,
  httpPost,
  request,
  response,
} from "inversify-express-utils";
import { inject } from "inversify";
import { DatabaseService } from "../services/DatabaseService";
import { User } from "../db/entity/User";
import { AUTHORIZED_MIDDLEWARE } from "../middlewares";
import { PUBLIC, ONLY_ADMINS } from "./permissions/Permissions";

@controller("/users")
export class UsersController implements interfaces.Controller {
  constructor(
    @inject(DatabaseService) private databaseService: DatabaseService
  ) {}

  @httpPost("/", AUTHORIZED_MIDDLEWARE(PUBLIC))
  private async index(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const userRepository = await this.databaseService.getRepository(User);
    const users: User[] = await userRepository.find();
    res.json(users);
  }

  @httpPost("/special", AUTHORIZED_MIDDLEWARE(ONLY_ADMINS))
  private async special(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    res.json("ok");
  }
}
