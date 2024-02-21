import { IsString } from 'class-validator';

export class CreateAppointmentTimeDto {
  @IsString()
  timeFrom: string;

  @IsString()
  timeTo: string;
}
