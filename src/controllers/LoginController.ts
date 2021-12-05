import * as express from "express";
import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  httpDelete,
  request,
  queryParam,
  response,
  requestParam,
  next,
} from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { DatabaseService } from "../services/DatabaseService";
import { User } from "../db/entity/User";
import { AuthService } from "../services/AuthService";

@controller("/login")
export class LoginController implements interfaces.Controller {
  constructor(@inject(AuthService) private authService: AuthService) {}

  @httpPost("/")
  private async index(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const token = await this.authService.login({
      userName: req.body.userName,
      password: req.body.password,
    });

    if (!token) {
      res.sendStatus(401);
      res.send("Unauthorized");
      res.end();
    }

    res.status(200).json({ token });
  }

  @httpPost("/register")
  private async create(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const user = await this.authService.register(req.body);
    res.sendStatus(200);
    res.send("hello");
  }
}
