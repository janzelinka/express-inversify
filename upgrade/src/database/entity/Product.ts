import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { DynamicAttribute } from './DynamicAttribute'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  type: number

  @Column()
  price: number

  @OneToMany(
    () => DynamicAttribute,
    (dynamicAttribute) => dynamicAttribute.product
  )
  @JoinColumn()
  dynamicAttributes: DynamicAttribute[]
}
