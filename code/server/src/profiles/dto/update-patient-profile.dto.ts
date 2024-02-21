import { IsEmail, IsNumberString, IsString } from 'class-validator';

export class UpdatePatientProfileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  gender: string;

  @IsNumberString()
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  contact: string;

  @IsString()
  currentAddress: string;

  @IsString()
  height: string;

  @IsString()
  weight: string;

  @IsString()
  bloodPressure: string;

  @IsString()
  pulse: string;

  @IsString()
  respiration: string;

  @IsString()
  allergy: string;

  @IsString()
  bloodGroup: string;

  @IsString()
  diet: string;
}
