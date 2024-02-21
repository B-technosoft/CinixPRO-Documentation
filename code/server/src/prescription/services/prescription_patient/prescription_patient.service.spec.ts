import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionPatientService } from './prescription_patient.service';

describe('PrescriptionPatientService', () => {
  let service: PrescriptionPatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrescriptionPatientService],
    }).compile();

    service = module.get<PrescriptionPatientService>(
      PrescriptionPatientService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
