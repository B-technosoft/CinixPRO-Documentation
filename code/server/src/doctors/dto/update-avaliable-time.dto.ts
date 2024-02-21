import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateAppointmentTimeDto } from './create-avaliable-time.dto';
import { Transform } from 'class-transformer';

export class UpdateAppointmentTimeDto extends PartialType(
  CreateAppointmentTimeDto,
) {
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  id?: number;
}
