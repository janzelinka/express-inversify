//@ts-nocheck
import { Faker } from '@faker-js/faker'
import { define } from 'typeorm-seeding'
import { Product } from '../entity/Product'

define(Product, (faker: Faker) => {
  let product: Product = new Product()

  product.name = faker.commerce.product()
  product.price = Math.random() * 5000
  product.type = Math.round(Math.random() * 3)

  return product
})
