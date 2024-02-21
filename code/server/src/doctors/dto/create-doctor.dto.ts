import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateAppointmentTimeDto } from './create-avaliable-time.dto';
import { Type } from 'class-transformer';
import { CreateAvailableDayWithoutDoctorDto } from 'src/available_day/dto/create-available_day_without_doctor.dto';

export class CreateDoctorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  contact: string;

  @IsString()
  specialization: string;

  @IsString()
  degree: string;

  @IsString()
  experience: string;

  @IsNotEmpty()
  fees: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAvailableDayWithoutDoctorDto)
  availableDays: CreateAvailableDayWithoutDoctorDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAppointmentTimeDto)
  availableTimes: CreateAppointmentTimeDto[];

  @IsNotEmpty()
  @Type(() => Number)
  @Min(1)
  @Max(60)
  slotTime: number;

  @IsString()
  password: string;
}
