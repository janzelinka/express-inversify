import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  InsertEvent,
} from "typeorm";
import { Customer } from "./Customer";
import { Role } from "./Role";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", unique: true, length: 50 })
  userName!: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  age: number;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToOne(() => Customer)
  @JoinColumn()
  customer: Customer;

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;

  @BeforeInsert()
  beforeUserNameInsert = () => {
    this.userName = this.userName === "" ? null : this.userName;
  };
}
