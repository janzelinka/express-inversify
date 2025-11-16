import { inject } from 'inversify'
import { Controller, Post } from '@inversifyjs/http-core'
import {
  OasDescription,
  OasRequestBody,
  OasTag,
} from '@inversifyjs/http-open-api'
import { AuthService } from '../services/authService'
import { response } from 'express'

@Controller('/auth')
export class AuthController {
  constructor(@inject('AuthService') private authService: AuthService) {}

  @OasTag('register')
  @OasDescription('Creates a user')
  //todo update request body
  @OasRequestBody({
    content: {
      'application/json': {
        schema: {
          properties: {
            id: { type: 'string' },
            userName: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            password: { type: 'string' },
            age: { type: 'number' },
            customer: {
              type: 'object',
              properties: {
                id: { type: 'number' },
              },
            },
          },
          required: ['userName', 'firstName', 'lastName', 'age', 'password'],
          type: 'object',
        },
      },
    },
  })
  @Post('/register')
  public async register(data) {}

  @OasTag('login')
  @OasDescription('Creates a user')
  //todo update request body
  @OasRequestBody({
    content: {
      'application/json': {
        schema: {
          properties: {
            userName: { type: 'string' },
            password: { type: 'string' },
          },
          required: ['userName', 'password'],
          type: 'object',
        },
      },
    },
  })
  @Post('/login')
  public async login(data) {
    const token = await this.authService.login(data)
    if (!token) {
      return response.status(401).send({ message: 'Invalid credentials' })
    }
    return { accessToken: token }
  }
}
