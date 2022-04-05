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
import { Customer } from '../database/entity/Customer'
import { AUTHORIZED_MIDDLEWARE } from '../middlewares'
import { AbstractRepository } from '../repository/Repository'
import { DatabaseService } from '../services/DatabaseService'
import { ONLY_USERS } from './permissions/Permissions'

@controller('/customers')
export class CustomersController
    extends AbstractRepository<Customer>
    implements interfaces.Controller {
    constructor(
        @inject(DatabaseService) private databaseService: DatabaseService
    ) {
        super(databaseService.getRepository(Customer))
    }

    @httpGet('/', AUTHORIZED_MIDDLEWARE(ONLY_USERS))
    private async _get(
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        console.log('hit the get')
        return this.get()
    }

    @httpPost('/create', AUTHORIZED_MIDDLEWARE(ONLY_USERS))
    private async _create(
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        console.log('hit the create')
        return this.create(req.body)
    }

    @httpPut('/update', AUTHORIZED_MIDDLEWARE(ONLY_USERS))
    private async _update(
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        console.log('hit the update', req.body)
        return this.update(req.body.id, req.body)
    }

    @httpDelete('/delete', AUTHORIZED_MIDDLEWARE(ONLY_USERS))
    private async _delete(
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        console.log('hit the delete')
        return this.delete(req.body.id)
    }
}
