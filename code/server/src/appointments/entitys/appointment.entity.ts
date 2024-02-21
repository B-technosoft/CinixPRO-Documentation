import { Doctor } from 'src/doctors/entitys/doctor.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Patient } from 'src/patients/entitys/patient.entity';
import { Prescription } from 'src/prescription/entities/prescription.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Doctor, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(() => Patient, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column({ type: 'date', name: 'appointment_date' })
  appointmentDate: Date;

  @Column({ type: 'varchar', name: 'appointment_start_time', nullable: false })
  appointmentStartTime: string;

  @Column({ type: 'varchar', name: 'appointment_end_time', nullable: false })
  appointmentEndTime: string;

  @Column({ type: 'bool', name: 'is_cancel', default: false })
  isCancel: boolean;

  @Column({ type: 'bool', name: 'is_complete', default: false })
  isComplete: boolean;

  @OneToMany(() => Prescription, (prescription) => prescription.appointment)
  prescription: Prescription[];

  @OneToMany(() => Invoice, (invoice: Invoice) => invoice.appointment)
  invoice: Invoice[];
}
