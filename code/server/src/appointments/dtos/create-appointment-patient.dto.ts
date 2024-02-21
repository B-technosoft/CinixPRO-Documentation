import { Transform } from 'class-transformer';
import {
  IsDate,
  IsInstance,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateAppointmentPatientDto {
  @IsNumber()
  @IsNotEmpty()
  doctor: number;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsInstance(Date)
  appointmentDate: Date;

  @IsString()
  appointmentStartTime: string;

  @IsString()
  appointmentEndTime: string;
}
