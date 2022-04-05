<<<<<<< HEAD
import "reflect-metadata";
import "./controllers/ExampleController";
import "./controllers/LoginController";
import "./controllers/UsersController";
import "./controllers/CustomersController";
import * as bodyParser from "body-parser";
import cors from "cors";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { DatabaseService } from "./services/DatabaseService";
import { Connection, createConnection } from "typeorm";
import { AuthService } from "./services/AuthService";
import { HashService } from "./services/HashService";
import { JWTService } from "./services/JWTService";
=======
import 'reflect-metadata'
import * as bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import { Connection, createConnection } from 'typeorm'
import './controllers/LoginController'
import './controllers/UsersController'
import './controllers/CustomersController'
import './controllers/ProductController'
import { AuthService } from './services/AuthService'
import { DatabaseService } from './services/DatabaseService'
import { HashService } from './services/HashService'
import { getTypeORMConfig } from './config'
>>>>>>> 10d47a89ebf1908823bc2c7e880f6733eb7527b1

let container = new Container()
const port = process.env.PORT || 3000

;(async function () {
  const withConfig = getTypeORMConfig()
  const connection = await createConnection(withConfig)
  container = bindContainerWith(container, connection)

<<<<<<< HEAD
  container.bind<Connection>(Connection).toDynamicValue((context) => {
    return connection;
  });
  container.bind<DatabaseService>(DatabaseService).to(DatabaseService);
  container.bind<AuthService>(AuthService).to(AuthService);
  container.bind<HashService>(HashService).to(HashService);
  container.bind<JWTService>(JWTService).to(JWTService)
=======
  const server = new InversifyExpressServer(container)
    .setConfig((app) => {
      app
        .use(
          bodyParser.urlencoded({
            extended: true,
          })
        )
        .use(bodyParser.json())
        .use(cookieParser())
        .use(cors({ origin: ['http://localhost:4200'], credentials: true }))
    })
    .build()
    .listen(port, () => {
      console.log('running on port no: ' + port)
    })
})()
>>>>>>> 10d47a89ebf1908823bc2c7e880f6733eb7527b1

const bindContainerWith = (
  container: Container,
  databaseConnection: Connection
): Container => {
  container.bind<Connection>(Connection).toDynamicValue(() => {
    return databaseConnection
  })
  container.bind<DatabaseService>(DatabaseService).to(DatabaseService)
  container.bind<AuthService>(AuthService).to(AuthService)
  container.bind<HashService>(HashService).to(HashService)

  return container
}
