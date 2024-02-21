import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class DoctorPatientDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  firstName: string;

  @IsString()
  @Expose()
  lastName: string;

  @IsString()
  @Expose()
  gender: string;

  @IsNumber()
  @Expose()
  age: number;

  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  contact: string;

  @IsString()
  @Expose()
  currentAddress: string;

  @IsString()
  @Expose()
  @Transform(({ value }) => `api/media/patients/${value}`)
  profilePhoto: string;

  @IsString()
  @Expose()
  height: string;

  @IsString()
  @Expose()
  weight: string;

  @IsString()
  @Expose()
  bloodPressure: string;

  @IsString()
  @Expose()
  pulse: string;

  @IsString()
  @Expose()
  respiration: string;

  @IsString()
  @Expose()
  allergy: string;

  @IsString()
  @Exclude()
  password: string;

  @IsString()
  @Expose()
  bloodGroup: string;

  @IsString()
  @Expose()
  diet: string;

  @IsString()
  @Expose()
  role: string;
}
