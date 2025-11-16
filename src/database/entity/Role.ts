import { Column, Entity, OneToMany } from 'typeorm'
import { User } from './User'
import { BaseEntity } from './base/BaseEntity'

@Entity()
export class Role extends BaseEntity {
  @Column({ unique: true })
  roleName?: string

  @OneToMany(() => User, (user) => user.role)
  users?: User[]
}
