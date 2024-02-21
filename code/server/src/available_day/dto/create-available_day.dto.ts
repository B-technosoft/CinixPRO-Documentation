import { IsNotEmpty, IsString } from 'class-validator';
import { Doctor } from 'src/doctors/entitys/doctor.entity';

export class CreateAvailableDayDto {
  @IsString()
  day: string;

  @IsNotEmpty()
  doctor: Doctor;
}
