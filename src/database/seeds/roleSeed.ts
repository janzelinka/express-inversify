import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import { Role } from '../entity/Role'

export default class RoleSeeder implements Seeder {
  /**
   * Track seeder execution.
   *
   * Default: false
   */
  track = false

  public async run(dataSource: DataSource): Promise<any> {
    // ---------------------------------------------------
    try {
      const repository = dataSource.getRepository(Role)
      await repository.insert([
        {
          roleName: 'ADMIN',
        },
      ])
    } catch (error) {
      console.log('RoleSeeder error:', error)
    }
  }
}
