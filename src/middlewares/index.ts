import { JWTUserInfo, parseAccessToken } from "../jwt";
import * as express from "express";
import { Role } from "../db/entity/Role";
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
