import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class PatientDoctorDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  firstName: string;

  @IsString()
  @Expose()
  lastName: string;

  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  contact: string;

  @IsString()
  @Expose()
  specialization: string;

  @IsString()
  @Expose()
  degree: string;

  @IsString()
  @Expose()
  experience: string;

  @IsString()
  @Expose()
  fees: string;

  @IsString()
  @Expose()
  @Transform(({ value }) => `api/media/doctor/${value}`)
  profilePhoto: string;

  @IsString()
  @Exclude()
  password: string;

  @IsString()
  @Expose()
  role: string;
}
