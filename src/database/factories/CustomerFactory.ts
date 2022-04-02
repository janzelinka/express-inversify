//@ts-nocheck
import { define } from 'typeorm-seeding'
import { Customer } from '../entity/Customer'
import Faker from '@faker-js/faker'

const crypto = require('crypto')

define(Customer, (faker: typeof Faker) => {
  let customer: Customer = new Customer()

  customer.customerCountry = faker.address.country()
  customer.customerName = faker.company.companyName()
  customer.vatID = faker.finance.iban()

  return customer
})
