import { parseAccessToken } from '../jwt'
import * as express from 'express'
import { User } from '../database/entity/User'

type TFullfilmentFn = (decoded: User) => boolean

export const AUTHORIZED_MIDDLEWARE =
  (fullfillmentFn: TFullfilmentFn) =>
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const token = req.cookies.token

      if (!token) {
        res.statusCode = 401
        res.send('Unauthorized')
      } else {
        const { userInfo } = await parseAccessToken(token)

        if (userInfo && fullfillmentFn(userInfo)) {
          next()
        } else {
          res.statusCode = 401
          res.send('Unauthorized')
        }
      }
    }
