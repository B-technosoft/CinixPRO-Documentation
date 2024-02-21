import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionMedicineService } from './prescription_medicine.service';

describe('PrescriptionMedicineService', () => {
  let service: PrescriptionMedicineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrescriptionMedicineService],
    }).compile();

    service = module.get<PrescriptionMedicineService>(
      PrescriptionMedicineService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
