import { IsString } from 'class-validator';

export class UpdateSpecializationDto {
  @IsString()
  specializationName: string;
}
