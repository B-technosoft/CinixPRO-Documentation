import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { Doctor } from 'src/doctors/entitys/doctor.entity';
import { InvoiceItem } from 'src/invoice_item/entities/invoice_item.entity';
import { Patient } from 'src/patients/entitys/patient.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    nullable: false,
    type: 'datetime',
  })
  invoiceDate: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  fileName: string;

  @ManyToOne(() => Patient, (patient: Patient) => patient.invoice, {
    onDelete: 'CASCADE',
    cascade: true,
    nullable: false,
  })
  @JoinColumn({
    name: 'patient_id',
  })
  patient: Patient;

  @ManyToOne(
    () => Appointment,
    (appointment: Appointment) => appointment.invoice,
    {
      onDelete: 'CASCADE',
      cascade: true,
      nullable: false,
    },
  )
  @JoinColumn({
    name: 'appointment_id',
  })
  appointment: Appointment;

  @ManyToOne(() => Doctor, (doctor: Doctor) => doctor.invoice, {
    onDelete: 'CASCADE',
    cascade: true,
    nullable: false,
  })
  @JoinColumn({
    name: 'doctor_id',
  })
  doctor: Doctor;

  @OneToMany(
    () => InvoiceItem,
    (invoiceItem: InvoiceItem) => invoiceItem.invoice,
  )
  invoiceItem: InvoiceItem[];

  @Column({ type: 'varchar', nullable: false })
  paymentMode: string;

  @Column({ type: 'varchar', nullable: false })
  paymentStatus: string;
}
