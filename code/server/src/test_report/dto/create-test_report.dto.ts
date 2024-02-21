import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePrescriptionDto } from 'src/prescription/dto/create-prescription.dto';

export class CreateTestReportDto {
  @IsString()
  testReportName: string;

  @IsString()
  testReportNote: string;

  @IsNotEmpty()
  prescription: CreatePrescriptionDto;
}
