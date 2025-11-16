import { setSeederFactory } from 'typeorm-extension'
import * as crypto from 'crypto'
import { User } from '../entity/User'

export default setSeederFactory(User, (faker) => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync('password', salt, 1000, 64, `sha512`)
    .toString(`hex`)

  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  const userName = lastName

  let user: User = new User()
  user.age = faker.number.int({ min: 18, max: 65 })
  user.firstName = firstName
  user.lastName = lastName
  user.userName = userName + faker.number.int(1000)
  user.password = hash
  user.salt = salt
  user.role = null // assign role in the seeder file

  return user
})
