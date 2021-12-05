import { User } from "../db/entity/User";

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// get config vars
dotenv.config();

export type JWTUserInfo = Exclude<User, "password">;

export function generateAccessToken(username: JWTUserInfo) {
  return jwt.sign({ username }, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
}
