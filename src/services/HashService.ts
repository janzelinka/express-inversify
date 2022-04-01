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

  generateHashAndSaltFromPassword = ( password: string ) => {
    const salt = crypto.randomBytes( 16 ).toString( "hex" );
    const hash = crypto
      .pbkdf2Sync( password, salt, 1000, 64, `sha512` )
      .toString( `hex` );

    return { hash, salt };
  };
}
