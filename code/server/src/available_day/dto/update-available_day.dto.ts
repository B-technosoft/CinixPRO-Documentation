import { PartialType } from '@nestjs/mapped-types';
import { CreateAvailableDayDto } from './create-available_day.dto';
import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateAvailableDayDto extends PartialType(CreateAvailableDayDto) {
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  id?: number;
}
