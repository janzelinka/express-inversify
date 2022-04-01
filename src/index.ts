import 'reflect-metadata'
import * as bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import { Connection, createConnection } from 'typeorm'
import './controllers/ExampleController'
import './controllers/LoginController'
import './controllers/UsersController'
import './controllers/CustomersController'
import { AuthService } from './services/AuthService'
import { DatabaseService } from './services/DatabaseService'
import { HashService } from './services/HashService'

const container = new Container()

;(async function () {
  const connection = await createConnection()

  container.bind<Connection>(Connection).toDynamicValue((context) => {
    return connection
  })
  container.bind<DatabaseService>(DatabaseService).to(DatabaseService)
  container.bind<AuthService>(AuthService).to(AuthService)
  container.bind<HashService>(HashService).to(HashService)

  const server = new InversifyExpressServer(container)

  server.setConfig((app) => {
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

  server.build().listen(3000, () => {
    console.log('running')
  })
})()
