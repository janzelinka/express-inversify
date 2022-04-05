import { Error } from "./base/Base";

export class UserNotSaved extends Error {
  constructor( message: string ) {
    super( message, "101" );
  }
}
