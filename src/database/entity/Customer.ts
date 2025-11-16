import { Entity, Column, JoinColumn, OneToMany } from 'typeorm'
import { User } from './User'
import { BaseEntity } from './base/BaseEntity'

@Entity()
export class Customer extends BaseEntity {
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
