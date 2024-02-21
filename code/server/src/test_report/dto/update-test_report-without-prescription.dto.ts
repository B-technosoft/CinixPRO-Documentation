import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTestReportDtoWithoutPrescriptionDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  testReportName: string;

  @IsString()
  testReportNote: string;
}
