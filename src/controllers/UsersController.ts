import * as express from 'express'
import { inject } from 'inversify'
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  request,
  response,
} from 'inversify-express-utils'
import { User } from '../database/entity/User'
import { AUTHORIZED_MIDDLEWARE } from '../middlewares'
import { DatabaseService } from '../services/DatabaseService'
import { ONLY_ADMINS, PUBLIC } from './permissions/Permissions'

@controller('/users')
export class UsersController implements interfaces.Controller {
  constructor(
    @inject(DatabaseService) private databaseService: DatabaseService
  ) {}

  @httpGet('/')
  private async index(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const userRepository = await this.databaseService.getRepository(User)
    const users: User[] = await userRepository.find()
    res.json(users)
  }

  @httpPost('/special', AUTHORIZED_MIDDLEWARE(ONLY_ADMINS))
  private async special(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    res.json('ok')
  }
}
