import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { User } from "../entity/User";
import crypto from 'crypto'
import { Customer } from "../entity/Customer";
const { Faker } = require('@faker-js/faker');


export default class CreateUsers implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        await factory(User)().map(async (user: User) => {
            const customer = await factory(Customer)().create()
            user.customer = customer
            return user
        }).createMany(15)

    }
}