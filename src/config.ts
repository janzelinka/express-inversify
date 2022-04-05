import path from 'path'
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions'

const getTypeORMConfig = (): SqliteConnectionOptions => {
  return {
    type: 'sqlite',
    database: path.resolve(__dirname, 'database.sqlite'),
    logging: false,
    migrationsRun: true,
    entities: [
      path.resolve(__dirname, 'database/entity/**/*.ts'),
      path.resolve(__dirname, 'database/entity/**/*.js'),
    ],
    migrations: [
      path.resolve(__dirname, 'database/migration/**/*.ts'),
      path.resolve(__dirname, 'database/migration/**/*.js'),
    ],
    subscribers: [
      path.resolve(__dirname, 'database/subscriber/**/*.ts'),
      path.resolve(__dirname, 'database/subscriber/**/*.js'),
    ],
    cli: {
      entitiesDir: path.resolve(__dirname, 'database/entity'),
      migrationsDir: path.resolve(__dirname, 'database/migration'),
      subscribersDir: path.resolve(__dirname, 'database/subscriber'),
    },
  }
}

export { getTypeORMConfig }
