import { Prescription } from 'src/prescription/entities/prescription.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PrescriptionMedicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'medicine_name',
    nullable: false,
    type: 'varchar',
  })
  medicineName: string;

  @Column({
    name: 'medicine_note',
    nullable: false,
    type: 'text',
  })
  medicineNote: string;

  @ManyToOne(() => Prescription, (prescription: Prescription) => prescription, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'prescription_id' })
  prescription: Prescription;
}
