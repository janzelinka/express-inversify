import { inject } from 'inversify'
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
} from 'inversify-express-utils'

// interface IUserModel {

// }

@controller('/users')
export class UsersController implements interfaces.Controller {
  constructor(@inject('DataSource') private dataSource: any) {}

  @httpGet('/')
  public async getAll() {
    console.log(this.dataSource)
  }

  @httpPost('/create')
  public async create(data) {
    console.log(this.dataSource, data)
  }
}
