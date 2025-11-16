import { Entity, Column, JoinColumn, BeforeInsert, ManyToOne } from 'typeorm'
import { Customer } from './Customer'
import { Role } from './Role'
import { BaseEntity } from './base/BaseEntity'

@Entity()
export class User extends BaseEntity {
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

  toDto?() {
    return {
      id: this.id,
      userName: this.userName,
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
      customer: this.customer,
      role: this.role,
    }
  }
}
