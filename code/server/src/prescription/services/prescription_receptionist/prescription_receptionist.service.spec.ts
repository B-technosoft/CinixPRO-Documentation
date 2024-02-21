import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionReceptionistService } from './prescription_receptionist.service';

describe('PrescriptionReceptionistService', () => {
  let service: PrescriptionReceptionistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrescriptionReceptionistService],
    }).compile();

    service = module.get<PrescriptionReceptionistService>(
      PrescriptionReceptionistService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
