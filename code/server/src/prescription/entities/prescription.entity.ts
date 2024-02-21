import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { Doctor } from 'src/doctors/entitys/doctor.entity';
import { Patient } from 'src/patients/entitys/patient.entity';
import { PrescriptionMedicine } from 'src/prescription_medicine/entities/prescription_medicine.entity';
import { TestReport } from 'src/test_report/entities/test_report.entity';
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
export class Prescription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'symptom',
    nullable: false,
    type: 'varchar',
  })
  symptom: string;

  @Column({
    name: 'diagnosi',
    nullable: false,
    type: 'text',
  })
  diagnosi: string;

  @CreateDateColumn({
    nullable: false,
    type: 'datetime',
  })
  prescriptionDate: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  fileName: string;

  @ManyToOne(() => Patient, (patient) => patient.prescription, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.prescription, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(() => Appointment, (appointment) => appointment.prescription, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;

  @OneToMany(
    () => PrescriptionMedicine,
    (prescriptionMedicine) => prescriptionMedicine.prescription,
  )
  prescriptionMedicine: PrescriptionMedicine[];

  @OneToMany(() => TestReport, (testReport) => testReport.prescription, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  testReport: TestReport[];
}
