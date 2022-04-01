import * as express from 'express'
import { inject } from 'inversify'
import {
  controller,
  httpPost,
  interfaces,
  request,
  response,
} from 'inversify-express-utils'
import { AuthService } from '../services/AuthService'

@controller('/login')
export class LoginController implements interfaces.Controller {
  constructor(@inject(AuthService) private authService: AuthService) {}

  @httpPost('/')
  private async index(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const token = await this.authService.login({
      userName: req.body.userName,
      password: req.body.password,
    })

    console.log(token)

    if (!token) {
      res.sendStatus(401)
      res.end()
    }
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.cookie('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
    })
    res.send('')
  }

  @httpPost('/register')
  private async create(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      const user = await this.authService.register(req.body)
      res.json(user)
    } catch (error) {
      res.statusCode = 403
      res.send(error)
    }
  }
}
