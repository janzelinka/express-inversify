//@ts-nocheck
import { define } from 'typeorm-seeding'
import { ERoles } from '../../enums/Roles'
import { User } from '../entity/User'
const crypto = require('crypto')

const generateHashAndSaltFromPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`)

  return { hash, salt }
}

define(User, (faker) => {
  let user: User = new User()
  const { hash, salt } = generateHashAndSaltFromPassword('testpassword')

  user.age = faker.random.number({ min: 18, max: 80 })
  user.firstName = faker.name.firstName()
  user.lastName = faker.name.lastName()
  user.role = ERoles.USER
  user.userName = faker.internet.email()
  user.salt = salt
  user.password = hash

  return user
})
