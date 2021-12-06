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

@controller("/users")
export class UsersController implements interfaces.Controller {
  constructor(
    @inject(DatabaseService) private databaseService: DatabaseService
  ) {}

  @httpPost("/", AUTHORIZED_MIDDLEWARE(() => true))
  private async index(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const userRepository = await this.databaseService.getRepository(User);
    const users: User[] = await userRepository.find();
    res.json(users);
  }
}
