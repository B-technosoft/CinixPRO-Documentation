import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ExposeAvailableDayDto } from 'src/available_day/dto/expose-avaolable_day.dto';
import { ExposeAppointmentTimeDto } from 'src/doctors/dto/expose-avaliable-time.dto';

export class DoctorProfileDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  firstName: string;

  @IsString()
  @Expose()
  lastName: string;

  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  contact: string;

  @IsString()
  @Expose()
  @Transform(({ value }) => `api/media/doctor/${value}`)
  profilePhoto: string;

  @IsString()
  @Expose()
  specialization: string;

  @IsString()
  @Expose()
  degree: string;

  @IsString()
  @Expose()
  experience: string;

  @IsNotEmpty()
  @Expose()
  fees: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExposeAvailableDayDto)
  @Expose()
  availableDays: ExposeAvailableDayDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExposeAppointmentTimeDto)
  @Expose()
  availableTime: ExposeAppointmentTimeDto[];

  @IsNumber()
  @Expose()
  slotTime: number;

  @IsString()
  @Exclude()
  password: string;
}
