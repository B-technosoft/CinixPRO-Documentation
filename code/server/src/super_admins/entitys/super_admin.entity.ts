import { Role } from 'src/users/enums/role.enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SuperAdmin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  contact: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Patient,
  })
  role: string;
}
