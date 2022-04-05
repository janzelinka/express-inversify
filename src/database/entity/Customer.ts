import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
<<<<<<< HEAD:src/db/entity/Customer.ts
} from "typeorm";
=======
  JoinColumn,
  OneToOne,
} from 'typeorm'
import { User } from './User'
>>>>>>> 10d47a89ebf1908823bc2c7e880f6733eb7527b1:src/database/entity/Customer.ts

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  customerName: string

  @Column()
  customerCountry: string

  @Column()
  vatID: string

<<<<<<< HEAD:src/db/entity/Customer.ts
=======
  @OneToOne(() => User, { nullable: true })
  @JoinColumn()
  user?: User
>>>>>>> 10d47a89ebf1908823bc2c7e880f6733eb7527b1:src/database/entity/Customer.ts
}
