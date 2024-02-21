import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePrescriptionDto } from 'src/prescription/dto/create-prescription.dto';

export class CreatePrescriptionMedicineDto {
  @IsString()
  medicineName: string;

  @IsString()
  medicineNote: string;

  @IsNotEmpty()
  prescription: CreatePrescriptionDto;
}
