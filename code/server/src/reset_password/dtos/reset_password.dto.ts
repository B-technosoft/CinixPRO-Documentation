import { IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  key: string;

  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;
}
