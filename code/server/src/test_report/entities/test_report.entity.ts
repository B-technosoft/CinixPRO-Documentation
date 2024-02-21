import { Prescription } from 'src/prescription/entities/prescription.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TestReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'test_report_name',
    nullable: false,
    type: 'varchar',
  })
  testReportName: string;

  @Column({
    name: 'test_report_note',
    nullable: false,
    type: 'text',
  })
  testReportNote: string;

  @ManyToOne(() => Prescription, (prescription: Prescription) => prescription, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'prescription_id' })
  prescription: Prescription;
}
