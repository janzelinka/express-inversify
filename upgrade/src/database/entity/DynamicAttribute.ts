import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Product } from './Product'

@Entity()
export class DynamicAttribute {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  value: string

  @ManyToOne(() => Product, (product) => product.dynamicAttributes)
  @JoinColumn()
  product: Product
}
