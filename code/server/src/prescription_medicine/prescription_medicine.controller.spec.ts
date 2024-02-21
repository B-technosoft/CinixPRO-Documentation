import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionMedicineController } from './prescription_medicine.controller';
import { PrescriptionMedicineService } from './prescription_medicine.service';

describe('PrescriptionMedicineController', () => {
  let controller: PrescriptionMedicineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrescriptionMedicineController],
      providers: [PrescriptionMedicineService],
    }).compile();

    controller = module.get<PrescriptionMedicineController>(
      PrescriptionMedicineController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
