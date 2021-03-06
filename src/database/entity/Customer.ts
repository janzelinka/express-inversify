import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
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

  @OneToOne(() => User, { nullable: true })
  @JoinColumn()
  user?: User
}
