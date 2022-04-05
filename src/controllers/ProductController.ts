import * as express from 'express'
import { inject } from 'inversify'
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  interfaces,
  request,
  response,
} from 'inversify-express-utils'
import { Product } from '../database/entity/Product'
import { AbstractRepository } from '../repository/Repository'
import { DatabaseService } from '../services/DatabaseService'

@controller('/products')
export class ProductsController
  extends AbstractRepository<Product>
  implements interfaces.Controller
{
  constructor(
    @inject(DatabaseService) private databaseService: DatabaseService
  ) {
    super(databaseService.getRepository(Product))
  }

  @httpGet('/')
  private async _get(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    // console.log('hit the get')
    return this.get()
  }

  @httpPost('/create')
  private async _create(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    // console.log('hit the create')
    // return this.create(req.body)
  }

  @httpPut('/update')
  private async _update(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    // console.log('hit the update', req.body)
    // return this.update(req.body.id, req.body)
  }

  @httpDelete('/delete')
  private async _delete(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    // console.log('hit the delete')
    // return this.delete(req.body.id)
  }
}
