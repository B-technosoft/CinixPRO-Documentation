import { Doctor } from 'src/doctors/entitys/doctor.entity';
import { Role } from 'src/users/enums/role.enums';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Receptionist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'first_name',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'last_name',
  })
  lastName: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  contact: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  profilePhoto: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  password: string;

  @ManyToMany(() => Doctor, (doctor) => doctor.receptionists, {
    nullable: false,
  })
  @JoinTable()
  doctors: Doctor[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Receptionist,
  })
  role: string;
}
