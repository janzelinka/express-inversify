import { inject } from 'inversify'
import { controller, httpGet, interfaces } from 'inversify-express-utils'

@controller('/')
export class UsersController implements interfaces.Controller {
  constructor(@inject('DataSource') private dataSource: any) {}

  @httpGet('/home')
  public async getUsers() {
    console.log(this.dataSource)
  }
}
