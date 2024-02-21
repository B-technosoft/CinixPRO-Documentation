import { IsEmail, IsString } from 'class-validator';

export class CreateSuperAdminDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  contact: string;

  @IsString()
  password: string;
}
