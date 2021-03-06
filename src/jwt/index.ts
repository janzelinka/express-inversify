import { User } from '../database/entity/User'

const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

// get config vars
dotenv.config()

export type JWTUserInfo = { userInfo: Exclude<User, 'password'> }

export function generateAccessToken(userInfo: User) {
  const _userInfo = createJWTUserInfo(userInfo)
  return jwt.sign({ userInfo: _userInfo }, process.env.TOKEN_SECRET, {
    expiresIn: '1800s',
  })
}

export function parseAccessToken(token: string): Promise<JWTUserInfo | null> {
  return new Promise((res, rej) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err: any, decoded: any) => {
      console.log('decoded JWT', decoded)
      if (!err) {
        res(decoded)
      }
      rej(null)
    })
  })
}

export const createJWTUserInfo = (user: User) => {
  const jwtUserInfo: User = {
    ...user,
  }
  delete jwtUserInfo.password
  delete jwtUserInfo.salt
  return jwtUserInfo
}
