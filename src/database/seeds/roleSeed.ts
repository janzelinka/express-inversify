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

    // const roleFactory = await factoryManager.get(Role)

    await dataSource.getRepository<Role>('Role').insert({ roleName: 'ADMIN' })
    await dataSource.getRepository<Role>('Role').insert({ roleName: 'USER' })
    await dataSource.getRepository<Role>('Role').insert({ roleName: 'READER' })
    await dataSource
      .getRepository<Role>('Role')
      .insert({ roleName: 'APPROVER' })

    console.log('seedeed', dataSource.getRepository<Role>('Role').find())
  }
}
