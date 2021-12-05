import { User } from "../db/entity/User";

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// get config vars
dotenv.config();

export type JWTUserInfo = Exclude<User, "password">;

export function generateAccessToken(userInfo: User) {
  const _userInfo = createJWTUserInfo(userInfo);
  return jwt.sign({ userInfo: _userInfo }, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
}

export const createJWTUserInfo = (user: User) => {
  const jwtUserInfo: JWTUserInfo = {
    ...user,
  };
  delete jwtUserInfo["password"];
  return jwtUserInfo;
};
