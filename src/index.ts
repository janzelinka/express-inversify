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
import { AuthService } from './services/AuthService'
import { DatabaseService } from './services/DatabaseService'
import { HashService } from './services/HashService'
import { getTypeORMConfig } from './config'

let container = new Container()
const port = process.env.PORT || 3000

;(async function () {
  const withConfig = getTypeORMConfig()
  const connection = await createConnection(withConfig)
  container = bindContainerWith(container, connection)

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
