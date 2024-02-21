import { Doctor } from 'src/doctors/entitys/doctor.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AvailableDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.availableDays, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  doctor: Doctor;
}
