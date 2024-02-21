import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Specialization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    name: 'specialization_name',
    nullable: false,
    unique: true,
  })
  specializationName: string;
}
