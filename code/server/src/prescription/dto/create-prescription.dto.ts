import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreatePrescriptionMedicineWithoutPrescriptionDto } from 'src/prescription_medicine/dto/create-prescription_medicine-without-prescription.dto';
import { CreateTestReportDtoWithoutPrescriptionDto } from 'src/test_report/dto/create-test_report-without-prescription.dto';

export class CreatePrescriptionDto {
  @IsString()
  symptom: string;

  @IsString()
  diagnosi: string;

  @IsNumber()
  patientid: number;

  @IsNumber()
  appointmentid: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePrescriptionMedicineWithoutPrescriptionDto)
  prescriptionMedicines: CreatePrescriptionMedicineWithoutPrescriptionDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTestReportDtoWithoutPrescriptionDto)
  testReports: CreateTestReportDtoWithoutPrescriptionDto[];
}
