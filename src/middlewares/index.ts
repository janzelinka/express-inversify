import { parseAccessToken } from "../jwt";
import * as express from "express";
import { Role } from "../db/entity/Role";

export const AUTHORIZED_MIDDLEWARE =
  (fullfillmentFn: (...args: any[]) => boolean) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const token = req.headers["authorization"];
    const decoded = await parseAccessToken(token);
    if (decoded && fullfillmentFn()) {
      next();
    } else {
      res.statusCode = 401;
      res.send("Unauthorized");
    }
  };
