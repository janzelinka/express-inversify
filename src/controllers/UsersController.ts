import { inject } from 'inversify'
// import { DataSource } from 'typeorm'
// import { User } from '../database/entity/User'
import { Controller, Get, Post } from '@inversifyjs/http-core'
import { OasDescription } from '@inversifyjs/http-open-api'
import { UsersService } from '../repository/usersRepository'

// interface IUserModel {
//   id: number
//   name: string
//   email: string
// }

@Controller('/users')
export class UsersController {
  constructor(@inject('UsersService') private usersService: UsersService) {}

  @OasDescription('Get all users')
  @Get('/')
  public async getAll() {
    return this.usersService.getAllUsers()
  }

  @OasDescription('Creates a user')
  @Post('/create')
  public async create(data) {
    // this.dataSource.getRepository<User>('User').save(data)
  }
}
