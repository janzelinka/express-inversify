import { injectable } from 'inversify'
import { User } from '../database/entity/User'

const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

export type JWTUserInfo = { userInfo: Exclude<User, 'password'> }

@injectable()
export class JWTService {
  constructor() {}

  public generateAccessToken = (userInfo: User) => {
    dotenv.config()
    const _userInfo = this.createJWTUserInfo(userInfo)
    return jwt.sign({ userInfo: _userInfo }, process.env.TOKEN_SECRET, {
      expiresIn: '1800s',
    })
  }

  public createJWTUserInfo = (user: User) => {
    const jwtUserInfo: User = {
      ...user,
    }
    delete jwtUserInfo['password']
    delete jwtUserInfo['salt']
    return jwtUserInfo
  }
}
