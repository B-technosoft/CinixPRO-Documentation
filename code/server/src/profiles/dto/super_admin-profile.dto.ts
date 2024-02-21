import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class SuperAdminProfileDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  name: string;

  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  contact: string;

  @IsString()
  @Exclude()
  password: string;
}
