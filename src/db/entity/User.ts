import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Customer } from "./Customer";
import { Role } from "./Role";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  password: string;

  @OneToOne(() => Customer)
  @JoinColumn()
  customer: Customer;

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;
}
