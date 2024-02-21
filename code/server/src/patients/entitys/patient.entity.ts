import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Prescription } from 'src/prescription/entities/prescription.entity';
import { Role } from 'src/users/enums/role.enums';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: true,
  })
  gender: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  age: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  contact: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  currentAddress: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  profilePhoto: string;

  @Column({
    nullable: true,
  })
  height: string;

  @Column({
    nullable: true,
  })
  weight: string;

  @Column({
    nullable: true,
  })
  bloodPressure: string;

  @Column({
    nullable: true,
  })
  pulse: string;

  @Column({
    nullable: true,
  })
  respiration: string;

  @Column({
    nullable: true,
  })
  allergy: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  bloodGroup: string;

  @Column({
    nullable: true,
  })
  diet: string;

  @OneToMany(() => Prescription, (prescription) => prescription.patient)
  prescription: Prescription[];

  @OneToMany(() => Invoice, (prescription) => prescription.patient)
  invoice: Invoice[];

  @OneToMany(
    () => Appointment,
    (appointment: Appointment) => appointment.patient,
  )
  appointment: Appointment[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Patient,
  })
  role: string;

  @ManyToMany(() => Notification, (notification) => notification.patient)
  @JoinTable({
    name: 'patient_notifications',
  })
  notification: Notification[];
}
