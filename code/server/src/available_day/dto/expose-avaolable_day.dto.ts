import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ExposeAvailableDayDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  day: string;
}
