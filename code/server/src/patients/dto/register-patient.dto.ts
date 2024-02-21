import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterPatientDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  contact: string;

  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;

  @IsOptional()
  age: number;

  @IsOptional()
  gender: string;

  @IsOptional()
  height: string;

  @IsOptional()
  weight: string;

  @IsOptional()
  bloodGroup: string;

  @IsOptional()
  bloodPressure: string;

  @IsOptional()
  pulse: string;

  @IsOptional()
  respiration: string;

  @IsOptional()
  allergy: string;

  @IsOptional()
  currentAddress: string;

  @IsOptional()
  diet: string;
}
