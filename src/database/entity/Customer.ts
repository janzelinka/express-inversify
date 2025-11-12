import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { User } from './User'

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

  @OneToMany(() => Customer, (customer) => customer.user)
  @JoinColumn()
  user?: User[]
}
