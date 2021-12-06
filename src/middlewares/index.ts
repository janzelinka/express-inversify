import { parseAccessToken } from "../jwt";
import * as express from "express";

export async function AUTHORIZED_MIDDLEWARE(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const token = req.headers["authorization"];
  const decoded = await parseAccessToken(token);
  if (decoded) {
    next();
  } else {
    res.statusCode = 401;
    res.send("Unauthorized");
  }
}
