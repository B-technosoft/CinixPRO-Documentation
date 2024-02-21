import { Controller } from '@nestjs/common';
import { PrescriptionMedicineService } from './prescription_medicine.service';

@Controller('prescription-medicine')
export class PrescriptionMedicineController {
  constructor(private readonly _: PrescriptionMedicineService) {}
}
