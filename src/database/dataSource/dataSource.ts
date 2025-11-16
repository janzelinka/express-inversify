import { DataSource } from 'typeorm'
import { resolve } from 'path'

const dataSource = new DataSource({
  type: 'sqlite',
  database: resolve(__dirname, 'database.sqlite'),
  logging: false,
  migrationsRun: true,
  entities: [
    resolve(__dirname, '../entity/**/*.ts'),
    resolve('../entity/**/*.js'),
  ],
  migrations: [
    resolve(__dirname, '../migration/**/*.ts'),
    resolve('../migration/**/*.js'),
  ],
  subscribers: [
    resolve(__dirname, '../subscriber/**/*.ts'),
    resolve('../subscriber/**/*.js'),
  ],
  synchronize: false,
})

export { dataSource }
