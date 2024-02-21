import { Doctor } from 'src/doctors/entitys/doctor.entity';
import { Patient } from 'src/patients/entitys/patient.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    nullable: false,
    type: 'text',
  })
  notificationMessage: string;

  @Column({
    nullable: false,
    type: 'text',
  })
  description: string;

  @Column({
    type: 'bool',
    nullable: false,
    default: true,
  })
  isRead: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Patient, (patient) => patient.notification, {
    onDelete: 'CASCADE',
    cascade: true,
    nullable: false,
  })
  patient: Patient[];

  @ManyToMany(() => Doctor, (doctor) => doctor.notification, {
    onDelete: 'CASCADE',
    cascade: true,
    nullable: false,
  })
  doctor: Doctor[];
}
