import 'reflect-metadata'
// import * as bodyParser from 'body-parser'
// import * as cookieParser from 'cookie-parser'
// import * as cors from 'cors'
import { Container } from 'inversify'
import * as express from 'express'

import { DataSource } from 'typeorm'
import './controllers/homeController'
import './controllers/usersController'
import { dataSource } from './database/dataSource/dataSource'
import { InversifyExpressHttpAdapter } from '@inversifyjs/http-express-v4'
import { HomeController } from './controllers/homeController'
import { UsersController } from './controllers/usersController'
import { SwaggerUiProvider } from '@inversifyjs/http-open-api'
// import './controllers/UsersController'
// import './controllers/CustomersController'
// import './controllers/ProductController'
// import { AuthService } from './services/AuthService'
// import { DatabaseService } from './services/DatabaseService'
// import { HashService } from './services/HashService'
// import { getTypeORMConfig } from './config'

let container = new Container()
const port = process.env.PORT || 3000

;(async function () {
  //database initialization
  const _dataSource = await dataSource.initialize()

  //datasource as service injected in container
  container.bind<DataSource>('DataSource').toDynamicValue(() => {
    return _dataSource
  })

  container.bind(HomeController).toSelf().inSingletonScope()
  container.bind(UsersController).toSelf().inSingletonScope()
  // container.bind<DatabaseService>(DatabaseService).to(DatabaseService)
  // container.bind<AuthService>(AuthService).to(AuthService)
  // container.bind<HashService>(HashService).to(HashService)

  //   container = bindContainerWith(container, connection)

  const adapter = new InversifyExpressHttpAdapter(container)

  const swaggerProvider: SwaggerUiProvider = new SwaggerUiProvider({
    api: {
      openApiObject: {
        info: {
          title: 'My awesome API',
          version: '1.0.0',
        },
        openapi: '3.1.1',
      },
      path: '/docs',
    },
    ui: {
      title: 'My awesome API docs',
    },
  })

  swaggerProvider.provide(container)

  const application: express.Application = await adapter.build()

  application.listen(port, () => {
    console.log('running on port no: ' + port)
  })

  // application.see

  // application
  //   .setConfig((app) => {
  //     app
  //       .use(
  //         bodyParser.urlencoded({
  //           extended: true,
  //         })
  //       )
  //       .use(bodyParser.json())
  //       .use(cookieParser())
  //       .use(cors({ origin: ['http://localhost:4200'], credentials: true }))
  //   })
  //   .build()
  //   .listen(port, () => {
  //     console.log('running on port no: ' + port)
  //   })
})()
