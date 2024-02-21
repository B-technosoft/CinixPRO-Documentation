import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateReceptionistDto {
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

  @IsArray()
  @ArrayMinSize(1, { message: 'Maximum One Doctor Id is Required' })
  @Type(() => Number)
  @IsNumber({}, { each: true, message: 'All elements must be numbers' })
  doctorIds: number[];
}
