import { inject } from 'inversify'
import { DataSource } from 'typeorm'
import { User } from '../database/entity/User'
import { Controller, Get, Post } from '@inversifyjs/http-core'

// interface IUserModel {
//   id: number
//   name: string
//   email: string
// }

@Controller('/users')
export class UsersController {
  constructor(@inject('DataSource') private dataSource: DataSource) {}

  @Get('/')
  public async getAll() {
    return this.dataSource.getRepository<User>('User').find()
  }

  @Post('/create')
  public async create(data) {
    this.dataSource.getRepository<User>('User').save(data)
  }
}
