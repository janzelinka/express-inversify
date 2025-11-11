import { inject } from 'inversify'
import { controller, httpGet, interfaces } from 'inversify-express-utils'

@controller('/')
export class HomeController implements interfaces.Controller {
  constructor(@inject('DataSource') private dataSource: any) {}

  @httpGet('/home')
  public async home() {
    console.log(this.dataSource)
  }
}
