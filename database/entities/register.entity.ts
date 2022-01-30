import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'register_members' })
export default class RegisterEntity {
  @PrimaryGeneratedColumn('increment', { name: 'userid' })
    userId?: number;

  @Column({ name: 'firstname' })
    firstName: string;

  @Column({ name: 'lastname' })
    lastName: string;

  @Column({ name: 'email' })
    email: string;

  @Column()
    password: string;
}
