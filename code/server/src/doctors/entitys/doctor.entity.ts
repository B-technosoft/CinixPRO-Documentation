import { Role } from 'src/users/enums/role.enums';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AvailableTime } from './available_time.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { Receptionist } from 'src/receptionist/entities/receptionist.entity';
import { Prescription } from 'src/prescription/entities/prescription.entity';
import { AvailableDay } from 'src/available_day/entities/available_day.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  contact: string;

  @Column()
  specialization: string;

  @Column()
  degree: string;

  @Column()
  experience: string;

  @Column()
  fees: number;

  @Column()
  profilePhoto: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 1,
  })
  slotTime: number;

  @Column()
  password: string;

  @OneToMany(() => AvailableTime, (availableTime) => availableTime.doctor)
  availableTime: AvailableTime[];

  @OneToMany(() => AvailableDay, (availableDay) => availableDay.doctor)
  availableDays: AvailableDay[];

  @OneToMany(() => Invoice, (invoice: Invoice) => invoice.doctor)
  invoice: Invoice[];

  @OneToMany(
    () => Appointment,
    (appointment: Appointment) => appointment.doctor,
  )
  appointment: Appointment[];

  @OneToMany(() => Prescription, (prescription) => prescription.patient)
  prescription: Prescription[];

  @ManyToMany(() => Receptionist, (receptionist) => receptionist.doctors, {
    nullable: false,
  })
  receptionists: Receptionist[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Doctor,
  })
  role: string;

  @ManyToMany(() => Notification, (notification) => notification.doctor)
  @JoinTable({
    name: 'doctor_notifications',
  })
  notification: Notification[];
}
