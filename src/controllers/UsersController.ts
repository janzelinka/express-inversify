import * as express from "express";
import {
  interfaces,
  controller,
  httpPost,
  request,
  response,
  httpGet,
  httpPut,
  httpDelete,
} from "inversify-express-utils";
import { inject } from "inversify";
import { DatabaseService } from "../services/DatabaseService";
import { User } from "../db/entity/User";
import { AUTHORIZED_MIDDLEWARE } from "../middlewares";
import { PUBLIC, ONLY_ADMINS } from "./permissions/Permissions";
import { AuthService } from "../services/AuthService";
import { AbstractRepository } from "./base/AbstractRepository";

@controller("/users")
export class UsersController extends AbstractRepository<User> implements interfaces.Controller {

  constructor(
    @inject(DatabaseService) protected readonly databaseService: DatabaseService,
    @inject(AuthService) protected readonly authService: AuthService
  ) {
    super(databaseService, User)
  }

  @httpPost("/", AUTHORIZED_MIDDLEWARE(PUBLIC))
  private async index(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const userRepository = await this.databaseService.getRepository(User);
    const users: User[] = await userRepository.find();
    res.json(users);
  }


  @httpPost("/create")
  private async _create(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const result = await this.authService.register(req.body)
    console.log(result)
  }


  @httpPost("/special", AUTHORIZED_MIDDLEWARE(ONLY_ADMINS))
  private async special(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    res.json("ok");
  }

  @httpGet("/list")
  private async _get(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const users = await this.get()
    console.log(users)
    return users
  }

  @httpPut("/update")
  private async _update(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    console.log(`params`, req.body, req.body.id)
    const users = await this.get({ where: { id: req.body.id } })
    const updatedUser: User = {
      ...users[0],
      age: req.body.age,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName
    }

    const result = await this.update(updatedUser)

    if (result) {
      res.json(updatedUser)
    } else {
      res.statusCode = 501
      res.statusMessage = 'Something bad happened during update'
    }
  }

  @httpDelete("/delete")
  private async _delete(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const result = await this.delete({ id: req.body.id })
    if (result.affected == 1) {
      res.statusCode = 200
      res.statusMessage = "Succesfully deleted"
    } else {
      res.statusCode = 501
      res.statusMessage = 'Something bad happened during delete operation'
    }
  }

}
