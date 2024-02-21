import { IsString } from 'class-validator';

export class CreateDegreeDto {
  @IsString()
  degreeName: string;
}
