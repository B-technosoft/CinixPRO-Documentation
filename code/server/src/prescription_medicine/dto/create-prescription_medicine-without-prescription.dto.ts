import { IsString } from 'class-validator';

export class CreatePrescriptionMedicineWithoutPrescriptionDto {
  @IsString()
  medicineName: string;

  @IsString()
  medicineNote: string;
}
