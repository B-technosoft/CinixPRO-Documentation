import { IsString } from 'class-validator';

export class CreateTestReportDtoWithoutPrescriptionDto {
  @IsString()
  testReportName: string;

  @IsString()
  testReportNote: string;
}
