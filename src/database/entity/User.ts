import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  BeforeInsert,
  ManyToOne,
} from 'typeorm'
import { Customer } from './Customer'
import { Role } from './Role'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', unique: true, length: 50 })
  userName!: string

  @Column({ type: 'varchar', nullable: true })
  firstName: string

  @Column({ type: 'varchar', nullable: true })
  lastName: string

  @Column({ type: 'varchar', nullable: true })
  age: number

  @Column()
  password: string

  @Column()
  salt: string

  @ManyToOne(() => User, (user) => user.customer)
  @JoinColumn()
  customer: Customer

  @ManyToOne(() => Role, (role) => role.users)
  role: Role

  @BeforeInsert()
  beforeUserNameInsert = () => {
    this.userName = this.userName === '' ? null : this.userName
  }
}
