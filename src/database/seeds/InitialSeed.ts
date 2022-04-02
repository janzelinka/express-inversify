import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../entity/User'
import { Customer } from '../entity/Customer'
import { Role } from '../entity/Role'

export default class InitialSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .getRepository(Role)
      .insert([{ roleName: 'ADMIN' }, { roleName: 'USER' }])

    await factory(User)()
      .map(async (user: User) => {
        const customer = await factory(Customer)().createMany(1)
        user.customer = customer[0]
        return user
      })
      .createMany(15)
  }
}
