import 'reflect-metadata'
import { Container } from 'inversify'
import * as express from 'express'

import { DataSource, Repository } from 'typeorm'
import './controllers/homeController'
import './controllers/usersController'
import { dataSource } from './database/dataSource/dataSource'
import { InversifyExpressHttpAdapter } from '@inversifyjs/http-express-v4'
import { HomeController } from './controllers/homeController'
import { UsersController } from './controllers/usersController'
import { SwaggerUiProvider } from '@inversifyjs/http-open-api'
import { User } from './database/entity/User'
import { UsersService } from './repository/usersRepository'
import { JWTService } from './services/jwtService'

let container = new Container()
const port = process.env.PORT || 3000

;(async function () {
  //database initialization
  const _dataSource = await dataSource.initialize()

  //datasource as service injected in container
  container.bind<DataSource>('DataSource').toDynamicValue(() => {
    return _dataSource
  })

  container.bind<Repository<User>>('Repository<User>').toDynamicValue(() => {
    return _dataSource.getRepository(User)
  })

  container
    .bind<UsersService>('UsersService')
    .to(UsersService)
    .inTransientScope()

  container.bind<JWTService>('JWTService').to(JWTService).inTransientScope()
  container.bind(HomeController).toSelf().inSingletonScope()
  container.bind(UsersController).toSelf().inSingletonScope()

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
})()
