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

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    // ---------------------------------------------------

    const roleFactory = await factoryManager.get(Role)

    roleFactory.save({ roleName: 'ADMIN' })
    roleFactory.save({ roleName: 'USER' })
    roleFactory.save({ roleName: 'READER' })
    roleFactory.save({ roleName: 'APPROVER' })
  }
}
