# 🚀 express-inversify-jwt
- Just an example of implementing http server in NodeJS running on express, using InversifyJS for DI Container and TypeORM for ORM (thanks CJay).
- Implemented JWT for Authentication (still in development phase).
- Used SQLite as database.
## Installation
- `npm install` 
or 
- `yarn install`

## Development
- `npm run dev` 
- or 
- `yarn dev`

## Build
- `tsc . -p`

## Tests
- ToDo
## Creating migration
- you should modify your model, as you want, e.g. add column
- see command generate-migration in package.json - you should modify the migration name as you want (Last string user)
- after that run npm run generate-migration or yarn generate-migration

## Running on Docker
- ToDo
## Tip
- when using VSCode, install TSLint
