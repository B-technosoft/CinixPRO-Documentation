import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { UpdateAvailableDayDto } from 'src/available_day/dto/update-available_day.dto';
import { UpdateAppointmentTimeDto } from './update-avaliable-time.dto';

export class UpdateDoctorSuperAdminDTO {
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

  @IsNotEmpty()
  @Type(() => Number)
  @Min(1)
  @Max(60)
  slotTime: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAvailableDayDto)
  availableDays: UpdateAvailableDayDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAppointmentTimeDto)
  availableTimes: UpdateAppointmentTimeDto[];
}
