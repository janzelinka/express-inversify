import { inject } from 'inversify'
import { Controller, Get, Post } from '@inversifyjs/http-core'
import {
  OasDescription,
  OasRequestBody,
  OasTag,
} from '@inversifyjs/http-open-api'
import { UsersService } from '../repository/usersRepository'

@Controller('/users')
export class UsersController {
  constructor(@inject('UsersService') private usersService: UsersService) {}

  @OasTag('users')
  @OasDescription('Get all users')
  @Get('/')
  public async getAll() {
    return (await this.usersService.getAllUsers()).map((user) => user.toDto())
  }

  @OasTag('users')
  @OasDescription('Creates a user')
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
  @Post('/create')
  public async create(data) {}
}
