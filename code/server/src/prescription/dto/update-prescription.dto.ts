import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePrescriptionDto } from './create-prescription.dto';
import { UpdatePrescriptionMedicineWithoutPrescriptionDto } from 'src/prescription_medicine/dto/update-prescription_medicine-without-prescription.dto';
import { UpdateTestReportDtoWithoutPrescriptionDto } from 'src/test_report/dto/update-test_report-without-prescription.dto';

export class UpdatePrescriptionDto extends PartialType(CreatePrescriptionDto) {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePrescriptionMedicineWithoutPrescriptionDto)
  prescriptionMedicines: UpdatePrescriptionMedicineWithoutPrescriptionDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateTestReportDtoWithoutPrescriptionDto)
  testReports: UpdateTestReportDtoWithoutPrescriptionDto[];
}
