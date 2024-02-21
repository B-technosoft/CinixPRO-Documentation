import { PartialType } from '@nestjs/mapped-types';
import { CreatePrescriptionMedicineDto } from './create-prescription_medicine.dto';

export class UpdatePrescriptionMedicineDto extends PartialType(
  CreatePrescriptionMedicineDto,
) {}
