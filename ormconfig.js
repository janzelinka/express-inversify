const path = require('path')

module.exports = {
  type: 'sqlite',
  database: 'src/database.sqlite',
  logging: false,
  migrationsRun: true,
  synchronize: false,
  entities: ['src/database/entity/**/*.ts', 'src/database/entity/**/*.js'],
  migrations: [
    'src/database/migration/**/*.ts',
    'src/database/migration/**/*.js',
  ],
  subscribers: [
    'src/database/subscriber/**/*.ts',
    'src/database/subscriber/**/*.js',
  ],
  cli: {
    entitiesDir: 'src/database/entity',
    migrationsDir: 'src/database/migration',
    subscribersDir: 'src/database/subscriber',
  },
}
