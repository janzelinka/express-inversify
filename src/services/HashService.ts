import * as crypto from 'crypto'
import { injectable } from 'inversify'

@injectable()
export class HashService {
  createHash = (password: string, usersSalt: string) => {
    return crypto
      .pbkdf2Sync(password, usersSalt, 1000, 64, `sha512`)
      .toString(`hex`)
  }

  generateHashAndSaltFromPassword = (password: string) => {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`)

    return { hash, salt }
  }
}
