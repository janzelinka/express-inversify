import { DataSource } from 'typeorm'
import { resolve } from 'path'

const dataSource = new DataSource({
  type: 'sqlite',
  database: resolve(__dirname, 'database.sqlite'),
  logging: false,
  migrationsRun: true,
  entities: [resolve(__dirname, '../entity/**/*.{ts,js}')],
  migrations: [resolve(__dirname, '../migration/**/*.{ts,js}')],
  synchronize: false,
})

export { dataSource }
