import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEmail, IsNumber, IsNumberString, IsString } from 'class-validator';

export class PatientProfileDto {
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

  @IsNumberString()
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
  @Transform(({ value }) => `api/media/patients/${value}`)
  profilePhoto: string;

  @IsString()
  @Expose()
  currentAddress: string;

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
  @Expose()
  bloodGroup: string;

  @IsString()
  @Expose()
  diet: string;

  @IsString()
  @Exclude()
  password: string;
}
