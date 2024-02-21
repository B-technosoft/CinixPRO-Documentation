import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor } from './doctor.entity';

@Entity()
export class AvailableTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'time_from',
    nullable: false,
    type: 'varchar',
    length: 10,
  })
  timeFrom: string;

  @Column({
    name: 'time_to',
    nullable: false,
    type: 'varchar',
    length: 10,
  })
  timeTo: string;

  @ManyToOne(() => Doctor, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  doctor: Doctor;
}
