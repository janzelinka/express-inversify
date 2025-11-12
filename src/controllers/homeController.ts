import { inject } from 'inversify'
import { Controller, Get } from '@inversifyjs/http-core'

@Controller('/')
export class HomeController {
  constructor(@inject('DataSource') private dataSource: any) {}

  @Get('/home')
  public async home() {
    console.log(this.dataSource)
  }
}
