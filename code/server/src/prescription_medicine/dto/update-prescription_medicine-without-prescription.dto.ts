import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePrescriptionMedicineWithoutPrescriptionDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  medicineName: string;

  @IsString()
  medicineNote: string;
}
