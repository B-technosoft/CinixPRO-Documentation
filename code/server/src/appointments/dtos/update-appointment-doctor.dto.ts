import { Transform } from 'class-transformer';
import { IsDate, IsInstance, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateAppointmentDoctorDto {
  @IsNumber()
  @IsNotEmpty()
  patient: number;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsInstance(Date)
  appointmentDate: Date;
}
