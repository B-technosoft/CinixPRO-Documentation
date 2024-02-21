import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionDoctorService } from './prescription_doctor.service';

describe('PrescriptionDoctorService', () => {
  let service: PrescriptionDoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrescriptionDoctorService],
    }).compile();

    service = module.get<PrescriptionDoctorService>(PrescriptionDoctorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
