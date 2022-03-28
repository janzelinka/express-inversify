import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { User } from "../entity/User";
import crypto from 'crypto'
const { Faker } = require('@faker-js/faker');


export default class CreateUsers implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        await factory(User)().createMany(15)

        // const salt = crypto.randomBytes(16).toString("hex");
        // const hash = crypto
        //     .pbkdf2Sync("testpassword", salt, 1000, 64, `sha512`)
        //     .toString(`hex`);

        // await connection
        //     .createQueryBuilder()
        //     .insert()
        //     .into(User)
        //     .values([
        //         { firstName: 'Timber', lastName: 'Saw', userName: 'abc', age: 2, password: hash, salt: salt },
        //         { firstName: 'Phantom', lastName: 'Lancer', userName: 'def', age: 1, password: hash, salt: salt },
        //     ])
        //     .execute()
    }
}