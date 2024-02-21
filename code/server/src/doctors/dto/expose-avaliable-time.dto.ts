import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ExposeAppointmentTimeDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  timeFrom: string;

  @IsString()
  @Expose()
  timeTo: string;
}
