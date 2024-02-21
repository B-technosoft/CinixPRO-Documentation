import { Test, TestingModule } from '@nestjs/testing';
import { DoctorReceptionistService } from './doctor_receptionist.service';

describe('DoctorReceptionistService', () => {
  let service: DoctorReceptionistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorReceptionistService],
    }).compile();

    service = module.get<DoctorReceptionistService>(DoctorReceptionistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
