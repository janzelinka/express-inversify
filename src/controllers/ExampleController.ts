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

@controller("/foo")
export class FooController implements interfaces.Controller {
  constructor(
    @inject(DatabaseService) private databaseService: DatabaseService
  ) {}

  @httpGet("/")
  private index(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): any {
    // this.databaseService.getProducts();
  }

  @httpGet("/")
  private list(
    @queryParam("start") start: number,
    @queryParam("count") count: number
  ): any {}

  @httpPost("/")
  private async create(
    @request() req: express.Request,
    @response() res: express.Response
  ) {}

  @httpDelete("/:id")
  private delete(
    @requestParam("id") id: string,
    @response() res: express.Response
  ) {}
}
