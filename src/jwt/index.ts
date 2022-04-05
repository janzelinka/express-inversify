<<<<<<< HEAD
import { JWTUserInfo } from "../services/JWTService";
=======
import { User } from '../database/entity/User'
>>>>>>> 10d47a89ebf1908823bc2c7e880f6733eb7527b1

const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

// get config vars
dotenv.config()

<<<<<<< HEAD
=======
export type JWTUserInfo = { userInfo: Exclude<User, 'password'> }

export function generateAccessToken(userInfo: User) {
  const _userInfo = createJWTUserInfo(userInfo)
  return jwt.sign({ userInfo: _userInfo }, process.env.TOKEN_SECRET, {
    expiresIn: '1800s',
  })
}
>>>>>>> 10d47a89ebf1908823bc2c7e880f6733eb7527b1

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
<<<<<<< HEAD
=======

export const createJWTUserInfo = (user: User) => {
  const jwtUserInfo: User = {
    ...user,
  }
  delete jwtUserInfo.password
  delete jwtUserInfo.salt
  return jwtUserInfo
}
>>>>>>> 10d47a89ebf1908823bc2c7e880f6733eb7527b1
