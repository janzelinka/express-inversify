<<<<<<< HEAD
import { parseAccessToken } from "../jwt";
import * as express from "express";
import { User } from "../db/entity/User";

export const AUTHORIZED_MIDDLEWARE =
  (fullfillmentFn: (decoded: User) => boolean) =>
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const token = req.headers["authorization"];
      if (!!!token) {
        res.statusCode = 401;
        res.send("Unauthorized - No token provided");
        return
      }
      const { userInfo } = await parseAccessToken(token);
      if (userInfo && fullfillmentFn(userInfo)) {
        next();
      } else {
        res.statusCode = 401;
        res.send("Unauthorized");
      }
    };
=======
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
>>>>>>> 10d47a89ebf1908823bc2c7e880f6733eb7527b1
