export class Error {
  constructor( protected message: string, protected code: string ) {}

  public toString(): string {
    return JSON.stringify( this );
  }
}
