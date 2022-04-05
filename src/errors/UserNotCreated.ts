import { Error } from "./base/Base";

export class UserNotCreated extends Error {
  constructor( message: string ) {
    super( message, "100" );
  }
}
