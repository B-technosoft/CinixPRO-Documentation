import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Degree {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    name: 'degree_name',
    unique: true,
    nullable: false,
  })
  degreeName: string;
}
