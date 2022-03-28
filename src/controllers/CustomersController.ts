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

    @httpGet("/", AUTHORIZED_MIDDLEWARE(PUBLIC))
    private async index(
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        //DEFAULT GET ALL
        const customers: Customer[] = await (await this.getRepository()).find();
        res.json(customers);
    }


    @httpPost("/create")
    private async _create(
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        // CREATE LOGIC
    }

    @httpGet("/list")
    private async _get(
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        //GET BY ATTRIBUTES
        const customers = await this.get()
        return customers
    }

    @httpPut("/update")
    private async _update(
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        // UPDATE LOGIC
    }

    @httpDelete("/delete")
    private async _delete(
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        //DELETE LOGIC
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
