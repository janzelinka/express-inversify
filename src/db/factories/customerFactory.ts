const { Faker } = require('@faker-js/faker');
import { define } from 'typeorm-seeding'
import crypto from 'crypto'
import { User } from '../entity/User';
import { Customer } from '../entity/Customer';

export default define(Customer, (faker: typeof Faker) => {

    const customer = new Customer()

    customer.customerCountry = faker.address.city()
    customer.customerName = faker.company.companyName()
    customer.vatID = '123'

    return customer
})