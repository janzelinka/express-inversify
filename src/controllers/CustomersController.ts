import * as express from "express";
import {
    interfaces,
    controller,
    httpPost,
    request,
    response,
    httpGet,
    httpPut,
    httpDelete,
} from "inversify-express-utils";
import { inject } from "inversify";
import { DatabaseService } from "../services/DatabaseService";
import { User } from "../db/entity/User";
import { AUTHORIZED_MIDDLEWARE } from "../middlewares";
import { PUBLIC, ONLY_ADMINS } from "./permissions/Permissions";
import { AuthService } from "../services/AuthService";
import { AbstractRepository } from "./base/AbstractRepository";
import { Customer } from "../db/entity/Customer";

@controller("/customers")
export class CustomersController extends AbstractRepository<Customer> implements interfaces.Controller {

    constructor(
        @inject(DatabaseService) protected readonly databaseService: DatabaseService,
        @inject(AuthService) protected readonly authService: AuthService
    ) {
        super(databaseService, Customer)
    }

    @httpPost("/", AUTHORIZED_MIDDLEWARE(PUBLIC))
    private async index(
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        const customers: Customer[] = await (await this.getRepository()).find();
        res.json(customers);
    }


    @httpPost("/create")
    private async _create(
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        // const result = await this.authService.register(req.body)
        // console.log(result)
    }

    @httpGet("/list")
    private async _get(
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        const customers = await this.get()
        console.log(customers)
        return customers
    }

    @httpPut("/update")
    private async _update(
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        // console.log(`params`, req.body, req.body.id)
        // const users = await this.get({ where: { id: req.body.id } })
        // const updatedUser: User = {
        //     ...users[0],
        //     age: req.body.age,
        //     firstName: req.body.firstName,
        //     lastName: req.body.lastName,
        //     userName: req.body.userName
        // }

        // const result = await this.update(updatedUser)

        // if (result) {
        //     res.json(updatedUser)
        // } else {
        //     res.statusCode = 501
        //     res.statusMessage = 'Something bad happened during update'
        // }
    }

    @httpDelete("/delete")
    private async _delete(
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        const result = await this.delete({ id: req.body.id })
        if (result.affected == 1) {
            res.statusCode = 200
            res.statusMessage = "Succesfully deleted"
        } else {
            res.statusCode = 501
            res.statusMessage = 'Something bad happened during delete operation'
        }
    }

}
