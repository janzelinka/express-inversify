import { inject } from 'inversify'
import { Controller, Get, Post } from '@inversifyjs/http-core'
import { OasDescription } from '@inversifyjs/http-open-api'
import { UsersService } from '../repository/usersRepository'

@Controller('/users')
export class UsersController {
  constructor(@inject('UsersService') private usersService: UsersService) {}

  @OasDescription('Get all users')
  @Get('/')
  public async getAll() {
    return (await this.usersService.getAllUsers()).map((user) => user.toDto())
  }

  @OasDescription('Creates a user')
  @Post('/create')
  public async create(data) {}
}
