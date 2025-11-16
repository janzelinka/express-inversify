import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import { User } from '../entity/User'
import { Role } from '../entity/Role'
import container from '../..'
import { HashService } from '../../services/hashService'

export default class UserSeeder implements Seeder {
  /**
   * Track seeder execution.
   *
   * Default: false
   */
  track = false

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    // ---------------------------------------------------
    // const userFactory = await factoryManager.get(User)
    // // save 1 factory generated entity, to the database
    // await userFactory.save()
    // // save 5 factory generated entities, to the database
    // await userFactory.saveMany(5)
    const hashService = container.get<HashService>('HashService')
    try {
      const role = await dataSource
        .getRepository(Role)
        .findOneBy({ roleName: 'ADMIN' })

      const { hash, salt } =
        hashService.generateHashAndSaltFromPassword('admin')

      await dataSource.getRepository(User).insert([
        {
          firstName: 'John',
          lastName: 'Doe',
          userName: 'admin',
          password: hash,
          salt: salt,
          role,
        },
      ])
    } catch (error) {
      console.log('UserSeeder error:', error)
    }
  }
}
