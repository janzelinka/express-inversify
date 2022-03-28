import { JWTUserInfo } from "../services/JWTService";

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// get config vars
dotenv.config();


export function parseAccessToken(token: string): Promise<JWTUserInfo | null> {
  return new Promise((res, rej) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err: any, decoded: any) => {
      console.log("decoded JWT", decoded);
      if (!err) {
        res(decoded);
      }
      rej(null);
    });
  });
}
