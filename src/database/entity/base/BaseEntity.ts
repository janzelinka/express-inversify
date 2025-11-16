import { Column } from 'typeorm'

export class BaseEntity {
  @Column({ primary: true, type: 'uuid', generated: 'uuid' })
  id!: string

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date

  @Column({ type: 'boolean', default: true })
  isActive!: boolean

  @Column({ type: 'varchar', nullable: true })
  createdBy!: string

  @Column({ type: 'varchar', nullable: true })
  updatedBy!: string
}
