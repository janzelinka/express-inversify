const { Faker } = require('@faker-js/faker');
import { define } from 'typeorm-seeding'
import crypto from 'crypto'
import { User } from '../entity/User';

export default define(User, (faker: typeof Faker) => {

    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
        .pbkdf2Sync("testpassword", salt, 1000, 64, `sha512`)
        .toString(`hex`);

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const userName = lastName

    let user: User = new User()
    user.age = faker.random.number(26)
    user.firstName = firstName
    user.lastName = lastName
    user.userName = userName + faker.random.number(1000)
    user.password = hash
    user.salt = salt

    return user
})