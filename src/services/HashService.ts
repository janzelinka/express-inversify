import crypto from "crypto";
import { injectable } from "inversify";

interface IGenerate {
  hash: string;
  salt: string;
}

interface IHashService {
  createHash: ( password: string, usersSalt: string ) => string;
  generateHashAndSaltFromPassword: ( password: string ) => IGenerate;
}

@injectable()
export class HashService implements IHashService {
  createHash = ( password: string, usersSalt: string ) => {
    return crypto
      .pbkdf2Sync( password, usersSalt, 1000, 64, `sha512` )
      .toString( `hex` );
  };

<<<<<<< HEAD
  generateHashAndSaltFromPassword = (password: string) => {
    if (!password) {
      return { hash: '', salt: '' }
    }
    const salt = crypto.randomBytes(16).toString("hex");
=======
  generateHashAndSaltFromPassword = ( password: string ) => {
    const salt = crypto.randomBytes( 16 ).toString( "hex" );
>>>>>>> 10d47a89ebf1908823bc2c7e880f6733eb7527b1
    const hash = crypto
      .pbkdf2Sync( password, salt, 1000, 64, `sha512` )
      .toString( `hex` );

    return { hash, salt };
  };
}
