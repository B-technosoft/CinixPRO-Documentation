import { IsString } from 'class-validator';

export class CreateAvailableDayWithoutDoctorDto {
  @IsString()
  day: string;
}
